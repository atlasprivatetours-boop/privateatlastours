# Atlas Private Tours: SEO keyword map and plan

Data: Ubersuggest (US search estimates, November 2026) and web research on 2026 search updates. Volumes are monthly US searches, SD is SEO difficulty (lower is easier), CPC is what advertisers pay, a rough measure of buying intent. Treat all numbers as estimates.

## Where the site stands

- Domain authority 9, 125 ranking keywords, about 60 estimated visits a month.
- 13,016 backlinks from 136 domains point at the old WordPress URLs. The 301 redirects (414 checked) are what keep that value, so they must go live on the same day as the new site.
- Most current traffic comes from blog posts on side topics (couscous, rose festival, surfing), not from tour pages. Tour pages rank on page 1 or 2 for a few terms only ("morocco desert tour from casablanca" at position 9).
- Opportunity: the commercial terms below have low difficulty (SD 15 to 38), so a strong tour page can reach page 1.

## Target keywords and the page that owns each

| Keyword | Vol | SD | CPC | Owner page | Status |
|---|---|---|---|---|---|
| private morocco tours / tour | 170 | 36 | $22.53 | Home, `/tours` | Titles and H1 set. Currently position 58, the biggest commercial gap |
| merzouga desert camp | 1,300 | 27 | $3.78 | `/destinations/merzouga-sahara` | Title, description and quick answers added |
| sahara desert tour morocco | 210 | 38 | $3.80 | `/destinations/merzouga-sahara`, desert tours | Covered by the Sahara page |
| fes to marrakech desert tour | 110 | 19 | $5.46 | 3-, 4- and 5-day Fes tours | Titles rewritten |
| fes to marrakech desert tour 3 days / 4 days | 50 / 30 | 21 / 15 | $5.88 / $10.89 | `3-days-from-fes-to-marrakech-desert-trip`, `4-days-from-fes-to-merzouga-desert` | Titles rewritten |
| morocco itinerary 7 days | 590 | 30 | $4.22 | 7-day tours | Needs a guide page (see below) |
| marrakech to merzouga tour | 70 | 44 | $4.36 | 3-, 4-, 5- and 6-day Marrakech tours | Titles rewritten |
| morocco desert tour from marrakech | 50 | 29 | $3.68 | 3- and 5-day Marrakech tours | Covered |
| morocco desert tour from casablanca | 30 | 17 | $9.67 | `7-day-tour-from-casablanca-to-marrakech` | Already position 9. Title now matches |
| 3 day sahara desert tour morocco | 40 | 26 | $5.93 | 3-day desert tours | Covered |
| errachidia to merzouga | 30 | 19 | $2.20 | `/tours/from/errachidia` and the two live Errachidia tours | Small, but nearly uncontested |
| chefchaouen day trip from fez | 140 | 23 | $3.43 | none yet | No day trip page exists (see below) |
| ouzoud waterfalls day trip from marrakech | 140 | 18 | $1.09 | `/day-trips/ouzoud-waterfalls` | Page exists, add Marrakech wording |
| casablanca to marrakech tour | 40 | 37 | $2.62 | Casablanca tours | Covered |

Long-tail patterns people type: "fes to marrakech desert tour itinerary / private / price", "merzouga desert camp price / luxury / with kids / activities", "private morocco tours english guide / from usa". Prices are deliberately not published (no verified figures), so the page answer for "price" is the enquiry form.

## Content that would win more, and what it needs from you

Each needs real facts from you. Nothing here should be written from guesses.

1. **Morocco 7-day itinerary guide** (590 searches). A page comparing your 7-day routes from Marrakech, Fes and Casablanca, with real driving times and a best-season note.
2. **Chefchaouen day trip from Fes** (140). Needs a real Fes to Chefchaouen day trip: route, hours, what is included.
3. **Merzouga desert camp guide** (1,300). Camp types, what a night is like, what to bring, from your own experience. This is the single highest-value page to write.
4. **Fes to Marrakech desert tour: 3, 4 or 5 days?** A comparison of your own tours.
5. Internal links from the strongest blog posts (couscous, rose valley, Casablanca) to the matching tours.

## What changed in the code

- Departure-city landing pages at `/tours/from/<city>` (marrakech, fes, casablanca, tangier, agadir, errachidia) for searches like "morocco tours from marrakech". Text is generated from the tours themselves. They are in the sitemap, the footer and the end of every journal post.
- Hand-written titles and descriptions for every tour (`src/lib/seo.ts`), route and length first.
- Schema (JSON-LD) on every page type: TravelAgency with contact point, WebSite, WebPage / AboutPage / ContactPage / CollectionPage, ItemList for tours, destinations, day trips and the journal, TouristTrip for each tour and day trip (with duration, start, end and overnight places), TouristDestination with its attractions, BlogPosting, BreadcrumbList and FAQPage where a page shows questions.
- No ratings, review counts, prices or awards are marked up, because the site has no verified figures. Marking up reviews written on your own site for your own business is also ineligible for rich results.
- `robots.txt` names the main AI crawlers explicitly and allows them; `llms.txt` lists tours, destinations and facts for AI assistants; the sitemap lists images.

## What the research says changed in 2026

- **FAQ rich results ended.** Google stopped showing FAQ rich results on 7 May 2026. FAQPage markup is still valid and still helps machines understand the page, so it stays, but it will not produce expandable results.
- **Core updates in March and May 2026.** No travel-specific guidance from Google. Advice is to wait at least a week after a rollout before judging Search Console data. Quality and first-hand experience matter most, which is why real itineraries, real guides and real photos beat generic copy.
- **AI Overviews and AI Mode.** Click-through is lower when an AI answer appears, but Google has added links and citations inside AI answers, and Search Console now reports on generative AI appearances. Pages that state clear, checkable facts near the top get cited. Tour pages already open with duration, start, end and style.
- **AI crawlers.** There are separate bots for training (GPTBot, ClaudeBot, Google-Extended) and for live search (OAI-SearchBot, Claude-SearchBot, PerplexityBot). `robots.txt` controls access. `llms.txt` is optional and no search engine ranks on it, so it is a small extra, not a strategy.

Sources are SEO vendor blogs and news roundups, not Google documentation, so confirm anything important against Google Search Central before acting on it.

## Launch checklist

1. Put the redirects live on launch day and re-run `node scripts/check-redirects.mjs`.
2. Add the site in Google Search Console and Bing Webmaster Tools, submit `/sitemap.xml`.
3. Claim and complete the Google Business Profile (name, address in Fes, phone, hours, photos). It helps "private tour Fes" searches more than any page edit.
4. Ask recent guests to leave Tripadvisor and Google reviews. Review volume is the strongest trust signal you can earn.
5. Four to six weeks after launch, check Search Console for impressions per page and move titles toward what people actually search.
