// ─── DEFAULT DATA ─────────────────────────────────────────────────────────
const DEFAULT = {
  hero: {
    name: "Preet Sompura",
    subtitle: "3rd Year B.Tech CSE (AI) · Parul University",
    badge: "Available for Internship",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Preet",
    btn1Label: "Work With Me", btn1Link: "#contact",
    btn2Label: "View Projects", btn2Link: "#projects",
    typewords: ["Full-Stack Developer", "AI Enthusiast", "Open Source Contributor", "Problem Solver"]
  },
  about: {
    bio: "3rd year B.Tech Computer Science Engineering student with Artificial Intelligence Specialization at Parul University, Vadodara with keen interest and practical exposure in AI, Machine Learning, and Web Development. Seeking a challenging internship position to apply acquired skills, work on creative projects, and contribute as a valuable team member.",
    imgUrl: "png/WhatsApp Image 2026-05-12 at 8.48.22 PM (1).jpeg",
    email: "preetsompura999@gmail.com",
    phone: "+91 9376248717",
    github: "github.com/preetsompura127",
    linkedin: "linkedin.com/in/preet-sompura",
    location: "Vadodara, Gujarat"
  },
  skills: [
    { category: "Frontend Development", items: [{ name: "React.js", pct: 80 }, { name: "HTML & CSS", pct: 90 }, { name: "JavaScript", pct: 82 }] },
    { category: "Backend & Database", items: [{ name: "Node.js", pct: 75 }, { name: "Express.js", pct: 73 }, { name: "MongoDB", pct: 70 }, { name: "REST APIs", pct: 78 }] },
    { category: "AI / ML", items: [{ name: "Python", pct: 80 }, { name: "Pandas", pct: 72 }, { name: "Machine Learning", pct: 68 }, { name: "NLP", pct: 60 }] },
    { category: "Tools & Others", items: [{ name: "Git & GitHub", pct: 85 }, { name: "VS Code", pct: 90 }, { name: "C / C++", pct: 65 }, { name: "Java (Basic)", pct: 55 }] }
  ],
  projects: [
    {
      title: "StyLoop — AI-Powered Smart Wardrobe Platform",
      desc: "A full-stack AI web app where users digitize their wardrobe, get personalized outfit recommendations, and buy/sell preloved clothing in a thrift marketplace — live on Vercel. Integrated Google Gemini API for AI outfit suggestions based on occasion, weather, skin tone, and body type.",
      tags: ["React.js", "Node.js", "Gemini API", "MongoDB"],
      demoLink: "#",
      repoLink: "https://github.com/preetsompura127"
    }
  ],
  education: [
    {
      institution: "Parul University, Vadodara — Gujarat",
      degree: "B.Tech in Computer Science Engineering with Artificial Intelligence Specialization",
      year: "2023 – 2027",
      gpa: "CGPA: 6.74"
    }
  ],
  certifications: [
    { name: "AWS Cloud Practitioner Essentials", issuer: "Amazon Web Services" },
    { name: "Foundations of Prompt Engineering", issuer: "Amazon Web Services" },
    { name: "Artificial Intelligence Fundamentals", issuer: "IBM SkillsBuild" },
    { name: "Deloitte Data Analytics Job Simulation", issuer: "Deloitte via Forage" }
  ],
  achievements: [
    { title: "Event Coordinator", sub: "ProjectionTech Fest, Parul University" }
  ],
  contact: {
    email: "preetsompura999@gmail.com",
    phone: "+91 9376248717",
    github: "https://github.com/preetsompura127",
    linkedin: "https://www.linkedin.com/in/preetsompura00/",
    leetcode: "https://leetcode.com/u/Preetsompura00/",
    desc: "I'm open to internship opportunities, collaborations, and exciting projects. Let's build something amazing together!"
  },
  resume: {
    source: "upload",
    url: "",
    pdfName: "",
    pdfData: ""
  },
  footer: "© 2026 Preet Sompura. Crafted with passion & a lot of coffee ☕"
};

