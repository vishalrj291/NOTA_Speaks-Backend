/* ====================================================
   NOTA Speaks — Scene: Campaigns & Projects
   Scene 8 — Horizontal scroll + knowledge + projects
   ==================================================== */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initSceneCampaigns() {
  // ===== Horizontal scroll for campaign cards =====
  const track = document.getElementById('campaigns-track');
  if (!track) return;

  const cards = track.querySelectorAll('.campaign-card');
  if (!cards.length) return;

  // Calculate total scroll width
  const getScrollAmount = () => {
    return -(track.scrollWidth - window.innerWidth + 60);
  };

  gsap.to(track, {
    x: getScrollAmount,
    ease: 'none',
    scrollTrigger: {
      trigger: '.campaigns__track-wrapper',
      start: 'top 20%',
      end: () => `+=${Math.abs(getScrollAmount())}`,
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true,
      anticipatePin: 1,
    }
  });

  // ===== Knowledge cards reveal =====
  const knowledgeCards = document.querySelectorAll('[data-knowledge]');
  if (knowledgeCards.length) {
    gsap.to(knowledgeCards, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: knowledgeCards[0].parentElement,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      }
    });
  }

  // ===== Project items reveal =====
  const projects = document.querySelectorAll('[data-project]');
  if (projects.length) {
    gsap.to(projects, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: projects[0].parentElement,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      }
    });

    // Animate progress bars on reveal
    projects.forEach(project => {
      const fill = project.querySelector('.project-item__bar-fill');
      if (fill) {
        gsap.from(fill, {
          width: 0,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: project,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        });
      }
    });
  }
}
