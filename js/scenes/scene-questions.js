/* ====================================================
   NOTA Speaks — Scene: Questions
   Scene 4 — Sequential question reveals with light
   ==================================================== */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initSceneQuestions() {
  const scene = document.getElementById('scene-questions');
  if (!scene) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: scene,
      start: 'top top',
      end: '+=350%',
      pin: true,
      scrub: 0.8,
      anticipatePin: 1,
    }
  });

  const questions = scene.querySelectorAll('.questions__line');

  // Each question fades in, pushing the narrative forward
  questions.forEach((q, i) => {
    tl.to(q, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
    });

    // Pause between questions
    tl.to({}, { duration: 0.5 });
  });

  // Hold all visible
  tl.to({}, { duration: 0.8 });

  // Fade out
  tl.to(questions, {
    opacity: 0,
    duration: 0.6,
    stagger: 0.05,
  });
}
