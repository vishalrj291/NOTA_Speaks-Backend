/* ====================================================
   NOTA Speaks — Scene: Hero ("They Told Us" + "We Did")
   Scenes 1 & 2 — Pinned scroll-driven text reveals
   ==================================================== */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initSceneHero() {
  // ===== SCENE 1 — "They Told Us" =====
  const sceneTold = document.getElementById('scene-told');
  if (!sceneTold) return;

  const toldTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: sceneTold,
      start: 'top top',
      end: '+=300%',
      pin: true,
      scrub: 0.8,
      anticipatePin: 1,
    }
  });

  // "They told us:" fades in
  toldTimeline.to('[data-told="prefix"]', {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power3.out',
  });

  // Pause
  toldTimeline.to({}, { duration: 0.3 });

  // "Study hard." — "Work hard." — "Stay patient."
  toldTimeline.to('[data-told="1"]', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out',
  });
  toldTimeline.to('[data-told="2"]', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out',
  }, '-=0.3');
  toldTimeline.to('[data-told="3"]', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out',
  }, '-=0.3');

  // Pause
  toldTimeline.to({}, { duration: 0.5 });

  // "And everything would fall into place."
  toldTimeline.to('[data-told="promise"]', {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power3.out',
  });

  // Dot pulse
  toldTimeline.to('[data-told="dot"]', {
    opacity: 0.5,
    duration: 0.5,
  });

  // Pause to let user absorb
  toldTimeline.to({}, { duration: 1 });

  // Fade everything out
  toldTimeline.to(sceneTold.querySelectorAll('.told__line, .told__pause-dot'), {
    opacity: 0,
    duration: 0.8,
  });


  // ===== SCENE 2 — "We Did" =====
  const sceneWedid = document.getElementById('scene-wedid');
  if (!sceneWedid) return;

  const wedidTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: sceneWedid,
      start: 'top top',
      end: '+=250%',
      pin: true,
      scrub: 0.8,
      anticipatePin: 1,
    }
  });

  // "We did." — big, alone
  wedidTimeline.to('[data-wedid="answer"]', {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power3.out',
  });

  // Dramatic pause
  wedidTimeline.to({}, { duration: 1.2 });

  // "So why does the future still feel uncertain?"
  wedidTimeline.to('[data-wedid="question"]', {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power3.out',
  });

  // Hold
  wedidTimeline.to({}, { duration: 1 });

  // Fade out
  wedidTimeline.to(sceneWedid.querySelectorAll('.wedid__line'), {
    opacity: 0,
    duration: 0.8,
  });
}
