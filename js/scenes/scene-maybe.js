/* ====================================================
   NOTA Speaks — Scene: Maybe
   Scene 5 — Hope dawning, background brightens
   ==================================================== */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initSceneMaybe() {
  const scene = document.getElementById('scene-maybe');
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

  const lines = scene.querySelectorAll('.maybe__line');

  // Each "Maybe" line fades in with increasing warmth
  lines.forEach((line, i) => {
    tl.to(line, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
    });

    // Background subtly warms with each line
    tl.to(scene, {
      backgroundColor: i === 0
        ? 'hsl(215, 20%, 13%)'
        : i === 1
        ? 'hsl(210, 22%, 14%)'
        : 'hsl(220, 18%, 11%)',
      duration: 0.5,
    }, '<');

    tl.to({}, { duration: 0.6 });
  });

  // Hold
  tl.to({}, { duration: 0.8 });

  // Fade out
  tl.to(lines, {
    opacity: 0,
    duration: 0.6,
    stagger: 0.05,
  });
}
