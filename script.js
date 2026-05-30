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
    return JSON.parse(localStorage.getItem('portfolioData')) || JSON.parse(JSON.stringify(DEFAULT));
  } catch {
    return JSON.parse(JSON.stringify(DEFAULT));
  }
}

function getAdminPw() { return localStorage.getItem('adminPw') || 'admin123'; }

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
    function tick() {
      const w = words[wi] || '';
      if (!del) { ci++; el.textContent = w.slice(0,ci); if (ci === w.length) { del = true; setTimeout(tick, 1800); return; } }
      else { ci--; el.textContent = w.slice(0,ci); if (ci === 0) { del = false; wi = (wi+1) % words.length; } }
      setTimeout(tick, del ? 50 : 80);
    }
    if (words.length) tick();
  })();

  // Socials
  const socialsEl = document.getElementById('hero-socials');
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

  // ─── ABOUT ──────────────────────────────────────────────────────────────
  document.getElementById('about-img').src = D.about.imgUrl;
  document.getElementById('about-bio').textContent = D.about.bio;
  document.getElementById('contact-email-btn').href = `mailto:${D.contact.email}`;

  const infoItems = [
    { icon: 'mail', label: D.about.email, href: `mailto:${D.about.email}` },
    { icon: 'phone', label: D.about.phone, href: `tel:${D.about.phone}` },
    { icon: 'github', label: D.about.github, href: `https://${D.about.github}` },
    { icon: 'map-pin', label: D.about.location }
  ];
  const infoEl = document.getElementById('about-info');
  infoItems.forEach(item => {
    const d = document.createElement('div'); d.className = 'info-item';
    d.innerHTML = `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" class="icon" data-feather="${item.icon}"></svg>
      ${item.href ? `<a href="${item.href}" target="_blank">${item.label}</a>` : `<span>${item.label}</span>`}`;
    infoEl.appendChild(d);
  });

  // ─── SKILLS ─────────────────────────────────────────────────────────────
  const skillsGrid = document.getElementById('skills-grid');
  D.skills.forEach(cat => {
    const card = document.createElement('div'); card.className = 'skill-card reveal';
    card.innerHTML = `<div class="skill-cat">${cat.category}</div>` +
      cat.items.map(s => `<div class="skill-item">
        <div class="skill-header"><span class="skill-name">${s.name}</span><span class="skill-pct">${s.pct}%</span></div>
        <div class="skill-track"><div class="skill-bar" data-width="${s.pct}%"></div></div>
      </div>`).join('');
    skillsGrid.appendChild(card);
  });

  // ─── PROJECTS ───────────────────────────────────────────────────────────
  const projGrid = document.getElementById('projects-grid');
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

  // ─── EDUCATION ─────────────────────────────────────────────────────────
  const eduEl = document.getElementById('edu-timeline');
  D.education.forEach(e => {
    const item = document.createElement('div'); item.className = 'edu-item reveal';
    item.innerHTML = `<div class="edu-inst">${e.institution}</div>
      <div class="edu-degree">${e.degree}</div>
      <div class="edu-meta"><span>📅 ${e.year}</span><span>🎓 ${e.gpa}</span></div>`;
    eduEl.appendChild(item);
  });

  // ─── CERTIFICATIONS ─────────────────────────────────────────────────────
  const certEl = document.getElementById('cert-grid');
  D.certifications.forEach(c => {
    const card = document.createElement('div'); card.className = 'cert-card reveal';
    card.innerHTML = `<div class="cert-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg></div>
      <div><div class="cert-name">${c.name}</div><div class="cert-issuer">${c.issuer}</div></div>`;
    certEl.appendChild(card);
  });

  // ─── ACHIEVEMENTS ───────────────────────────────────────────────────────
  const achEl = document.getElementById('achieve-list');
  D.achievements.forEach(a => {
    const item = document.createElement('div'); item.className = 'achieve-item reveal';
    item.innerHTML = `<div class="achieve-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></div>
      <div><div class="achieve-title">${a.title}</div><div class="achieve-sub">${a.sub}</div></div>`;
    achEl.appendChild(item);
  });

  // ─── CONTACT ───────────────────────────────────────────────────────────
  const contactLinks = document.getElementById('contact-links');
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

  // Footer
  document.getElementById('footer-text').innerHTML = D.footer || DEFAULT.footer;

  // ─── VANTA ─────────────────────────────────────────────────────────────
  try {
    VANTA.GLOBE({ el: "#vanta-bg", mouseControls: true, touchControls: true, gyroControls: false, minHeight: 200, minWidth: 200, scale: 1, scaleMobile: 1, color: 0x6d28d9, backgroundColor: 0xf8fafc, size: 1.2 });
  } catch(e) {}

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
    if (!r) return;
    const hasResume = (r.source === 'upload' && r.pdfData) || (r.source === 'url' && r.url);
    if (!hasResume) return;

    // Show nav links
    const navLink = document.getElementById('nav-resume-link');
    const mobileLink = document.getElementById('mobile-resume-link');
    const heroBtn = document.getElementById('hero-resume-btn');
    const aboutWrap = document.getElementById('about-resume-wrap');
    if (navLink)    navLink.style.display = '';
    if (mobileLink) mobileLink.style.display = '';
    if (heroBtn)    heroBtn.style.display = '';
    if (aboutWrap)  aboutWrap.style.display = 'flex';

    // Build a reusable blob URL (only once for uploaded PDFs)
    let _blobUrl = null;
    function getResumeUrl() {
      if (r.source === 'url') return r.url;
      if (!_blobUrl && r.pdfData) {
        const arr = r.pdfData.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]); let n = bstr.length;
        const u8 = new Uint8Array(n);
        while (n--) u8[n] = bstr.charCodeAt(n);
        _blobUrl = URL.createObjectURL(new Blob([u8], { type: mime }));
      }
      return _blobUrl;
    }

    // viewResume — open in new tab
    window.viewResume = function(e) {
      if (e) e.preventDefault();
      const url = getResumeUrl();
      if (url) window.open(url, '_blank');
    };

    // downloadResume — trigger download
    window.downloadResume = function(e) {
      if (e) e.preventDefault();
      if (r.source === 'url') {
        // For external URLs just open in new tab
        window.open(r.url, '_blank');
        return;
      }
      const url = getResumeUrl();
      if (!url) return;
      const a = document.createElement('a');
      a.href = url;
      a.download = r.pdfName || 'resume.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };
  })();

  // Fallback no-ops so onclick attributes don't error if resume not set
  if (!window.viewResume)     window.viewResume     = function(e) { if(e) e.preventDefault(); };
  if (!window.downloadResume) window.downloadResume = function(e) { if(e) e.preventDefault(); };
}

