/* ====================================================
   NOTA Speaks — Scene: People (Forum + Team)
   Scene 9 — Staggered card reveals with subtle parallax
   ==================================================== */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initScenePeople() {
  // ===== Forum cards =====
  const forumCards = document.querySelectorAll('[data-forum]');
  if (forumCards.length) {
    gsap.to(forumCards, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: forumCards[0].parentElement,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      }
    });

    // Subtle parallax on card images (desktop only)
    if (window.matchMedia('(min-width: 1025px)').matches) {
      forumCards.forEach(card => {
        const img = card.querySelector('.forum-card__image');
        if (img) {
          gsap.to(img, {
            yPercent: -10,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            }
          });
        }
      });
    }
  }

  // ===== Team cards =====
  const teamCards = document.querySelectorAll('[data-team]');
  if (teamCards.length) {
    gsap.to(teamCards, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: teamCards[0].parentElement,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      }
    });
  }
}
