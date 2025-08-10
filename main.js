// main.js
import { auth, storage } from "./firebaseConfig.js";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { ref, uploadBytes, getDownloadURL, listAll } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

// Grab UI elements
const emailEl = document.getElementById('email');
const passEl = document.getElementById('password');
const signupBtn = document.getElementById('signupBtn');
const signinBtn = document.getElementById('signinBtn');
const signoutBtn = document.getElementById('signoutBtn');
const userInfo = document.getElementById('userInfo');
const uploadCard = document.getElementById('uploadCard');
const fileInput = document.getElementById('fileInput');
const uploadBtn = document.getElementById('uploadBtn');
const uploadStatus = document.getElementById('uploadStatus');
const gallery = document.getElementById('gallery');
const titleInput = document.getElementById('title');

// Auth
signupBtn.onclick = async () => {
  try {
    await createUserWithEmailAndPassword(auth, emailEl.value, passEl.value);
    alert("Account created");
  } catch (e) {
    alert(e.message);
  }
};

signinBtn.onclick = async () => {
  try {
    await signInWithEmailAndPassword(auth, emailEl.value, passEl.value);
  } catch (e) {
    alert(e.message);
  }
};

signoutBtn.onclick = () => signOut(auth);

onAuthStateChanged(auth, user => {
  if (user) {
    userInfo.textContent = `Signed in as ${user.email}`;
    uploadCard.style.display = 'block';
    signupBtn.style.display = signinBtn.style.display = 'none';
    emailEl.style.display = passEl.style.display = 'none';
    signoutBtn.style.display = 'inline-block';
  } else {
    userInfo.textContent = 'Not signed in';
    uploadCard.style.display = 'none';
    signupBtn.style.display = signinBtn.style.display = '';
    emailEl.style.display = passEl.style.display = '';
    signoutBtn.style.display = 'none';
  }
});

// Upload
uploadBtn.onclick = async () => {
  const file = fileInput.files[0];
  if (!file) return alert("Choose a file first");

  const user = auth.currentUser;
  if (!user) return alert("Not signed in");

  const path = `uploads/${user.uid}/${Date.now()}_${file.name}`;
  const fileRef = ref(storage, path);
  uploadStatus.textContent = 'Uploading...';
  try {
    await uploadBytes(fileRef, file);
    uploadStatus.textContent = 'Upload complete!';
    await refreshGallery();
  } catch (e) {
    uploadStatus.textContent = 'Upload failed: ' + e.message;
  }
};

// Gallery
async function refreshGallery() {
  gallery.innerHTML = 'Loading...';
  const rootRef = ref(storage, 'uploads/');
  const listResult = await listAll(rootRef);
  const allFiles = [...listResult.items];

  for (const prefix of listResult.prefixes) {
    const sub = await listAll(prefix);
    allFiles.push(...sub.items);
  }

  if (!allFiles.length) {
    gallery.innerHTML = '<em>No uploads yet</em>';
    return;
  }

  gallery.innerHTML = '';
  for (const itemRef of allFiles.reverse()) {
    const url = await getDownloadURL(itemRef);
    const img = document.createElement('img');
    img.src = url;
    img.className = 'thumb';
    gallery.appendChild(img);
  }
}

refreshGallery();
