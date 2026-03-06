// Esperar a que el DOM esté completamente cargado / Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {

    // Funcionalidad del Menú de Navegación Móvil / Mobile Navigation Menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            // Alternar la clase 'show' para mostrar/ocultar el menú / Toggle 'show' class to display/hide menu
            navMenu.classList.toggle('show');
            const isExpanded = navMenu.classList.contains('show');
            mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
        });
    }

    // Funcionalidad de desplazamiento suave para enlaces internos / Smooth scrolling functionality for internal links
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    for (let link of smoothScrollLinks) {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    // Cerrar el menú móvil si está abierto / Close mobile menu if open
                    if (navMenu && navMenu.classList.contains('show')) {
                        navMenu.classList.remove('show');
                    }
                    // Desplazamiento suave / Smooth scroll
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Compensar la altura del header fijo / Offset fixed header height
                        behavior: 'smooth'
                    });
                }
            }
        });
    }

    // Validación Básica de Formularios / Basic Form Validation
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            let isValid = true;

            // Obtener campos / Get form fields
            const nameInput = document.getElementById('name');
            const phoneInput = document.getElementById('phone');
            const messageInput = document.getElementById('message');

            // Función de ayuda para mostrar errores / Helper function to show errors
            const showError = (input, show) => {
                if (!input) return;
                const errorMsg = input.nextElementSibling;
                if (show) {
                    input.classList.add('error');
                    if (errorMsg && errorMsg.classList.contains('error-message')) {
                        errorMsg.style.display = 'block';
                    }
                } else {
                    input.classList.remove('error');
                    if (errorMsg && errorMsg.classList.contains('error-message')) {
                        errorMsg.style.display = 'none';
                    }
                }
            };

            // Validar Nombre / Validate Name
            if (nameInput && nameInput.value.trim() === '') {
                showError(nameInput, true);
                isValid = false;
            } else {
                showError(nameInput, false);
            }

            // Validar Teléfono / Validate Phone
            if (phoneInput && phoneInput.value.trim() === '') {
                showError(phoneInput, true);
                isValid = false;
            } else {
                showError(phoneInput, false);
            }

            // Validar Mensaje / Validate Message
            if (messageInput && messageInput.value.trim() === '') {
                showError(messageInput, true);
                isValid = false;
            } else {
                showError(messageInput, false);
            }

            // Prevenir el envío si no es válido / Prevent submission if invalid
            if (!isValid) {
                e.preventDefault();
            }
        });
    }

    // Configurar menú activo según la página actual / Highlight active menu item based on current page
    const currentLocation = location.pathname.split('/').pop();
    const navItems = document.querySelectorAll('nav ul li a');
    for (let i = 0; i < navItems.length; i++) {
        const itemLocation = navItems[i].getAttribute('href');
        // Si el enlace coincide con la URL actual, marcar como activo / If link matches current URL, mark active
        if (itemLocation === currentLocation || (currentLocation === "" && itemLocation === "index.html")) {
            navItems[i].classList.add('active');
        }
    }
});