initPublicSite();

// ─── ADMIN PANEL ─────────────────────────────────────────────────────────-
function doLogin() {
  const val = document.getElementById('pw-input').value;
  if (val === getAdminPw()) {
    sessionStorage.setItem('adminLoggedIn', 'true');
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('admin-app').classList.add('visible');
    populateAll();
    toast('success', '✅ Welcome back!', 'Admin panel unlocked');
  } else {
    document.getElementById('login-err').style.display = 'block';
    document.getElementById('pw-input').style.borderColor = 'var(--red)';
    setTimeout(() => { document.getElementById('pw-input').style.borderColor = ''; }, 1500);
  }
}

function doLogout() {
  sessionStorage.removeItem('adminLoggedIn');
  document.getElementById('admin-app').classList.remove('visible');
  document.getElementById('login-screen').style.display='flex';
  document.getElementById('pw-input').value='';
  document.getElementById('login-err').style.display='none';
}

// ─── PANEL SWITCH ─────────────────────────────────────────────────────────
const TITLES = { dashboard:'Dashboard', hero:'Hero Section', about:'About', skills:'Skills', projects:'Projects', education:'Education', certifications:'Certifications', achievements:'Achievements', contact:'Contact', resume:'Resume Manager', settings:'Settings' };
function switchPanel(id, el) {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById('panel-'+id).classList.add('active');
  if (el) el.classList.add('active');
  document.getElementById('topbar-title').textContent = TITLES[id] || id;
}

// ─── POPULATE ─────────────────────────────────────────────────────────────
function populateAll() {
  D = getData();
  if (!D.resume) D.resume = JSON.parse(JSON.stringify(DEFAULT.resume));
  populateDash(); populateHero(); populateAbout(); populateSkills();
  populateProjects(); populateEdu(); populateCerts(); populateAchieves(); populateContact(); populateResume();
}

