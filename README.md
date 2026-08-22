# KrishokMitra Grow Smart

Build a single-page responsive website for "KrishokMitra" - an AI-powered agricultural intelligence platform for smallholder farmers in India.

PURPOSE: Help farmers diagnose crop diseases, get real-time market prices, and sell directly to buyers without middlemen.

TARGET USERS: Rural farmers (low literacy, feature phone users, multilingual).

DESIGN REQUIREMENTS:

1. Color palette: Warm earth tones (green #2E7D32, amber #FF8F00, cream #FFF8E1, white)

2. Font: Large, high-contrast (min 18px for body, 32px+ for headings)

3. Layout: Mobile-first (max-width 480px optimized, desktop responsive)

4. Icons: FontAwesome or Material Icons (large, clear)

PAGES/COMPONENTS NEEDED:

1. HEADER:

   - Logo: "KrishokMitra" (wheat/leaf icon)

   - Language selector: Kannada | Hindi | English (dropdown)

   - "Get Started" CTA button (green)

2. HERO SECTION:

   - Headline: "Stop Guessing. Start Growing."

   - Sub-headline: "AI-powered crop diagnosis, real-time prices & direct selling - all in your pocket."

   - 3 feature cards (horizontal scroll on mobile):

     🔍 "AI Scan" - Diagnose diseases in 5 seconds

     📈 "Smart Price" - Know market rates instantly

     🤝 "Sell Direct" - No middlemen, better earnings

   - CTA: "Scan Your Crop Now" button (with camera icon)

3. HOW IT WORKS (3 steps with arrows):

   Step 1: "Click a Photo" - Snap picture of crop

   Step 2: "AI Analyzes" - Diagnoses disease & suggests price

   Step 3: "Sell or Treat" - Connect to buyers or get treatment plan

4. FEATURES GRID (2x2 on desktop, stacked on mobile):

   - AI Disease Diagnosis (95% accuracy)

   - Real-time Market Prices (500+ mandis)

   - Direct Buyer Connection (zero middlemen)

   - Voice + USSD Support (works without internet)

5. STATS COUNTER (animated numbers):

   - "8,000+ Farmers Helped"

   - "50,000+ Crops Scanned"

   - "95% Diagnosis Accuracy"

   - "₹50,000+ Average Savings"

6. TESTIMONIAL SLIDER:

   - 3 farmer quotes with photos (use emoji avatars if no images)

   - Auto-sliding every 5 seconds

7. TRUST BADGES:

   - Logos: Government of Karnataka, IIT Bombay, NABARD (use text/emojis if logos unavailable)

   - "Trusted by 8,000+ farmers across Karnataka"

8. FOOTER:

   - Quick links: About, How It Works, Privacy, Contact

   - Social icons: WhatsApp, YouTube, Instagram (use FontAwesome)

   - "Made with ❤️ for Indian Farmers"

TECHNICAL REQUIREMENTS:

- Use HTML5 + Tailwind CSS

- Mobile-first responsive

- JavaScript: Add smooth scroll, mobile menu toggle, animated counters (triggered on scroll)

- No backend needed (static demo)

- Use placeholder images from picsum.photos or emojis

ACCESSIBILITY REQUIREMENTS:

- All buttons 44px+ touch target

- High contrast text (WCAG AA compliant)

- Alt text on all images

- ARIA labels on interactive elements

ADDITIONAL ELEMENTS:

- Floating WhatsApp button (bottom right, green)

- "Scan Now" sticky CTA (visible on scroll)

- Micro-interactions: hover effects on cards, smooth transitions

DO NOT INCLUDE:

- Complex animations (keep it lightweight)

- Third-party analytics

- Auto-playing audio/video

- Popups or overlays

Output: Complete single HTML file with embedded CSS and JavaScript. amd framer motions yoo

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/97995b6c-c702-43e1-8a22-7cdea7326fdb).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
