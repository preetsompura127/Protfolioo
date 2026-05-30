// ─── INTERACTIVE QUANTUM SWARM CURSOR & GRAVITY MESH ───────────────────

(function() {
  // Disable on touchscreen-only devices to preserve mobile usability and battery life
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouchDevice) return;

  const hero = document.getElementById('hero');
  if (!hero) return;

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

  // 2. Create Foreground Canvas (Interactive Cursor) globally
  const cursorCanvas = document.createElement('canvas');
  cursorCanvas.id = 'cursor-canvas';
  cursorCanvas.style.position = 'fixed';
  cursorCanvas.style.top = '0';
  cursorCanvas.style.left = '0';
  cursorCanvas.style.width = '100%';
  cursorCanvas.style.height = '100%';
  cursorCanvas.style.pointerEvents = 'none';
  cursorCanvas.style.zIndex = '999999';
  document.body.appendChild(cursorCanvas);

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

  // Coordinates
  const mouse = { x: winW / 2, y: winH / 2, tx: winW / 2, ty: winH / 2, speed: 0 };
  const cursor = { x: winW / 2, y: winH / 2, vx: 0, vy: 0 };
  let lastMouseX = winW / 2;
  let lastMouseY = winH / 2;

  // Magnetic Hover State
  let hoveredElement = null;
  let hoverRect = null;
  let magnetActive = false;

  window.addEventListener('mousemove', (e) => {
    mouse.tx = e.clientX;
    mouse.ty = e.clientY;

    // Calculate mouse velocity for trailing animations
    const dx = mouse.tx - lastMouseX;
    const dy = mouse.ty - lastMouseY;
    mouse.speed = Math.sqrt(dx*dx + dy*dy);
    lastMouseX = mouse.tx;
    lastMouseY = mouse.ty;

    // Direct check for interactive hover elements to snap cursor
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

  // Ripple wave effect on click
  const shockwaves = [];
  window.addEventListener('mousedown', (e) => {
    // Only trigger background shockwaves if click happens inside the Hero bounds
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
    }
  });

  // ─── BG GRAVITY MESH NETWORK ───────────────────────────────────────────
  const nodes = [];
  const nodeCount = 75;

  for (let i = 0; i < nodeCount; i++) {
    nodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      x0: Math.random() * width,
      y0: Math.random() * height,
      vx: 0,
      vy: 0,
      radius: Math.random() * 2 + 1.2,
      angle: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.4 + 0.15,
    });
  }

  function updateBgNodes() {
    const heroRect = hero.getBoundingClientRect();
    // Convert client coordinates to hero-relative coordinates for calculations
    const mouseHeroX = mouse.tx - heroRect.left;
    const mouseHeroY = mouse.ty - heroRect.top;

    nodes.forEach(node => {
      // 1. Idle float drift
      node.angle += node.speed * 0.015;
      node.x0 = (node.x0 + Math.cos(node.angle) * 0.15 + width) % width;
      node.y0 = (node.y0 + Math.sin(node.angle) * 0.15 + height) % height;

      let targetX = node.x0;
      let targetY = node.y0;

      // 2. Gravitational warp from cursor
      const dx = mouseHeroX - node.x;
      const dy = mouseHeroY - node.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      const gravityRadius = 250;

      if (dist < gravityRadius) {
        // Bend nodes towards cursor
        const strength = (gravityRadius - dist) / gravityRadius;
        targetX -= (dx / dist) * strength * 90;
        targetY -= (dy / dist) * strength * 90;
      }

      // 3. Click shockwaves
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
    bgCtx.lineWidth = 0.75;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        const maxDist = 130;

        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.12;
          // Beautiful fading purple lines
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
      bgCtx.strokeStyle = `rgba(8, 145, 178, ${alpha})`; // cyan shockwave ring
      bgCtx.lineWidth = 2;
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


  // ─── CURSOR SWARM PHYSICS ──────────────────────────────────────────────
  const swarmCount = 18;
  const particles = [];

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
      color: i % 2 === 0 ? 'rgba(109, 40, 217, 0.8)' : 'rgba(8, 145, 178, 0.8)' // Purple and Cyan sparks
    });
  }

  // Smooth trail history for cursor movement
  const trailHistory = [];
  const trailMaxLength = 8;

  function updateCursorSwarm() {
    let targetX = mouse.tx;
    let targetY = mouse.ty;

    // Check magnet snap
    if (magnetActive && hoverRect) {
      const elCenterX = hoverRect.left + hoverRect.width / 2;
      const elCenterY = hoverRect.top + hoverRect.height / 2;
      
      // Interpolate center toward element to snap magnetically
      targetX = elCenterX;
      targetY = elCenterY;
    }

    // Apply inertia and friction to main cursor coordinates
    cursor.vx += (targetX - cursor.x) * 0.25;
    cursor.vy += (targetY - cursor.y) * 0.25;
    cursor.vx *= 0.6;
    cursor.vy *= 0.6;
    cursor.x += cursor.vx;
    cursor.y += cursor.vy;

    // Add trail coordinate
    trailHistory.push({ x: cursor.x, y: cursor.y });
    if (trailHistory.length > trailMaxLength) {
      trailHistory.shift();
    }

    // Update orbiting swarm sparks
    particles.forEach(p => {
      p.angle += p.orbitSpeed;

      let targetPx, targetPy;

      if (magnetActive && hoverRect) {
        // Snap swarm to shape outline box
        const padding = 10;
        const rectW = hoverRect.width + padding * 2;
        const rectH = hoverRect.height + padding * 2;

        const cos = Math.cos(p.angle);
        const sin = Math.sin(p.angle);

        // Clamping angles to rectangular border
        const borderX = Math.sign(cos) * (rectW / 2);
        const borderY = Math.sign(sin) * (rectH / 2);

        targetPx = cursor.x + borderX;
        targetPy = cursor.y + borderY;
      } else {
        // Circle orbit trails stretching slightly with velocity
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

    // 1. Draw motion trail lines (glow tail)
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
      grad.addColorStop(0, 'rgba(8, 145, 178, 0)'); // fade out
      grad.addColorStop(1, 'rgba(109, 40, 217, 0.35)'); // purple core
      cursorCtx.strokeStyle = grad;
      cursorCtx.lineCap = 'round';
      cursorCtx.lineJoin = 'round';
      cursorCtx.stroke();
    }

    // 2. Draw particle connection lattice
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
      // Draw rectangular focus box surrounding target
      cursorCtx.strokeStyle = 'rgba(8, 145, 178, 0.2)';
      cursorCtx.lineWidth = 1;
      cursorCtx.strokeRect(
        cursor.x - (hoverRect.width / 2 + 10),
        cursor.y - (hoverRect.height / 2 + 10),
        hoverRect.width + 20,
        hoverRect.height + 20
      );
    }

    // 3. Draw central glowing dot
    cursorCtx.fillStyle = magnetActive ? 'rgba(8, 145, 178, 0.9)' : 'rgba(109, 40, 217, 0.9)';
    cursorCtx.shadowBlur = magnetActive ? 15 : 10;
    cursorCtx.shadowColor = magnetActive ? '#0891b2' : '#6d28d9';
    
    cursorCtx.beginPath();
    cursorCtx.arc(cursor.x, cursor.y, magnetActive ? 3 : 4, 0, Math.PI * 2);
    cursorCtx.fill();
    
    // Clear shadow state for rendering other elements
    cursorCtx.shadowBlur = 0;

    // 4. Draw floating particles
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

    updateCursorSwarm();
    drawCursorSwarm();

    requestAnimationFrame(loop);
  }
  
  // Start loop
  loop();
})();
