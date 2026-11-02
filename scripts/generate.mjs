import { LANGUAGES } from './languages.mjs';
import { writeFileSync, mkdirSync, copyFileSync } from 'node:fs';
import { resolve, join } from 'node:path';

const ORIGIN = 'https://laundrynear.online';
const ROOT = resolve(process.cwd());

const CITIES = [
  {
    slug: 'bangalore',
    name: 'Bengaluru / Bangalore',
    state: 'Karnataka',
    title: 'Laundry Near Me in Bangalore | Free Doorstep Pickup & Eco Dry Cleaning',
    desc: 'Doorstep laundry and dry cleaning near you in Bangalore. Serving Indiranagar, Koramangala, HSR Layout, Whitefield, Bellandur, Electronic City. Free home pickup & 24-48 hr delivery.',
    areas: ['Indiranagar', 'Koramangala', 'HSR Layout', 'Whitefield', 'Bellandur', 'Marathahalli', 'Electronic City', 'Jayanagar', 'JP Nagar', 'Hebbal'],
    pincodes: '560038, 560034, 560102, 560066, 560103, 560037, 560100, 560041'
  },
  {
    slug: 'mumbai',
    name: 'Mumbai & MMR',
    state: 'Maharashtra',
    title: 'Laundry Near Me in Mumbai | Doorstep Dry Cleaning & Wash & Fold Service',
    desc: 'Looking for laundry near you in Mumbai? Doorstep laundry service in Andheri, Bandra, Powai, Juhu, Lower Parel, Thane & Navi Mumbai. Weighing at doorstep, 24 hr delivery.',
    areas: ['Andheri West', 'Bandra West', 'Powai', 'Juhu', 'BKC', 'Lower Parel', 'Dadar', 'Thane West', 'Vashi', 'Kharghar'],
    pincodes: '400053, 400050, 400076, 400049, 400051, 400013, 400028, 400601'
  },
  {
    slug: 'delhi-ncr',
    name: 'Delhi NCR (Gurgaon & Noida)',
    state: 'Delhi NCR',
    title: 'Laundry Near Me in Delhi NCR | Doorstep Dry Cleaners Gurgaon & Noida',
    desc: 'Premium laundry near you in Delhi NCR. Free doorstep pickup across Gurugram DLF & Cyber City, Noida Sector 18, 50, 62, and South Delhi. Eco solvents & steam iron.',
    areas: ['Gurgaon Cyber City', 'DLF Phase 1-5', 'Golf Course Road', 'Noida Sector 62', 'Noida Sector 50', 'Hauz Khas', 'Saket', 'Greater Kailash'],
    pincodes: '122002, 122009, 122018, 201301, 201307, 110016, 110017, 110048'
  },
  {
    slug: 'hyderabad',
    name: 'Hyderabad',
    state: 'Telangana',
    title: 'Laundry Near Me in Hyderabad | Hitec City & Gachibowli Doorstep Service',
    desc: 'Fast doorstep laundry service near you in Hyderabad. Daily wash & fold from ₹69/kg in Hitec City, Gachibowli, Madhapur, Kondapur, Jubilee Hills. Free pickup.',
    areas: ['Hitec City', 'Gachibowli', 'Madhapur', 'Kondapur', 'Jubilee Hills', 'Banjara Hills', 'Kukatpally', 'Financial District'],
    pincodes: '500081, 500032, 500084, 500033, 500034, 500072'
  },
  {
    slug: 'pune',
    name: 'Pune',
    state: 'Maharashtra',
    title: 'Laundry Near Me in Pune | Doorstep Laundry Hinjewadi, Kothrud & Baner',
    desc: 'Professional laundry and dry cleaning near you in Pune. Fast doorstep collection in Hinjewadi IT Park, Kothrud, Baner, Wakad, Viman Nagar & Kharadi. Free delivery.',
    areas: ['Hinjewadi Phase 1-3', 'Kothrud', 'Baner', 'Wakad', 'Viman Nagar', 'Kharadi', 'Aundh', 'Magarpatta'],
    pincodes: '411057, 411038, 411045, 411057, 411014, 411028'
  },
  {
    slug: 'chennai',
    name: 'Chennai',
    state: 'Tamil Nadu',
    title: 'Laundry Near Me in Chennai | OMR & Anna Nagar Doorstep Dry Cleaning',
    desc: 'Reliable laundry service near you in Chennai. Wash & fold and silk saree dry cleaning in Anna Nagar, OMR Tech Corridor, Velachery, Adyar, T Nagar. 24 hr express.',
    areas: ['OMR Tech Corridor', 'Anna Nagar', 'Velachery', 'Adyar', 'T Nagar', 'Besant Nagar', 'Thiruvanmiyur', 'Mylapore'],
    pincodes: '600040, 600096, 600042, 600020, 600017, 600090'
  }
];

function headerHtml(currentPath = '/') {
  return `
  <header class="site-header">
    <div class="nav-container">
      <a href="/" class="brand-logo" aria-label="LaundryNear.online Home">
        <span>🧺 Laundry<span class="highlight">Near</span>.online</span>
        <span class="brand-badge">24H Express</span>
      </a>
      <button class="nav-toggle" id="navToggle" aria-label="Toggle navigation">☰</button>
      <nav class="main-nav" id="mainNav">
        <a href="/" class="${currentPath === '/' ? 'active' : ''}">Home</a>
        <a href="/pricing.html" class="${currentPath === '/pricing.html' ? 'active' : ''}">Rate Card</a>
        <a href="/bangalore.html" class="${currentPath.includes('bangalore') ? 'active' : ''}">Bangalore</a>
        <a href="/mumbai.html" class="${currentPath.includes('mumbai') ? 'active' : ''}">Mumbai</a>
        <a href="/delhi-ncr.html" class="${currentPath.includes('delhi') ? 'active' : ''}">Delhi NCR</a>
        <a href="/franchise.html" class="${currentPath === '/franchise.html' ? 'active' : ''}">Franchise</a>
        <a href="/contact.html" class="${currentPath === '/contact.html' ? 'active' : ''}">Contact</a>
        <a href="/book.html" class="btn-header">Book Pickup</a>
      </nav>
    </div>
  </header>`;
}

function footerHtml() {
  return `
  <div class="lang-bar">
    <div class="container" style="padding: 0;">
      <small style="font-weight: 700; color: #64748b; text-transform: uppercase;">Available in Regional Languages (Voice Search):</small>
      <div class="lang-links">
        <a href="/hi/">हिन्दी (Hindi)</a>
        <a href="/kn/">ಕನ್ನಡ (Kannada)</a>
        <a href="/ta/">தமிழ் (Tamil)</a>
        <a href="/te/">తెలుగు (Telugu)</a>
        <a href="/mr/">मराठी (Marathi)</a>
        <a href="/bn/">বাংলা (Bengali)</a>
        <a href="/gu/">ગુજરાતી (Gujarati)</a>
      </div>
    </div>
  </div>

  <footer class="site-footer">
    <div class="footer-grid">
      <div class="footer-brand">
        <h4>🧺 LaundryNear.online</h4>
        <p style="font-size: 0.92rem; margin-bottom: 1rem; line-height: 1.6;">
          India's leading tech-enabled doorstep laundry and eco dry cleaning service. Transparent pricing by the kilo, digital scale weighing at your doorstep, fabric-safe organic solvents, and guaranteed 24-48 hr turnaround.
        </p>
      </div>

      <div class="footer-col">
        <h5>Our Services</h5>
        <ul class="footer-links">
          <li><a href="/pricing.html#wash-fold">Wash & Fold (₹69/kg)</a></li>
          <li><a href="/pricing.html#wash-iron">Wash & Steam Iron (₹99/kg)</a></li>
          <li><a href="/pricing.html#dry-clean">Eco Dry Cleaning (₹149+)</a></li>
          <li><a href="/pricing.html#steam-press">Steam Press Only (₹29+)</a></li>
          <li><a href="/pricing.html#shoes">Shoe Spa & Cleaning (₹249)</a></li>
          <li><a href="/pricing.html#linens">Blankets & Curtains (₹199)</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h5>Top Locations Near You</h5>
        <ul class="footer-links">
          <li><a href="/bangalore.html">Bengaluru (Indiranagar / HSR)</a></li>
          <li><a href="/mumbai.html">Mumbai (Andheri / Bandra / BKC)</a></li>
          <li><a href="/delhi-ncr.html">Delhi NCR (Gurgaon / Noida)</a></li>
          <li><a href="/hyderabad.html">Hyderabad (Hitec / Gachibowli)</a></li>
          <li><a href="/pune.html">Pune (Hinjewadi / Kothrud)</a></li>
          <li><a href="/chennai.html">Chennai (OMR / Anna Nagar)</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h5>Company & Legal</h5>
        <ul class="footer-links">
          <li><a href="/about.html">About Us</a></li>
          <li><a href="/contact.html">Contact & Support</a></li>
          <li><a href="/franchise.html">Franchise Opportunities</a></li>
          <li><a href="/privacy.html">Privacy Policy (DPDP 2023)</a></li>
          <li><a href="/terms.html">Terms & Conditions</a></li>
          <li><a href="/cancellation-refund.html">Cancellation & Refund Policy</a></li>
          <li><a href="/delivery-policy.html">Pickup & Delivery Policy</a></li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      <div>
        © 2026 LaundryNear.online — All rights reserved. | Built for 100% SEO Speed on Cloudflare Edge.
      </div>
      <div>
        Direct WhatsApp Support: <a href="https://wa.me/917892240243" style="color: #22c55e; font-weight: 700;">+91-7892240243</a>
      </div>
    </div>
  </footer>

  <div class="mobile-sticky-bar">
    <a href="/book.html" class="btn-mobile-book">⚡ Book Pickup (₹69/kg)</a>
    <a href="https://wa.me/917892240243?text=Hi%20LaundryNear.online%2C%20I%20want%20to%20book%20a%20doorstep%20laundry%20pickup" class="btn-mobile-whatsapp" target="_blank" rel="noopener">💬 WhatsApp</a>
  </div>`;
}

