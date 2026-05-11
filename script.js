document.addEventListener('DOMContentLoaded', () => {
    /* =========================================
       Navbar Scroll Effect
    ========================================= */
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* =========================================
       Mobile Menu Toggle
    ========================================= */
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    
    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when clicking a link
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    /* =========================================
       Active Nav Link Highlighting
    ========================================= */
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinksItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    /* =========================================
       Intersection Observer for Scroll Animations
    ========================================= */
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);
    
    revealElements.forEach(element => {
        revealOnScroll.observe(element);
    });

    /* =========================================
       Form Submission Handling (WhatsApp Redirect)
    ========================================= */
    const form = document.getElementById('inquiry-form');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = 'Redirecting... <i class="fas fa-spinner fa-spin"></i>';
            btn.style.opacity = '0.8';

            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const interestElement = document.getElementById('interest');
            const interest = interestElement.options[interestElement.selectedIndex].text;
            const message = document.getElementById('message').value;

            // Format message for WhatsApp
            const whatsappNumber = '917310106555';
            const whatsappText = `Hello Ayush,%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Email:* ${encodeURIComponent(email)}%0A*Interest:* ${encodeURIComponent(interest)}%0A*Message:* ${encodeURIComponent(message)}`;
            
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappText}`;

            // Redirect to WhatsApp
            setTimeout(() => {
                window.open(whatsappUrl, '_blank');
                
                btn.innerHTML = 'Redirected! <i class="fas fa-check"></i>';
                btn.style.backgroundColor = '#10b981'; // Success green
                btn.style.color = 'white';
                
                form.reset();
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.backgroundColor = '';
                    btn.style.opacity = '1';
                }, 3000);
            }, 800);
        });
    }
});
