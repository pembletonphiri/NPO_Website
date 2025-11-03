// Display welcome message on first page load 
window.addEventListener('load', function() {
    // Check if user has already seen the welcome message in this session
    if (!sessionStorage.getItem('welcomeShown')) {
        // Small delay to ensure page is fully loaded
        setTimeout(function() {
            alert('Welcome to Dress to Impress! 👔\n\nWe help individuals present their best self by providing free professional clothing.');
            sessionStorage.setItem('welcomeShown', 'true');
        }, 500);
    }
});
// GALLERY LIGHTBOX - Click to enlarge images
function initializeLightbox() {
    const lightboxHTML = `
        <div id="lightbox" class="lightbox">
            <span class="lightbox-close">&times;</span>
            <img class="lightbox-content" id="lightbox-img">
            <div class="lightbox-caption"></div>
            <a class="lightbox-prev">&#10094;</a>
            <a class="lightbox-next">&#10095;</a>
        </div>
    `;
    
    // Add lightbox to page
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    
    // Get all gallery items
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    
    let currentImageIndex = 0;
    
    // Add click event to each gallery image
    galleryItems.forEach((img, index) => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() {
            currentImageIndex = index;
            showLightbox(this);
        });
    });
    
    // Function to display lightbox with selected image
    function showLightbox(imgElement) {
        lightbox.style.display = 'block';
        lightboxImg.src = imgElement.src;
        lightboxCaption.textContent = imgElement.alt;
        document.body.style.overflow = 'hidden';
    }
    
    // Close lightbox when X is clicked
    closeBtn.addEventListener('click', closeLightbox);
    
    // Close lightbox when clicking outside image
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Function to close lightbox
    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Navigate to previous image
    prevBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
        showLightbox(galleryItems[currentImageIndex]);
    });
    
    // Navigate to next image
    nextBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
        showLightbox(galleryItems[currentImageIndex]);
    });
    
    // Keyboard navigation (arrow keys and Escape)
    document.addEventListener('keydown', function(e) {
        if (lightbox.style.display === 'block') {
            if (e.key === 'ArrowLeft') {
                prevBtn.click();
            } else if (e.key === 'ArrowRight') {
                nextBtn.click();
            } else if (e.key === 'Escape') {
                closeLightbox();
            }
        }
    });
}
// Dynamic search feature Allows users to find specific clothing types

function initializeGallerySearch() {
    // Create search box HTML
    const searchHTML = `
        <div class="gallery-search-container">
            <input type="text" id="gallery-search" class="gallery-search-input" 
                   placeholder="Search for clothing items (e.g., jeans, coats, sweaters)...">
            <div id="search-results" class="search-results"></div>
        </div>
    `;
    
    // Insert search box before gallery grid
    const gallerySection = document.querySelector('.gallery-section .container');
    const galleryGrid = document.querySelector('.gallery-grid');
    galleryGrid.insertAdjacentHTML('beforebegin', searchHTML);
    
    const searchInput = document.getElementById('gallery-search');
    const searchResults = document.getElementById('search-results');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Search functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        let foundCount = 0;
        
        // If search is empty, show all items
        if (searchTerm === '') {
            galleryItems.forEach(item => {
                item.style.display = 'block';
            });
            searchResults.textContent = '';
            return;
        }
        
        // Filter gallery items based on search term
        galleryItems.forEach(item => {
            const itemText = item.querySelector('.gallery-overlay p').textContent.toLowerCase();
            const itemAlt = item.querySelector('img').alt.toLowerCase();
            
            // Check if search term matches item text or alt text
            if (itemText.includes(searchTerm) || itemAlt.includes(searchTerm)) {
                item.style.display = 'block';
                foundCount++;
            } else {
                item.style.display = 'none';
            }
        });
        
        // Display search results count
        if (foundCount === 0) {
            searchResults.textContent = 'No items found. Try searching for: jeans, coats, sweaters, blazers, shirts, etc.';
            searchResults.style.color = '#e74c3c';
        } else {
            searchResults.textContent = `Found ${foundCount} item${foundCount !== 1 ? 's' : ''} matching "${searchTerm}"`;
            searchResults.style.color = '#27ae60';
        }
    });
}
// DONATION FORM VALIDATION Validate and handle donation form submission. Ensures all required fields are filled correctly
 
