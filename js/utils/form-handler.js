/* ====================================================
   NOTA Speaks — Form Handler
   Client-side validation + local submission
   ==================================================== */

export function initForms() {
  initJoinForm();
  initContactForm();
}

function initJoinForm() {
  const form = document.getElementById('form-join');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateForm(form, ['name', 'email'])) return;

    const submitBtn = document.getElementById('join-submit');
    const successEl = document.getElementById('join-success');

    setLoading(submitBtn, true);

    const data = {
      name: form.elements.name.value.trim(),
      email: form.elements.email.value.trim(),
      age: form.elements.age.value || null,
      role: form.elements.role.value || null,
      interest: form.elements.interest.value || null,
      message: form.elements.message.value.trim() || null,
      submittedAt: new Date().toISOString(),
    };

    try {
      // Try API first, fall back to localStorage
      let saved = false;
      try {
        const res = await fetch('/api/submissions/join', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (res.ok) saved = true;
      } catch {
        // API not available, use localStorage
      }

      if (!saved) {
        const existing = JSON.parse(localStorage.getItem('nota_join_submissions') || '[]');
        existing.push(data);
        localStorage.setItem('nota_join_submissions', JSON.stringify(existing));
      }

      // Show success
      form.style.display = 'none';
      successEl.removeAttribute('hidden');
    } catch (err) {
      console.error('Form submission error:', err);
    } finally {
      setLoading(submitBtn, false);
    }
  });
}

function initContactForm() {
  const form = document.getElementById('form-contact');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateForm(form, ['name', 'email', 'subject', 'message'])) return;

    const submitBtn = document.getElementById('contact-submit');
    const successEl = document.getElementById('contact-success');

    setLoading(submitBtn, true);

    const data = {
      name: form.elements.name.value.trim(),
      email: form.elements.email.value.trim(),
      subject: form.elements.subject.value.trim(),
      message: form.elements.message.value.trim(),
      submittedAt: new Date().toISOString(),
    };

    try {
      let saved = false;
      try {
        const res = await fetch('/api/submissions/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (res.ok) saved = true;
      } catch {
        // API not available
      }

      if (!saved) {
        const existing = JSON.parse(localStorage.getItem('nota_contact_submissions') || '[]');
        existing.push(data);
        localStorage.setItem('nota_contact_submissions', JSON.stringify(existing));
      }

      form.style.display = 'none';
      successEl.removeAttribute('hidden');
    } catch (err) {
      console.error('Form submission error:', err);
    } finally {
      setLoading(submitBtn, false);
    }
  });
}

function validateForm(form, requiredFields) {
  let valid = true;

  // Clear previous errors
  form.querySelectorAll('.form__error').forEach(el => el.textContent = '');
  form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));

  requiredFields.forEach(field => {
    const input = form.elements[field];
    const errorEl = form.querySelector(`[data-error="${field}"]`);

    if (!input || !input.value.trim()) {
      if (errorEl) errorEl.textContent = 'This field is required';
      if (input) input.classList.add('error');
      valid = false;
    } else if (field === 'email' && !isValidEmail(input.value)) {
      if (errorEl) errorEl.textContent = 'Please enter a valid email';
      input.classList.add('error');
      valid = false;
    }
  });

  return valid;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function setLoading(btn, loading) {
  if (!btn) return;
  const text = btn.querySelector('.btn__text');
  const loader = btn.querySelector('.btn__loader');

  if (loading) {
    btn.disabled = true;
    if (text) text.style.display = 'none';
    if (loader) loader.removeAttribute('hidden');
  } else {
    btn.disabled = false;
    if (text) text.style.display = '';
    if (loader) loader.setAttribute('hidden', '');
  }
}