function populateDash() {
  const stats = [
    { label: 'Projects', num: D.projects.length, icon: '🚀' },
    { label: 'Skills', num: D.skills.reduce((a,c)=>a+c.items.length,0), icon: '⚡' },
    { label: 'Certifications', num: D.certifications.length, icon: '🏅' },
    { label: 'Achievements', num: D.achievements.length, icon: '⭐' },
  ];
  document.getElementById('dash-stats').innerHTML = stats.map(s =>
    `<div class="stat-card"><div class="stat-num">${s.icon} ${s.num}</div><div class="stat-label">${s.label}</div></div>`
  ).join('');
}

function populateHero() {
  const h = D.hero;
  document.getElementById('h-name').value = h.name;
  document.getElementById('h-badge').value = h.badge;
  document.getElementById('h-subtitle').value = h.subtitle;
  document.getElementById('h-avatar').value = h.avatarUrl;
  document.getElementById('h-btn1l').value = h.btn1Label;
  document.getElementById('h-btn1k').value = h.btn1Link;
  document.getElementById('h-btn2l').value = h.btn2Label;
  document.getElementById('h-btn2k').value = h.btn2Link;
  document.getElementById('h-typewords').value = (h.typewords||[]).join(', ');
}

function populateAbout() {
  const a = D.about;
  document.getElementById('a-img').value = a.imgUrl;
  document.getElementById('a-bio').value = a.bio;
  document.getElementById('a-email').value = a.email;
  document.getElementById('a-phone').value = a.phone;
  document.getElementById('a-github').value = a.github;
  document.getElementById('a-loc').value = a.location;
}

function populateSkills() {
  const el = document.getElementById('skills-editor'); el.innerHTML = '';
  D.skills.forEach((cat, ci) => {
    const div = document.createElement('div'); div.className = 'skill-group';
    div.innerHTML = `
      <div class="skill-group-header">
        <div class="skill-group-name"><input type="text" value="${escHtml(cat.category)}" onchange="D.skills[${ci}].category=this.value" placeholder="Category Name" /></div>
        <button class="del-btn" onclick="D.skills.splice(${ci},1);populateSkills()">Remove</button>
      </div>
      <div id="skill-items-${ci}"></div>
      <button class="add-btn" onclick="addSkillItem(${ci})" style="margin-top:0.5rem;">+ Add Skill</button>`;
    el.appendChild(div);
    const itemsEl = div.querySelector(`#skill-items-${ci}`);
    cat.items.forEach((item, ii) => {
      const row = document.createElement('div'); row.className = 'list-item';
      row.style.cssText = 'display:flex;align-items:center;gap:0.8rem;padding:0.75rem 1rem;margin-bottom:0.5rem;';
      row.innerHTML = `
        <input type="text" value="${escHtml(item.name)}" placeholder="Skill name" style="flex:1;background:var(--bg3);border:1px solid var(--border);border-radius:8px;padding:0.5rem 0.75rem;color:var(--text);font-family:inherit;font-size:0.85rem;outline:none;" onchange="D.skills[${ci}].items[${ii}].name=this.value" />
        <input type="number" value="${item.pct}" min="0" max="100" style="width:70px;background:var(--bg3);border:1px solid var(--border);border-radius:8px;padding:0.5rem 0.75rem;color:var(--accent3);font-family:inherit;font-size:0.85rem;font-weight:700;outline:none;text-align:center;" onchange="D.skills[${ci}].items[${ii}].pct=+this.value" />
        <span style="color:var(--text3);font-size:0.8rem;">%</span>
        <button class="del-btn" onclick="D.skills[${ci}].items.splice(${ii},1);populateSkills()">✕</button>`;
      itemsEl.appendChild(row);
    });
  });
}

function addSkillCategory() {
  const name = prompt('Enter the name of the new skill category (e.g., Backend & Database):');
  if (name === null) return;
  const catName = name.trim() || 'New Category';
  D.skills.push({ category: catName, items: [] });
  populateSkills();
}
function addSkillItem(ci) { D.skills[ci].items.push({ name: 'New Skill', pct: 70 }); populateSkills(); }

