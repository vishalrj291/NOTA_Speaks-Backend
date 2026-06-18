/* ====================================================
   NOTA Speaks — Main Entry Point
   Initializes all modules in correct order
   ==================================================== */

// Styles
import 'lenis/dist/lenis.css';

// GSAP
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// Modules
import { initScrollManager, initRevealObserver } from './utils/scroll-manager.js';
import { initPreloader } from './components/preloader.js';
import { initNavbar } from './components/navbar.js';
import { initModals } from './components/modal.js';
import { initCursor } from './components/cursor.js';
import { initForms } from './utils/form-handler.js';

// Scenes
import { initSceneHero } from './scenes/scene-hero.js';
import { initSceneReality } from './scenes/scene-reality.js';
import { initSceneQuestions } from './scenes/scene-questions.js';
import { initSceneMaybe } from './scenes/scene-maybe.js';
import { initSceneIntro } from './scenes/scene-intro.js';
import { initSceneIssues } from './scenes/scene-issues.js';
import { initSceneCampaigns } from './scenes/scene-campaigns.js';
import { initScenePeople } from './scenes/scene-people.js';
import { initSceneJoin } from './scenes/scene-join.js';

// ===== Boot Sequence =====
async function init() {
  // 1. Show preloader
  await initPreloader();

  // 2. Initialize smooth scroll
  initScrollManager();

  // 3. Initialize scenes (order matters for GSAP pin spacing)
  initSceneHero();
  initSceneReality();
  initSceneQuestions();
  initSceneMaybe();
  initSceneIntro();
  initSceneIssues();
  initSceneCampaigns();
  initScenePeople();
  initSceneJoin();

  // 4. Initialize components
  initNavbar();
  initModals();
  initCursor();
  initForms();

  // 5. Reveal observer for non-GSAP elements
  initRevealObserver();

  // 6. Refresh ScrollTrigger after everything is set up
  ScrollTrigger.refresh();
}

// Wait for DOM + fonts
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    // Wait a tick for fonts
    document.fonts.ready.then(init);
  });
} else {
  document.fonts.ready.then(init);
}