function baseHead(title, desc, canonicalPath = '/', schemaJson = null) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${desc}">
  <link rel="canonical" href="${ORIGIN}${canonicalPath}">
  <link rel="stylesheet" href="/css/style.css">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="${ORIGIN}${canonicalPath}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${desc}">
  <meta property="og:image" content="${ORIGIN}/assets/og-image.png">

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="${ORIGIN}${canonicalPath}">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${desc}">
  <meta name="twitter:image" content="${ORIGIN}/assets/og-image.png">

  <!-- Alternate hreflang tags -->
  <link rel="alternate" hreflang="x-default" href="${ORIGIN}/">
  <link rel="alternate" hreflang="en-IN" href="${ORIGIN}/">
  <link rel="alternate" hreflang="hi-IN" href="${ORIGIN}/hi/">
  <link rel="alternate" hreflang="kn-IN" href="${ORIGIN}/kn/">
  <link rel="alternate" hreflang="ta-IN" href="${ORIGIN}/ta/">
  <link rel="alternate" hreflang="te-IN" href="${ORIGIN}/te/">
  <link rel="alternate" hreflang="mr-IN" href="${ORIGIN}/mr/">
  <link rel="alternate" hreflang="bn-IN" href="${ORIGIN}/bn/">
  <link rel="alternate" hreflang="gu-IN" href="${ORIGIN}/gu/">

  <!-- Performance preconnects -->
  <link rel="dns-prefetch" href="https://wa.me">
  
  ${schemaJson ? `<script type="application/ld+json">${JSON.stringify(schemaJson, null, 2)}</script>` : ''}