function populateProjects() {
  const el = document.getElementById('projects-editor'); el.innerHTML = '';
  D.projects.forEach((p, pi) => {
    const div = document.createElement('div'); div.className = 'list-item';
    div.innerHTML = `
      <div class="list-item-header"><span class="item-label">Project ${pi+1}</span><button class="del-btn" onclick="D.projects.splice(${pi},1);populateProjects()">Remove</button></div>
      <div class="field"><label>Title</label><input type="text" value="${escHtml(p.title)}" onchange="D.projects[${pi}].title=this.value" /></div>
      <div class="field"><label>Description</label><textarea rows="3" onchange="D.projects[${pi}].desc=this.value">${escHtml(p.desc)}</textarea></div>
      <div class="field"><label>Tags (comma separated)</label><input type="text" value="${(p.tags||[]).join(', ')}" onchange="D.projects[${pi}].tags=this.value.split(',').map(s=>s.trim()).filter(Boolean)" /></div>
      <div class="field-row">
        <div class="field"><label>Live Demo URL</label><input type="text" value="${escHtml(p.demoLink||'')}" onchange="D.projects[${pi}].demoLink=this.value" /></div>
        <div class="field"><label>GitHub Repo URL</label><input type="text" value="${escHtml(p.repoLink||'')}" onchange="D.projects[${pi}].repoLink=this.value" /></div>
      </div>`;
    el.appendChild(div);
  });
}
function addProject() { D.projects.push({ title: 'New Project', desc: '', tags: [], demoLink: '', repoLink: '' }); populateProjects(); }

function populateEdu() {
  const el = document.getElementById('edu-editor'); el.innerHTML = '';
  D.education.forEach((e, ei) => {
    const div = document.createElement('div'); div.className = 'list-item';
    div.innerHTML = `
      <div class="list-item-header"><span class="item-label">Education ${ei+1}</span><button class="del-btn" onclick="D.education.splice(${ei},1);populateEdu()">Remove</button></div>
      <div class="field"><label>Institution</label><input type="text" value="${escHtml(e.institution)}" onchange="D.education[${ei}].institution=this.value" /></div>
      <div class="field"><label>Degree / Program</label><input type="text" value="${escHtml(e.degree)}" onchange="D.education[${ei}].degree=this.value" /></div>
      <div class="field-row">
        <div class="field"><label>Year</label><input type="text" value="${escHtml(e.year)}" onchange="D.education[${ei}].year=this.value" /></div>
        <div class="field"><label>GPA / Result</label><input type="text" value="${escHtml(e.gpa)}" onchange="D.education[${ei}].gpa=this.value" /></div>
      </div>`;
    el.appendChild(div);
  });
}
function addEdu() { D.education.push({ institution: '', degree: '', year: '', gpa: '' }); populateEdu(); }

function populateCerts() {
  const el = document.getElementById('cert-editor'); el.innerHTML = '';
  D.certifications.forEach((c, ci) => {
    const div = document.createElement('div'); div.className = 'list-item';
    div.style.cssText = 'display:flex;align-items:center;gap:0.8rem;margin-bottom:0.8rem;';
    div.innerHTML = `
      <input type="text" value="${escHtml(c.name)}" placeholder="Certification name" style="flex:2;background:var(--bg3);border:1px solid var(--border);border-radius:8px;padding:0.6rem 0.9rem;color:var(--text);font-family:inherit;font-size:0.88rem;outline:none;" onchange="D.certifications[${ci}].name=this.value" />
      <input type="text" value="${escHtml(c.issuer)}" placeholder="Issuer" style="flex:1.5;background:var(--bg3);border:1px solid var(--border);border-radius:8px;padding:0.6rem 0.9rem;color:var(--text2);font-family:inherit;font-size:0.85rem;outline:none;" onchange="D.certifications[${ci}].issuer=this.value" />
      <button class="del-btn" onclick="D.certifications.splice(${ci},1);populateCerts()">✕</button>`;
    el.appendChild(div);
  });
}
function addCert() { D.certifications.push({ name: '', issuer: '' }); populateCerts(); }

