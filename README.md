# Environmental Flow Surveys — St. Vrain Creek (landing page)

Static site. No build step, no dependencies.

## Deploy (Vercel, drag & drop — 30 seconds)
1. Go to https://vercel.com/new
2. Choose "Deploy" → drag this whole folder onto the page (or zip it and drop the zip).
3. Vercel gives you a live URL immediately.

## Custom subdomain (jessica.skifi.co)
1. In the Vercel project → Settings → Domains → add `jessica.skifi.co`
2. In GoDaddy → DNS for skifi.co → add a record:
   - Type: CNAME
   - Name/Host: jessica
   - Value: cname.vercel-dns.com
   - TTL: 1 hour
3. Vercel issues the SSL certificate automatically once DNS resolves.

## Files
- index.html   — all page content (sections: storymap, acknowledgements, data, reports, sources, gallery)
- styles.css   — brand tokens at the top (gold / blue / cream), then components
- main.js      — gallery + lightbox, mobile menu, scroll spy, reveal animations
- assets/      — optimised WebP images and logos

## Things to fill in later
- Storymap: replace the "Link coming soon" chip in #storymap with the ArcGIS URL.
- Data: swap the three "Coming soon" cards for real file links (drop files into /assets and link them).
- Reports: policy proposal + whitepaper cards, same pattern as the E-Flow Recommendations card.
- Gallery: photos are defined in the PHOTOS array at the top of main.js (file, size, alt, caption).
