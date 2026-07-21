document.addEventListener('DOMContentLoaded', () => {
    // --- NAVIGATION LOGIC ---
    initNavigation();

    // --- UNIVERSAL DOCUMENT VIEWER ---
    initDocViewer();

    // --- CERTIFICATIONS SLIDER ---
    initCertificationsSlider();

    // --- AVATAR IMAGE ZOOM & SHIFT INTERACTION ---
    initAvatarZoom();

    // --- SECURITY APPROACH FLOW OBSERVER ---
    initApproachFlowObserver();
});

/* ==========================================================================
   NAVIGATION & MOBILE MENU
   ========================================================================== */
function initNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const cyberNav = document.getElementById('cyberNav');
    const header = document.querySelector('.cyber-header');
    
    if (menuToggle && cyberNav) {
        menuToggle.addEventListener('click', () => {
            cyberNav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                cyberNav.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }

    const sections = document.querySelectorAll('.scroll-spy');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 120; // offset

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            }
        });

        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });
}

/* ==========================================================================
   UNIVERSAL DOCUMENT VIEWER
   ========================================================================== */
function initDocViewer() {
    const modal        = document.getElementById('docViewerModal');
    const backdrop     = document.getElementById('docViewerBackdrop');
    const frame        = document.getElementById('docViewerFrame');
    const titleEl      = document.getElementById('docViewerTitle');
    const closeBtn     = document.getElementById('docViewerClose');
    const downloadBtn  = document.getElementById('docViewerDownload');
    const fsBtn        = document.getElementById('docViewerFullscreen');
    const fallback     = document.getElementById('docViewerFallback');
    const fallbackDL   = document.getElementById('docViewerFallbackDownload');

    if (!modal) return;

    // ---- Open ----
    function openViewer(src, title, type, pdfSrc) {
        titleEl.textContent = title || src;

        // Set download link
        downloadBtn.href = src;
        downloadBtn.download = src.split('/').pop();
        if (fallbackDL) { fallbackDL.href = src; fallbackDL.download = src.split('/').pop(); }

        if (type === 'ppt') {
            if (pdfSrc) {
                // If a pre-rendered PDF copy is available, use it directly (works offline, local, online!)
                frame.src = pdfSrc;
                frame.hidden = false;
                fallback.hidden = true;
            } else {
                // Otherwise, show the warning locally or load MS Office Viewer online
                const isLocal = (location.protocol === 'file:' ||
                                 location.hostname === 'localhost' ||
                                 location.hostname === '127.0.0.1');
                if (isLocal) {
                    frame.src = '';
                    frame.hidden = true;
                    fallback.hidden = false;
                } else {
                    const absoluteUrl = new URL(src, location.href).href;
                    frame.src = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(absoluteUrl)}`;
                    frame.hidden = false;
                    fallback.hidden = true;
                }
            }
        } else {
            // PDF: iframe works natively
            frame.src = src;
            frame.hidden = false;
            fallback.hidden = true;
        }

        modal.hidden = false;
        document.body.style.overflow = 'hidden';
        closeBtn.focus();
    }

    // ---- Close ----
    function closeViewer() {
        modal.hidden = true;
        document.body.style.overflow = '';
        // Stop iframe loading / free PDF memory
        setTimeout(() => { frame.src = ''; }, 200);
    }

    // ---- Wire up all [data-doc] triggers ----
    document.querySelectorAll('[data-doc]').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            // Let the browser handle standard actions for new tab / new window (Ctrl, Cmd, Shift, or Middle Click)
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) {
                return;
            }
            e.preventDefault();
            const src   = trigger.getAttribute('href') || trigger.dataset.doc;
            const title = trigger.dataset.docTitle || '';
            const type  = trigger.dataset.docType  || 'pdf';
            const pdfSrc = trigger.dataset.pdf     || '';
            openViewer(src, title, type, pdfSrc);
        });
    });

    // ---- Close controls ----
    closeBtn.addEventListener('click', closeViewer);
    backdrop.addEventListener('click', closeViewer);

    // ---- Fullscreen ----
    fsBtn.addEventListener('click', () => {
        const target = frame.hidden ? fallback : frame;
        if (target.requestFullscreen) target.requestFullscreen();
        else if (target.webkitRequestFullscreen) target.webkitRequestFullscreen();
    });

    // ---- Keyboard ----
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.hidden) closeViewer();
    });
}

/* ==========================================================================
   CERTIFICATIONS CAROUSEL SLIDER (3D Flips, Auto-sliding, Sparkles)
   ========================================================================== */
function initCertificationsSlider() {
    const certCards = document.querySelectorAll('.cert-grid-card');
    
    // Sparkle generator on card hover
    certCards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            createSparkleBurst(card, e);
        });
    });

    function createSparkleBurst(element, event) {
        const particleCount = 8;
        const rect = element.getBoundingClientRect();
        
        for (let i = 0; i < particleCount; i++) {
            const sparkle = document.createElement('div');
            sparkle.style.position = 'absolute';
            sparkle.style.width = '6px';
            sparkle.style.height = '6px';
            sparkle.style.borderRadius = '50%';
            sparkle.style.backgroundColor = i % 2 === 0 ? 'var(--accent)' : 'var(--text-primary)';
            sparkle.style.boxShadow = `0 0 6px ${sparkle.style.backgroundColor}`;
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '15';
            
            const startX = Math.random() * rect.width;
            const startY = Math.random() * rect.height;
            sparkle.style.left = `${startX}px`;
            sparkle.style.top = `${startY}px`;

            element.appendChild(sparkle);

            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 40 + 20;
            const destX = startX + Math.cos(angle) * velocity;
            const destY = startY + Math.sin(angle) * velocity;

            sparkle.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { transform: `translate(${destX - startX}px, ${destY - startY}px) scale(0)`, opacity: 0 }
            ], {
                duration: Math.random() * 600 + 400,
                easing: 'ease-out',
                fill: 'forwards'
            });

            setTimeout(() => {
                sparkle.remove();
            }, 1000);
        }
    }

    const revealCards = document.querySelectorAll('.scroll-reveal-card');
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealCards.forEach(card => scrollObserver.observe(card));
}

/* ==========================================================================
   AVATAR IMAGE ZOOM & SHIFT INTERACTION
   ========================================================================== */
function initAvatarZoom() {
    const avatarImgs = document.querySelectorAll('.avatar-img');
    
    avatarImgs.forEach(img => {
        img.addEventListener('click', (e) => {
            e.stopPropagation();
            img.classList.toggle('zoomed-left');
        });
    });

    // Reset when clicking anywhere else on the document
    document.addEventListener('click', () => {
        avatarImgs.forEach(img => {
            img.classList.remove('zoomed-left');
        });
    });
}

/* ==========================================================================
   SECURITY APPROACH FLOW OBSERVER
   ========================================================================== */
function initApproachFlowObserver() {
    const flowSection = document.getElementById('approachFlow');
    const progressLine = document.getElementById('approachLine');
    if (!flowSection || !progressLine) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // If mobile (screen <= 576), animate height! Else, animate width.
                if (window.innerWidth <= 576) {
                    progressLine.style.height = 'calc(100% - 60px)';
                } else {
                    progressLine.style.width = 'calc(100% - 80px)';
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.25 });
    
    observer.observe(flowSection);
}
