// ─── INTERACTIVE COSMIC VORTEX & FLUID FLOW FIELD ANIMATION ───────────

(function() {
  // Disable on touchscreen-only devices to preserve mobile usability and battery life
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouchDevice) return;

  const hero = document.getElementById('hero');
  if (!hero) return;

  // 1. Background Canvas for Fluid Flow Field in Hero
  const bgCanvas = document.createElement('canvas');
  bgCanvas.id = 'bg-canvas';
  bgCanvas.style.position = 'absolute';
  bgCanvas.style.top = '0';
  bgCanvas.style.left = '0';
  bgCanvas.style.width = '100%';
  bgCanvas.style.height = '100%';
  bgCanvas.style.pointerEvents = 'none';
  bgCanvas.style.zIndex = '0';
  
  // Remove old canvas if exists
  const oldBg = document.getElementById('bg-canvas');
  if (oldBg) oldBg.remove();
  
  hero.appendChild(bgCanvas);

  // 2. Foreground Canvas for Singular Cursor Vortex
  const cursorCanvas = document.createElement('canvas');
  cursorCanvas.id = 'cursor-canvas';
  cursorCanvas.style.position = 'fixed';
  cursorCanvas.style.top = '0';
  cursorCanvas.style.left = '0';
  cursorCanvas.style.width = '100%';
  cursorCanvas.style.height = '100%';
  cursorCanvas.style.pointerEvents = 'none';
  cursorCanvas.style.zIndex = '999999';

  const oldCursor = document.getElementById('cursor-canvas');
  if (oldCursor) oldCursor.remove();

  document.body.appendChild(cursorCanvas);

  // Set up custom cursor hiding CSS
  const style = document.createElement('style');
  style.innerHTML = `
    @media (hover: hover) {
      body, a, button, select, textarea, input, .social-icon, .contact-card, .project-card, .btn-primary, .btn-outline, .btn-resume, .btn-resume-view, .btn-resume-dl, .nav-resume-btn, .nav-hamburger, .nav-links a {
        cursor: none !important;
      }
    }
  `;
  document.head.appendChild(style);

  const bgCtx = bgCanvas.getContext('2d');
  const cursorCtx = cursorCanvas.getContext('2d');

  let width = hero.offsetWidth;
  let height = hero.offsetHeight;
  let winW = window.innerWidth;
  let winH = window.innerHeight;

  function resize() {
    width = hero.offsetWidth;
    height = hero.offsetHeight;
    winW = window.innerWidth;
    winH = window.innerHeight;
    
    bgCanvas.width = width;
    bgCanvas.height = height;
    
    cursorCanvas.width = winW;
    cursorCanvas.height = winH;
  }
  window.addEventListener('resize', resize);
  resize();

  // Mouse coordinate states
  const mouse = { x: winW / 2, y: winH / 2, tx: winW / 2, ty: winH / 2, speed: 0 };
  const cursor = { x: winW / 2, y: winH / 2, vx: 0, vy: 0 };
  let lastMouseX = winW / 2;
  let lastMouseY = winH / 2;

  // Hover state
  let hoveredElement = null;
  let hoverRect = null;
  let magnetActive = false;

  window.addEventListener('mousemove', (e) => {
    mouse.tx = e.clientX;
    mouse.ty = e.clientY;

    const dx = mouse.tx - lastMouseX;
    const dy = mouse.ty - lastMouseY;
    mouse.speed = Math.sqrt(dx*dx + dy*dy);
    lastMouseX = mouse.tx;
    lastMouseY = mouse.ty;

    const target = e.target;
    const interactive = target.closest('a, button, .social-icon, .contact-card, .project-card, .nav-links a');
    if (interactive) {
      hoveredElement = interactive;
      hoverRect = interactive.getBoundingClientRect();
      magnetActive = true;
    } else {
      hoveredElement = null;
      hoverRect = null;
      magnetActive = false;
    }
  });

  // Shockwave expansion on click
  const shockwaves = [];
  window.addEventListener('mousedown', (e) => {
    const rect = hero.getBoundingClientRect();
    if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
      shockwaves.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        radius: 0,
        maxRadius: 280,
        speed: 6.5,
        force: 12
      });
    }
  });

  // ─── BACKGROUND FLUID FLOW FIELD ─────────────────────────────────────
  const particles = [];
  const particleCount = 180; // High density flowing points
  let time = 0;

  // Initialize background flow particles
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: 0,
      vy: 0,
      speed: Math.random() * 1.5 + 0.8,
      life: Math.random() * 200 + 100,
      maxLife: 300,
      size: Math.random() * 1.2 + 0.8,
      colorIndex: Math.floor(Math.random() * 3) // 0: Purple, 1: Cyan, 2: Indigo
    });
  }

  const colors = [
    'rgba(109, 40, 217, 0.25)',  // purple
    'rgba(6, 182, 212, 0.25)',   // cyan
    'rgba(99, 102, 241, 0.25)'   // indigo
  ];

  function updateFlowField() {
    time += 0.003;
    const heroRect = hero.getBoundingClientRect();
    const mouseHeroX = mouse.tx - heroRect.left;
    const mouseHeroY = mouse.ty - heroRect.top;

    particles.forEach(p => {
      p.life--;

      // 1. Math-based Flow Field Vectors (Wave currents)
      // Generates organic flowing paths utilizing sine & cosine grids
      const flowAngle = Math.sin(p.x * 0.005 + time) * Math.cos(p.y * 0.004 - time) * Math.PI * 2.5;
      
      let ax = Math.cos(flowAngle) * 0.06;
      let ay = Math.sin(flowAngle) * 0.06;

      // 2. Black Hole Vortex Pull near cursor
      const dx = mouseHeroX - p.x;
      const dy = mouseHeroY - p.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      const vortexRadius = 220;

      if (dist < vortexRadius) {
        const pull = (vortexRadius - dist) / vortexRadius;
        
        // Gravitational suction toward center
        ax += (dx / dist) * pull * 0.35;
        ay += (dy / dist) * pull * 0.35;

        // Circular spiral force (accretion swirl)
        const spiralAngle = Math.atan2(dy, dx) + Math.PI / 1.7; // Angle slightly offset from 90deg to spiral inward
        ax += Math.cos(spiralAngle) * pull * 0.65;
        ay += Math.sin(spiralAngle) * pull * 0.65;
      }

      // 3. Shockwave force repulsion
      shockwaves.forEach(wave => {
        const wdx = p.x - wave.x;
        const wdy = p.y - wave.y;
        const wdist = Math.sqrt(wdx*wdx + wdy*wdy);

        if (Math.abs(wdist - wave.radius) < 40) {
          const pushForce = (1 - Math.abs(wdist - wave.radius) / 40) * wave.force * 0.08;
          ax += (wdx / wdist) * pushForce;
          ay += (wdy / wdist) * pushForce;
        }
      });

      // Update velocities
      p.vx += ax;
      p.vy += ay;

      // Limit speed
      const speed = Math.sqrt(p.vx*p.vx + p.vy*p.vy);
      const maxSpeed = dist < vortexRadius ? 6 : p.speed;
      if (speed > maxSpeed) {
        p.vx = (p.vx / speed) * maxSpeed;
        p.vy = (p.vy / speed) * maxSpeed;
      }

      // Apply drag friction
      p.vx *= 0.94;
      p.vy *= 0.94;

      // Move particle
      p.x += p.vx;
      p.y += p.vy;

      // Wrap edges or respawn on death
      if (p.x < 0 || p.x > width || p.y < 0 || p.y > height || p.life <= 0) {
        p.x = Math.random() * width;
        p.y = Math.random() * height;
        p.vx = 0;
        p.vy = 0;
        p.life = Math.random() * 200 + 100;
      }
    });

    // Update shockwaves
    for (let i = shockwaves.length - 1; i >= 0; i--) {
      const wave = shockwaves[i];
      wave.radius += wave.speed;
      if (wave.radius > wave.maxRadius) {
        shockwaves.splice(i, 1);
      }
    }
  }

  function drawFlowField() {
    // Semi-transparent clearing creates beautiful fading trails (motion blur)
    bgCtx.fillStyle = 'rgba(248, 250, 252, 0.095)'; // Matches --bg #f8fafc with opacity
    bgCtx.fillRect(0, 0, width, height);

    // Draw active shockwave ripples
    shockwaves.forEach(wave => {
      const alpha = (1 - wave.radius / wave.maxRadius) * 0.2;
      bgCtx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
      bgCtx.lineWidth = 1.5;
      bgCtx.beginPath();
      bgCtx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
      bgCtx.stroke();
    });

    // Draw particles
    particles.forEach(p => {
      const alpha = Math.min(1, p.life / 30) * 0.75;
      bgCtx.fillStyle = colors[p.colorIndex].replace('0.25', alpha);
      bgCtx.beginPath();
      bgCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      bgCtx.fill();
    });
  }


  // ─── SINGULAR SINGULARITY CURSOR VORTEX ───────────────────────────────
  const orbitalCount = 8;
  const orbitalParticles = [];

  for (let i = 0; i < orbitalCount; i++) {
    orbitalParticles.push({
      angle: (i / orbitalCount) * Math.PI * 2,
      speed: 0.06 + Math.random() * 0.03,
      radius: 12 + Math.random() * 6,
      size: Math.random() * 1.5 + 1.0,
      color: i % 2 === 0 ? '#6d28d9' : '#0891b2'
    });
  }

  let auraPulse = 0;

  function updateCursorVortex() {
    let targetX = mouse.tx;
    let targetY = mouse.ty;

    if (magnetActive && hoverRect) {
      targetX = hoverRect.left + hoverRect.width / 2;
      targetY = hoverRect.top + hoverRect.height / 2;
    }

    // Smooth physics ease for cursor position
    cursor.vx += (targetX - cursor.x) * 0.26;
    cursor.vy += (targetY - cursor.y) * 0.26;
    cursor.vx *= 0.58;
    cursor.vy *= 0.58;
    cursor.x += cursor.vx;
    cursor.y += cursor.vy;

    // Update cursor's high-speed orbiting shell
    orbitalParticles.forEach(p => {
      // Speed up rotation when hovering (accretion disc)
      p.angle += magnetActive ? p.speed * 2.2 : p.speed;
    });

    // Pulsing aura radius
    auraPulse = Math.sin(Date.now() * 0.005) * 4 + 18;
  }

  function drawCursorVortex() {
    cursorCtx.clearRect(0, 0, winW, winH);

    // 1. Draw glowing liquid aura under singularity
    const glowRad = magnetActive ? Math.max(hoverRect.width, hoverRect.height) * 0.7 : auraPulse;
    const gradient = cursorCtx.createRadialGradient(cursor.x, cursor.y, 1, cursor.x, cursor.y, glowRad);
    
    if (magnetActive) {
      gradient.addColorStop(0, 'rgba(8, 145, 178, 0.22)');
      gradient.addColorStop(0.5, 'rgba(109, 40, 217, 0.08)');
      gradient.addColorStop(1, 'rgba(109, 40, 217, 0)');
    } else {
      gradient.addColorStop(0, 'rgba(109, 40, 217, 0.16)');
      gradient.addColorStop(0.6, 'rgba(8, 145, 178, 0.04)');
      gradient.addColorStop(1, 'rgba(8, 145, 178, 0)');
    }
    
    cursorCtx.fillStyle = gradient;
    cursorCtx.beginPath();
    cursorCtx.arc(cursor.x, cursor.y, glowRad, 0, Math.PI * 2);
    cursorCtx.fill();

    // 2. Draw Magnetic snap visual boundary
    if (magnetActive && hoverRect) {
      // Draw a sleek liquid border tracing the button
      cursorCtx.strokeStyle = 'rgba(8, 145, 178, 0.35)';
      cursorCtx.lineWidth = 1.5;
      
      // Accretion disk boundary box
      const padding = 8;
      const cornerLength = 12;
      const rx = cursor.x - hoverRect.width / 2 - padding;
      const ry = cursor.y - hoverRect.height / 2 - padding;
      const rw = hoverRect.width + padding * 2;
      const rh = hoverRect.height + padding * 2;

      // Draw sleek sci-fi corner brackets instead of boring boxes
      cursorCtx.beginPath();
      // Top Left Corner
      cursorCtx.moveTo(rx + cornerLength, ry); cursorCtx.lineTo(rx, ry); cursorCtx.lineTo(rx, ry + cornerLength);
      // Top Right Corner
      cursorCtx.moveTo(rx + rw - cornerLength, ry); cursorCtx.lineTo(rx + rw, ry); cursorCtx.lineTo(rx + rw, ry + cornerLength);
      // Bottom Left Corner
      cursorCtx.moveTo(rx, ry + rh - cornerLength); cursorCtx.lineTo(rx, ry + rh); cursorCtx.lineTo(rx + cornerLength, ry + rh);
      // Bottom Right Corner
      cursorCtx.moveTo(rx + rw - cornerLength, ry + rh); cursorCtx.lineTo(rx + rw, ry + rh); cursorCtx.lineTo(rx + rw, ry + rh - cornerLength);
      cursorCtx.stroke();
    }

    // 3. Draw high-speed orbital particles
    orbitalParticles.forEach(p => {
      let rad = p.radius;
      if (magnetActive && hoverRect) {
        // Expand orbits around snapped button
        rad = Math.max(hoverRect.width, hoverRect.height) * 0.58 + Math.sin(p.angle * 2) * 5;
      }

      const px = cursor.x + Math.cos(p.angle) * rad;
      const py = cursor.y + Math.sin(p.angle) * rad;

      cursorCtx.fillStyle = p.color;
      cursorCtx.beginPath();
      cursorCtx.arc(px, py, p.size, 0, Math.PI * 2);
      cursorCtx.fill();
    });

    // 4. Central gravitational singularity core
    cursorCtx.fillStyle = magnetActive ? '#0891b2' : '#6d28d9';
    cursorCtx.shadowBlur = magnetActive ? 12 : 8;
    cursorCtx.shadowColor = magnetActive ? '#0891b2' : '#6d28d9';
    
    cursorCtx.beginPath();
    cursorCtx.arc(cursor.x, cursor.y, magnetActive ? 2.5 : 3.5, 0, Math.PI * 2);
    cursorCtx.fill();
    
    cursorCtx.shadowBlur = 0; // reset
  }

  // ─── MAIN LOOP ─────────────────────────────────────────────────────────
  function loop() {
    updateFlowField();
    drawFlowField();

    updateCursorVortex();
    drawCursorVortex();

    requestAnimationFrame(loop);
  }
  loop();
})();
