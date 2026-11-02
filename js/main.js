// LaundryNear.online — Client JavaScript
document.addEventListener('DOMContentLoaded', () => {
  // Pincode & City Search Redirection / Notification
  const searchForm = document.getElementById('searchForm');
  const searchInput = document.getElementById('searchInput');
  const searchStatus = document.getElementById('searchStatus');

  const cityMap = {
    'bangalore': '/bangalore.html',
    'bengaluru': '/bangalore.html',
    'mumbai': '/mumbai.html',
    'bombay': '/mumbai.html',
    'thane': '/mumbai.html',
    'delhi': '/delhi-ncr.html',
    'gurgaon': '/delhi-ncr.html',
    'gurugram': '/delhi-ncr.html',
    'noida': '/delhi-ncr.html',
    'hyderabad': '/hyderabad.html',
    'secunderabad': '/hyderabad.html',
    'pune': '/pune.html',
    'chennai': '/chennai.html',
    'madras': '/chennai.html'
  };

  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = searchInput.value.trim().toLowerCase();
      if (!val) return;

      for (const [key, url] of Object.entries(cityMap)) {
        if (val.includes(key)) {
          window.location.href = url;
          return;
        }
      }

      // Check if it looks like a 6-digit Indian pincode
      if (/^\d{6}$/.test(val)) {
        const prefix = val.substring(0, 2);
        if (prefix === '56') { window.location.href = '/bangalore.html'; return; }
        if (prefix === '40') { window.location.href = '/mumbai.html'; return; }
        if (prefix === '11' || prefix === '12' || prefix === '20') { window.location.href = '/delhi-ncr.html'; return; }
        if (prefix === '50') { window.location.href = '/hyderabad.html'; return; }
        if (prefix === '41') { window.location.href = '/pune.html'; return; }
        if (prefix === '60') { window.location.href = '/chennai.html'; return; }
      }

      if (searchStatus) {
        searchStatus.innerHTML = `✓ Doorstep pickup is available in <strong>${escapeHtml(searchInput.value)}</strong>! Pickup slot available within 60 mins.`;
        searchStatus.style.display = 'block';
        searchStatus.style.color = '#059669';
      }
    });
  }

  // Interactive Price Calculator
  const washKg = document.getElementById('calcWashKg');
  const ironKg = document.getElementById('calcIronKg');
  const dryCleanPcs = document.getElementById('calcDryClean');
  const totalDisplay = document.getElementById('calcTotal');
  const valWash = document.getElementById('valWash');
  const valIron = document.getElementById('valIron');
  const valDry = document.getElementById('valDry');

  function updatePrice() {
    if (!totalDisplay) return;
    const w = parseInt(washKg?.value || 0, 10);
    const i = parseInt(ironKg?.value || 0, 10);
    const d = parseInt(dryCleanPcs?.value || 0, 10);

    if (valWash) valWash.textContent = `${w} kg`;
    if (valIron) valIron.textContent = `${i} kg`;
    if (valDry) valDry.textContent = `${d} pcs`;

    const total = (w * 69) + (i * 99) + (d * 199);
    totalDisplay.textContent = `₹${total}`;
  }

  if (washKg && ironKg && dryCleanPcs) {
    washKg.addEventListener('input', updatePrice);
    ironKg.addEventListener('input', updatePrice);
    dryCleanPcs.addEventListener('input', updatePrice);
    updatePrice();
  }

  // Mobile Nav Toggle
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isVisible = mainNav.style.display === 'flex';
      mainNav.style.display = isVisible ? 'none' : 'flex';
      mainNav.style.flexDirection = 'column';
      mainNav.style.position = 'absolute';
      mainNav.style.top = '100%';
      mainNav.style.left = '0';
      mainNav.style.right = '0';
      mainNav.style.background = '#ffffff';
      mainNav.style.padding = '1rem';
      mainNav.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.1)';
    });
  }

  function escapeHtml(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }
});
