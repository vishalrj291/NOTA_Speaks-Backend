/* ====================================================
   NOTA Speaks — Custom Cursor
   Smooth following cursor with hover states
   ==================================================== */

import gsap from 'gsap';

export function initCursor() {
  // Only on devices with hover capability
  if (!window.matchMedia('(hover: hover)').matches) return;

  const cursor = document.getElementById('custom-cursor');
  if (!cursor) return;

  const dot = cursor.querySelector('.cursor__dot');
  const ring = cursor.querySelector('.cursor__ring');

  let mouseX = 0;
  let mouseY = 0;

  // Track mouse position
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  // Smooth follow with GSAP ticker
  gsap.ticker.add(() => {
    gsap.to(cursor, {
      x: mouseX,
      y: mouseY,
      duration: 0.15,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  });

  // Hover effects on interactive elements
  const interactives = document.querySelectorAll(
    'a, button, [role="button"], input, select, textarea, .issue-card, .campaign-card, .knowledge-card, .forum-card, .team-card'
  );

  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
  });

  // Hide native cursor
  document.body.style.cursor = 'none';

  // Also hide on interactive elements
  const style = document.createElement('style');
  style.textContent = `
    a, button, [role="button"], input, select, textarea,
    .issue-card, .campaign-card, .knowledge-card, .forum-card, .team-card {
      cursor: none !important;
    }
  `;
  document.head.appendChild(style);

  // Show/hide cursor on document enter/leave
  document.addEventListener('mouseenter', () => {
    gsap.to(cursor, { opacity: 1, duration: 0.3 });
  });

  document.addEventListener('mouseleave', () => {
    gsap.to(cursor, { opacity: 0, duration: 0.3 });
  });
}
