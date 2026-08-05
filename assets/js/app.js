document.addEventListener('DOMContentLoaded', () => {
    // --- NAVIGATION LOGIC ---
    initNavigation();

    // --- UNIVERSAL DOCUMENT VIEWER ---
    initDocViewer();

    // --- CERTIFICATIONS SLIDER ---
    initCertificationsSlider();

    // --- SCROLL MOTION & PARALLAX EXPERIENCE ---
    initScrollMotionAndParallax();

    // --- STAGGERED SCROLL REVEALS ---
    initStaggeredScrollReveal();

    // --- EDITORIAL CREDENTIALS SCROLL REVEAL ---
    initEditorialScrollReveal();

    // --- CARD 3D TILT MOTION ---
    initCardTiltEffect();

    // --- CONTACT FORM HANDLER ---
    initContactForm();

    // --- AVATAR IMAGE ZOOM & SHIFT INTERACTION ---
    initAvatarZoom();

    // --- BREAKING TO PROTECT TAGLINE FOCUS ---
    initBreakingToProtectFocus();

    // --- SECURITY APPROACH FLOW OBSERVER ---
    initApproachFlowObserver();

    // --- SCROLL PROGRESS & BACK TO TOP BUTTON ---
    initScrollProgressAndBackToTop();

    // --- INTERACTIVE CLIPBOARD TOAST NOTIFICATIONS ---
    initToastNotifications();

    // --- LABS PLATFORM FILTERING SYSTEM ---
    initLabsFilters();

    // --- CANVAS FUZZY TEXT LOGO EFFECT ---
    initFuzzyLogoText();
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
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
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
    const fsBtn        = document.getElementById('docViewerFullscreen');
    const fallback     = document.getElementById('docViewerFallback');

    if (!modal) return;

    // ---- Open ----
    function openViewer(src, title, type) {
        titleEl.textContent = title || src;

        const isFileProtocol = (location.protocol === 'file:');

        if (type === 'ppt') {
            // PPT: use MS Office Online viewer when deployed, fallback locally
            const isLocal = (isFileProtocol ||
                             location.hostname === 'localhost' ||
                             location.hostname === '127.0.0.1');
            if (isLocal) {
                frame.removeAttribute('src');
                frame.hidden = true;
                fallback.hidden = false;
            } else {
                const absoluteUrl = new URL(src, location.href).href;
                frame.src = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(absoluteUrl)}`;
                frame.hidden = false;
                fallback.hidden = true;
            }
        } else {
            // PDF: if opened directly from local disk (file: protocol), open in a new tab to bypass origin restrictions
            if (isFileProtocol) {
                window.open(src, '_blank');
                return;
            }
            // HTTP / HTTPS (Dev server or live site): iframe works natively
            frame.src = src + '#toolbar=0&navpanes=0';
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
        // Free frame source safely without security origin issues
        setTimeout(() => { frame.removeAttribute('src'); }, 200);
    }

    // ---- Wire up all [data-doc] triggers ----
    document.querySelectorAll('[data-doc]').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const src   = trigger.dataset.doc;
            const title = trigger.dataset.docTitle || '';
            const type  = trigger.dataset.docType  || 'pdf';
            openViewer(src, title, type);
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
   NETWORK PATHS VISUALIZER (INTERACTIVE SVG PACKET SIMULATION)
   ========================================================================== */
function initNetworkVisualizer() {
    const btnSimulate = document.getElementById('btnSimulateAttack');
    const btnMitigate = document.getElementById('btnMitigateAttack');
    const consoleBody = document.getElementById('dashboardConsole');
    
    const nodeFirewall = document.getElementById('nodeFirewall');
    const nodeIds = document.getElementById('nodeIds');
    const nodeIps = document.getElementById('nodeIps');
    const nodeAlertEngine = document.getElementById('nodeAlertEngine');
    
    const pktFirewallBlock = document.getElementById('pktFirewallBlock');
    const pktIdsAlert = document.getElementById('pktIdsAlert');
    const pktAlertDashboard = document.getElementById('pktAlertDashboard');
    const pktAlertForward = document.getElementById('pktAlertForward');
    const pktIpsDevice = document.getElementById('pktIpsDevice');

    if (!btnSimulate || !btnMitigate || !consoleBody) return;

    let isAttackActive = false;

    function appendLog(text, level = 'muted') {
        const line = document.createElement('div');
        line.className = `console-line ${level}`;
        const timestamp = new Date().toLocaleTimeString();
        line.textContent = `[${timestamp}] ${text}`;
        
        consoleBody.appendChild(line);
        consoleBody.scrollTop = consoleBody.scrollHeight;

        while (consoleBody.children.length > 5) {
            consoleBody.removeChild(consoleBody.firstChild);
        }
    }

    // Trigger Simulated MitM Attack
    btnSimulate.addEventListener('click', () => {
        if (isAttackActive) return;

        isAttackActive = true;
        
        // Show block and alert packets
        if (pktFirewallBlock) pktFirewallBlock.classList.remove('hidden');
        if (pktIdsAlert) pktIdsAlert.classList.remove('hidden');
        if (pktAlertDashboard) pktAlertDashboard.classList.remove('hidden');
        if (pktAlertForward) pktAlertForward.classList.remove('hidden');
        
        // Flash alarm state on processor nodes
        if (nodeFirewall) nodeFirewall.style.borderColor = '#a90e02';
        if (nodeIds) nodeIds.style.borderColor = '#a90e02';
        if (nodeIps) nodeIps.style.borderColor = '#a90e02';
        if (nodeAlertEngine) nodeAlertEngine.style.backgroundColor = 'rgba(169, 14, 2, 0.12)';

        btnSimulate.disabled = true;
        btnSimulate.classList.add('disabled');

        appendLog("🚨 [TRAFFIC] Anomaly scan warning: Malicious ARP sweep detected!", 'red');
        
        setTimeout(() => {
            appendLog("🧱 [FIREWALL] Filter triggered: Redirecting suspicious payload to threat detection.", 'yellow');
        }, 800);

        setTimeout(() => {
            appendLog("👁️ [IDS] Threat signatures matches sid:20294. Alerting telemetry engine.", 'red');
            // Block direct user device clean traffic path
            if (pktIpsDevice) pktIpsDevice.classList.add('hidden');
        }, 1600);

        setTimeout(() => {
            appendLog("🚨 [IPS] Active mitigation policy: Generate block drop ruleset.", 'red');
            btnMitigate.disabled = false;
            btnMitigate.classList.remove('disabled');
        }, 2400);
    });

    // Deploy iptables mitigation shield
    btnMitigate.addEventListener('click', () => {
        if (!isAttackActive) return;

        btnMitigate.disabled = true;
        btnMitigate.classList.add('disabled');

        appendLog("🛡️ [SHIELD] Isolating threat vectors. Appending drop rules...", 'yellow');
        
        setTimeout(() => {
            appendLog("🧱 [FIREWALL] Appending: iptables -A FORWARD -m state --state INVALID -j DROP", 'green');
        }, 800);

        setTimeout(() => {
            appendLog("📄 [LOGGER] Threat payload isolated and logged in syslog database.", 'green');
            appendLog("🔄 [SYSTEM] Threat successfully mitigated. Clean flow restored to User Device.", 'green');
            
            isAttackActive = false;
            
            // Hide alert packets
            if (pktFirewallBlock) pktFirewallBlock.classList.add('hidden');
            if (pktIdsAlert) pktIdsAlert.classList.add('hidden');
            if (pktAlertDashboard) pktAlertDashboard.classList.add('hidden');
            if (pktAlertForward) pktAlertForward.classList.add('hidden');
            
            // Restore clean user path
            if (pktIpsDevice) pktIpsDevice.classList.remove('hidden');

            // Reset borders
            if (nodeFirewall) nodeFirewall.style.borderColor = '';
            if (nodeIds) nodeIds.style.borderColor = '';
            if (nodeIps) nodeIps.style.borderColor = '';
            if (nodeAlertEngine) nodeAlertEngine.style.backgroundColor = '';

            btnSimulate.disabled = false;
            btnSimulate.classList.remove('disabled');
        }, 1800);
    });
}

/* ==========================================================================
   CYBER LAB SIMULATIONS (Nmap Audit & Suricata Rule Compile)
   ========================================================================== */
function initCyberLabSimulations() {
    // 1. Nmap scanner terminal simulation
    const btnNmap = document.getElementById('btnRunNmap');
    const nmapOutput = document.getElementById('nmapOutput');

    if (btnNmap && nmapOutput) {
        btnNmap.addEventListener('click', () => {
            const target = document.getElementById('nmapTarget').value;
            const scanType = document.getElementById('nmapType').value;

            nmapOutput.innerHTML = '';
            btnNmap.disabled = true;
            btnNmap.classList.add('disabled');

            function printLine(text, delay) {
                return new Promise(resolve => {
                    setTimeout(() => {
                        const line = document.createElement('div');
                        line.className = 'term-line';
                        line.textContent = `nmap-terminal:~$ ${text}`;
                        nmapOutput.appendChild(line);
                        nmapOutput.scrollTop = nmapOutput.scrollHeight;
                        resolve();
                    }, delay);
                });
            }

            printLine(`nmap ${scanType} -v ${target}`, 100)
                .then(() => printLine(`Starting Nmap 7.92 ( https://nmap.org ) at 2026-07-16...`, 400))
                .then(() => printLine(`Initiating SYN Stealth Scan against target...`, 400))
                .then(() => printLine(`Scanning ${target} [1000 ports]`, 500))
                .then(() => {
                    setTimeout(() => {
                        let lines = [];
                        if (target === '192.168.1.1') {
                            lines = [
                                "Discovered open port 53/tcp (domain) on 192.168.1.1",
                                "Discovered open port 80/tcp (http) on 192.168.1.1",
                                "Discovered open port 443/tcp (https) on 192.168.1.1",
                                "Nmap scan report for router.local (192.168.1.1)",
                                "PORT    STATE SERVICE",
                                "53/tcp  open  domain",
                                "80/tcp  open  http",
                                "443/tcp open  https",
                                "MAC Address: 00:11:22:33:44:55 (Cisco Router)",
                                "Scan completed in 1.84 seconds."
                            ];
                        } else if (target === '192.168.1.48') {
                            lines = [
                                "Discovered open port 22/tcp (ssh) on 192.168.1.48",
                                "Discovered open port 3000/tcp (node-api) on 192.168.1.48",
                                "Nmap scan report for user-host (192.168.1.48)",
                                "PORT     STATE SERVICE",
                                "22/tcp   open  ssh",
                                "3000/tcp open  node-api",
                                "MAC Address: AA:BB:CC:DD:EE:FF (Intel Host Laptop)",
                                "Scan completed in 1.45 seconds."
                            ];
                        } else {
                            lines = [
                                "All 1000 scanned ports on attacker.local (10.0.4.52) are filtered / closed.",
                                "Nmap scan report for unknown-attacker (10.0.4.52)",
                                "OS details: Kali Linux 2024.1 (Kernel 6.x)",
                                "Scan completed in 2.10 seconds."
                            ];
                        }

                        lines.forEach((l, i) => {
                            setTimeout(() => {
                                const line = document.createElement('div');
                                line.className = 'term-line';
                                if (l.includes('open')) {
                                    line.style.color = 'var(--accent)';
                                }
                                line.textContent = l;
                                nmapOutput.appendChild(line);
                                nmapOutput.scrollTop = nmapOutput.scrollHeight;

                                if (i === lines.length - 1) {
                                    btnNmap.disabled = false;
                                    btnNmap.classList.remove('disabled');
                                }
                            }, i * 150);
                        });
                    }, 800);
                });
        });
    }

    // 2. Suricata Rule Selector & Compiler simulator
    const btnCompile = document.getElementById('btnCompileRule');
    const ruleSelector = document.getElementById('suricataRuleSelect');
    const ruleDisplay = document.getElementById('suricataRuleCode');
    const feedbackBox = document.getElementById('suricataFeedback');

    const ruleMaps = {
        ddos: `alert tcp $EXTERNAL_NET any -> $HOME_NET 80 (
    msg:"NETRA DETECT: Potential TCP SYN Flood";
    flags:S;
    threshold: type threshold, track by_src, count 150, seconds 2;
    sid:2010041;
    rev:1;
)`,
        ssh: `alert tcp $EXTERNAL_NET any -> $HOME_NET 22 (
    msg:"NETRA DETECT: SSH Brute Force Guessing";
    flow:established,to_server;
    content:"SSH-2.0";
    threshold: type limit, track by_src, count 5, seconds 60;
    sid:2010042;
    rev:1;
)`,
        ping: `alert icmp $EXTERNAL_NET any -> $HOME_NET any (
    msg:"NETRA DETECT: ICMP Ping Sweep Scan";
    itype:8;
    sid:2010043;
    rev:1;
)`
    };

    function updateRuleText() {
        if (ruleSelector && ruleDisplay) {
            const scenario = ruleSelector.value;
            ruleDisplay.textContent = ruleMaps[scenario];
        }
    }

    if (ruleSelector) {
        ruleSelector.addEventListener('change', updateRuleText);
        updateRuleText(); // initial load
    }

    if (btnCompile && feedbackBox) {
        btnCompile.addEventListener('click', () => {
            const scenario = ruleSelector.value;
            feedbackBox.innerHTML = '';
            
            btnCompile.disabled = true;
            btnCompile.classList.add('disabled');

            function addLog(text, level = 'text-muted', delay) {
                return new Promise(resolve => {
                    setTimeout(() => {
                        const line = document.createElement('div');
                        line.className = `console-line ${level}`;
                        line.textContent = `>>> ${text}`;
                        feedbackBox.appendChild(line);
                        feedbackBox.scrollTop = feedbackBox.scrollHeight;
                        resolve();
                    }, delay);
                });
            }

            addLog("Parsing rule configuration...", 'text-muted', 100)
                .then(() => addLog("Verifying syntax structure flags... [OK]", 'text-muted', 500))
                .then(() => addLog(`Checking threshold tracker variables...`, 'text-muted', 400))
                .then(() => addLog(`Compiling signature sid: ${scenario === 'ddos' ? '2010041' : (scenario === 'ssh' ? '2010042' : '2010043')}...`, 'yellow', 600))
                .then(() => {
                    setTimeout(() => {
                        addLog("[SUCCESS] Ruleset parsed correctly.", 'green', 100);
                        addLog("[OK] Committed signature to /etc/suricata/rules/netra.rules", 'green', 300);
                        addLog("[OK] Reloaded Suricata engine database.", 'green', 500);
                        
                        btnCompile.disabled = false;
                        btnCompile.classList.remove('disabled');
                    }, 800);
                });
        });
    }
}

/* ==========================================================================
   CONTACT FORM SUBMIT LOGIC (SIMULATED SECURE HANDSHAKE)
   ========================================================================== */
function initContactForm() {
    const form = document.getElementById('contactForm');
    const responseBox = document.getElementById('formResponse');

    if (!form || !responseBox) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('contactName').value;
        const email = document.getElementById('contactEmail').value;
        const subject = document.getElementById('contactSubject').value;

        responseBox.innerHTML = '';

        const submitBtn = document.getElementById('formSubmitBtn');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="pulse-text">Initiating Cryptographic Transmission...</span>';

        function showStep(text, level = 'text-muted', delay) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    const line = document.createElement('div');
                    line.className = `console-line ${level}`;
                    line.textContent = `>>> ${text}`;
                    responseBox.appendChild(line);
                    responseBox.scrollTop = responseBox.scrollHeight;
                    resolve();
                }, delay);
            });
        }

        showStep(`Initializing communication channel with netra.local...`, 'text-muted', 100)
            .then(() => showStep(`Performing DH exchange handshake... [OK]`, 'text-muted', 600))
            .then(() => showStep(`Encrypting payload using GPG AES-256 cipher... [OK]`, 'text-muted', 500))
            .then(() => showStep(`Transmitting parcel: From=${email}, Subject="${subject}"...`, 'yellow', 800))
            .then(() => showStep(`Securing uplink channel target... Broadcast verified.`, 'yellow', 600))
            .then(() => {
                showStep(`Transmission Successful! Thank you, ${name}. Bharanidharan will decrypt your message shortly.`, 'success', 800);
                
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                form.reset();
            })
            .catch(() => {
                showStep(`ERROR: Handshake execution failed. Connection timed out.`, 'error', 100);
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            });
    });
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
   BREAKING TO PROTECT TAGLINE FOCUS INTERACTION
   ========================================================================== */
