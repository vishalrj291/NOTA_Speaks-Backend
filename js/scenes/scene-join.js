/* ====================================================
   NOTA Speaks — Scene: Join the Movement
   Scene 10 — Final CTA with emotional close
   ==================================================== */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initSceneJoin() {
  const scene = document.getElementById('join');
  if (!scene) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: scene,
      start: 'top top',
      end: '+=250%',
      pin: true,
      scrub: 0.8,
      anticipatePin: 1,
    }
  });

  // "This isn't about protest."
  tl.to('[data-join="1"]', {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power3.out',
  });

  tl.to({}, { duration: 0.5 });

  // "It's about participation."
  tl.to('[data-join="2"]', {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power3.out',
  });

  tl.to({}, { duration: 0.5 });

  // "Awareness changes everything."
  tl.to('[data-join="3"]', {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power3.out',
  });

  tl.to({}, { duration: 0.8 });

  // Buttons appear
  tl.to('[data-join="actions"]', {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power3.out',
  });

  // Hold for interaction
  tl.to({}, { duration: 2 });
}