function getData() {
  try {
    return JSON.parse(localStorage.getItem('portfolioData')) || (typeof portfolioData !== 'undefined' ? portfolioData : JSON.parse(JSON.stringify(DEFAULT)));
  } catch {
    return typeof portfolioData !== 'undefined' ? portfolioData : JSON.parse(JSON.stringify(DEFAULT));
  }
}

function getAdminPw() { 
  const pw = localStorage.getItem('adminPw');
  if (!pw || pw === 'admin123') {
    localStorage.setItem('adminPw', 'Preet@2005');
    return 'Preet@2005';
  }
  return pw;
}

let D = getData();

// If the portfolioData in localStorage contains the old placeholder image URL, let's update it to our custom JPEG file!
if (D && D.about && (D.about.imgUrl.includes("unsplash.com") || !D.about.imgUrl)) {
  D.about.imgUrl = "png/WhatsApp Image 2026-05-12 at 8.48.22 PM (1).jpeg";
  try {
    localStorage.setItem('portfolioData', JSON.stringify(D));
  } catch(e) {}
}

function initPublicSite() {
  if (!document.getElementById('hero')) return;

  // ─── HERO ───────────────────────────────────────────────────────────────
  document.getElementById('hero-badge-text').textContent = D.hero.badge;
  document.getElementById('hero-name').textContent = D.hero.name;
  document.getElementById('hero-subtitle').textContent = D.hero.subtitle;
  document.getElementById('hero-avatar').src = D.hero.avatarUrl;
  document.getElementById('hero-btn1').textContent = D.hero.btn1Label;
  document.getElementById('hero-btn1').href = D.hero.btn1Link;
  document.getElementById('hero-btn2').textContent = D.hero.btn2Label;
  document.getElementById('hero-btn2').href = D.hero.btn2Link;
  document.getElementById('nav-logo-text').textContent = D.hero.name.split(' ').map(w=>w[0]).join('');
  document.title = `${D.hero.name} | CSE Student & Developer`;

  // Typewriter
  (function() {
    const words = D.hero.typewords || [];
    let wi = 0, ci = 0, del = false;
    const el = document.getElementById('typewriter');
    if (el) {
      el.textContent = '';
      function tick() {
        const w = words[wi] || '';
        if (!del) { ci++; el.textContent = w.slice(0,ci); if (ci === w.length) { del = true; setTimeout(tick, 1800); return; } }
        else { ci--; el.textContent = w.slice(0,ci); if (ci === 0) { del = false; wi = (wi+1) % words.length; } }
        setTimeout(tick, del ? 50 : 80);
      }
      if (words.length) tick();
    }
  })();

  // Socials
  const socialsEl = document.getElementById('hero-socials');
  if (socialsEl) {
    socialsEl.innerHTML = '';
    const c = D.contact;
    [
      { href: c.github, icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>`, title: 'GitHub' },
      { href: c.linkedin, icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`, title: 'LinkedIn' },
      { href: `mailto:${c.email}`, icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`, title: 'Email' }
    ].forEach(s => {
      if (!s.href) return;
      const a = document.createElement('a'); a.className = 'social-icon';
      a.href = s.href; a.title = s.title; a.target = '_blank';
      a.innerHTML = s.icon; socialsEl.appendChild(a);
    });
  }

  // ─── ABOUT ──────────────────────────────────────────────────────────────
  document.getElementById('about-img').src = D.about.imgUrl;
  document.getElementById('about-bio').textContent = D.about.bio;
  document.getElementById('contact-email-btn').href = `mailto:${D.contact.email}`;

  const infoEl = document.getElementById('about-info');
  if (infoEl) {
    infoEl.innerHTML = '';
    const infoItems = [
      { icon: 'mail', label: D.about.email, href: `mailto:${D.about.email}` },
      { icon: 'phone', label: D.about.phone, href: `tel:${D.about.phone}` },
      { icon: 'github', label: D.about.github, href: `https://${D.about.github}` },
      { icon: 'map-pin', label: D.about.location }
    ];
    infoItems.forEach(item => {
      const d = document.createElement('div'); d.className = 'info-item';
      d.innerHTML = `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" class="icon" data-feather="${item.icon}"></svg>
        ${item.href ? `<a href="${item.href}" target="_blank">${item.label}</a>` : `<span>${item.label}</span>`}`;
      infoEl.appendChild(d);
    });
  }

  // ─── SKILLS ─────────────────────────────────────────────────────────────
  const skillsGrid = document.getElementById('skills-grid');
  if (skillsGrid) {
    skillsGrid.innerHTML = '';
    D.skills.forEach(cat => {
      const card = document.createElement('div'); card.className = 'skill-card reveal';
      card.innerHTML = `<div class="skill-cat">${cat.category}</div>` +
        cat.items.map(s => `<div class="skill-item">
          <div class="skill-header"><span class="skill-name">${s.name}</span><span class="skill-pct">${s.pct}%</span></div>
          <div class="skill-track"><div class="skill-bar" data-width="${s.pct}%"></div></div>
        </div>`).join('');
      skillsGrid.appendChild(card);
    });
  }

  // ─── PROJECTS ───────────────────────────────────────────────────────────
  const projGrid = document.getElementById('projects-grid');
  if (projGrid) {
    projGrid.innerHTML = '';
    D.projects.forEach(p => {
      const card = document.createElement('div'); card.className = 'project-card reveal';
      card.innerHTML = `<div class="project-title">${p.title}</div>
        <div class="project-desc">${p.desc}</div>
        <div class="project-tags">${p.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div>
        <div class="project-links">
          ${p.demoLink ? `<a href="${p.demoLink}" class="project-link demo" target="_blank"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg> Live Demo</a>` : ''}
          ${p.repoLink ? `<a href="${p.repoLink}" class="project-link repo" target="_blank"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg> GitHub</a>` : ''}
        </div>`;
      projGrid.appendChild(card);
    });
  }

  // ─── EDUCATION ─────────────────────────────────────────────────────────
  const eduEl = document.getElementById('edu-timeline');
  if (eduEl) {
    eduEl.innerHTML = '';
    D.education.forEach(e => {
      const item = document.createElement('div'); item.className = 'edu-item reveal';
      item.innerHTML = `<div class="edu-inst">${e.institution}</div>
        <div class="edu-degree">${e.degree}</div>
        <div class="edu-meta"><span>📅 ${e.year}</span><span>🎓 ${e.gpa}</span></div>`;
      eduEl.appendChild(item);
    });
  }

  // ─── CERTIFICATIONS ─────────────────────────────────────────────────────
  const certEl = document.getElementById('cert-grid');
  if (certEl) {
    certEl.innerHTML = '';
    D.certifications.forEach(c => {
      const card = document.createElement('div'); card.className = 'cert-card reveal';
      card.innerHTML = `<div class="cert-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg></div>
        <div><div class="cert-name">${c.name}</div><div class="cert-issuer">${c.issuer}</div></div>`;
      certEl.appendChild(card);
    });
  }

  // ─── ACHIEVEMENTS ───────────────────────────────────────────────────────
  const achEl = document.getElementById('achieve-list');
  if (achEl) {
    achEl.innerHTML = '';
    D.achievements.forEach(a => {
      const item = document.createElement('div'); item.className = 'achieve-item reveal';
      item.innerHTML = `<div class="achieve-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></div>
        <div><div class="achieve-title">${a.title}</div><div class="achieve-sub">${a.sub}</div></div>`;
      achEl.appendChild(item);
    });
  }

  // ─── CONTACT ───────────────────────────────────────────────────────────
  const contactLinks = document.getElementById('contact-links');
  if (contactLinks) {
    contactLinks.innerHTML = '';
    const cc = D.contact;
    [
      { href: `mailto:${cc.email}`, icon: 'mail', label: cc.email },
      { href: `tel:${cc.phone}`, icon: 'phone', label: cc.phone },
      { href: cc.github, icon: 'github', label: 'GitHub' },
      { href: cc.linkedin, icon: 'linkedin', label: 'LinkedIn' }
    ].filter(l=>l.href && l.href !== 'tel:undefined' && l.href !== 'mailto:undefined').forEach(l => {
      const a = document.createElement('a'); a.className = 'contact-card'; a.href = l.href; a.target = '_blank';
      a.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-feather="${l.icon}"></svg><span>${l.label}</span>`;
      contactLinks.appendChild(a);
    });
  }

  // Footer
  document.getElementById('footer-text').innerHTML = D.footer || DEFAULT.footer;

  // Vanta Globe was replaced by custom high-performance animation.js (Interactive Swarm & Gravity Mesh)

  // ─── FEATHER ───────────────────────────────────────────────────────────
  try { feather.replace(); } catch(e) {}

  // ─── SCROLL REVEAL ──────────────────────────────────────────────────────
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // ─── SKILL BARS ─────────────────────────────────────────────────────────
  const sio = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.style.width = e.target.getAttribute('data-width'); } });
  }, { threshold: 0.2 });
  document.querySelectorAll('.skill-bar').forEach(b => sio.observe(b));

  // ─── HAMBURGER ─────────────────────────────────────────────────────────
  document.getElementById('hamburger').addEventListener('click', () => {
    document.getElementById('mobile-menu').classList.toggle('open');
  });
  document.querySelectorAll('.mobile-menu a').forEach(a => a.addEventListener('click', () => {
    document.getElementById('mobile-menu').classList.remove('open');
  }));

  // ─── RESUME ─────────────────────────────────────────────────────────────
  (function initResume() {
    const r = D.resume;

    // Always show resume buttons — auto-generated resume.html always exists
    const navLink    = document.getElementById('nav-resume-link');
    const mobileLink = document.getElementById('mobile-resume-link');
    const heroBtn    = document.getElementById('hero-resume-btn');
    const aboutWrap  = document.getElementById('about-resume-wrap');
    if (navLink)    navLink.style.display    = '';
    if (mobileLink) mobileLink.style.display = '';
    if (heroBtn)    heroBtn.style.display    = '';
    if (aboutWrap)  aboutWrap.style.display  = 'flex';

    // viewResume => open auto-generated resume.html in new tab
    window.viewResume = function(e) {
      if (e) e.preventDefault();
      window.open('resume.html', '_blank');
    };

    // downloadResume => use uploaded PDF if available, else open resume.html (Ctrl+P to save PDF)
    window.downloadResume = function(e) {
      if (e) e.preventDefault();
      var hasPdf = r && ((r.source === 'upload' && r.pdfData) || (r.source === 'url' && r.url));
      if (hasPdf) {
        if (r.source === 'url') { window.open(r.url, '_blank'); return; }
        var arr  = r.pdfData.split(',');
        var mime = arr[0].match(/:(.*?);/)[1];
        var bstr = atob(arr[1]); var n = bstr.length;
        var u8   = new Uint8Array(n);
        while (n--) u8[n] = bstr.charCodeAt(n);
        var blob = new Blob([u8], { type: mime });
        var url  = URL.createObjectURL(blob);
        var a    = document.createElement('a');
        a.href = url; a.download = r.pdfName || 'Preet_Sompura_Resume.pdf';
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
        setTimeout(function() { URL.revokeObjectURL(url); }, 5000);
      } else {
        // No PDF uploaded — open resume.html; user can Print > Save as PDF
        window.open('resume.html', '_blank');
      }
    };
  })();

  // Fallback no-ops
  if (!window.viewResume)     window.viewResume     = function(e) { if(e) e.preventDefault(); };
  if (!window.downloadResume) window.downloadResume = function(e) { if(e) e.preventDefault(); };
}

initPublicSite();

// Admin Panel logic has been fully moved to its own dedicated file: admin.js
