# LaundryNear.online 🧺

> Production SEO-first multi-lingual doorstep laundry & eco dry cleaning platform for **laundrynear.online**.

## 🌟 Architecture & SEO Strategy

`laundrynear.online` is designed from the ground up to capture the highest-intent commercial queries across India:
- **Primary Search Intent**: *"laundry near me"*, *"dry cleaners near me"*, *"doorstep laundry service"*, *"steam iron near me"*.
- **Hyperlocal City Hubs**: Dedicated landing pages for Bengaluru, Mumbai, Delhi NCR, Hyderabad, Pune, and Chennai with local corridor targeting (Indiranagar, HSR Layout, Andheri, Powai, Gurgaon Cyber City, Hitec City, Hinjewadi).
- **Indic Voice Search SEO**: Fully localized regional language directories (`/hi/`, `/kn/`, `/ta/`, `/te/`, `/mr/`, `/bn/`, `/gu/`) answering voice queries like *"घर से कपड़े ले जाकर धोने वाली सर्विस"*, *"ಮನೆ ಬಾಗಿಲಿಗೆ ಬರುವ ಲಾಂಡ್ರಿ ಸೇವೆ"*.
- **Linked Data & Entity Graph**: Schema.org `DryCleaningOrLaundry`, `LocalBusiness`, `FAQPage`, `BreadcrumbList`, and `OfferCatalog` in `ontology.json` and microdata.
- **AI Agent Discovery**: High-density markdown knowledge manifest in `/llms.txt` for ChatGPT Search, Google Gemini AI Overviews, and Perplexity.
- **Compliance & Consumer Trust**: 100% DPDP Act 2023 compliant Privacy Policy, Terms, Cancellation & Refund Policy, and Delivery Policies.

---

## 🛠️ Project Structure

```
laundrynear.online/
├── assets/                 # Brand assets, og-images, icons
├── css/
│   └── style.css          # Responsive, zero-CLS, mobile-first styling
├── js/
│   └── main.js            # Live rate calculator, pincode finder, WhatsApp dispatch
├── scripts/
│   ├── generate.mjs       # Static HTML & XML sitemap generator
│   └── build.mjs          # Staging build & safety sanitizer
├── dist/                  # Cloudflare Pages deployable artifacts
├── hi/ kn/ ta/ te/ mr/ bn/ gu/ # Regional voice-search hubs
├── bangalore.html mumbai.html delhi-ncr.html ... # City corridor hubs
├── pricing.html book.html franchise.html about.html contact.html
├── privacy.html terms.html cancellation-refund.html delivery-policy.html
├── sitemap.xml robots.txt llms.txt ontology.json
├── _headers               # Cloudflare Pages security & caching headers
├── _redirects             # Canonical domain redirection rules
└── wrangler.toml          # Cloudflare Pages deployment configuration
```

---

## 🚀 Build & Deployment

### 1. Build locally
```bash
npm run build
```

### 2. Deploy to Cloudflare Pages
```bash
npx wrangler pages deploy dist --project-name laundrynear-online
```

---

## 🏢 Business Identity & Operations
- **Brand**: LaundryNear.online
- **Customer Care**: +91-7892240243 | support@laundrynear.online
- **Direct WhatsApp**: https://wa.me/917892240243
