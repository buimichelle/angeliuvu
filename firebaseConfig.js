// firebaseConfig.js
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAQjGTAaeMprhBCWSTV92_MLp_KNuymaJU",
  authDomain: "angelicvu-portfolio.firebaseapp.com",
  projectId: "angelicvu-portfolio",
  storageBucket: "angelicvu-portfolio.firebasestorage.app",
  messagingSenderId: "694459823428",
  appId: "1:694459823428:web:ec69a8d90ddd02a8e99311",
  measurementId: "G-ETD2DVP28S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export { app, analytics };
