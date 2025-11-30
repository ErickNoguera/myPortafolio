// ==========================================
// LIGHTBOX GALLERY FUNCTIONALITY
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');
    const galleryImages = document.querySelectorAll('.gallery-img');
    
    let currentIndex = 0;
    const images = [];
    
    // Store all images with their captions
    galleryImages.forEach((img, index) => {
        images.push({
            src: img.src,
            alt: img.alt,
            caption: img.parentElement.querySelector('.image-caption')?.textContent || img.alt
        });
        
        // Add click event to each image
        img.addEventListener('click', function() {
            currentIndex = index;
            openLightbox();
        });
    });
    
    // Open lightbox
    function openLightbox() {
        lightbox.style.display = 'block';
        updateImage();
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
    
    // Close lightbox
    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }
    
    // Update image in lightbox
    function updateImage() {
        if (images[currentIndex]) {
            lightboxImg.src = images[currentIndex].src;
            lightboxImg.alt = images[currentIndex].alt;
            lightboxCaption.textContent = images[currentIndex].caption;
        }
    }
    
    // Next image
    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        updateImage();
    }
    
    // Previous image
    function prevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateImage();
    }
    
    // Event listeners
    closeBtn.addEventListener('click', closeLightbox);
    
    nextBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        nextImage();
    });
    
    prevBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        prevImage();
    });
    
    // Close when clicking outside the image
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightbox.style.display === 'block') {
            switch(e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowRight':
                    nextImage();
                    break;
                case 'ArrowLeft':
                    prevImage();
                    break;
            }
        }
    });
    
    // Prevent right-click on lightbox image (optional)
    lightboxImg.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });
    
    // Touch swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    lightbox.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    lightbox.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next image
                nextImage();
            } else {
                // Swipe right - previous image
                prevImage();
            }
        }
    }
    
    // Smooth scroll to top when navigating back
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.addEventListener('click', function(e) {
            // Let the default behavior work, but you could add smooth scroll here if needed
        });
    }
});

// ==========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==========================================
// NAVBAR BACKGROUND ON SCROLL
// ==========================================

window.addEventListener('scroll', function() {
    const nav = document.querySelector('.project-nav');
    if (window.scrollY > 50) {
        nav.style.backgroundColor = 'rgba(0, 0, 0, 0.98)';
        nav.style.boxShadow = '0 2px 10px rgba(4, 31, 93, 0.3)';
    } else {
        nav.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
        nav.style.boxShadow = 'none';
    }
});

// ==========================================
// LAZY LOADING IMAGES (Optional Enhancement)
// ==========================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('.gallery-img').forEach(img => {
        imageObserver.observe(img);
    });
}