function initBreakingToProtectFocus() {
    const container = document.querySelector('.focus-container');
    const words = document.querySelectorAll('.focus-word');
    const frame = document.getElementById('focusFrame');

    if (!container || !frame || words.length === 0) return;

    function moveFrame(element) {
        // Calculate dimensions relative to the focus container
        const containerRect = container.getBoundingClientRect();
        const rect = element.getBoundingClientRect();

        const top = rect.top - containerRect.top;
        const left = rect.left - containerRect.left;
        const width = rect.width;
        const height = rect.height;

        frame.style.top = `${top}px`;
        frame.style.left = `${left}px`;
        frame.style.width = `${width}px`;
        frame.style.height = `${height}px`;
        frame.style.opacity = '1';

        words.forEach(w => w.classList.remove('active'));
        element.classList.add('active');
    }

    words.forEach(word => {
        // Shift frame on hover
        word.addEventListener('mouseenter', () => {
            moveFrame(word);
        });

        // Set active on click
        word.addEventListener('click', () => {
            moveFrame(word);
        });
    });

    // Auto-focus on the first word after loading
    setTimeout(() => {
        moveFrame(words[0]);
    }, 400);

    // Reset back to the first word when mouse leaves the tagline container
    container.addEventListener('mouseleave', () => {
        moveFrame(words[0]);
    });
}



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

