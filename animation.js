// ─── AMBIENT MORPHING AURORA & MAGNETIC CURSOR FOLLOWER ────────────────

(function() {
  // Only enable on desktop pointing devices with hover support
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouchDevice) return;

  const hero = document.getElementById('hero');
  if (!hero) return;

  // ─── 1. CREATE AMBIENT BG CANVAS ──────────────────────────────────────
  const bgCanvas = document.createElement('canvas');
  bgCanvas.id = 'bg-canvas';
  bgCanvas.style.position = 'absolute';
  bgCanvas.style.top = '0';
  bgCanvas.style.left = '0';
  bgCanvas.style.width = '100%';
  bgCanvas.style.height = '100%';
  bgCanvas.style.pointerEvents = 'none';
  bgCanvas.style.zIndex = '0';
  bgCanvas.style.filter = 'blur(90px)'; // Heavy blur creates the soft fluid gradient look
  bgCanvas.style.opacity = '0.7';      // Subtle, elegant brightness
  
  const oldBg = document.getElementById('bg-canvas');
  if (oldBg) oldBg.remove();
  
  // Replace old vanta-bg container completely if it still exists
  const oldVanta = document.getElementById('vanta-bg');
  if (oldVanta) oldVanta.remove();
  
  hero.appendChild(bgCanvas);

  // ─── 2. CREATE SOFT CURSOR FOLLOWER ELEMENT ───────────────────────────
  const follower = document.createElement('div');
  follower.id = 'cursor-follower';
  follower.style.position = 'fixed';
  follower.style.top = '0';
  follower.style.left = '0';
  follower.style.width = '24px';
  follower.style.height = '24px';
  follower.style.border = '1.5px solid var(--accent3)';
  follower.style.borderRadius = '50%';
  follower.style.pointerEvents = 'none';
  follower.style.zIndex = '999999';
  follower.style.transform = 'translate3d(0, 0, 0)';
  follower.style.transition = 'width 0.3s cubic-bezier(0.2, 1, 0.2, 1), height 0.3s cubic-bezier(0.2, 1, 0.2, 1), background-color 0.3s, border-color 0.3s, opacity 0.3s';
  follower.style.opacity = '0';
  
  const oldFollower = document.getElementById('cursor-follower');
  if (oldFollower) oldFollower.remove();
  
  // Remove cursor: none styles so standard mouse pointer remains active and native
  const oldStyle = document.querySelector('style[data-custom-cursor]');
  if (oldStyle) oldStyle.remove();
  
  document.body.appendChild(follower);

  // Clean up previous canvas cursor elements
  const oldCursorCanvas = document.getElementById('cursor-canvas');
  if (oldCursorCanvas) oldCursorCanvas.remove();

  // ─── 3. RESIZE HANDLING ───────────────────────────────────────────────
  const bgCtx = bgCanvas.getContext('2d');
  let width = hero.offsetWidth;
  let height = hero.offsetHeight;

  function resize() {
    width = hero.offsetWidth;
    height = hero.offsetHeight;
    bgCanvas.width = width;
    bgCanvas.height = height;
  }
  window.addEventListener('resize', resize);
  resize();

  // ─── 4. MOUSE STATE & INTERACTION ─────────────────────────────────────
  const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const followerPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  let showFollower = false;

  // Magnetic elements tracker
  let hoveredEl = null;
  let hoveredElRect = null;
  let magnetFactor = 0.15; // smooth drag coefficient

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    
    if (!showFollower) {
      follower.style.opacity = '1';
      showFollower = true;
    }

    // Track active hovered buttons/links for magnetic alignment
    const target = e.target;
    const interactive = target.closest('a, button, .social-icon, .contact-card, .project-card, .btn-primary, .btn-outline, .btn-resume');
    
    if (interactive) {
      if (hoveredEl !== interactive) {
        // Reset previous magnetic element just in case
        if (hoveredEl) resetMagneticElement(hoveredEl);
        
        hoveredEl = interactive;
        hoveredElRect = interactive.getBoundingClientRect();
        
        // Expand follower ring to encircle hovered element
        follower.style.width = `${hoveredElRect.width + 16}px`;
        follower.style.height = `${hoveredElRect.height + 16}px`;
        follower.style.borderColor = 'rgba(124, 58, 237, 0.4)';
        follower.style.backgroundColor = 'rgba(124, 58, 237, 0.05)';
        follower.style.borderRadius = '12px'; // rectangular curve matching modern buttons
      }
      
      // Magnetic translation (button pulls slightly toward mouse)
      const rect = hoveredElRect;
      const mx = e.clientX - rect.left - rect.width / 2;
      const my = e.clientY - rect.top - rect.height / 2;
      
      // Limit slide range to 8px max to look clean and professional
      const maxDist = 8;
      const moveX = (mx / (rect.width / 2)) * maxDist;
      const moveY = (my / (rect.height / 2)) * maxDist;
      
      interactive.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) scale(1.02)`;
      interactive.style.transition = 'transform 0.1s ease-out';
    } else {
      if (hoveredEl) {
        resetMagneticElement(hoveredEl);
        hoveredEl = null;
        hoveredElRect = null;
        
        // Reset follower style back to default circle
        follower.style.width = '24px';
        follower.style.height = '24px';
        follower.style.borderColor = 'var(--accent3)';
        follower.style.backgroundColor = 'transparent';
        follower.style.borderRadius = '50%';
      }
    }
  });

  window.addEventListener('mouseleave', () => {
    follower.style.opacity = '0';
    showFollower = false;
  });

  function resetMagneticElement(el) {
    el.style.transform = '';
    el.style.transition = 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)';
  }

  // ─── 5. AMBIENT FLUID ORBS ────────────────────────────────────────────
  const orbs = [
    { x: width * 0.2, y: height * 0.3, baseX: width * 0.2, baseY: height * 0.3, rx: 200, ry: 200, color: 'rgba(109, 40, 217, 0.45)', angleX: 0, angleY: 0, speedX: 0.0012, speedY: 0.0018 }, // Deep Purple
    { x: width * 0.8, y: height * 0.4, baseX: width * 0.8, baseY: height * 0.4, rx: 250, ry: 250, color: 'rgba(6, 182, 212, 0.45)', angleX: Math.PI / 2, angleY: Math.PI, speedX: 0.0015, speedY: 0.001 },  // Neon Cyan
    { x: width * 0.5, y: height * 0.7, baseX: width * 0.5, baseY: height * 0.7, rx: 220, ry: 220, color: 'rgba(219, 39, 119, 0.3)', angleX: Math.PI, angleY: Math.PI / 2, speedX: 0.0008, speedY: 0.0014 } // Soft Pink
  ];

  function updateOrbs() {
    const heroRect = hero.getBoundingClientRect();
    const isHeroVisible = heroRect.bottom > 0 && heroRect.top < window.innerHeight;
    
    if (!isHeroVisible) return;

    // Convert mouse client coordinates to hero-relative coordinates
    const mouseHeroX = mouse.x - heroRect.left;
    const mouseHeroY = mouse.y - heroRect.top;

    orbs.forEach(orb => {
      // 1. Slow drift movement
      orb.angleX += orb.speedX;
      orb.angleY += orb.speedY;

      const driftX = Math.sin(orb.angleX) * 70;
      const driftY = Math.cos(orb.angleY) * 50;

      let targetX = orb.baseX + driftX;
      let targetY = orb.baseY + driftY;

      // 2. Gravitational pull toward mouse
      const dx = mouseHeroX - targetX;
      const dy = mouseHeroY - targetY;
      const dist = Math.sqrt(dx*dx + dy*dy);
      
      // Only pull if mouse is inside the screen range
      if (mouse.x > 0 && mouse.x < window.innerWidth && mouse.y > 0 && mouse.y < window.innerHeight) {
        const pullRadius = 450;
        if (dist < pullRadius) {
          const force = (pullRadius - dist) / pullRadius;
          targetX += (dx / dist) * force * 100;
          targetY += (dy / dist) * force * 100;
        }
      }

      // Smooth interpolation to target position
      orb.x += (targetX - orb.x) * 0.05;
      orb.y += (targetY - orb.y) * 0.05;
    });
  }

  function drawOrbs() {
    bgCtx.clearRect(0, 0, width, height);

    // Draw solid color gradient orbs on blurred canvas
    orbs.forEach(orb => {
      bgCtx.fillStyle = orb.color;
      bgCtx.beginPath();
      // Draw as oval stretching depending on movement/drift
      bgCtx.ellipse(orb.x, orb.y, orb.rx, orb.ry, 0, 0, Math.PI * 2);
      bgCtx.fill();
    });
  }

  // ─── 6. MAIN RENDER LOOP ──────────────────────────────────────────────
  function loop() {
    // 1. Update & draw ambient gradients
    updateOrbs();
    drawOrbs();

    // 2. Update soft cursor follower
    let fxTarget = mouse.x;
    let fyTarget = mouse.y;

    if (hoveredEl && hoveredElRect) {
      // Snaps follower box center precisely to hovered button center
      fxTarget = hoveredElRect.left + hoveredElRect.width / 2;
      fyTarget = hoveredElRect.top + hoveredElRect.height / 2;
    }

    // Apply smooth inertia to follower ring
    followerPos.x += (fxTarget - followerPos.x) * 0.15;
    followerPos.y += (fyTarget - followerPos.y) * 0.15;

    // Use transform to prevent layout recalculations, ensuring 60fps
    if (hoveredEl && hoveredElRect) {
      // Position rectangle centered
      const w = hoveredElRect.width + 16;
      const h = hoveredElRect.height + 16;
      follower.style.transform = `translate3d(${followerPos.x - w/2}px, ${followerPos.y - h/2}px, 0)`;
    } else {
      // Position small circular ring centered (24px default)
      follower.style.transform = `translate3d(${followerPos.x - 12}px, ${followerPos.y - 12}px, 0)`;
    }

    requestAnimationFrame(loop);
  }
  
  loop();
})();
