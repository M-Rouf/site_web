// Sélection des éléments DOM
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-item');

// Gérer l'ouverture et la fermeture du menu
if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        mobileMenuBtn.classList.toggle('toggle');
    });
}

// Fermer le menu si on clique sur un lien (sur mobile)
navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (navLinks.classList.contains('nav-active')) {
            navLinks.classList.remove('nav-active');
            mobileMenuBtn.classList.remove('toggle');
        }
    });
});
