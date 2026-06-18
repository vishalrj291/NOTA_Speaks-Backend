/* ====================================================
   NOTA Speaks — Modal Component
   Accessible modal system for Join Us and Contact
   ==================================================== */

import { stopScroll, startScroll } from '../utils/scroll-manager.js';

let activeModal = null;

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  modal.removeAttribute('hidden');
  // Force reflow before adding class for transition
  modal.offsetHeight;
  modal.classList.add('open');
  activeModal = modal;
  stopScroll();

  // Focus first input
  setTimeout(() => {
    const firstInput = modal.querySelector('input, select, textarea');
    if (firstInput) firstInput.focus();
  }, 400);

  // Trap focus
  modal.addEventListener('keydown', trapFocus);
}

function closeModal() {
  if (!activeModal) return;

  activeModal.classList.remove('open');
  activeModal.removeEventListener('keydown', trapFocus);

  setTimeout(() => {
    activeModal.setAttribute('hidden', '');
    activeModal = null;
    startScroll();
  }, 400);
}

function trapFocus(e) {
  if (e.key !== 'Tab') return;

  const focusables = activeModal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const first = focusables[0];
  const last = focusables[focusables.length - 1];

  if (e.shiftKey) {
    if (document.activeElement === first) {
      e.preventDefault();
      last.focus();
    }
  } else {
    if (document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
}

export function initModals() {
  // Join Us button
  const btnJoin = document.getElementById('btn-join');
  if (btnJoin) {
    btnJoin.addEventListener('click', () => openModal('modal-join'));
  }

  // Contact button
  const btnContact = document.getElementById('btn-contact');
  if (btnContact) {
    btnContact.addEventListener('click', () => openModal('modal-contact'));
  }

  // Footer contact link
  const footerContact = document.getElementById('footer-contact-link');
  if (footerContact) {
    footerContact.addEventListener('click', (e) => {
      e.preventDefault();
      openModal('modal-contact');
    });
  }

  // Close buttons
  document.querySelectorAll('[data-modal-close]').forEach(el => {
    el.addEventListener('click', closeModal);
  });

  // Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && activeModal) {
      closeModal();
    }
  });
}