function initializeDonationForm() {
    const donationForm = document.querySelector('.donation-form');
    
    if (donationForm) {
        donationForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission
            
            // Get form field values
            const fullname = document.getElementById('fullname').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const amount = document.getElementById('amount').value;
            const paymentMethod = document.getElementById('paymentMethod').value;
            
            // Validation checks
            if (!fullname) {
                alert('Please enter your full name.');
                document.getElementById('fullname').focus();
                return;
            }
            
            // Email validation using regex pattern
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email || !emailPattern.test(email)) {
                alert('Please enter a valid email address.');
                document.getElementById('email').focus();
                return;
            }
            
            // Phone validation (basic check for numbers)
            const phonePattern = /^[0-9\s\-\+\(\)]+$/;
            if (!phone || !phonePattern.test(phone) || phone.length < 10) {
                alert('Please enter a valid phone number (at least 10 digits).');
                document.getElementById('phone').focus();
                return;
            }
            
            if (!amount) {
                alert('Please select a donation amount.');
                document.getElementById('amount').focus();
                return;
            }
            
            if (!paymentMethod) {
                alert('Please select a payment method.');
                document.getElementById('paymentMethod').focus();
                return;
            }
            
            // If all validations pass, show success message
            alert(`Thank you for your generous donation, ${fullname}!\n\nDonation Amount: R${amount}\nPayment Method: ${paymentMethod}\n\nYou will receive a confirmation email at ${email} shortly.\n\nYour support helps us empower individuals in our community!`);
            
            // Reset form after successful submission
            donationForm.reset();
        });
    }
}
// CONTACT FORM VALIDATION & EMAIL CONTROL 
function initializeContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission
            
            // Get form field values
            const name = document.getElementById('contactName').value.trim();
            const email = document.getElementById('contactEmail').value.trim();
            const subject = document.getElementById('contactSubject').value;
            const message = document.getElementById('contactMessage').value.trim();
            
            // Validation checks
            if (!name) {
                alert('Please enter your full name.');
                document.getElementById('contactName').focus();
                return;
            }
            
            // Email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email || !emailPattern.test(email)) {
                alert('Please enter a valid email address.');
                document.getElementById('contactEmail').focus();
                return;
            }
            
            if (!message || message.length < 10) {
                alert('Please enter a message (at least 10 characters).');
                document.getElementById('contactMessage').focus();
                return;
            }
            
            // Prepare email subject line
            const emailSubject = subject ? subject : 'General Inquiry';
            
            // Create mailto link with pre-filled information
            const mailtoLink = `mailto:info@dresstoimpress.org?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
            
            // Confirm before opening email client
            const confirmSend = confirm(`Your message is ready to send!\n\nFrom: ${name} (${email})\nSubject: ${emailSubject}\n\nClick OK to open your email client, or Cancel to edit your message.`);
            
            if (confirmSend) {
                // Open user's email client
                window.location.href = mailtoLink;
                
                // Show success message
                alert('Thank you for contacting us .\n\nWe typically respond within 24-48 hours.');
                
                // Reset form
                contactForm.reset();
            }
        });
    }
}
// 6. INTERACTIVE MAP FUNCTIONALITY

function initializeInteractiveMap() {
    const mapWrapper = document.querySelector('.map-wrapper');
    const mapIframe = mapWrapper ? mapWrapper.querySelector('iframe') : null;
    
    if (mapWrapper && mapIframe) {
        // Create overlay with instructions
        const overlayHTML = `
            <div class="map-overlay">
                <p>📍 Click to interact with map</p>
            </div>
        `;
        mapWrapper.insertAdjacentHTML('beforeend', overlayHTML);
        
        const overlay = mapWrapper.querySelector('.map-overlay');
        
        // Remove overlay when map is clicked (allows interaction)
        mapWrapper.addEventListener('click', function() {
            overlay.style.display = 'none';
        });
        
        // Show overlay again when mouse leaves map area
        mapWrapper.addEventListener('mouseleave', function() {
            overlay.style.display = 'flex';
        });
        
        // Add button to open map in new tab
        const openMapButton = `
            <button class="open-map-btn" onclick="window.open('https://maps.google.com/?q=7+Waboom+Close+Gordons+Bay+Cape+Town+7151', '_blank')">
                🗺️ Open in Google Maps
            </button>
        `;
        mapWrapper.insertAdjacentHTML('afterend', openMapButton);
    }
}

// SMOOTH SCROLL ENHANCEMENT

function initializeSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get target section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Calculate offset for fixed navbar
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                navLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
}
// 8. INITIALIZE ALL FUNCTIONALITY. Main initialization function Calls all setup functions when DOM is fully loaded
 
document.addEventListener('DOMContentLoaded', function() {
    console.log('Dress to Impress website loaded successfully! 🎉');
    
    // Initialize all features
    initializeLightbox();
    initializeGallerySearch();
    initializeDonationForm();
    initializeContactForm();
    initializeInteractiveMap();
    initializeSmoothScroll();
    
    console.log('All interactive features initialized.');
});

// 9. SCROLL TO TOP BUTTON

window.addEventListener('scroll', function() {
    // Create button if it doesn't exist
    let scrollBtn = document.getElementById('scroll-to-top');
    if (!scrollBtn) {
        scrollBtn = document.createElement('button');
        scrollBtn.id = 'scroll-to-top';
        scrollBtn.innerHTML = '↑';
        scrollBtn.title = 'Back to top';
        document.body.appendChild(scrollBtn);
        
        scrollBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Show/hide button based on scroll position
    if (window.pageYOffset > 300) {
        scrollBtn.style.display = 'block';
    } else {
        scrollBtn.style.display = 'none';
    }
});