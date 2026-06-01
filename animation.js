// ─── INTERACTIVE QUANTUM SWARM CURSOR & GRAVITY MESH WITH SOUNDS ───────

(function() {
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  const hero = document.getElementById('hero');
  if (!hero) return;

  // ─── AUDIO SYNTHESIS SYSTEM (WEB AUDIO API) ───────────────────────────
  let welcomePlayed = false;

  // 1. Futuristic rising ambient startup hum (on first screen interaction)
  function playWelcomeSound() {
    if (welcomePlayed) return;
    welcomePlayed = true;

    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc1 = audioCtx.createOscillator();
      const osc2 = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      // Low ambient hum rise
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(80, audioCtx.currentTime);
      osc1.frequency.exponentialRampToValueAtTime(220, audioCtx.currentTime + 0.7);

      // Higher-pitched chime chord rise
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(330, audioCtx.currentTime);
      osc2.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.6);

      // Soft volume envelope (attack and decay)
      gainNode.gain.setValueAtTime(0.001, audioCtx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.08, audioCtx.currentTime + 0.15); // soft peak
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.7);

      osc1.start(audioCtx.currentTime);
      osc2.start(audioCtx.currentTime);

      osc1.stop(audioCtx.currentTime + 0.7);
      osc2.stop(audioCtx.currentTime + 0.7);
    } catch (e) {
      console.warn("Web Audio Welcome failed to initialize:", e);
    }
  }

  // 2. Crisp futuristic UI click chime (on clicking buttons and links)
  function playClickSound() {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1500, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(700, audioCtx.currentTime + 0.08);

      gainNode.gain.setValueAtTime(0.06, audioCtx.currentTime); // subtle click
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);

      osc.start(audioCtx.currentTime);
      osc.stop(audioCtx.currentTime + 0.08);
    } catch (e) {
      console.warn("Web Audio Click failed:", e);
    }
  }

  // 3. Low-frequency deep sub-bass shockwave rumble (on background ripples)
  function playRippleSound() {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(35, audioCtx.currentTime + 0.45);

      gainNode.gain.setValueAtTime(0.12, audioCtx.currentTime); // solid sub-bass
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.45);

      osc.start(audioCtx.currentTime);
      osc.stop(audioCtx.currentTime + 0.45);
    } catch (e) {
      console.warn("Web Audio Ripple failed:", e);
    }
  }

  // ─── CANVAS CREATION ──────────────────────────────────────────────────
  // 1. Create Background Canvas (Mesh Network) inside Hero Section
  const bgCanvas = document.createElement('canvas');
  bgCanvas.id = 'bg-canvas';
  bgCanvas.style.position = 'absolute';
  bgCanvas.style.top = '0';
  bgCanvas.style.left = '0';
  bgCanvas.style.width = '100%';
  bgCanvas.style.height = '100%';
  bgCanvas.style.pointerEvents = 'none';
  bgCanvas.style.zIndex = '0';
  
  // Remove old Vanta background placeholder if exists
  const oldVanta = document.getElementById('vanta-bg');
  if (oldVanta) oldVanta.remove();
  
  hero.appendChild(bgCanvas);

  // 2. Create Foreground Canvas (Interactive Cursor) globally ONLY for non-touch devices
  let cursorCanvas = null;
  let cursorCtx = null;

  if (!isTouchDevice) {
    cursorCanvas = document.createElement('canvas');
    cursorCanvas.id = 'cursor-canvas';
    cursorCanvas.style.position = 'fixed';
    cursorCanvas.style.top = '0';
    cursorCanvas.style.left = '0';
    cursorCanvas.style.width = '100%';
    cursorCanvas.style.height = '100%';
    cursorCanvas.style.pointerEvents = 'none';
    cursorCanvas.style.zIndex = '999999';
    document.body.appendChild(cursorCanvas);
    cursorCtx = cursorCanvas.getContext('2d');

    // Hide default cursor in CSS on hover-capable devices
    const style = document.createElement('style');
    style.innerHTML = `
      @media (hover: hover) {
        body, a, button, select, textarea, input, .social-icon, .contact-card, .project-card, .btn-primary, .btn-outline, .btn-resume, .btn-resume-view, .btn-resume-dl, .nav-resume-btn, .nav-hamburger, .nav-links a {
          cursor: none !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  const bgCtx = bgCanvas.getContext('2d');

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
    
    if (cursorCanvas) {
      cursorCanvas.width = winW;
      cursorCanvas.height = winH;
    }
  }
  window.addEventListener('resize', resize);
  resize();

  // Coordinates
  const mouse = { x: winW / 2, y: winH / 2, tx: winW / 2, ty: winH / 2, speed: 0 };
  const cursor = { x: winW / 2, y: winH / 2, vx: 0, vy: 0 };
  let lastMouseX = winW / 2;
  let lastMouseY = winH / 2;

  // Touch State for Mobile
  let touchActive = false;

  // Magnetic Hover State for Desktop
  let hoveredElement = null;
  let hoverRect = null;
  let magnetActive = false;
  const shockwaves = [];

  // ─── INTERACTION EVENT LISTENERS ───────────────────────────────────────
  if (!isTouchDevice) {
    // Desktop Mouse Move listener
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

    // Desktop Click listener (handles click sound triggers & welcome chords)
    window.addEventListener('mousedown', (e) => {
      playWelcomeSound();

      const interactive = e.target.closest('a, button, .social-icon, .contact-card, .project-card, .nav-links a');
      if (interactive) {
        playClickSound();
      } else {
        // Trigger ripple and sub-bass shockwave sound inside hero
        const rect = hero.getBoundingClientRect();
        if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
          const heroX = e.clientX - rect.left;
          const heroY = e.clientY - rect.top;
          shockwaves.push({
            x: heroX,
            y: heroY,
            radius: 0,
            maxRadius: 300,
            speed: 7,
            force: 18
          });
          playRippleSound();
        }
      }
    });
  } else {
    // Mobile Touch interaction listener
    window.addEventListener('touchstart', (e) => {
      playWelcomeSound();

      if (e.touches && e.touches[0]) {
        touchActive = true;
        const t = e.touches[0];
        mouse.tx = t.clientX;
        mouse.ty = t.clientY;

        const interactive = t.target.closest('a, button, .social-icon, .contact-card, .project-card, .nav-links a');
        if (interactive) {
          playClickSound();
        } else {
          // Trigger mobile touch ripple and sub-bass sound
          const rect = hero.getBoundingClientRect();
          if (t.clientX >= rect.left && t.clientX <= rect.right && t.clientY >= rect.top && t.clientY <= rect.bottom) {
            const heroX = t.clientX - rect.left;
            const heroY = t.clientY - rect.top;
            shockwaves.push({
              x: heroX,
              y: heroY,
              radius: 0,
              maxRadius: 180,
              speed: 5,
              force: 12
            });
            playRippleSound();
          }
        }
      }
    });

    window.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches[0]) {
        touchActive = true;
        const t = e.touches[0];
        mouse.tx = t.clientX;
        mouse.ty = t.clientY;
      }
    });

    window.addEventListener('touchend', () => {
      touchActive = false;
    });
  }

  // ─── BG GRAVITY MESH NETWORK ───────────────────────────────────────────
  const nodes = [];
  const nodeCount = isTouchDevice ? 32 : 75;

  for (let i = 0; i < nodeCount; i++) {
    nodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      x0: Math.random() * width,
      y0: Math.random() * height,
      vx: 0,
      vy: 0,
      radius: Math.random() * 2 + (isTouchDevice ? 1.0 : 1.2),
      angle: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.4 + 0.15,
    });
  }

  function updateBgNodes() {
    const heroRect = hero.getBoundingClientRect();
    const mouseHeroX = mouse.tx - heroRect.left;
    const mouseHeroY = mouse.ty - heroRect.top;

    nodes.forEach(node => {
      // 1. Idle float drift
      node.angle += node.speed * 0.015;
      node.x0 = (node.x0 + Math.cos(node.angle) * 0.15 + width) % width;
      node.y0 = (node.y0 + Math.sin(node.angle) * 0.15 + height) % height;

      let targetX = node.x0;
      let targetY = node.y0;

      // 2. Gravitational warp from cursor/finger touch
      if (!isTouchDevice || touchActive) {
        const dx = mouseHeroX - node.x;
        const dy = mouseHeroY - node.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        const gravityRadius = isTouchDevice ? 150 : 250;

        if (dist < gravityRadius) {
          const strength = (gravityRadius - dist) / gravityRadius;
          targetX -= (dx / dist) * strength * (isTouchDevice ? 45 : 90);
          targetY -= (dy / dist) * strength * (isTouchDevice ? 45 : 90);
        }
      }

      // 3. Click/Touch shockwaves
      shockwaves.forEach(wave => {
        const wdx = node.x - wave.x;
        const wdy = node.y - wave.y;
        const wdist = Math.sqrt(wdx*wdx + wdy*wdy);
        
        if (Math.abs(wdist - wave.radius) < 30) {
          const pushForce = (1 - Math.abs(wdist - wave.radius) / 30) * wave.force;
          targetX += (wdx / wdist) * pushForce;
          targetY += (wdy / wdist) * pushForce;
        }
      });

      // Physics interpolation
      node.vx += (targetX - node.x) * 0.06;
      node.vy += (targetY - node.y) * 0.06;
      node.vx *= 0.85;
      node.vy *= 0.85;
      node.x += node.vx;
      node.y += node.vy;
    });

    // Update active click shockwaves
    for (let i = shockwaves.length - 1; i >= 0; i--) {
      const wave = shockwaves[i];
      wave.radius += wave.speed;
      if (wave.radius > wave.maxRadius) {
        shockwaves.splice(i, 1);
      }
    }
  }

  function drawBgMesh() {
    bgCtx.clearRect(0, 0, width, height);

    // Draw mesh connection lines
    bgCtx.lineWidth = isTouchDevice ? 0.55 : 0.75;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        const maxDist = isTouchDevice ? 100 : 130;

        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * (isTouchDevice ? 0.09 : 0.12);
          bgCtx.strokeStyle = `rgba(109, 40, 217, ${alpha})`;
          bgCtx.beginPath();
          bgCtx.moveTo(nodes[i].x, nodes[i].y);
          bgCtx.lineTo(nodes[j].x, nodes[j].y);
          bgCtx.stroke();
        }
      }
    }

    // Draw active shockwave ripples
    shockwaves.forEach(wave => {
      const alpha = (1 - wave.radius / wave.maxRadius) * 0.25;
      bgCtx.strokeStyle = `rgba(8, 145, 178, ${alpha})`;
      bgCtx.lineWidth = 1.5;
      bgCtx.beginPath();
      bgCtx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
      bgCtx.stroke();
    });

    // Draw node vertices
    nodes.forEach(node => {
      bgCtx.fillStyle = 'rgba(124, 58, 237, 0.4)';
      bgCtx.beginPath();
      bgCtx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      bgCtx.fill();
    });
  }


  // ─── CURSOR SWARM PHYSICS (Desktop Only) ──────────────────────────────
  const swarmCount = 18;
  const particles = [];
  const trailHistory = [];
  const trailMaxLength = 8;

  if (!isTouchDevice) {
    for (let i = 0; i < swarmCount; i++) {
      particles.push({
        x: winW / 2,
        y: winH / 2,
        vx: 0,
        vy: 0,
        angle: (i / swarmCount) * Math.PI * 2,
        orbitSpeed: 0.035 + Math.random() * 0.015,
        orbitRadius: 18 + Math.random() * 7,
        size: Math.random() * 1.5 + 1.2,
        color: i % 2 === 0 ? 'rgba(109, 40, 217, 0.8)' : 'rgba(8, 145, 178, 0.8)'
      });
    }
  }

  function updateCursorSwarm() {
    let targetX = mouse.tx;
    let targetY = mouse.ty;

    if (magnetActive && hoverRect) {
      targetX = hoverRect.left + hoverRect.width / 2;
      targetY = hoverRect.top + hoverRect.height / 2;
    }

    cursor.vx += (targetX - cursor.x) * 0.25;
    cursor.vy += (targetY - cursor.y) * 0.25;
    cursor.vx *= 0.6;
    cursor.vy *= 0.6;
    cursor.x += cursor.vx;
    cursor.y += cursor.vy;

    trailHistory.push({ x: cursor.x, y: cursor.y });
    if (trailHistory.length > trailMaxLength) {
      trailHistory.shift();
    }

    particles.forEach(p => {
      p.angle += p.orbitSpeed;

      let targetPx, targetPy;

      if (magnetActive && hoverRect) {
        const padding = 10;
        const rectW = hoverRect.width + padding * 2;
        const rectH = hoverRect.height + padding * 2;

        const cos = Math.cos(p.angle);
        const sin = Math.sin(p.angle);

        const borderX = Math.sign(cos) * (rectW / 2);
        const borderY = Math.sign(sin) * (rectH / 2);

        targetPx = cursor.x + borderX;
        targetPy = cursor.y + borderY;
      } else {
        const speedStretch = Math.min(25, mouse.speed * 0.7);
        const orbitRadius = p.orbitRadius + speedStretch;

        targetPx = cursor.x + Math.cos(p.angle) * orbitRadius;
        targetPy = cursor.y + Math.sin(p.angle) * orbitRadius;
      }

      const spring = magnetActive ? 0.26 : 0.09;
      const friction = magnetActive ? 0.7 : 0.8;

      p.vx += (targetPx - p.x) * spring;
      p.vy += (targetPy - p.y) * spring;
      p.vx *= friction;
      p.vy *= friction;
      p.x += p.vx;
      p.y += p.vy;
    });
  }

  function drawCursorSwarm() {
    cursorCtx.clearRect(0, 0, winW, winH);

    if (trailHistory.length > 1) {
      cursorCtx.beginPath();
      cursorCtx.moveTo(trailHistory[0].x, trailHistory[0].y);
      for (let i = 1; i < trailHistory.length; i++) {
        cursorCtx.lineTo(trailHistory[i].x, trailHistory[i].y);
      }
      cursorCtx.lineWidth = 3.5;
      const grad = cursorCtx.createLinearGradient(
        trailHistory[0].x, trailHistory[0].y, 
        trailHistory[trailHistory.length - 1].x, trailHistory[trailHistory.length - 1].y
      );
      grad.addColorStop(0, 'rgba(8, 145, 178, 0)');
      grad.addColorStop(1, 'rgba(109, 40, 217, 0.35)');
      cursorCtx.strokeStyle = grad;
      cursorCtx.lineCap = 'round';
      cursorCtx.lineJoin = 'round';
      cursorCtx.stroke();
    }

    if (!magnetActive) {
      cursorCtx.strokeStyle = 'rgba(139, 92, 246, 0.05)';
      cursorCtx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < 45) {
            cursorCtx.beginPath();
            cursorCtx.moveTo(particles[i].x, particles[i].y);
            cursorCtx.lineTo(particles[j].x, particles[j].y);
            cursorCtx.stroke();
          }
        }
      }
    } else {
      cursorCtx.strokeStyle = 'rgba(8, 145, 178, 0.2)';
      cursorCtx.lineWidth = 1;
      cursorCtx.strokeRect(
        cursor.x - (hoverRect.width / 2 + 10),
        cursor.y - (hoverRect.height / 2 + 10),
        hoverRect.width + 20,
        hoverRect.height + 20
      );
    }

    cursorCtx.fillStyle = magnetActive ? 'rgba(8, 145, 178, 0.9)' : 'rgba(109, 40, 217, 0.9)';
    cursorCtx.shadowBlur = magnetActive ? 15 : 10;
    cursorCtx.shadowColor = magnetActive ? '#0891b2' : '#6d28d9';
    
    cursorCtx.beginPath();
    cursorCtx.arc(cursor.x, cursor.y, magnetActive ? 3 : 4, 0, Math.PI * 2);
    cursorCtx.fill();
    
    cursorCtx.shadowBlur = 0;

    particles.forEach(p => {
      cursorCtx.fillStyle = p.color;
      cursorCtx.beginPath();
      cursorCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      cursorCtx.fill();
    });
  }

  // ─── LOOP ──────────────────────────────────────────────────────────────
  function loop() {
    updateBgNodes();
    drawBgMesh();

    if (!isTouchDevice) {
      updateCursorSwarm();
      drawCursorSwarm();
    }

    requestAnimationFrame(loop);
  }
  
  loop();
})();
