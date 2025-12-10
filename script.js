document.addEventListener('DOMContentLoaded', () => {

    /* ============================================================
        1. SCROLL SUAVE
    ============================================================ */
    const scrollLinks = document.querySelectorAll('a[href^="#"]');

    scrollLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerHeight = 75;
                const offsetTop = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });


    /* ============================================================
        2. MENU MOBILE
    ============================================================ */
    const toggleButton = document.getElementById('menu-mobile-toggle');
    const navLinks = document.getElementById('nav-links-menu');

    if (toggleButton && navLinks) {
        toggleButton.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        const navItems = document.querySelectorAll('.nav-links .nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            });
        });
    }


    /* ============================================================
       3. CARROSSEL
    ============================================================ */
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-button.next');
    const prevButton = document.querySelector('.carousel-button.prev');
    let slideIndex = 0;

    const getSlideWidth = () => slides[0] ? slides[0].getBoundingClientRect().width : 0;

    const setSlidePositions = () => {
        const slideWidth = getSlideWidth();
        slides.forEach((slide, index) => {
            slide.style.left = slideWidth * index + 'px';
        });
    };

    const moveToSlide = (index) => {
        const slideWidth = getSlideWidth();
        if (slides[index]) {
            track.style.transform = 'translateX(-' + slideWidth * index + 'px)';
            slideIndex = index;
        }
    };

    setSlidePositions();

    nextButton.addEventListener('click', () => {
        let targetIndex = slideIndex + 1;
        if (targetIndex >= slides.length) targetIndex = 0;
        moveToSlide(targetIndex);
    });

    prevButton.addEventListener('click', () => {
        let targetIndex = slideIndex - 1;
        if (targetIndex < 0) targetIndex = slides.length - 1;
        moveToSlide(targetIndex);
    });

    window.addEventListener('resize', () => {
        setSlidePositions();
        moveToSlide(slideIndex);
    });


    /* ============================================================
       4. ANIMAÇÃO DE ENTRADA (Intersection Observer)
    ============================================================ */
    const sections = document.querySelectorAll('.content-section');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        if (!section.classList.contains('visible')) {
            observer.observe(section);
        }
    });


    /* ============================================================
       5. 🔄 TEMA CLARO / ESCURO + ÍCONE DINÂMICO
    ============================================================ */

    const themeToggle = document.getElementById("toggleTheme");
    const html = document.documentElement;

    // Carrega tema salvo OU usa claro por padrão
    const savedTheme = localStorage.getItem("theme") || "light";
    html.setAttribute("data-theme", savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const current = html.getAttribute("data-theme");
            const next = current === "dark" ? "light" : "dark";

            html.setAttribute("data-theme", next);
            localStorage.setItem("theme", next);
        });
    }

});
