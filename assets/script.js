
// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const checkBox = document.getElementById('check');

    if (menuBtn && navLinks && checkBox) {
        menuBtn.addEventListener('click', function() {
            checkBox.checked = !checkBox.checked;
        });

        // Close mobile menu when a link is clicked
        const navItems = document.querySelectorAll('.nav-links a');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                checkBox.checked = false;
            });
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Get the height of the fixed header
                const headerHeight = document.querySelector('header').offsetHeight;

                // Calculate the position to scroll to (element position - header height)
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                // Smooth scroll to the target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add fixed header class on scroll
    const header = document.querySelector('header');
    const scrollThreshold = 100;

    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > scrollThreshold) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }


    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-on-scroll');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementPosition < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    };

    // Add animate-on-scroll class to elements that should be animated
    document.querySelectorAll('.service-card, .team-member, .section-header').forEach(element => {
        element.classList.add('animate-on-scroll');
    });

    // Run animation check on scroll
    window.addEventListener('scroll', animateOnScroll);

    // Run once on page load
    animateOnScroll();
});

// Function to update active navigation link based on scroll position
function updateActiveNavLink() {
    // Get all sections
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links li');

    // Get current scroll position
    const scrollPosition = window.scrollY;

    // Get header height for offset calculation
    const header= document.querySelector('header')
    const headerHeight = header.offsetHeight;

    // Loop through sections to find the one in view
    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 20; // 20px offset for better UX
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        // Check if the section is in the viewport
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Remove active class from all nav links
            navLinks.forEach(link => {
                link.classList.remove('nav-link-active');
                link.classList.remove(link.getAttribute('id') + '-active');
            });

            // Add active class to the corresponding nav link
            const activeLink = document.getElementById(sectionId + '-link');
            if (activeLink) {
                activeLink.classList.add('nav-link-active');
                activeLink.classList.add(sectionId+ '-link-active');
            }
        }
    });
}

// Add CSS class for scrolled header and update active nav link
document.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Update active navigation link
    updateActiveNavLink();
});

// Add CSS for the scrolled header in the stylesheet
document.addEventListener('DOMContentLoaded', function() {
    // Set initial active navigation link
    updateActiveNavLink();
});