function populateAchieves() {
  const el = document.getElementById('achieve-editor'); el.innerHTML = '';
  D.achievements.forEach((a, ai) => {
    const div = document.createElement('div'); div.className = 'list-item';
    div.style.cssText = 'display:flex;align-items:center;gap:0.8rem;margin-bottom:0.8rem;';
    div.innerHTML = `
      <input type="text" value="${escHtml(a.title)}" placeholder="Achievement title" style="flex:1;background:var(--bg3);border:1px solid var(--border);border-radius:8px;padding:0.6rem 0.9rem;color:var(--text);font-family:inherit;font-size:0.88rem;outline:none;" onchange="D.achievements[${ai}].title=this.value" />
      <input type="text" value="${escHtml(a.sub)}" placeholder="Organization / detail" style="flex:1;background:var(--bg3);border:1px solid var(--border);border-radius:8px;padding:0.6rem 0.9rem;color:var(--text2);font-family:inherit;font-size:0.85rem;outline:none;" onchange="D.achievements[${ai}].sub=this.value" />
      <button class="del-btn" onclick="D.achievements.splice(${ai},1);populateAchieves()">✕</button>`;
    el.appendChild(div);
  });
}
function addAchieve() { D.achievements.push({ title: '', sub: '' }); populateAchieves(); }

function populateContact() {
  const c = D.contact;
  document.getElementById('c-email').value = c.email || '';
  document.getElementById('c-phone').value = c.phone || '';
  document.getElementById('c-github').value = c.github || '';
  document.getElementById('c-linkedin').value = c.linkedin || '';
  document.getElementById('c-leetcode').value = c.leetcode || '';
  document.getElementById('c-desc').value = c.desc || '';
  document.getElementById('c-footer').value = D.footer || '';
}

// ─── SAVE ─────────────────────────────────────────────────────────────────
function saveAll() {
  // Hero
  D.hero.name = v('h-name');
  D.hero.badge = v('h-badge');
  D.hero.subtitle = v('h-subtitle');
  D.hero.avatarUrl = v('h-avatar');
  D.hero.btn1Label = v('h-btn1l');
  D.hero.btn1Link = v('h-btn1k');
  D.hero.btn2Label = v('h-btn2l');
  D.hero.btn2Link = v('h-btn2k');
  D.hero.typewords = v('h-typewords').split(',').map(s=>s.trim()).filter(Boolean);
  // About
  D.about.imgUrl = v('a-img');
  D.about.bio = v('a-bio');
  D.about.email = v('a-email');
  D.about.phone = v('a-phone');
  D.about.github = v('a-github');
  D.about.location = v('a-loc');
  // Contact
  D.contact.email = v('c-email');
  D.contact.phone = v('c-phone');
  D.contact.github = v('c-github');
  D.contact.linkedin = v('c-linkedin');
  D.contact.leetcode = v('c-leetcode');
  D.contact.desc = v('c-desc');
  D.footer = v('c-footer');
  // Persist
  localStorage.setItem('portfolioData', JSON.stringify(D));
  populateDash();
  toast('success', '✅ Saved Successfully!', 'Portfolio data updated. Refresh portfolio to see changes.');
}

// ─── RESUME ──────────────────────────────────────────────────────────────
let _currentResumePdfData = '';
let _currentResumePdfName = '';
let _currentResumeSource = 'upload';

function populateResume() {
  const r = D.resume || DEFAULT.resume;
  _currentResumeSource = r.source || 'upload';
  _currentResumePdfData = r.pdfData || '';
  _currentResumePdfName = r.pdfName || '';
  setResumeSource(_currentResumeSource, true);
  const urlInput = document.getElementById('resume-url-input');
  if (urlInput && r.url) urlInput.value = r.url;
  if (r.pdfData && r.pdfName) showFileInfo(r.pdfName, r.pdfData);
  updateResumeStatus(r);
}

function updateResumeStatus(r) {
  const el = document.getElementById('resume-status');
  if (!el) return;
  if ((r.source === 'upload' && r.pdfData) || (r.source === 'url' && r.url)) {
    el.style.display = 'flex';
    el.className = 'resume-status active';
    el.innerHTML = `<span style="color:var(--green);font-weight:700;">✅ Resume is configured</span><span style="color:var(--text3);font-size:0.8rem;">${r.source === 'upload' ? '📄 ' + (r.pdfName || 'PDF uploaded') : '🔗 External URL set'}</span>`;
  } else {
    el.style.display = 'flex';
    el.className = 'resume-status inactive';
    el.innerHTML = `<span style="color:var(--orange);font-weight:700;">⚠️ No resume configured</span><span style="color:var(--text3);font-size:0.8rem;">Upload a PDF or set an external URL above</span>`;
  }
}

