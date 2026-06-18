/* ====================================================
   NOTA Speaks — Scene: Issues That Matter
   Scene 7 — Bento grid with staggered reveals
   ==================================================== */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initSceneIssues() {
  const cards = document.querySelectorAll('[data-issue]');
  if (!cards.length) return;

  // Staggered reveal as user scrolls into view
  gsap.to(cards, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#issues-grid',
      start: 'top 80%',
      end: 'top 30%',
      toggleActions: 'play none none reverse',
    }
  });

  // Hover tilt effect (desktop only)
  if (window.matchMedia('(hover: hover)').matches) {
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        gsap.to(card, {
          rotateX: -y * 5,
          rotateY: x * 5,
          duration: 0.4,
          ease: 'power2.out',
          transformPerspective: 800,
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.6,
          ease: 'power3.out',
        });
      });
    });
  }
}
