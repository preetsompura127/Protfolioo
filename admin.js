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
    linkedin: "https://linkedin.com/in/preet-sompura",
    leetcode: "https://leetcode.com/preetsompura",
    desc: "I'm open to internship opportunities, collaborations, and exciting projects. Let's build something amazing together!"
  },
  resume: {
    source: "upload",
    url: "",
    pdfName: "",
    pdfData: ""
  },
  footer: "\u00a9 2026 <strong>Preet Sompura</strong>. Crafted with passion & a lot of coffee \u2615"
};

// ─── STATE ────────────────────────────────────────────────────────────────
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

// Update old unsplash URLs to our custom photo path on load if found
if (D && D.about && (D.about.imgUrl.includes("unsplash.com") || !D.about.imgUrl)) {
  D.about.imgUrl = "png/WhatsApp Image 2026-05-12 at 8.48.22 PM (1).jpeg";
  try {
    localStorage.setItem('portfolioData', JSON.stringify(D));
  } catch(e) {}
}

// ─── AUTH ─────────────────────────────────────────────────────────────────
function doLogin() {
  const val = document.getElementById('pw-input').value;
  if (val === getAdminPw()) {
    sessionStorage.setItem('adminLoggedIn', 'true'); // Save session state
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

document.getElementById('pw-input').addEventListener('keydown', e => { if (e.key === 'Enter') doLogin(); });

function doLogout() { 
  sessionStorage.removeItem('adminLoggedIn'); // Clear session state
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
  populateGitHubSettings();
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
  if (name === null) return; // User clicked Cancel
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
async function saveAll() {
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
  // Persist locally as fallback
  localStorage.setItem('portfolioData', JSON.stringify(D));
  
  const jsContent = `const portfolioData = ${JSON.stringify(D, null, 2)};`;

  // Check if GitHub deploy credentials exist
  const gUser = localStorage.getItem('gitUser');
  const gRepo = localStorage.getItem('gitRepo');
  const gBranch = localStorage.getItem('gitBranch') || 'main';
  const gToken = localStorage.getItem('gitToken');

  if (gUser && gRepo && gToken) {
    toast('success', '⏳ Committing to GitHub...', 'Uploading data.js. Vercel deployment will start shortly...');
    try {
      // 1. Fetch current file to get SHA (needed for updating files in GitHub API)
      const url = `https://api.github.com/repos/${gUser}/${gRepo}/contents/data.js?ref=${gBranch}`;
      const res = await fetch(url, {
        headers: { 'Authorization': `token ${gToken}` }
      });
      
      let sha = null;
      if (res.ok) {
        const fileInfo = await res.json();
        sha = fileInfo.sha;
      }
      
      // Base64 encoding function supporting Unicode/UTF-8
      const b64Content = btoa(unescape(encodeURIComponent(jsContent)));

      // 2. Commit/Write file to GitHub repository
      const putRes = await fetch(`https://api.github.com/repos/${gUser}/${gRepo}/contents/data.js`, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${gToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: 'Update portfolioData from Admin Panel',
          content: b64Content,
          sha: sha,
          branch: gBranch
        })
      });

      if (putRes.ok) {
        toast('success', '🚀 Saved & Pushed successfully!', 'Vercel is building the site now. Live in 1-2 minutes.');
        populateDash();
        return;
      } else {
        const errData = await putRes.json();
        console.error("GitHub write error:", errData);
        toast('error', '❌ GitHub Commit Failed', 'Downloaded fallback data.js file instead.');
      }
    } catch (err) {
      console.error("GitHub API Connection Error:", err);
      toast('error', '❌ GitHub Connection Failed', 'Downloaded fallback data.js file instead.');
    }
  }

  // Fallback trigger download of updated data.js file to store statically in local files
  const blob = new Blob([jsContent], { type: 'application/javascript;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'data.js';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  toast('success', '💾 Saved & Downloaded data.js!', 'Replace the old data.js file in your portfolio folder with this newly downloaded file to save permanently.');
  populateDash();
}

// ─── RESUME ────────────────────────────────────────────────────────────────
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
    el.innerHTML = `<span style="color:var(--green);font-weight:700;">\u2705 Resume is configured</span><span style="color:var(--text3);font-size:0.8rem;">${r.source === 'upload' ? '\ud83d\udcc4 ' + (r.pdfName || 'PDF uploaded') : '\ud83d\udd17 External URL set'}</span>`;
  } else {
    el.style.display = 'flex';
    el.className = 'resume-status inactive';
    el.innerHTML = `<span style="color:var(--orange);font-weight:700;">\u26a0\ufe0f No resume configured</span><span style="color:var(--text3);font-size:0.8rem;">Upload a PDF or set an external URL above</span>`;
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
  
  toast('success', '⏳ Loading PDF...', 'Please wait...');
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
    } else if (data && data.startsWith('data:')) {
      const approx = Math.round(data.length * 0.75);
      label = approx >= 1024*1024 ? (approx/1024/1024).toFixed(2)+' MB' : Math.round(approx/1024)+' KB';
    } else {
      label = 'Local Static File';
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
  toast('success', '\ud83d\uddd1 Resume Removed', 'Click "Save Resume" to apply changes.');
}

function previewResume() {
  const data = _currentResumePdfData || (D.resume && D.resume.pdfData);
  if (!data) { toast('error', '❌ No PDF', 'No PDF file loaded'); return; }
  if (data.startsWith('/uploads/') || data.startsWith('http') || data.startsWith('data:') === false) {
    window.open(data, '_blank');
  } else {
    const blob = dataURLToBlob(data);
    window.open(URL.createObjectURL(blob), '_blank');
  }
}

function previewResumeUrl() {
  const url = (document.getElementById('resume-url-input').value || '').trim();
  if (!url) { toast('error', '\u274c No URL', 'Please enter a URL first'); return; }
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
    toast('success', '\u2705 Resume Saved!', 'Refresh your portfolio to see the resume buttons.');
  } catch(e) {
    if (e.name === 'QuotaExceededError') {
      toast('error', '\u274c Storage Full', 'PDF too large. Use External URL mode instead.');
    } else {
      toast('error', '\u274c Save Failed', e.message);
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

// ─── GITHUB SETTINGS ──────────────────────────────────────────────────────
function saveGitHubSettings() {
  const user = document.getElementById('g-user').value.trim();
  const repo = document.getElementById('g-repo').value.trim();
  const branch = document.getElementById('g-branch').value.trim() || 'main';
  const token = document.getElementById('g-token').value.trim();
  
  localStorage.setItem('gitUser', user);
  localStorage.setItem('gitRepo', repo);
  localStorage.setItem('gitBranch', branch);
  if (token) {
    localStorage.setItem('gitToken', token);
  }
  toast('success', '🚀 GitHub Settings Saved!', 'Your changes will commit automatically upon saving.');
}

function populateGitHubSettings() {
  const user = localStorage.getItem('gitUser') || '';
  const repo = localStorage.getItem('gitRepo') || '';
  const branch = localStorage.getItem('gitBranch') || 'main';
  const token = localStorage.getItem('gitToken') || '';
  
  if (document.getElementById('g-user')) document.getElementById('g-user').value = user;
  if (document.getElementById('g-repo')) document.getElementById('g-repo').value = repo;
  if (document.getElementById('g-branch')) document.getElementById('g-branch').value = branch;
  if (document.getElementById('g-token')) document.getElementById('g-token').value = token;
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
      toast('success', '📁 Avatar Loaded!', 'Click "Save All" to save your profile picture');
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
      toast('success', '📁 Photo Loaded!', 'Click "Save All" to save your About picture');
    };
    reader.readAsDataURL(file);
  }
}

// ─── DOM CONTENT LOADED (Session persistence check) ──────────────────────
window.addEventListener('DOMContentLoaded', () => {
  if (sessionStorage.getItem('adminLoggedIn') === 'true') {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('admin-app').classList.add('visible');
    populateAll();
  }
});