function setResumeSource(source, skipReset) {
  _currentResumeSource = source;
  const uploadSection = document.getElementById('resume-upload-section');
  const urlSection = document.getElementById('resume-url-section');
  const btnUpload = document.getElementById('src-btn-upload');
  const btnUrl = document.getElementById('src-btn-url');
  if (!uploadSection) return;
  if (source === 'upload') {
    uploadSection.style.display = '';
    urlSection.style.display = 'none';
    btnUpload.classList.add('active');
    btnUrl.classList.remove('active');
  } else {
    uploadSection.style.display = 'none';
    urlSection.style.display = '';
    btnUpload.classList.remove('active');
    btnUrl.classList.add('active');
  }
}

function handleResumeDragOver(e) {
  e.preventDefault();
  document.getElementById('resume-dropzone').classList.add('drag-over');
}
function handleResumeDragLeave() {
  document.getElementById('resume-dropzone').classList.remove('drag-over');
}
function handleResumeDrop(e) {
  e.preventDefault();
  document.getElementById('resume-dropzone').classList.remove('drag-over');
  if (e.dataTransfer.files[0]) processResumeFile(e.dataTransfer.files[0]);
}
function handleResumeUpload(input) {
  if (input.files && input.files[0]) processResumeFile(input.files[0]);
}

function processResumeFile(file) {
  if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
    toast('error', '❌ Invalid File Type', 'Only PDF files are supported');
    return;
  }
  const maxBytes = 3 * 1024 * 1024;
  if (file.size > maxBytes) {
    toast('error', '❌ File Too Large', `Max 3MB. Your file is ${(file.size/1024/1024).toFixed(1)}MB`);
    return;
  }
  const reader = new FileReader();
  reader.onload = function(e) {
    _currentResumePdfData = e.target.result;
    _currentResumePdfName = file.name;
    showFileInfo(file.name, e.target.result, file.size);
    toast('success', '📄 PDF Loaded!', `"${file.name}" ready. Click "Save Resume" to apply.`);
  };
  reader.readAsDataURL(file);
}

function showFileInfo(name, data, sizeBytes) {
  const dropzone = document.getElementById('resume-dropzone');
  const infoEl = document.getElementById('resume-file-info');
  if (dropzone) dropzone.style.display = 'none';
  if (infoEl) {
    infoEl.style.display = 'flex';
    document.getElementById('resume-file-name').textContent = name;
    let label = '';
    if (sizeBytes) {
      label = sizeBytes >= 1024*1024 ? (sizeBytes/1024/1024).toFixed(2)+' MB' : Math.round(sizeBytes/1024)+' KB';
    } else if (data) {
      const approx = Math.round(data.length * 0.75);
      label = approx >= 1024*1024 ? (approx/1024/1024).toFixed(2)+' MB' : Math.round(approx/1024)+' KB';
    }
    document.getElementById('resume-file-size').textContent = label;
  }
}

function removeResume() {
  if (!confirm('Remove the uploaded resume PDF?')) return;
  _currentResumePdfData = '';
  _currentResumePdfName = '';
  const infoEl = document.getElementById('resume-file-info');
  const dropzone = document.getElementById('resume-dropzone');
  if (infoEl) infoEl.style.display = 'none';
  if (dropzone) dropzone.style.display = 'flex';
  const input = document.getElementById('resume-file-input');
  if (input) input.value = '';
  toast('success', '🗑 Resume Removed', 'Click "Save Resume" to apply changes.');
}

function previewResume() {
  const data = _currentResumePdfData || (D.resume && D.resume.pdfData);
  if (!data) { toast('error', '❌ No PDF', 'No PDF file loaded'); return; }
  const blob = dataURLToBlob(data);
  window.open(URL.createObjectURL(blob), '_blank');
}

