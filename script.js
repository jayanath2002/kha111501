/*
 * SCRIPT.JS for KHA BUILDERS
 *
 * This file handles all client-side interactivity.
 *
 * FUNCTIONS:
 * 1. Mobile Navigation (Hamburger Menu): Toggles the menu.
 * 2. Sticky Header: Adds a shadow to the header on scroll.
 * 3. Scroll-to-Top Button: Shows/hides a button to go to top.
 * 4. Smooth Scroll: Smoothly animates all anchor links.
 * 5. Form Submission: Prevents default submit and shows an alert.
 * 6. Footer Year: Automatically updates the copyright year.
 */

// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {

    const header = document.getElementById('main-header');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const scrollTopBtn = document.getElementById('scrollTopButton');
    const quoteForm = document.getElementById('quote-form');
    const currentYearSpan = document.getElementById('current-year');

    let lastScrollY = window.pageYOffset;

    // 1. Mobile Navigation (Hamburger Menu)
    hamburger.addEventListener('click', () => {
        // Toggle 'active' class on hamburger and menu
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    
    // 2. Sticky Header & Scroll-to-Top Button (Combined Scroll Listener)
    window.addEventListener('scroll', () => {
        const currentScrollY = window.pageYOffset;

        // --- Sticky Header Shadow (existing logic) ---
        if (currentScrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // --- Scroll-to-Top (existing logic) ---
        if (currentScrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }

        // --- NEW Auto-Hide Nav Logic ---
        // We check if we are scrolling down (current > last)
        // AND we are past the top of the page (e.g., 100px)
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Scrolling Down
            header.classList.add('hidden');
        } else {
            // Scrolling Up
            header.classList.remove('hidden');
        }

        // Update last scroll position for next event
        // We set a minimum of 0 to avoid issues at the top
        lastScrollY = currentScrollY <= 0 ? 0 : currentScrollY; 
    });

    
    // 3. Smooth Scroll for all anchor links
    // This overrides the default CSS `scroll-behavior` for broader
    // compatibility and control.
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault(); // Stop the default jump
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Calculate position to scroll to
                // We subtract the header height to avoid the header 
                // covering the section title.
                const headerOffset = header.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                // Perform the smooth scroll
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    
    // 4. Quote Form Submission (Placeholder)
    // This shows a simple alert. For a real site, you would
    // send this data to a server or third-party service.
    if (quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Stop form from reloading page
            
            // Get data (example)
            const name = document.getElementById('name').value;
            
            // Show a confirmation message
            alert(`Thank you, ${name}! Your quote request has been sent. We will contact you soon.`);
            
            // Clear the form
            quoteForm.reset();
        });
    }

    
    // 5. Automatic Copyright Year
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

});