/* ==========================================================================
   SCROLL PROGRESS & BACK TO TOP BUTTON
   ========================================================================== */
function initScrollProgressAndBackToTop() {
    const scrollProgress = document.getElementById('scrollProgress');
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        
        if (scrollProgress && totalHeight > 0) {
            const progress = (scrollTop / totalHeight) * 100;
            scrollProgress.style.width = Math.min(progress, 100) + '%';
        }

        if (backToTopBtn) {
            if (scrollTop > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/* ==========================================================================
   INTERACTIVE TOAST NOTIFICATION HANDLER
   ========================================================================== */
function showToast(message, icon = '📋') {
    const toast = document.getElementById('cyberToast');
    const toastMsg = document.getElementById('toastMsg');
    const toastIcon = toast ? toast.querySelector('.toast-icon') : null;

    if (toast && toastMsg) {
        toastMsg.textContent = message;
        if (toastIcon) toastIcon.textContent = icon;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 2800);
    }
}

function initToastNotifications() {
    // Attach copy clipboard listener to contact mail links or code snippets
    document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const mail = link.getAttribute('href').replace('mailto:', '');
            if (navigator.clipboard) {
                navigator.clipboard.writeText(mail);
                showToast(`EMAIL COPIED: ${mail}`, '✉️');
            }
        });
    });
}

