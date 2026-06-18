/* ====================================================
   NOTA Speaks — Scroll Manager
   Lenis + GSAP ScrollTrigger synchronization
   ==================================================== */

import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance = null;

export function initScrollManager() {
  // Initialize Lenis for smooth scrolling
  lenisInstance = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
  });

  // Sync Lenis with GSAP's ticker for frame-perfect animation sync
  lenisInstance.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenisInstance.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  // Scroll progress bar
  const progressBar = document.getElementById('scroll-progress');
  if (progressBar) {
    lenisInstance.on('scroll', ({ progress }) => {
      progressBar.style.width = `${progress * 100}%`;
    });
  }

  // Handle anchor links with smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') {
        e.preventDefault();
        lenisInstance.scrollTo(0, { duration: 2 });
        return;
      }
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        lenisInstance.scrollTo(target, { duration: 2, offset: -80 });
      }
    });
  });

  return lenisInstance;
}

export function getLenis() {
  return lenisInstance;
}

export function stopScroll() {
  if (lenisInstance) lenisInstance.stop();
}

export function startScroll() {
  if (lenisInstance) lenisInstance.start();
}

// Simple reveal observer for non-GSAP elements
export function initRevealObserver() {
  const reveals = document.querySelectorAll('[data-reveal]');
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
  );

  reveals.forEach(el => observer.observe(el));
}
