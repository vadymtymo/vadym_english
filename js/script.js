/* ────────────────────────────────────────────────────
   ConvertKit config
   1. Go to app.kit.com → Forms → choose (or create) a form
   2. Copy the Form ID from the form URL
   3. Go to Settings → Advanced → Public API Key
   4. Paste both values below
──────────────────────────────────────────────────── */
const CK_FORM_ID  = '9323461';
const CK_API_KEY  = 'upM88gJywQMixnt8jEeHOQ';

/* ─── Email validation ─────────────────────────── */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

/* ─── Submit handler ───────────────────────────── */
const btn        = document.getElementById('downloadBtn');
const input      = document.getElementById('emailInput');
const errorSpan  = document.getElementById('emailError');
const successMsg = document.getElementById('successMsg');

if (btn) {
  btn.addEventListener('click', async () => {
    const email = input.value.trim();

    // Clear previous states
    input.classList.remove('invalid');
    errorSpan.classList.remove('visible');
    successMsg.classList.remove('visible');

    if (!isValidEmail(email)) {
      input.classList.add('invalid');
      errorSpan.classList.add('visible');
      input.focus();
      return;
    }

    // Open download page in new tab immediately
    window.open('download.html', '_blank');

    btn.disabled = true;
    btn.textContent = '...';

    try {
      const res = await fetch(
        `https://api.convertkit.com/v3/forms/${CK_FORM_ID}/subscribe`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ api_key: CK_API_KEY, email }),
        }
      );
      if (!res.ok) throw new Error('API error');
    } catch (_) {
      // Silent fail — download page already opened
    }

    input.value = '';
    btn.textContent = 'СКАЧАТЬ';
    btn.disabled = false;
    successMsg.classList.add('visible');
  });

  input.addEventListener('input', () => {
    input.classList.remove('invalid');
    errorSpan.classList.remove('visible');
  });
}

/* ─── Accordions ────────────────────────────────── */
document.querySelectorAll('.accordion-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const item   = btn.closest('.accordion-item');
    const isOpen = item.classList.contains('open');
    item.classList.toggle('open', !isOpen);
    btn.setAttribute('aria-expanded', String(!isOpen));
  });
});