/* ==========================================================================
   SCROLL MOTION & PARALLAX EXPERIENCE HANDLERS
   ========================================================================== */
function initScrollMotionAndParallax() {
    const separators = document.querySelectorAll('.brutalist-separator');
    const orbs = document.querySelectorAll('.ambient-orb');

    // 1. Scroll-driven Ambient Motion
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        orbs.forEach((orb, idx) => {
            const factor = (idx + 1) * 0.03;
            orb.style.transform = `translateY(${scrollY * factor}px)`;
        });
    });

    // 2. Separator scroll expand animation
    const sepObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('sep-animated');
            }
        });
    }, { threshold: 0.2 });

    separators.forEach(sep => sepObserver.observe(sep));
}

function initStaggeredScrollReveal() {
    const revealElements = document.querySelectorAll('.project-card, .project-exhibit-card, .cert-grid-card, .problem-skill-card, .details-hello-box, .contact-channel-card, .labs-platform-card, .labs-summary-card');

    revealElements.forEach((el, index) => {
        el.classList.add('motion-reveal-item');
        el.style.transitionDelay = `${(index % 4) * 0.12}s`;
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('motion-revealed');
            }
        });
    }, { threshold: 0.12 });

    revealElements.forEach(el => revealObserver.observe(el));
}

