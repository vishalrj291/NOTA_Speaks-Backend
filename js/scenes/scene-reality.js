/* ====================================================
   NOTA Speaks — Scene: Reality ("Another...")
   Scene 3 — Pinned, offset text reveals
   ==================================================== */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initSceneReality() {
  const scene = document.getElementById('scene-another');
  if (!scene) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: scene,
      start: 'top top',
      end: '+=300%',
      pin: true,
      scrub: 0.8,
      anticipatePin: 1,
    }
  });

  // Each "Another" appears with a weight
  tl.to('[data-another="1"]', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out',
  });

  tl.to({}, { duration: 0.4 });

  tl.to('[data-another="2"]', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out',
  });

  tl.to({}, { duration: 0.4 });

  tl.to('[data-another="3"]', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out',
  });

  tl.to({}, { duration: 0.4 });

  tl.to('[data-another="4"]', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out',
  });

  // Dot
  tl.to('[data-another="dot"]', {
    opacity: 0.5,
    duration: 0.5,
  });

  // Hold
  tl.to({}, { duration: 0.8 });

  // Fade all out
  tl.to(scene.querySelectorAll('.another__line, .another__pause-dot'), {
    opacity: 0,
    duration: 0.6,
  });
}
