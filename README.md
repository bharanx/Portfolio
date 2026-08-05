<div align="center">

# ⚡ Bharanidharan S — Cybersecurity & Cloud Security Portfolio

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](package.json)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Focus](https://img.shields.io/badge/Focus-Cybersecurity%20%26%20Cloud-00ff66?style=flat&logo=shield)](https://github.com/bharanx/Portfolio)

**A high-performance, editorial-brutalist web application showcasing cybersecurity research, software supply-chain integrity, network intrusion detection systems (IDS/IPS), TryHackMe writeups, and technical certifications.**

[Live Portfolio](https://github.com/bharanx/Portfolio) • [Explore Projects](#-featured-project-exhibits) • [Tech Stack](#%EF%B8%8F-technology-stack--architecture) • [Getting Started](#-local-development)

---

</div>

## 📑 Table of Contents

- [About The Portfolio](#-about-the-portfolio)
- [Key Features](#-key-features)
- [Featured Project Exhibits](#-featured-project-exhibits)
- [Technology Stack & Architecture](#%EF%B8%8F-technology-stack--architecture)
- [Repository Structure](#-repository-structure)
- [Local Development](#-local-development)
- [Certifications & Documents](#-certifications--documents)
- [Connect & Contact](#-connect--contact)
- [License](#-license)

---

## 🛡️ About The Portfolio

This portfolio presents the work, research, and technical credentials of **Bharanidharan S**, a Computer Science Engineering student specializing in **Cybersecurity and Cloud Security**. 

The web application is designed with an **editorial-brutalist aesthetic**, featuring ambient particle motions, dynamic dark themes, glowing cyber elements, and responsive layout math. It highlights practical expertise in software supply-chain security (SLSA, Syft, Cosign), network security appliances (Suricata, iptables), machine learning anomaly detection, and hands-on laboratory CTFs.

---

## 🌟 Key Features

- **⚡ Zero-Dependency Vanilla Architecture**: Fast load times, lightweight bundle, zero external framework overhead.
- **🎨 Editorial-Brutalist Aesthetic**: Custom styling with glassmorphism, dynamic glowing orbs, canvas-driven fuzzy text effects, and custom scrollbars.
- **📄 Built-in PDF Modal Viewer**: High-performance modal viewer allowing inline previewing of project documentation, hackathon presentations, and academic certificates.
- **🔬 Interactive Labs & Badges**: Comprehensive showcase of TryHackMe rooms, picoCTF challenges, and practical cybersecurity labs.
- **📱 Fully Responsive Design**: Mobile-first design system adaptive across desktop, tablet, and mobile breakpoints.
- **⚡ SEO & Accessibility Compliant**: Semantic HTML5 hierarchy, meta descriptions, and accessible ARIA attributes.

---

## 🎯 Featured Project Exhibits

| Project | Domain / Tech Stack | Description | Artifacts |
| :--- | :--- | :--- | :--- |
| **ChainProof** | Supply-Chain Security, SLSA, Syft, Cosign | Research on verifying software supply-chain integrity through signed artifacts, Software Bill of Materials (SBOMs), and reproducible builds. | Research Paper |
| **NETRA** | Network Security, Suricata, iptables, Raspberry Pi | Portable hardware network security appliance & IoT Intrusion Detection System (IDS) prototype featuring real-time telemetry alerting and traffic rule enforcement. | [Presentation Deck](assets/docs/projects/netra_presentation.pdf) |
| **Proof of Work** | AI Anomaly Detection, Machine Learning, Digital Identity | 24-hour prototype created for *Build2Gether AI Hackathon 2026* introducing ML-driven behavioral anomaly detection combined with verifiable digital identity architecture. | [Technical Document](assets/docs/projects/Proof-Of-Work.pdf) |

---

## 🛠️ Technology Stack & Architecture

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        FRONTEND PRESENTATION LAYER                     │
│  HTML5 Semantic Markup  │  Vanilla CSS3 (Flexbox/Grid/Variables)      │
│  Typography: Outfit, Fira Code (Cyber/Mono), Playfair Display          │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│                         CORE LOGIC & INTERACTION                       │
│  Vanilla JS (ES6+)      │  Canvas FX (Fuzzy Logo Rendering)            │
│  Dynamic ScrollSpy     │  Universal PDF Modal Viewer                   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│                        ASSETS & DOCUMENTATION                          │
│  Vector Graphics & Favicons │ PDF Certificates & Research Exhibits     │
└────────────────────────────────────────────────────────────────────────┘
```

- **Core & Logic**: HTML5, Vanilla JavaScript (ES6+), Web Canvas API
- **Styling**: Custom CSS3 System (CSS Custom Properties, Glassmorphism, Brutalist Grid Math, Keyframe Animations)
- **Typography**: [Outfit](https://fonts.google.com/specimen/Outfit), [Fira Code](https://fonts.google.com/specimen/Fira+Code), [Playfair Display](https://fonts.google.com/specimen/Playfair+Display)
- **PDF Viewer**: Embedded Universal Modal PDF Renderer with full-screen view support
- **Hosting / Server**: Zero-config static hosting powered by `npx serve`

---

## 📁 Repository Structure

```text
Portfolio/
├── index.html                  # Main application entry point & section layout
├── package.json                # Project metadata & npm scripts
├── robots.txt                  # Search engine crawler instructions
├── sitemap.xml                 # XML Sitemap for SEO indexing
├── .gitignore                  # Git exclusion configuration
│
└── assets/                     # Static assets directory
    ├── css/
    │   └── style.css           # Core stylesheet, variables & brutalist UI rules
    ├── js/
    │   └── app.js             # Navigation, scroll-spy, canvas & modal logic
    ├── docs/                   # PDF documents & certificates
    │   ├── resume.pdf          # Professional Resume
    │   ├── projects/           # Detailed project documentation & slides
    │   │   ├── Proof-Of-Work.pdf
    │   │   └── netra_presentation.pdf
    │   └── certificates/       # Technical & academic certifications
    │       ├── cloud_computing.pdf
    │       ├── cybersecurity_essentials.pdf
    │       ├── design_thinking.pdf
    │       ├── programming_java.pdf
    │       └── python_data_science.pdf
    └── images/                 # Image assets
        ├── profile/            # Avatar & bio photographs
        └── branding/           # Logomarks, favicons & tab icons
```

---

## 🚀 Local Development

Follow these simple steps to run the portfolio locally on your machine:

### Prerequisites
- [Node.js](https://nodejs.org/) (v14.0.0 or higher recommended)
- `npm` or `npx` package runner

### Quick Start

1. **Clone the Repository**
   ```bash
   git clone https://github.com/bharanx/Portfolio.git
   cd Portfolio
   ```

2. **Launch Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   Navigate to `http://localhost:3000` (or the port specified in your terminal output).

---

## 📜 Certifications & Documents

The portfolio includes interactive PDF preview support for the following verification certificates:

- 🛡️ **Cybersecurity Essentials**
- ☁️ **Cloud Computing**
- 🐍 **Python Data Science**
- ☕ **Programming in Java**
- 💡 **Design Thinking**

All certificates can be viewed directly within the web app via the integrated document modal viewer.

---

## 📬 Connect & Contact

- **Author**: Bharanidharan S
- **Email**: [bharanibd2007@gmail.com](mailto:bharanibd2007@gmail.com)
- **GitHub**: [@bharanx](https://github.com/bharanx)
- **Portfolio Repository**: [github.com/bharanx/Portfolio](https://github.com/bharanx/Portfolio)

---

## 📄 License

Distributed under the MIT License. See [`package.json`](package.json) for details.

---

<div align="center">

Made with ⚡ by **Bharanidharan S** • Powered by Vanilla Web Standards

</div>
