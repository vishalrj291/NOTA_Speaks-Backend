/* ====================================================
   NOTA Speaks — Preloader
   Sets the cinematic tone before the experience begins
   ==================================================== */

import gsap from 'gsap';

export function initPreloader() {
  return new Promise((resolve) => {
    const preloader = document.getElementById('preloader');
    if (!preloader) {
      resolve();
      return;
    }

    const words = preloader.querySelectorAll('.preloader__word');
    const progress = preloader.querySelector('.preloader__progress');

    const tl = gsap.timeline({
      onComplete: () => {
        // Fade out preloader
        gsap.to(preloader, {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.inOut',
          onComplete: () => {
            preloader.style.display = 'none';
            document.body.classList.add('loaded');
            resolve();
          }
        });
      }
    });

    // Animate words in
    tl.to(words[0], {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
    }, 0.3);

    tl.to(words[1], {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
    }, 0.5);

    // Progress bar
    tl.to(progress, {
      width: '100%',
      duration: 1.2,
      ease: 'power2.inOut',
    }, 0.4);

    // Hold briefly
    tl.to({}, { duration: 0.3 });
  });
}