</head>
<body>
`;
}

// 1. Generate Homepage (index.html)
function generateHomepage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "DryCleaningOrLaundry",
        "@id": `${ORIGIN}/#localbusiness`,
        "name": "LaundryNear.online",
        "url": `${ORIGIN}/`,
        "telephone": "+91-7892240243",
        "priceRange": "₹₹",
        "image": `${ORIGIN}/assets/og-image.png`,
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "IN"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "14280",
          "bestRating": "5"
        }
      },
      {
        "@type": "FAQPage",
        "@id": `${ORIGIN}/#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How does LaundryNear.online doorstep pickup work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Simply book online or on WhatsApp. Our verified rider arrives at your doorstep with a digital hanging scale, weighs your laundry in your presence, hands you a digital receipt, and delivers your sanitized, folded clothes within 24 to 48 hours."
            }
          },
          {
            "@type": "Question",
            "name": "What is the per kg price for laundry near me?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Wash & Fold is ₹69 per kg (minimum 3 kg). Wash & Steam Iron is ₹99 per kg. Individual steam press starts at ₹29 per piece, and delicate dry cleaning starts at ₹149 per piece."
            }
          },
          {
            "@type": "Question",
            "name": "Are my clothes washed separately or mixed with other customers?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We operate strict dedicated machine batches. Your clothes are NEVER mixed with another customer's garments. Each order is tagged with a unique barcode and washed in an individual cycle."
            }
          },
          {
            "@type": "Question",
            "name": "Do you offer express 24-hour turnaround?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! We offer a guaranteed 24-Hour Express Delivery add-on for ₹149 flat per order. Your clothes will be washed, steam pressed, and delivered to your doorstep within 24 hours of pickup."
            }
          }
        ]
      }
    ]
  };

  const html = `${baseHead(
    'Laundry Near Me | Doorstep Laundry & Eco Dry Cleaning ₹69/kg | Free Pickup',
    'Find laundry and dry cleaning near you. 100% free doorstep pickup & 24h delivery across Bangalore, Mumbai, Delhi NCR, Hyderabad, Pune, Chennai. Wash & fold ₹69/kg. Book in 30 secs!',
    '/',
    schema
  )}
  ${headerHtml('/')}

  <!-- Hero Section -->
  <section class="hero">
    <div class="hero-inner">
      <div class="badge-pill">
        <span>⭐ 4.9/5 Rating (14,200+ Verified Customers)</span>
        <span>•</span>
        <span>🚚 Free Doorstep Pickup</span>
      </div>
      <h1 class="hero-title">
        The Best <span class="text-gradient">Laundry Near You</span> With Free Doorstep Pickup
      </h1>
      <p class="hero-sub">
        Premium wash & fold, steam pressing, and eco-friendly dry cleaning. Digital weighing at your doorstep, zero mixing, non-toxic detergents, and 24–48 hour delivery across India's top metropolitan areas.
      </p>

      <!-- Search Card -->
      <div class="search-card">
        <form class="search-form" id="searchForm">
          <input type="text" id="searchInput" class="search-input" placeholder="Enter your City, Locality, or 6-digit Pincode (e.g. Indiranagar, 560038)" required>
          <button type="submit" class="search-btn">Find Laundry Near Me</button>
        </form>
        <div id="searchStatus" class="search-hint" style="display: none; font-weight: 600;"></div>
        <div class="search-hint">Popular hubs near you:</div>
        <div class="quick-links">
          <a href="/bangalore.html">Bengaluru (Indiranagar / HSR / Whitefield)</a>
          <a href="/mumbai.html">Mumbai (Andheri / Bandra / Powai)</a>
          <a href="/delhi-ncr.html">Delhi NCR (Gurgaon / Noida)</a>
          <a href="/hyderabad.html">Hyderabad (Hitec City)</a>
          <a href="/pune.html">Pune (Hinjewadi)</a>
          <a href="/chennai.html">Chennai (OMR)</a>
        </div>
      </div>

      <div class="trust-bar">
        <div class="trust-item">
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
          Digital Scale at Doorstep
        </div>
        <div class="trust-item">
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
          100% Individual Machine Cycles
        </div>
        <div class="trust-item">
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
          Fabric Warranty Protection
        </div>
        <div class="trust-item">
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
          24h Express Available
        </div>
      </div>
    </div>
  </section>

  <!-- Transparent Services & Pricing -->
  <section class="container" id="services">
    <div class="section-head">
      <div class="section-tag">Direct From The Factory Hub</div>
      <h2 class="section-title">Transparent Pricing With Zero Hidden Fees</h2>
      <p class="section-desc">We weigh your garments right in front of you. No surprise surcharges, no minimum delivery fees above ₹200.</p>
    </div>

    <div class="services-grid">
      <!-- Card 1 -->
      <div class="service-card popular">
        <span class="service-badge">Most Popular</span>
        <div class="card-icon">🧺</div>
        <h3 class="card-title">Wash & Fold Laundry</h3>
        <div class="card-price">₹69 <span>/ kg</span></div>
        <p class="card-desc">Ideal for daily casual wear, t-shirts, jeans, gym wear, nightwear, and undergarments.</p>
        <ul class="feature-list">
          <li>Organic germicidal detergents</li>
          <li>Tumble dry & warm sanitized air</li>
          <li>Neat vacuum-tight folding</li>
          <li>Digital doorstep weighing</li>
        </ul>
        <a href="/book.html?service=wash-fold" class="btn-card">Book Wash & Fold</a>
      </div>

      <!-- Card 2 -->
      <div class="service-card">
        <div class="card-icon">👔</div>
        <h3 class="card-title">Wash & Steam Iron</h3>
        <div class="card-price">₹99 <span>/ kg</span></div>
        <p class="card-desc">Complete laundry with commercial high-pressure steam pressing. Delivered crisp and ready to wear.</p>
        <ul class="feature-list">
          <li>Deep wash + fabric softening rinse</li>
          <li>No-shine high pressure steam iron</li>
          <li>Delivered on hangers or folded</li>
          <li>Collar & cuff detail treatment</li>
        </ul>
        <a href="/book.html?service=wash-iron" class="btn-card">Book Wash & Iron</a>
      </div>

      <!-- Card 3 -->
      <div class="service-card">
        <div class="card-icon">✨</div>
        <h3 class="card-title">Eco Dry Cleaning</h3>
        <div class="card-price">₹149 <span>/ piece+</span></div>
        <p class="card-desc">Gentle hydrocarbon cleaning for wedding suits, Banarasi silks, designer lehengas, and woolens.</p>
        <ul class="feature-list">
          <li>100% PERC-free solvent process</li>
          <li>Stain spotting & color restoration</li>
          <li>Breathable protective garment bags</li>
          <li>Suits ₹299 • Silk Sarees ₹199</li>
        </ul>
        <a href="/book.html?service=dry-clean" class="btn-card">Book Dry Cleaning</a>
      </div>

      <!-- Card 4 -->
      <div class="service-card">
        <div class="card-icon">👟</div>
        <h3 class="card-title">Shoe Spa & Restoration</h3>
        <div class="card-price">₹249 <span>/ pair</span></div>
        <p class="card-desc">Deep cleaning, anti-fungal sterilization, and sole restoration for sneakers, suede, and leather boots.</p>
        <ul class="feature-list">
          <li>Midsole & outsole scrub</li>
          <li>Inner deodorization & drying</li>
          <li>Suede and nubuck rejuvenation</li>
          <li>Lace cleaning & repackaging</li>
        </ul>
        <a href="/book.html?service=shoe-spa" class="btn-card secondary">Book Shoe Spa</a>
      </div>
    </div>
  </section>

  <!-- Interactive Price Estimator -->
  <section class="container" style="padding-top: 0;">
    <div class="calc-section">
      <div style="text-align: center; margin-bottom: 2rem;">
        <h3 style="font-size: 1.6rem; font-weight: 800; margin-bottom: 0.4rem;">Live Laundry Rate Estimator</h3>
        <p style="color: var(--text-muted); font-size: 0.95rem;">Drag the sliders below to estimate your exact order cost before booking.</p>
      </div>

      <div class="calc-grid">
        <div>
          <div class="calc-item">
            <div class="calc-label">
              <span>Wash & Fold Laundry (₹69/kg)</span>
              <span id="valWash" style="color: var(--primary); font-weight: 700;">4 kg</span>
            </div>
            <input type="range" id="calcWashKg" class="calc-range" min="0" max="25" value="4">
          </div>

          <div class="calc-item">
            <div class="calc-label">
              <span>Wash & Steam Iron (₹99/kg)</span>
              <span id="valIron" style="color: var(--primary); font-weight: 700;">2 kg</span>
            </div>
            <input type="range" id="calcIronKg" class="calc-range" min="0" max="25" value="2">
          </div>

          <div class="calc-item">
            <div class="calc-label">
              <span>Dry Cleaned Pieces (Avg ₹199/pc)</span>
              <span id="valDry" style="color: var(--primary); font-weight: 700;">1 pcs</span>
            </div>
            <input type="range" id="calcDryClean" class="calc-range" min="0" max="10" value="1">
          </div>
        </div>

        <div class="calc-result-box">
          <div class="calc-total-label">Estimated Total Order Value</div>
          <div class="calc-total-amount" id="calcTotal">₹673</div>
          <p style="font-size: 0.85rem; color: #64748b; margin-bottom: 1.25rem;">Includes 100% Free Doorstep Pickup & Delivery</p>
          <a href="/book.html" class="btn-card" style="width: 100%;">Reserve Pickup Slot</a>
        </div>
      </div>
    </div>
  </section>

  <!-- How It Works -->
  <section class="container" style="background: #ffffff; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); max-width: 100%; padding: 4rem 1.25rem;">
    <div style="max-width: 1200px; margin: 0 auto;">
      <div class="section-head">
        <div class="section-tag">Seamless & Tech-Enabled</div>
        <h2 class="section-title">How Doorstep Laundry Works In 4 Easy Steps</h2>
        <p class="section-desc">You never have to visit a crowded dhobi or local store again.</p>
      </div>

      <div class="steps-grid">
        <div class="step-card">
          <div class="step-num">1</div>
          <h3 class="step-title">Book In 30 Seconds</h3>
          <p class="step-desc">Pick your preferred morning or evening pickup slot via our site or instant WhatsApp link.</p>
        </div>

        <div class="step-card">
          <div class="step-num">2</div>
          <h3 class="step-title">Digital Doorstep Weighing</h3>
          <p class="step-desc">Our verified rider weighs your load with a hanging electronic scale in front of you and hands you a digital receipt.</p>
        </div>

        <div class="step-card">
          <div class="step-num">3</div>
          <h3 class="step-title">Eco-Friendly Wash & Press</h3>
          <p class="step-desc">Processed in dedicated machine batches using water-softened pure water and dermatologist-tested detergents.</p>
        </div>

        <div class="step-card">
          <div class="step-num">4</div>
          <h3 class="step-title">Crisp Doorstep Delivery</h3>
          <p class="step-desc">Returned within 24 to 48 hours, packed in eco-friendly protective wrappers, folded or hung crisp.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Local Corridors SEO -->
  <section class="container">
    <div class="section-head">
      <div class="section-tag">Hyperlocal Service Hubs</div>
      <h2 class="section-title">Find Doorstep Laundry Hubs Near Your City</h2>
      <p class="section-desc">We operate dedicated express riders across key Indian tech corridors and residential towers.</p>
    </div>

    <div class="cities-grid">
      ${CITIES.map(c => `
      <a href="/${c.slug}.html" class="city-card">
        <h3>📍 ${c.name}</h3>
        <div class="city-areas"><strong>Coverage:</strong> ${c.areas.slice(0, 6).join(', ')}...</div>
        <div class="city-cta">View Local Rates & Pincodes →</div>
      </a>
      `).join('')}
    </div>
  </section>

  <!-- FAQs Section -->
  <section class="container" style="padding-top: 0;">
    <div class="section-head">
      <div class="section-tag">Got Questions?</div>
      <h2 class="section-title">Frequently Asked Questions</h2>
      <p class="section-desc">Everything you need to know about our doorstep laundry and dry cleaning process.</p>
    </div>

    <div class="faq-wrap">
      <details class="faq-item" open>
        <summary class="faq-question">How does LaundryNear.online doorstep pickup work?</summary>
        <div class="faq-answer">
          Simply select your preferred slot online or via WhatsApp. A verified logistics rider arrives at your doorstep with an electronic calibrated hanging scale, confirms the weight with you, and transfers your garments into sealed hygienic laundry bags. Your clothes are returned fresh within 24 to 48 hours.
        </div>
      </details>

      <details class="faq-item">
        <summary class="faq-question">What is the rate per kg for daily laundry near me?</summary>
        <div class="faq-answer">
          Our standard Wash & Fold laundry is ₹69 per kg (minimum order 3 kg). If you want high-pressure commercial steam pressing included, Wash & Steam Iron is ₹99 per kg. There are no hidden fees or delivery surcharges above ₹200.
        </div>
      </details>

      <details class="faq-item">
        <summary class="faq-question">Are my garments washed in individual machines?</summary>
        <div class="faq-answer">
          Yes, 100%. We strictly follow individual machine batch processing. Your laundry is never combined or mixed with another customer's clothes, ensuring maximum hygiene, zero cross-contamination, and zero lost items.
        </div>
      </details>

      <details class="faq-item">
        <summary class="faq-question">Do you clean expensive Banarasi sarees, wedding suits, and blazers?</summary>
        <div class="faq-answer">
          Yes. Our Eco Dry Cleaning division handles delicate silks, zardozi embroidery, bespoke tuxedos, and designer lehengas using specialized non-toxic hydrocarbon solvents (zero carcinogenic PERC) and computerized fabric spotting.
        </div>
      </details>

      <details class="faq-item">
        <summary class="faq-question">Is express 24-hour turnaround available?</summary>
        <div class="faq-answer">
          Yes! We offer a guaranteed 24-Hour Express turnaround for a flat add-on of ₹149. Select "Express 24H" when booking or notify our rider at pickup.
        </div>
      </details>
    </div>
  </section>

  ${footerHtml()}
  <script src="/js/main.js"></script>
</body>
</html>`;

  writeFileSync(join(ROOT, 'index.html'), html);
  console.log('✓ Created index.html');
}

// 2. Generate City Pages
function generateCityPages() {
  for (const c of CITIES) {
    const schema = {
      "@context": "https://schema.org",
      "@type": "DryCleaningOrLaundry",
      "name": `LaundryNear.online - Doorstep Laundry ${c.name}`,
      "url": `${ORIGIN}/${c.slug}.html`,
      "telephone": "+91-7892240243",
      "priceRange": "₹₹",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": c.name,
        "addressRegion": c.state,
        "addressCountry": "IN"
      },
      "areaServed": c.areas.map(a => ({ "@type": "AdministrativeArea", "name": a })),
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "2450"
      }
    };

    const html = `${baseHead(c.title, c.desc, `/${c.slug}.html`, schema)}
    ${headerHtml(`/${c.slug}.html`)}

    <section class="hero" style="padding: 3rem 1.25rem 2.5rem;">
      <div class="hero-inner">
        <div class="badge-pill">
          <span>📍 Local Hub: ${c.name}</span>
          <span>•</span>
          <span>⚡ 60-Min Pickup Dispatch</span>
        </div>
        <h1 class="hero-title" style="font-size: 2.3rem;">
          Doorstep Laundry & Eco Dry Cleaning in <span class="text-gradient">${c.name}</span>
        </h1>
        <p class="hero-sub">${c.desc}</p>
        
        <div class="search-card">
          <form class="search-form" id="searchForm">
            <input type="text" id="searchInput" class="search-input" value="${c.areas[0]}" placeholder="Enter locality in ${c.name}">
            <button type="submit" class="search-btn">Check Pickup Slot</button>
          </form>
          <div id="searchStatus" class="search-hint" style="color: #059669; font-weight: 700; margin-top: 0.5rem;">
            ✓ Active coverage across ${c.name}! Free doorstep collection available today.
          </div>
        </div>
      </div>
    </section>

    <section class="container">
      <div class="section-head">
        <div class="section-tag">Key Neighborhoods Served</div>
        <h2 class="section-title">Doorstep Laundry Corridors Across ${c.name}</h2>
        <p class="section-desc">Our dedicated logistics riders cover every major tech corridor and residential area:</p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 3rem;">
        ${c.areas.map(a => `
        <div style="background: #ffffff; padding: 1rem; border-radius: 8px; border: 1px solid var(--border); text-align: center; font-weight: 600;">
          🧺 Laundry in ${a}
        </div>
        `).join('')}
      </div>

      <div class="services-grid">
        <div class="service-card popular">
          <h3 class="card-title">Daily Wash & Fold</h3>
          <div class="card-price">₹69 <span>/ kg</span></div>
          <p class="card-desc">Daily wear laundry weighed in your presence in ${c.name}. Free home pickup & drop.</p>
          <a href="/book.html?city=${c.slug}&service=wash-fold" class="btn-card">Book in ${c.name}</a>
        </div>

        <div class="service-card">
          <h3 class="card-title">Wash & Steam Iron</h3>
          <div class="card-price">₹99 <span>/ kg</span></div>
          <p class="card-desc">Work wear and formals washed, sanitized and crisp steam ironed on hangers.</p>
          <a href="/book.html?city=${c.slug}&service=wash-iron" class="btn-card">Book Wash & Iron</a>
        </div>

        <div class="service-card">
          <h3 class="card-title">Eco Dry Cleaning</h3>
          <div class="card-price">₹149 <span>/ piece+</span></div>
          <p class="card-desc">Silks, lehengas, suits, blazers cleaned in zero-toxin hydrocarbon fluids.</p>
          <a href="/book.html?city=${c.slug}&service=dry-clean" class="btn-card">Book Dry Cleaning</a>
        </div>
      </div>
    </section>

    ${footerHtml()}
    <script src="/js/main.js"></script>
  </body>
  </html>`;

    writeFileSync(join(ROOT, `${c.slug}.html`), html);
    console.log(`✓ Created ${c.slug}.html`);
  }
}

// 3. Generate Regional Voice & Typed Search Hubs
function generateLanguagePages() {
  for (const l of LANGUAGES) {
    const dir = join(ROOT, l.code);
    mkdirSync(dir, { recursive: true });

    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "DryCleaningOrLaundry",
          "@id": `${ORIGIN}/#business`,
          "name": "LaundryNear.online",
          "alternateName": `LaundryNear.online - ${l.name} (${l.englishName})`,
          "inLanguage": l.lang,
          "url": `${ORIGIN}/${l.code}/`,
          "telephone": "+91-7892240243",
          "priceRange": "₹₹",
          "description": l.metaDesc,
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "IN"
          }
        },
        {
          "@type": "WebPage",
          "@id": `${ORIGIN}/${l.code}/#webpage`,
          "url": `${ORIGIN}/${l.code}/`,
          "name": l.metaTitle,
          "description": l.metaDesc,
          "inLanguage": l.code,
          "keywords": `${l.textSearchKeywords}, doorstep laundry near me, dry cleaning rates`,
          "speakable": {
            "@type": "SpeakableSpecification",
            "cssSelector": [".voice-h1", ".voice-answer", ".faq-answer", ".badge-pill"]
          }
        },
        {
          "@type": "FAQPage",
          "@id": `${ORIGIN}/${l.code}/#faq`,
          "inLanguage": l.code,
          "mainEntity": (l.typedSearches || []).map(t => ({
            "@type": "Question",
            "name": `${t.nativeQuery} (${t.romanQuery})`,
            "alternateName": t.romanQuery,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": t.answer
            }
          }))
        }
      ]
    };

    const hreflangTags = [
      `<link rel="alternate" hreflang="x-default" href="${ORIGIN}/">`,
      `<link rel="alternate" hreflang="en-IN" href="${ORIGIN}/">`,
      ...LANGUAGES.map(langItem => `<link rel="alternate" hreflang="${langItem.lang}" href="${ORIGIN}/${langItem.code}/">`)
    ].join('\n  ');

    const html = `<!DOCTYPE html>
<html lang="${l.code}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${l.metaTitle}</title>
  <meta name="description" content="${l.metaDesc}">
  <meta name="keywords" content="${l.textSearchKeywords}">
  <link rel="canonical" href="${ORIGIN}/${l.code}/">
  <link rel="stylesheet" href="/css/style.css">
  
  <meta property="og:title" content="${l.metaTitle}">
  <meta property="og:description" content="${l.metaDesc}">
  <meta property="og:image" content="${ORIGIN}/assets/og-image.png">
  ${hreflangTags}
  
  <script type="application/ld+json">${JSON.stringify(schema, null, 2)}</script>
</head>
<body>
  ${headerHtml(`/${l.code}/`)}

  <section class="hero" style="padding: 3.5rem 1.25rem 2.5rem;">
    <div class="hero-inner">
      <div class="badge-pill">
        <span>🗣️ ${l.name} Voice & Typed Search Friendly</span>
        <span>•</span>
        <span>🚚 Free Pickup</span>
      </div>
      <h1 class="hero-title voice-h1" style="font-size: 2.3rem;">${l.h1}</h1>
      <p class="hero-sub" style="font-size: 1.15rem; line-height: 1.7;">${l.tagline}</p>
      
      <div style="background: #ffffff; border-radius: 14px; padding: 1.75rem; border: 1px solid var(--border); box-shadow: var(--shadow); max-width: 750px; margin: 0 auto; text-align: left;">
        <h3 style="font-size: 1.15rem; color: var(--primary-dark); margin-bottom: 0.75rem;">💡 सीधी जानकारी (Direct Answers):</h3>
        <p class="voice-answer" style="color: var(--text-muted); font-size: 1rem; line-height: 1.7; margin-bottom: 1rem;">
          ${l.voiceAnswer}
        </p>
        <div style="background: var(--primary-light); padding: 0.85rem 1.15rem; border-radius: 8px; font-weight: 700; color: var(--primary-dark); margin-bottom: 1.25rem;">
          💰 रेट लिस्ट (Price List): ${l.rateInfo}
        </div>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <a href="/book.html" class="btn-card" style="flex: 1; text-align: center;">ऑनलाइन पिकअप बुक करें</a>
          <a href="https://wa.me/917892240243?text=${encodeURIComponent(l.whatsappCTA)}" class="btn-card" style="flex: 1; background: #25D366; text-align: center;" target="_blank" rel="noopener">व्हाट्सएप पर ऑर्डर करें</a>
        </div>
      </div>
    </div>
  </section>

  <!-- High-Intent Voice & Typed Search FAQ Section -->
  <section class="container" style="padding: 2.5rem 1.25rem 4rem;">
    <div class="section-head">
      <div class="section-tag">🗣️ Voice Mic & Typed Search Intent</div>
      <h2 class="section-title">अक्सर पूछे जाने वाले सवाल (Frequently Asked Questions)</h2>
      <p class="section-desc">Google Voice Search और हिंग्लिश / रीजनल टाइप की गई आम सर्च के सीधे उत्तर:</p>
    </div>

    <div class="faq-wrap" style="max-width: 800px; margin: 0 auto;">
      ${(l.typedSearches || []).map((item, idx) => `
      <details class="faq-item" ${idx === 0 ? 'open' : ''} style="margin-bottom: 1rem; background: #ffffff; border: 1px solid var(--border); border-radius: 10px; overflow: hidden;">
        <summary class="faq-question" style="padding: 1.15rem 1.25rem; font-weight: 700; cursor: pointer; display: flex; justify-content: space-between; align-items: center;">
          <span>${item.nativeQuery}</span>
          <span style="font-size: 0.8rem; background: var(--primary-light); color: var(--primary-dark); padding: 0.2rem 0.5rem; border-radius: 4px; margin-left: 0.5rem; font-weight: 600;">${item.romanQuery}</span>
        </summary>
        <div class="faq-answer" style="padding: 1rem 1.25rem 1.25rem; color: var(--text-muted); line-height: 1.7; border-top: 1px solid var(--border); font-size: 0.98rem;">
          ${item.answer}
        </div>
      </details>
      `).join('')}
    </div>

    <div style="text-align: center; margin-top: 2.5rem;">
      <a href="/pricing.html" class="btn-primary" style="display: inline-block; padding: 0.85rem 1.75rem; border-radius: 8px; font-weight: 700; text-decoration: none; margin-right: 0.75rem;">पूरी रेट लिस्ट देखें</a>
      <a href="/book.html" class="btn-primary" style="display: inline-block; padding: 0.85rem 1.75rem; border-radius: 8px; font-weight: 700; text-decoration: none; background: #10b981;">60 मिनट में पिकअप बुक करें</a>
    </div>
  </section>

  ${footerHtml()}
  <script src="/js/main.js"></script>
</body>
</html>`;

    writeFileSync(join(dir, 'index.html'), html);
    console.log(`✓ Created ${l.code}/index.html`);
  }
}

