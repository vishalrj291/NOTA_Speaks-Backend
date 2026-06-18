/* ====================================================
   NOTA Speaks — Navbar Component
   Appears after brand reveal, hides during story
   ==================================================== */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { stopScroll, startScroll } from '../utils/scroll-manager.js';

export function initNavbar() {
  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!navbar) return;

  // Show navbar after Scene 6 (brand reveal)
  const introScene = document.getElementById('scene-intro');
  if (introScene) {
    ScrollTrigger.create({
      trigger: introScene,
      start: 'bottom 80%',
      onEnter: () => navbar.classList.add('visible'),
      onLeaveBack: () => navbar.classList.remove('visible'),
    });
  }

  // Background on scroll
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const current = window.scrollY;
    if (current > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = current;
  }, { passive: true });

  // Mobile menu toggle
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('open');

      if (isOpen) {
        mobileMenu.classList.remove('open');
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
        startScroll();
      } else {
        mobileMenu.classList.add('open');
        toggle.classList.add('active');
        toggle.setAttribute('aria-expanded', 'true');
        stopScroll();
      }
    });

    // Close on link click
    mobileMenu.querySelectorAll('[data-mobile-nav]').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
        startScroll();
      });
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        mobileMenu.classList.remove('open');
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
        startScroll();
      }
    });
  }
}
