document.addEventListener('DOMContentLoaded', () => {
    const dropdowns = document.querySelectorAll('.dropdown-btn');
    dropdowns.forEach(btn => {
      btn.addEventListener('click', () => {
        const submenu = btn.nextElementSibling;
        submenu.classList.toggle('active');
      });
    });
  });

document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('nav a');
  const currentPath = window.location.pathname.split('/').pop();

  links.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath) {
      link.classList.add('active');
    }
  });
});


