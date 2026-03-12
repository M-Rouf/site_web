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

// Gestion de l'envoi du formulaire de contact via AJAX pour forcer la redirection
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async function (event) {
        event.preventDefault(); // Empêcher l'envoi standard (qui affiche la page Formspree)

        const data = new FormData(event.target);
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        if (submitBtn) submitBtn.disabled = true; // Empêcher les doubles clics
        if (submitBtn) submitBtn.textContent = 'Envoi en cours...';

        try {
            const response = await fetch(event.target.action, {
                method: contactForm.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Succès : On redirige en Javascript vers l'accueil (ou l'URL voulue)
                window.location.href = "https://mrliw.fr/";
            } else {
                alert("Oops! Un problème est survenu lors de l'envoi du message.");
                if (submitBtn) submitBtn.disabled = false;
                if (submitBtn) submitBtn.textContent = 'ENVOYER LE MESSAGE';
            }
        } catch (error) {
            alert("Oops! Impossible d'envoyer le message.");
            if (submitBtn) submitBtn.disabled = false;
            if (submitBtn) submitBtn.textContent = 'ENVOYER LE MESSAGE';
        }
    });
}
