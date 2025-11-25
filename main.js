/**
 * UI Logic - Manel
 * Responsable de la interactividad del diseño base (Menú móvil).
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Navbar Mobile Toggle ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            // Alternar visibilidad
            mobileMenu.classList.toggle('hidden');
            
            // Cambio de icono (opcional visual)
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                if (mobileMenu.classList.contains('hidden')) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                } else {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-xmark');
                }
            }
        });
    }

    console.log('UI Manel: Cargada y lista.');
});