function previewResumeUrl() {
  const url = (document.getElementById('resume-url-input').value || '').trim();
  if (!url) { toast('error', '❌ No URL', 'Please enter a URL first'); return; }
  window.open(url, '_blank');
}

function saveResume() {
  if (!D.resume) D.resume = {};
  D.resume.source = _currentResumeSource;
  if (_currentResumeSource === 'upload') {
    if (_currentResumePdfData) {
      D.resume.pdfData = _currentResumePdfData;
      D.resume.pdfName = _currentResumePdfName;
    }
    D.resume.url = '';
  } else {
    D.resume.url = (document.getElementById('resume-url-input').value || '').trim();
    D.resume.pdfData = '';
    D.resume.pdfName = '';
  }
  try {
    localStorage.setItem('portfolioData', JSON.stringify(D));
    updateResumeStatus(D.resume);
    toast('success', '✅ Resume Saved!', 'Refresh your portfolio to see the resume buttons.');
  } catch(e) {
    if (e.name === 'QuotaExceededError') {
      toast('error', '❌ Storage Full', 'PDF too large. Use External URL mode instead.');
    } else {
      toast('error', '❌ Save Failed', e.message);
    }
  }
}

function dataURLToBlob(dataURL) {
  const arr = dataURL.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]); let n = bstr.length;
  const u8 = new Uint8Array(n);
  while(n--) u8[n] = bstr.charCodeAt(n);
  return new Blob([u8], { type: mime });
}

// ─── SETTINGS ─────────────────────────────────────────────────────────────
function changePassword() {
  const cur = document.getElementById('s-current').value;
  const nw = document.getElementById('s-new').value;
  const cn = document.getElementById('s-confirm').value;
  if (cur !== getAdminPw()) { toast('error','❌ Wrong current password',''); return; }
  if (!nw || nw.length < 4) { toast('error','❌ Password too short','Min 4 characters required'); return; }
  if (nw !== cn) { toast('error','❌ Passwords do not match',''); return; }
  localStorage.setItem('adminPw', nw);
  document.getElementById('s-current').value = '';
  document.getElementById('s-new').value = '';
  document.getElementById('s-confirm').value = '';
  toast('success','✅ Password updated!','Your new password is active');
}

function resetData() {
  if (!confirm('Reset all portfolio data to defaults? This cannot be undone.')) return;
  localStorage.removeItem('portfolioData');
  D = JSON.parse(JSON.stringify(DEFAULT));
  populateAll();
  toast('success','🔄 Data Reset','All portfolio data restored to defaults');
}

// ─── HELPERS ──────────────────────────────────────────────────────────────
function v(id) { const el = document.getElementById(id); return el ? el.value : ''; }
function escHtml(str) { return String(str||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

// ─── TOAST ────────────────────────────────────────────────────────────────
let toastTimer;
function toast(type, msg, sub) {
  const t = document.getElementById('toast');
  document.getElementById('toast-msg').textContent = msg;
  document.getElementById('toast-sub').textContent = sub || '';
  document.getElementById('toast-icon').textContent = type === 'success' ? '✅' : '❌';
  t.className = `show ${type}`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { t.className = type; }, 3500);
}

// ─── IMAGE UPLOADS ────────────────────────────────────────────────────────
function handleAvatarUpload(input) {
  if (input.files && input.files[0]) {
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById('h-avatar').value = e.target.result;
      toast('success', '📁 Avatar Uploaded!', 'Click "Save All" to save your profile picture');
    };
    reader.readAsDataURL(file);
  }
}

function handleAboutUpload(input) {
  if (input.files && input.files[0]) {
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById('a-img').value = e.target.result;
      toast('success', '📁 Photo Uploaded!', 'Click "Save All" to save your About picture');
    };
    reader.readAsDataURL(file);
  }
}

function initAdmin() {
  if (!document.getElementById('login-screen') && !document.getElementById('admin-app')) return;
  const pwInput = document.getElementById('pw-input');
  if (pwInput) {
    pwInput.addEventListener('keydown', e => { if (e.key === 'Enter') doLogin(); });
  }
  if (sessionStorage.getItem('adminLoggedIn') === 'true') {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('admin-app').classList.add('visible');
    populateAll();
  }
}

initAdmin();