function initCardTiltEffect() {
    const cards = document.querySelectorAll('.project-card, .cert-grid-card, .problem-skill-card, .details-hello-box');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            const tiltX = (y / rect.height) * -5;
            const tiltY = (x / rect.width) * 5;

            card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

function initEditorialScrollReveal() {
    const editorialItems = document.querySelectorAll('.scroll-reveal-editorial');
    if (!editorialItems.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('editorial-revealed');
            }
        });
    }, { threshold: 0.15 });

    editorialItems.forEach(el => observer.observe(el));
}

/* ==========================================================================
   LABS PLATFORM FILTERING SYSTEM
   ========================================================================== */
function initLabsFilters() {
    const filterBtns = document.querySelectorAll('.labs-filter-btn');
    const platformCards = document.querySelectorAll('.labs-platform-card[data-platform-group]');

    if (!filterBtns.length || !platformCards.length) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filterValue = btn.getAttribute('data-filter');

            // Update active state on filter buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter platform cards
            platformCards.forEach(card => {
                const group = card.getAttribute('data-platform-group');
                if (filterValue === 'all' || group === filterValue) {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                } else {
                    card.style.display = 'none';
                    card.style.opacity = '0';
                }
            });
        });
    });
}

/* ==========================================================================
   CANVAS FUZZY TEXT LOGO EFFECT ([ BREAKING TO PROTECT ])
   ========================================================================== */