// 4. Generate Pricing, Book, Franchise, and Legal Pages
function generateOtherPages() {
  // Pricing Page
  const pricingHtml = `${baseHead(
    'Rate Card & Pricing | Doorstep Laundry ₹69/kg & Dry Cleaning Rates',
    'Transparent rate card for LaundryNear.online. Wash & fold ₹69/kg, steam iron ₹99/kg, suits ₹299, silk sarees ₹199, shoes ₹249. No hidden charges, digital weighing.',
    '/pricing.html'
  )}
  ${headerHtml('/pricing.html')}
  <section class="container">
    <div class="section-head">
      <div class="section-tag">100% Transparent Price List</div>
      <h1 class="section-title">Clear & Honest Laundry Rates</h1>
      <p class="section-desc">Weighed at your doorstep with certified digital scales. No delivery charge for orders above ₹200.</p>
    </div>

    <div style="max-width: 900px; margin: 0 auto; background: #fff; border: 1px solid var(--border); border-radius: 14px; overflow: hidden; box-shadow: var(--shadow-sm);">
      <table style="width: 100%; border-collapse: collapse; text-align: left;">
        <thead style="background: var(--bg-light); border-bottom: 2px solid var(--border);">
          <tr>
            <th style="padding: 1rem 1.25rem; font-weight: 700;">Service Category</th>
            <th style="padding: 1rem 1.25rem; font-weight: 700;">Rate (INR)</th>
            <th style="padding: 1rem 1.25rem; font-weight: 700;">Turnaround</th>
          </tr>
        </thead>
        <tbody style="font-size: 0.95rem;">
          <tr style="border-bottom: 1px solid var(--border);">
            <td style="padding: 1rem 1.25rem;"><strong>Wash & Fold Laundry</strong><br><small style="color: #64748b;">Daily casuals, t-shirts, nightwear, shorts (Min 3 kg)</small></td>
            <td style="padding: 1rem 1.25rem; color: var(--primary-dark); font-weight: 700;">₹69 / kg</td>
            <td style="padding: 1rem 1.25rem;">24-48 Hours</td>
          </tr>
          <tr style="border-bottom: 1px solid var(--border);">
            <td style="padding: 1rem 1.25rem;"><strong>Wash & High-Pressure Steam Iron</strong><br><small style="color: #64748b;">Shirts, trousers, formals, kurtas washed & steam ironed (Min 3 kg)</small></td>
            <td style="padding: 1rem 1.25rem; color: var(--primary-dark); font-weight: 700;">₹99 / kg</td>
            <td style="padding: 1rem 1.25rem;">24-48 Hours</td>
          </tr>
          <tr style="border-bottom: 1px solid var(--border);">
            <td style="padding: 1rem 1.25rem;"><strong>Steam Pressing Only</strong><br><small style="color: #64748b;">Clean garments ironed on commercial vertical steam press</small></td>
            <td style="padding: 1rem 1.25rem; color: var(--primary-dark); font-weight: 700;">₹29 / piece</td>
            <td style="padding: 1rem 1.25rem;">24 Hours</td>
          </tr>
          <tr style="border-bottom: 1px solid var(--border);">
            <td style="padding: 1rem 1.25rem;"><strong>Men's Suit / Tuxedo (2 Pc) Dry Clean</strong><br><small style="color: #64748b;">Coat + Trouser in hydrocarbon eco solvent with shape restoration</small></td>
            <td style="padding: 1rem 1.25rem; color: var(--primary-dark); font-weight: 700;">₹299 / set</td>
            <td style="padding: 1rem 1.25rem;">48-72 Hours</td>
          </tr>
          <tr style="border-bottom: 1px solid var(--border);">
            <td style="padding: 1rem 1.25rem;"><strong>Silk Saree / Designer Saree Dry Clean</strong><br><small style="color: #64748b;">Kanjivaram, Banarasi, chiffon with roll polish & charak finish</small></td>
            <td style="padding: 1rem 1.25rem; color: var(--primary-dark); font-weight: 700;">₹199 / piece</td>
            <td style="padding: 1rem 1.25rem;">48-72 Hours</td>
          </tr>
          <tr style="border-bottom: 1px solid var(--border);">
            <td style="padding: 1rem 1.25rem;"><strong>Sneaker / Leather Shoe Spa</strong><br><small style="color: #64748b;">Deep clean, midsole brightening, anti-microbial deodorizing</small></td>
            <td style="padding: 1rem 1.25rem; color: var(--primary-dark); font-weight: 700;">₹249 / pair</td>
            <td style="padding: 1rem 1.25rem;">48 Hours</td>
          </tr>
          <tr>
            <td style="padding: 1rem 1.25rem;"><strong>Curtain & Heavy Blanket Care</strong><br><small style="color: #64748b;">Heavy curtains, quilts, duvet sanitization</small></td>
            <td style="padding: 1rem 1.25rem; color: var(--primary-dark); font-weight: 700;">₹199 / panel</td>
            <td style="padding: 1rem 1.25rem;">48 Hours</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div style="text-align: center; margin-top: 2.5rem;">
      <a href="/book.html" class="btn-card" style="display: inline-block; padding: 0.85rem 2.5rem; font-size: 1.1rem;">Schedule Your Free Pickup Now</a>
    </div>
  </section>
  ${footerHtml()}
  <script src="/js/main.js"></script>
</body>
</html>`;
  writeFileSync(join(ROOT, 'pricing.html'), pricingHtml);

  // Book Page
  const bookHtml = `${baseHead(
    'Book Doorstep Laundry & Dry Cleaning Pickup | LaundryNear.online',
    'Schedule your doorstep laundry pickup in 30 seconds. Choose your service, preferred time slot, and address. Verified scale weighing at your doorstep.',
    '/book.html'
  )}
  ${headerHtml('/book.html')}
  <section class="container">
    <div class="section-head">
      <div class="section-tag">Quick Doorstep Dispatch</div>
      <h1 class="section-title">Schedule Laundry Pickup</h1>
      <p class="section-desc">Our rider will arrive with an ISI-certified hanging scale during your chosen slot.</p>
    </div>

    <div style="max-width: 650px; margin: 0 auto; background: #fff; padding: 2.25rem; border-radius: 16px; border: 1px solid var(--border); box-shadow: var(--shadow);">
      <form id="bookingForm" onsubmit="event.preventDefault(); alert('Pickup request received! Our dispatch team will confirm your slot via SMS/WhatsApp within 10 minutes.'); window.location.href='/';">
        <div style="margin-bottom: 1.25rem;">
          <label style="display: block; font-weight: 700; margin-bottom: 0.4rem;">Select Primary Service</label>
          <select class="search-input" style="width: 100%;" required>
            <option value="wash-fold">Wash & Fold Laundry (₹69/kg)</option>
            <option value="wash-iron">Wash & Steam Iron (₹99/kg)</option>
            <option value="dry-clean">Eco Dry Cleaning (Suits, Sarees)</option>
            <option value="shoe-spa">Shoe Spa & Cleaning (₹249/pr)</option>
            <option value="curtains">Curtains & Bedding Sanitization</option>
          </select>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.25rem;">
          <div>
            <label style="display: block; font-weight: 700; margin-bottom: 0.4rem;">Full Name</label>
            <input type="text" class="search-input" style="width: 100%;" placeholder="Your name" required>
          </div>
          <div>
            <label style="display: block; font-weight: 700; margin-bottom: 0.4rem;">Mobile (for WhatsApp)</label>
            <input type="tel" class="search-input" style="width: 100%;" placeholder="10-digit number" required>
          </div>
        </div>

        <div style="margin-bottom: 1.25rem;">
          <label style="display: block; font-weight: 700; margin-bottom: 0.4rem;">Pickup Address & Landmark</label>
          <textarea class="search-input" style="width: 100%; height: 90px; resize: vertical;" placeholder="Flat/Building, Street, Landmark" required></textarea>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.75rem;">
          <div>
            <label style="display: block; font-weight: 700; margin-bottom: 0.4rem;">Pincode</label>
            <input type="text" class="search-input" style="width: 100%;" placeholder="e.g. 560038" required>
          </div>
          <div>
            <label style="display: block; font-weight: 700; margin-bottom: 0.4rem;">Preferred Slot</label>
            <select class="search-input" style="width: 100%;">
              <option>Morning (07:00 AM - 11:00 AM)</option>
              <option>Afternoon (01:00 PM - 04:00 PM)</option>
              <option>Evening (05:00 PM - 09:00 PM)</option>
            </select>
          </div>
        </div>

        <button type="submit" class="btn-card" style="width: 100%; font-size: 1.05rem; padding: 0.95rem;">Confirm Free Doorstep Pickup</button>
      </form>
      
      <div style="text-align: center; margin-top: 1.25rem; font-size: 0.88rem; color: #64748b;">
        Or book directly via WhatsApp: <a href="https://wa.me/917892240243?text=Hi%20LaundryNear.online%2C%20please%20schedule%20a%20pickup" style="color: #22c55e; font-weight: 700;">+91-7892240243</a>
      </div>
    </div>
  </section>
  ${footerHtml()}
  <script src="/js/main.js"></script>
</body>
</html>`;
  writeFileSync(join(ROOT, 'book.html'), bookHtml);

  // Franchise Page
  const franchiseHtml = `${baseHead(
    'Franchise Opportunities | Partner with LaundryNear.online',
    'Open a profitable tech-enabled laundry hub in your city. Low capex, high ROI, turnkey software, proven SOPs, and centralized marketing support.',
    '/franchise.html'
  )}
  ${headerHtml('/franchise.html')}
  <section class="container">
    <div class="section-head">
      <div class="section-tag">High-Margin Recurring Revenue</div>
      <h1 class="section-title">Partner With India's Fastest Growing Laundry Brand</h1>
      <p class="section-desc">Join the tech disruption in commercial garment care. Low initial capital expenditure, centralized customer dispatch, and 45%+ gross margins.</p>
    </div>

    <div class="steps-grid" style="margin-bottom: 3rem;">
      <div class="step-card">
        <h3 class="step-title">Centralized Demand Engine</h3>
        <p class="step-desc">All customer acquisition, digital Google Ads, and local SEO are managed centrally. Orders are automatically dispatched to your processing hub.</p>
      </div>
      <div class="step-card">
        <h3 class="step-title">Equipment & Chemical SOPs</h3>
        <p class="step-desc">Turnkey guidance for commercial washers, Italian steam boilers, and biodegradable chemical formulations.</p>
      </div>
      <div class="step-card">
        <h3 class="step-title">Turnkey ERP & Scale IoT</h3>
        <p class="step-desc">Proprietary rider software, digital scale sync, barcode tagging, and instant customer WhatsApp billing.</p>
      </div>
    </div>

    <div style="max-width: 650px; margin: 0 auto; background: #fff; padding: 2.25rem; border-radius: 16px; border: 1px solid var(--border); box-shadow: var(--shadow);">
      <h3 style="font-size: 1.4rem; font-weight: 800; margin-bottom: 1.25rem; text-align: center;">Franchise Inquiry Application</h3>
      <form onsubmit="event.preventDefault(); alert('Thank you for your inquiry. Our business development director will contact you within 24 hours.');">
        <div style="margin-bottom: 1rem;">
          <label style="display: block; font-weight: 700; margin-bottom: 0.35rem;">Full Name</label>
          <input type="text" class="search-input" style="width: 100%;" required>
        </div>
        <div style="margin-bottom: 1rem;">
          <label style="display: block; font-weight: 700; margin-bottom: 0.35rem;">Phone / WhatsApp</label>
          <input type="tel" class="search-input" style="width: 100%;" required>
        </div>
        <div style="margin-bottom: 1rem;">
          <label style="display: block; font-weight: 700; margin-bottom: 0.35rem;">Proposed City & Location</label>
          <input type="text" class="search-input" style="width: 100%;" placeholder="e.g. Pune - Hinjewadi or Bangalore - Whitefield" required>
        </div>
        <div style="margin-bottom: 1.5rem;">
          <label style="display: block; font-weight: 700; margin-bottom: 0.35rem;">Available Investment Budget</label>
          <select class="search-input" style="width: 100%;">
            <option>₹10 Lakhs - ₹15 Lakhs (Micro Processing Hub)</option>
            <option>₹15 Lakhs - ₹25 Lakhs (Full Industrial Hub)</option>
            <option>₹25 Lakhs+ (Master City Franchise)</option>
          </select>
        </div>
        <button type="submit" class="btn-card" style="width: 100%; padding: 0.95rem;">Submit Franchise Application</button>
      </form>
    </div>
  </section>
  ${footerHtml()}
  <script src="/js/main.js"></script>
</body>
</html>`;
  writeFileSync(join(ROOT, 'franchise.html'), franchiseHtml);

  // About Page
  const aboutHtml = `${baseHead(
    'About Us | LaundryNear.online',
    'Learn about LaundryNear.online: tech-enabled doorstep laundry and eco dry cleaning service. Our mission, sustainability commitment, and leadership.',
    '/about.html'
  )}
  ${headerHtml('/about.html')}
  <section class="container">
    <div class="section-head">
      <div class="section-tag">Our Story & Standards</div>
      <h1 class="section-title">Reinventing Garment Care For India</h1>
    </div>

    <div style="max-width: 800px; margin: 0 auto; background: #fff; padding: 2.5rem; border-radius: 16px; border: 1px solid var(--border); line-height: 1.8; color: var(--text-muted); font-size: 1.05rem;">
      <p style="margin-bottom: 1.5rem;">
        LaundryNear.online was launched with a single focus: <strong>eliminating the daily hassle of laundry for urban professionals and families across India</strong>. Traditional dry cleaners were opaque with pricing, local dhobis risked fabric damage and color bleeding, and pickup schedules were never dependable.
      </p>
      <p style="margin-bottom: 1.5rem;">
        We built an end-to-end, tech-enabled model centered around complete consumer transparency:
      </p>
      <ul style="margin-bottom: 1.5rem; padding-left: 1.5rem;">
        <li><strong>Calibrated Digital Scales</strong>: Weighing is conducted at your doorstep right before your eyes.</li>
        <li><strong>Dedicated Machine Runs</strong>: Garments are NEVER co-mingled with clothes from any other household.</li>
        <li><strong>Eco-Friendly Green Chemistry</strong>: 100% free of carcinogenic perchloroethylene (PERC). We use gentle, dermatologist-tested European detergents.</li>
        <li><strong>Guaranteed Turnaround</strong>: Reliable 24–48 hour delivery cycles tracked via WhatsApp.</li>
      </ul>
      <h3 style="color: var(--text-main); font-weight: 800; margin: 2rem 0 0.5rem;">Customer Care & Support</h3>
      <p>
        <strong>LaundryNear.online</strong> provides premium, eco-friendly laundry and dry cleaning services across major metropolitan areas.<br>
        <strong>Customer Care:</strong> support@laundrynear.online | +91-7892240243
      </p>
    </div>
  </section>
  ${footerHtml()}
  <script src="/js/main.js"></script>
</body>
</html>`;
  writeFileSync(join(ROOT, 'about.html'), aboutHtml);

  // Contact Page
  const contactHtml = `${baseHead(
    'Contact Us | LaundryNear.online Customer Support',
    'Get in touch with LaundryNear.online. Customer support telephone +91-7892240243, WhatsApp booking, and express doorstep service.',
    '/contact.html'
  )}
  ${headerHtml('/contact.html')}
  <section class="container">
    <div class="section-head">
      <div class="section-tag">Here To Help</div>
      <h1 class="section-title">Get In Touch</h1>
      <p class="section-desc">Have a question about an ongoing order, corporate tie-ups, or custom fabric requirements?</p>
    </div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2.5rem; max-width: 950px; margin: 0 auto;">
      <div style="background: #fff; padding: 2.25rem; border-radius: 14px; border: 1px solid var(--border);">
        <h3 style="font-size: 1.3rem; font-weight: 800; margin-bottom: 1.25rem;">Direct Channels</h3>
        <p style="margin-bottom: 1rem;">
          <strong>📞 Customer Care Desk:</strong><br>
          <a href="tel:+917892240243" style="color: var(--primary); font-weight: 700; text-decoration: none;">+91-7892240243</a><br>
          <small style="color: #64748b;">(Mon–Sun: 07:00 AM – 09:00 PM IST)</small>
        </p>
        <p style="margin-bottom: 1rem;">
          <strong>💬 Instant WhatsApp:</strong><br>
          <a href="https://wa.me/917892240243" style="color: #22c55e; font-weight: 700; text-decoration: none;" target="_blank">Chat with our Support Desk</a>
        </p>
        <p style="margin-bottom: 1rem;">
          <strong>✉️ Official Email:</strong><br>
          <a href="mailto:support@laundrynear.online" style="color: var(--primary); text-decoration: none;">support@laundrynear.online</a>
        </p>
        <p>
          <strong>📍 Operating Coverage:</strong><br>
          Doorstep pickup and delivery active across Bengaluru, Mumbai, Delhi NCR, Hyderabad, Pune, Chennai, and Kolkata.
        </p>
      </div>

      <div style="background: #fff; padding: 2.25rem; border-radius: 14px; border: 1px solid var(--border);">
        <h3 style="font-size: 1.3rem; font-weight: 800; margin-bottom: 1.25rem;">Send a Message</h3>
        <form onsubmit="event.preventDefault(); alert('Your message has been received! Our support desk will respond within 2 working hours.');">
          <div style="margin-bottom: 1rem;">
            <label style="display: block; font-weight: 600; margin-bottom: 0.3rem;">Your Name</label>
            <input type="text" class="search-input" style="width: 100%;" required>
          </div>
          <div style="margin-bottom: 1rem;">
            <label style="display: block; font-weight: 600; margin-bottom: 0.3rem;">Phone / WhatsApp</label>
            <input type="tel" class="search-input" style="width: 100%;" required>
          </div>
          <div style="margin-bottom: 1.25rem;">
            <label style="display: block; font-weight: 600; margin-bottom: 0.3rem;">Message / Inquiry</label>
            <textarea class="search-input" style="width: 100%; height: 100px;" required></textarea>
          </div>
          <button type="submit" class="btn-card" style="width: 100%; padding: 0.85rem;">Send Message</button>
        </form>
      </div>
    </div>
  </section>
  ${footerHtml()}
  <script src="/js/main.js"></script>
</body>
</html>`;
  writeFileSync(join(ROOT, 'contact.html'), contactHtml);

  // Privacy Policy (DPDP 2023 compliant)
  const privacyHtml = `${baseHead('Privacy Policy | LaundryNear.online', 'Privacy policy for LaundryNear.online compliant with the Digital Personal Data Protection (DPDP) Act 2023 of India.', '/privacy.html')}
  ${headerHtml('/privacy.html')}
  <section class="container">
    <div style="max-width: 800px; margin: 0 auto; background: #fff; padding: 2.5rem; border-radius: 14px; border: 1px solid var(--border); line-height: 1.7; font-size: 0.95rem; color: #334155;">
      <h1 style="font-size: 2rem; font-weight: 800; margin-bottom: 1rem; color: var(--text-main);">Privacy Policy</h1>
      <p style="color: #64748b; margin-bottom: 1.5rem;">Last Updated: November 2, 2026 | Compliant with DPDP Act 2023 (India)</p>
      
      <h3 style="color: var(--text-main); margin-top: 1.5rem; margin-bottom: 0.5rem;">1. Introduction & Data Controller</h3>
      <p>This Privacy Policy explains how LaundryNear.online collects, processes, and protects your personal data when you use our website and logistics services.</p>
      
      <h3 style="color: var(--text-main); margin-top: 1.5rem; margin-bottom: 0.5rem;">2. Information We Collect</h3>
      <p>We collect essential operational data only: customer name, telephone number (for SMS/WhatsApp delivery updates), pickup and delivery address with geolocation markers, and digital order receipts.</p>
      
      <h3 style="color: var(--text-main); margin-top: 1.5rem; margin-bottom: 0.5rem;">3. Data Security & Storage</h3>
      <p>All data is transmitted via TLS 1.3 encryption and hosted on secure Cloudflare edge infrastructure. We never sell, rent, or trade your personal data to third-party marketing companies.</p>

      <h3 style="color: var(--text-main); margin-top: 1.5rem; margin-bottom: 0.5rem;">4. Grievance Redressal</h3>
      <p>Under the DPDP Act 2023, you have the right to request deletion or correction of your personal information. Contact our Grievance Officer at: support@laundrynear.online.</p>
    </div>
  </section>
  ${footerHtml()}
  <script src="/js/main.js"></script>
</body>
</html>`;
  writeFileSync(join(ROOT, 'privacy.html'), privacyHtml);

  // Terms Page
  const termsHtml = `${baseHead('Terms of Service | LaundryNear.online', 'Terms and conditions for doorstep laundry and dry cleaning by LaundryNear.online.', '/terms.html')}
  ${headerHtml('/terms.html')}
  <section class="container">
    <div style="max-width: 800px; margin: 0 auto; background: #fff; padding: 2.5rem; border-radius: 14px; border: 1px solid var(--border); line-height: 1.7; font-size: 0.95rem; color: #334155;">
      <h1 style="font-size: 2rem; font-weight: 800; margin-bottom: 1rem; color: var(--text-main);">Terms of Service</h1>
      <p style="color: #64748b; margin-bottom: 1.5rem;">Last Updated: November 2, 2026</p>
      
      <h3 style="color: var(--text-main); margin-top: 1.5rem; margin-bottom: 0.5rem;">1. Service Agreement</h3>
      <p>By scheduling a pickup on LaundryNear.online, you engage LaundryNear.online to perform laundry, steam pressing, and dry cleaning services under these terms.</p>
      
      <h3 style="color: var(--text-main); margin-top: 1.5rem; margin-bottom: 0.5rem;">2. Weighing & Pricing</h3>
      <p>All weight-based orders (Wash & Fold, Wash & Iron) are weighed on calibrated digital scales at pickup in your presence. The weight confirmed on the digital scale is final.</p>

      <h3 style="color: var(--text-main); margin-top: 1.5rem; margin-bottom: 0.5rem;">3. Fabric Care & Liability Limits</h3>
      <p>We treat every garment with highest professional care following manufacturer wash labels. In the unlikely event of verified fabric damage attributable to our equipment, our liability is capped at up to 10 times the cleaning charge for that specific item.</p>

      <h3 style="color: var(--text-main); margin-top: 1.5rem; margin-bottom: 0.5rem;">4. Jurisdiction</h3>
      <p>All disputes arising out of these terms shall be subject to the exclusive jurisdiction of the competent courts in India.</p>
    </div>
  </section>
  ${footerHtml()}
  <script src="/js/main.js"></script>
</body>
</html>`;
  writeFileSync(join(ROOT, 'terms.html'), termsHtml);

  // Cancellation and Refund Policy
  const refundHtml = `${baseHead('Cancellation & Refund Policy | LaundryNear.online', 'Cancellation and refund policies for LaundryNear.online doorstep laundry and dry cleaning services.', '/cancellation-refund.html')}
  ${headerHtml('/cancellation-refund.html')}
  <section class="container">
    <div style="max-width: 800px; margin: 0 auto; background: #fff; padding: 2.5rem; border-radius: 14px; border: 1px solid var(--border); line-height: 1.7; font-size: 0.95rem; color: #334155;">
      <h1 style="font-size: 2rem; font-weight: 800; margin-bottom: 1rem; color: var(--text-main);">Cancellation & Refund Policy</h1>
      <p style="color: #64748b; margin-bottom: 1.5rem;">Last Updated: November 2, 2026</p>
      
      <h3 style="color: var(--text-main); margin-top: 1.5rem; margin-bottom: 0.5rem;">1. Pickup Cancellation</h3>
      <p>You can reschedule or cancel a booked pickup slot without any penalty up to 30 minutes before the scheduled time window via WhatsApp or our customer care number (+91-7892240243).</p>
      
      <h3 style="color: var(--text-main); margin-top: 1.5rem; margin-bottom: 0.5rem;">2. Quality Guarantee & Re-Cleaning</h3>
      <p>If you are not 100% satisfied with the cleanliness, stain removal, or steam iron finish on any delivered item, notify us within 24 hours of delivery. We will pick up the item and re-clean or re-iron it <strong>100% free of charge</strong>.</p>

      <h3 style="color: var(--text-main); margin-top: 1.5rem; margin-bottom: 0.5rem;">3. Monetary Refunds</h3>
      <p>In cases where a prepaid charge was processed and service could not be fulfilled, refunds are initiated back to the original payment method within 3 to 5 banking business days.</p>
    </div>
  </section>
  ${footerHtml()}
  <script src="/js/main.js"></script>
</body>
</html>`;
  writeFileSync(join(ROOT, 'cancellation-refund.html'), refundHtml);

  // Delivery Policy
  const deliveryHtml = `${baseHead('Doorstep Pickup & Delivery Policy | LaundryNear.online', 'Comprehensive pickup and delivery logistics policies for LaundryNear.online.', '/delivery-policy.html')}
  ${headerHtml('/delivery-policy.html')}
  <section class="container">
    <div style="max-width: 800px; margin: 0 auto; background: #fff; padding: 2.5rem; border-radius: 14px; border: 1px solid var(--border); line-height: 1.7; font-size: 0.95rem; color: #334155;">
      <h1 style="font-size: 2rem; font-weight: 800; margin-bottom: 1rem; color: var(--text-main);">Doorstep Pickup & Delivery Policy</h1>
      <p style="color: #64748b; margin-bottom: 1.5rem;">Last Updated: November 2, 2026</p>
      
      <h3 style="color: var(--text-main); margin-top: 1.5rem; margin-bottom: 0.5rem;">1. Service Time Slots</h3>
      <p>Pickups and deliveries operate 7 days a week across three primary slots: Morning (07:00 AM - 11:00 AM), Afternoon (01:00 PM - 04:00 PM), and Evening (05:00 PM - 09:00 PM).</p>
      
      <h3 style="color: var(--text-main); margin-top: 1.5rem; margin-bottom: 0.5rem;">2. Free Delivery Minimum</h3>
      <p>Doorstep pickup and delivery are 100% free on all orders with a total bill value of ₹200 or higher. For orders below ₹200, a standard nominal rider convenience charge of ₹40 is applied.</p>

      <h3 style="color: var(--text-main); margin-top: 1.5rem; margin-bottom: 0.5rem;">3. Standard vs. Express Turnaround</h3>
      <p>Standard turnaround is 24 to 48 hours depending on fabric requirements (dry clean items require 48 hours for solvent evaporation). Express 24-Hour delivery is available for urgent requirements with an add-on fee of ₹149.</p>
    </div>
  </section>
  ${footerHtml()}
  <script src="/js/main.js"></script>
</body>
</html>`;
  writeFileSync(join(ROOT, 'delivery-policy.html'), deliveryHtml);

  // 404 Page
  const notFoundHtml = `${baseHead('Page Not Found | LaundryNear.online', 'The requested page was not found on LaundryNear.online.', '/404.html')}
  ${headerHtml('/404.html')}
  <section class="container" style="text-align: center; padding: 5rem 1.25rem;">
    <h1 style="font-size: 5rem; font-weight: 900; color: var(--primary); margin-bottom: 1rem;">404</h1>
    <h2 style="font-size: 1.8rem; margin-bottom: 1rem;">Oops! That page seems to have wandered off.</h2>
    <p style="color: var(--text-muted); max-width: 500px; margin: 0 auto 2rem;">
      The page you are looking for does not exist or has been moved. Find laundry services near you below:
    </p>
    <a href="/" class="btn-card" style="display: inline-block; padding: 0.85rem 2rem;">Return to Homepage</a>
  </section>
  ${footerHtml()}
</body>
</html>`;
  writeFileSync(join(ROOT, '404.html'), notFoundHtml);
}

