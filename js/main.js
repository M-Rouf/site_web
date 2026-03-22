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

// Gestion de l'envoi du formulaire de contact vers n8n
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async function (event) {
        event.preventDefault(); // Empêche le rechargement standard de la page

        const formData = new FormData(event.target);

        // Construction de l'objet JSON attendu par le webhook n8n
        const data = {
            "prenom": formData.get("prenom") || "",
            "nom": formData.get("nom") || "",
            "email": formData.get("email") || "",
            "telephone": formData.get("telephone") || "",
            "entreprise": formData.get("entreprise") || "",
            "poste": formData.get("poste") || "",
            "sujet": formData.get("sujet") || "",
            "message": formData.get("message") || ""
        };

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Envoi en cours...';
        }

        try {
            const response = await fetch(event.target.action, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                // Redirection vers l'accueil après succès complet
                window.location.href = "https://mrliw.fr/";
            } else {
                alert("Oops! le serveur a retourné une erreur. Veuillez réessayer.");
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'ENVOYER LE MESSAGE';
                }
            }
        } catch (error) {
            console.error('Erreur Fetch N8N :', error);
            alert("Oops! Impossible de joindre le serveur. Votre message n'a pas pu être envoyé.");
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'ENVOYER LE MESSAGE';
            }
        }
    });
}
