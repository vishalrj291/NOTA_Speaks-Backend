/* ====================================================
   NOTA Speaks — Scene: Intro (Brand Reveal)
   Scene 6 — NOTA Speaks brand reveal with warm glow
   ==================================================== */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initSceneIntro() {
  const scene = document.getElementById('scene-intro');
  if (!scene) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: scene,
      start: 'top top',
      end: '+=400%',
      pin: true,
      scrub: 0.8,
      anticipatePin: 1,
    }
  });

  // Glow appears first
  tl.to('[data-intro="glow"]', {
    opacity: 0.6,
    scale: 1,
    duration: 1,
    ease: 'power2.out',
  });

  // Brand name scales in with presence
  tl.to('[data-intro="name"]', {
    opacity: 1,
    scale: 1,
    duration: 1.5,
    ease: 'power3.out',
  }, '-=0.5');

  // Dramatic pause — let the name breathe
  tl.to({}, { duration: 1.5 });

  // Tagline line 1
  tl.to('[data-intro="line1"]', {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power3.out',
  });

  // Tagline line 2
  tl.to('[data-intro="line2"]', {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power3.out',
  }, '-=0.5');

  // Pause
  tl.to({}, { duration: 1 });

  // Description lines
  tl.to('[data-intro="line3"]', {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power3.out',
  });

  tl.to('[data-intro="line4"]', {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power3.out',
  }, '-=0.5');

  // Hold for reading
  tl.to({}, { duration: 1.5 });

  // Glow pulses
  tl.to('[data-intro="glow"]', {
    opacity: 0.3,
    scale: 1.2,
    duration: 2,
    ease: 'power1.inOut',
  }, '-=1');
}