function initFuzzyLogoText() {
    const canvas = document.getElementById('fuzzyLogoCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const text = '[ Breaking to Protect ]';
    const fontSize = 20;
    const fontWeight = 900;
    const fontFamily = "'Outfit', -apple-system, sans-serif";
    const color = '#a90e02';
    const enableHover = true;
    const baseIntensity = 0.14;
    const hoverIntensity = 0.55;
    const fuzzRange = 16;
    const fps = 60;

    const fontSizeStr = `${fontSize}px`;
    const fontString = `${fontWeight} ${fontSizeStr} ${fontFamily}`;

    const offscreen = document.createElement('canvas');
    const offCtx = offscreen.getContext('2d');
    if (!offCtx) return;

    offCtx.font = fontString;
    offCtx.textBaseline = 'alphabetic';

    const metrics = offCtx.measureText(text);
    const textWidth = Math.ceil(metrics.width || 215);
    const textHeight = Math.ceil(fontSize * 1.3);
    const extraBuffer = 8;
    const offscreenWidth = textWidth + extraBuffer;

    offscreen.width = offscreenWidth;
    offscreen.height = textHeight;

    offCtx.font = fontString;
    offCtx.textBaseline = 'alphabetic';
    offCtx.fillStyle = color;
    offCtx.fillText(text, extraBuffer / 2, fontSize);

    const horizontalMargin = fuzzRange + 10;
    const verticalMargin = 4;
    canvas.width = offscreenWidth + horizontalMargin * 2;
    canvas.height = textHeight + verticalMargin * 2;
    ctx.translate(horizontalMargin, verticalMargin);

    let isHovering = false;
    let currentIntensity = baseIntensity;
    let targetIntensity = baseIntensity;
    let lastFrameTime = 0;
    const frameDuration = 1000 / fps;

    const run = (timestamp) => {
        if (timestamp - lastFrameTime < frameDuration) {
            window.requestAnimationFrame(run);
            return;
        }
        lastFrameTime = timestamp;

        ctx.clearRect(-horizontalMargin, -verticalMargin, canvas.width, canvas.height);

        targetIntensity = isHovering ? hoverIntensity : baseIntensity;
        currentIntensity += (targetIntensity - currentIntensity) * 0.12;

        for (let j = 0; j < textHeight; j++) {
            const dx = Math.floor(currentIntensity * (Math.random() - 0.5) * fuzzRange);
            ctx.drawImage(offscreen, 0, j, offscreenWidth, 1, dx, j, offscreenWidth, 1);
        }

        window.requestAnimationFrame(run);
    };

    window.requestAnimationFrame(run);

    if (enableHover) {
        const link = canvas.closest('a') || canvas;
        link.addEventListener('mouseenter', () => { isHovering = true; });
        link.addEventListener('mouseleave', () => { isHovering = false; });
    }
}