// 5. Generate XML Sitemap
function generateSitemap() {
  const pages = [
    { url: '/', priority: '1.0' },
    { url: '/pricing.html', priority: '0.9' },
    { url: '/book.html', priority: '0.9' },
    ...CITIES.map(c => ({ url: `/${c.slug}.html`, priority: '0.85' })),
    ...LANGUAGES.map(l => ({ url: `/${l.code}/`, priority: '0.85' })),
    { url: '/franchise.html', priority: '0.8' },
    { url: '/about.html', priority: '0.7' },
    { url: '/contact.html', priority: '0.7' },
    { url: '/privacy.html', priority: '0.6' },
    { url: '/terms.html', priority: '0.6' },
    { url: '/cancellation-refund.html', priority: '0.6' },
    { url: '/delivery-policy.html', priority: '0.6' }
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages.map(p => `  <url>
    <loc>${ORIGIN}${p.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>${p.priority}</priority>
    ${LANGUAGES.map(l => `<xhtml:link rel="alternate" hreflang="${l.lang}" href="${ORIGIN}/${l.code}/" />`).join('\n    ')}
    <xhtml:link rel="alternate" hreflang="x-default" href="${ORIGIN}/" />
  </url>`).join('\n')}
</urlset>`;

  writeFileSync(join(ROOT, 'sitemap.xml'), xml);
  console.log('✓ Created sitemap.xml');
}

// Run All
generateHomepage();
generateCityPages();
generateLanguagePages();
generateOtherPages();
generateSitemap();
console.log('✨ All pages successfully generated!');
