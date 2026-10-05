# AI Visibility Tracker: is your brand mentioned and cited in AI search?

[![Run on Apify](https://img.shields.io/badge/Run%20on-Apify-0b57d0)](https://apify.com/automationnation/ai-visibility-tracker)

AI Visibility Tracker is an Apify Actor that shows whether AI search engines mention and cite your brand. For each prompt it asks Google AI Overviews, Gemini and Claude the way a customer would. It records whether your brand is named, its position against competitors, how it's described, which sites are cited, every other brand named and what changed since the last run, at $0.05 per answer plus $0.50 for an optional client-ready report.

**Price:** $0.05 per answer checked ($0.04 on Gold) + $0.50 per optional report · **Run it:** [https://apify.com/automationnation/ai-visibility-tracker](https://apify.com/automationnation/ai-visibility-tracker) · **Guide:** [https://retracn.github.io/automationnation-actors/ai-visibility-tracker/](https://retracn.github.io/automationnation-actors/ai-visibility-tracker/)

## Quick facts

- Engines: Google AI Overviews (late-loading overviews read in a real browser), Gemini with Google Search grounding, and Claude with web search, localised to your country.
- Per answer: whether your brand is named and its position among tracked brands, whether your site is cited and at what position, competitors named or cited, sentiment with a one-line summary, every brand named, and the cited URLs.
- Hidden competitors: every company or product named in the answers is counted, including ones you don't track.
- Weekly tracking: each run is compared with the last, with mentions and citations gained or lost per prompt and engine, a client-ready HTML report with a trend over time, and Slack, Discord or webhook alerts.
- Price: $0.05 per answer checked ($0.045 Silver, $0.04 Gold and above) plus $0.50 per optional report; answers that couldn't be checked are free. 20 prompts on 3 engines weekly costs about $14 a month.

## Example input

```json
{
  "brand": "Notion",
  "domain": "notion.so",
  "competitors": [
    "Obsidian (obsidian.md)",
    "Evernote (evernote.com)"
  ],
  "prompts": [
    "What is the best note-taking app for teams?"
  ],
  "engines": [
    "google-ai-overviews",
    "gemini",
    "claude"
  ]
}
```

## Run it from code

**REST API**

```bash
curl -X POST "https://api.apify.com/v2/acts/automationnation~ai-visibility-tracker/run-sync-get-dataset-items?token=$APIFY_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"brand": "Notion", "domain": "notion.so", "competitors": ["Obsidian (obsidian.md)", "Evernote (evernote.com)"], "prompts": ["What is the best note-taking app for teams?"], "engines": ["google-ai-overviews", "gemini", "claude"]}'
```

**Python** — see [`examples/python_example.py`](examples/python_example.py)

```python
# pip install apify-client
from apify_client import ApifyClient

client = ApifyClient("YOUR_APIFY_TOKEN")
run = client.actor("automationnation/ai-visibility-tracker").call(run_input={
  "brand": "Notion",
  "domain": "notion.so",
  "competitors": [
    "Obsidian (obsidian.md)",
    "Evernote (evernote.com)"
  ],
  "prompts": [
    "What is the best note-taking app for teams?"
  ],
  "engines": [
    "google-ai-overviews",
    "gemini",
    "claude"
  ]
})
for item in client.dataset(run["defaultDatasetId"]).iterate_items():
    print(item.get("engineLabel"), item.get("visibility"), item.get("brandRank"), item.get("prompt"))
```

**JavaScript** — see [`examples/node_example.mjs`](examples/node_example.mjs)

```js
// npm install apify-client
import { ApifyClient } from 'apify-client';

const client = new ApifyClient({ token: 'YOUR_APIFY_TOKEN' });
const run = await client.actor('automationnation/ai-visibility-tracker').call({
  "brand": "Notion",
  "domain": "notion.so",
  "competitors": [
    "Obsidian (obsidian.md)",
    "Evernote (evernote.com)"
  ],
  "prompts": [
    "What is the best note-taking app for teams?"
  ],
  "engines": [
    "google-ai-overviews",
    "gemini",
    "claude"
  ]
});
const { items } = await client.dataset(run.defaultDatasetId).listItems();
for (const item of items) console.log(item.engineLabel, item.visibility, item.brandRank, item.prompt);
```

## Use it with AI agents (MCP)

Hosted MCP server URL (Claude, ChatGPT, Cursor and other clients with remote MCP support):

```
https://mcp.apify.com?tools=automationnation/ai-visibility-tracker
```

Local config for Claude Desktop / Cursor — [`mcp/claude_desktop_config.json`](mcp/claude_desktop_config.json):

```json
{
  "mcpServers": {
    "ai-visibility-tracker": {
      "command": "npx",
      "args": [
        "-y",
        "@apify/actors-mcp-server",
        "--tools",
        "automationnation/ai-visibility-tracker"
      ],
      "env": {
        "APIFY_TOKEN": "YOUR_APIFY_TOKEN"
      }
    }
  }
}
```

## FAQ

**What is AI visibility tracking?**
Checking whether AI assistants and AI search features name and cite your brand when people ask about your market, and how that changes over time. It's the measurement side of generative engine optimization (GEO).

**Which AI engines does it check?**
Google AI Overviews, Gemini (with Google Search grounding) and Claude (with web search). ChatGPT and Perplexity are planned.

**How much does it cost?**
$0.05 per answer checked ($0.04 on Gold and above), plus $0.50 per run for the optional report. One answer is one prompt on one engine; answers that couldn't be checked are free.

**Can it find competitors I don't know about?**
Yes. Every company or product the answers name is listed, tracked or not, so the brands AI engines recommend instead of you show up in the report.

## More from AutomationNation

- [Google Jobs Scraper](https://apify.com/automationnation/google-jobs-scraper) — $2 per 1,000 jobs ($1.50 on paid plans) + $0.03 per search · [GitHub examples](https://github.com/retracn/google-jobs-scraper)
- [YouTube Transcript Scraper](https://apify.com/automationnation/youtube-transcript-scraper) — $1.50 per 1,000 transcripts ($1.20 on Gold and above) · [GitHub examples](https://github.com/retracn/youtube-transcript-api)
- [Google Shopping Scraper](https://apify.com/automationnation/google-shopping-scraper) — $1 per 1,000 products ($0.80 on Gold and above) · [GitHub examples](https://github.com/retracn/google-shopping-scraper)
- [Google Flights Scraper](https://apify.com/automationnation/google-flights-scraper) — $0.20 per 1,000 flights ($0.16 on Gold and above) · [GitHub examples](https://github.com/retracn/google-flights-scraper)
- [Google Hotels Scraper](https://apify.com/automationnation/google-hotels-scraper) — $1 per 1,000 hotels ($0.80 on Gold and above) · [GitHub examples](https://github.com/retracn/google-hotels-scraper)
- [Google Ads Transparency Scraper](https://apify.com/automationnation/google-ads-transparency-scraper) — $1 per 1,000 ads ($0.80 on Gold and above) · [GitHub examples](https://github.com/retracn/google-ads-transparency-scraper)
- [Google News Scraper](https://apify.com/automationnation/google-news-scraper) — $1 per 1,000 articles ($0.80 on Gold and above) · [GitHub examples](https://github.com/retracn/google-news-scraper)
- [Google Images Scraper](https://apify.com/automationnation/google-images-scraper) — $0.25 per 1,000 images ($0.20 on Gold and above) · [GitHub examples](https://github.com/retracn/google-images-scraper)
- [Google Videos Scraper](https://apify.com/automationnation/google-videos-scraper) — $1 per 1,000 videos ($0.80 on Gold and above) · [GitHub examples](https://github.com/retracn/google-videos-scraper)
- [Google Trends Scraper](https://apify.com/automationnation/google-trends-scraper) — $1 per 1,000 keyword reports ($0.27–$0.90 on paid plans) · $0.50 per 1,000 trending searches · [GitHub examples](https://github.com/retracn/google-trends-scraper)
- [App Store Reviews Scraper](https://apify.com/automationnation/app-store-reviews-scraper) — $0.08 per 1,000 reviews ($0.05–$0.07 on paid plans) · [GitHub examples](https://github.com/retracn/app-store-reviews-scraper)
- [Google Play Reviews Scraper](https://apify.com/automationnation/google-play-reviews-scraper) — $0.08 per 1,000 reviews ($0.05–$0.07 on paid plans) · [GitHub examples](https://github.com/retracn/google-play-reviews-scraper)
- [AEO & GEO Tracker — Google AI Overview Citation Checker](https://apify.com/automationnation/aeo-auditor) — $0.04 per keyword ($0.032 on Gold), plus $2 per run from 17 Nov 2026; $0.01 per keyword until 16 Oct 2026 · [GitHub examples](https://github.com/retracn/google-ai-overview-tracker)
- [Google Maps Leads Scraper](https://apify.com/automationnation/google-maps-leads) — $0.03 per lead ($0.024 on Gold) · [GitHub examples](https://github.com/retracn/google-maps-leads-scraper)
- [Google Maps Leads Scraper UK](https://apify.com/automationnation/uk-business-leads) — $0.05 per lead ($0.04 on Gold) · [GitHub examples](https://github.com/retracn/uk-business-leads-google-maps)
- [App Store & Google Play Reviews Scraper + AI](https://apify.com/automationnation/app-store-review-miner) — $0.05 per app report ($0.04 on Gold) · [GitHub examples](https://github.com/retracn/app-store-google-play-reviews-ai)
- [UK Companies House Leads — Filing Signals & AI Outreach](https://apify.com/automationnation/companies-house-leads) — $0.008 per lead
- [Contact Waterfall Enrichment — Emails & Directors](https://apify.com/automationnation/contact-waterfall-enrichment) — $0.015 per company
- [All Actors and guides](https://retracn.github.io/automationnation-actors/) · [AI visibility trackers compared](https://retracn.github.io/automationnation-actors/compare/ai-visibility-trackers/) · [Google Jobs scrapers compared](https://retracn.github.io/automationnation-actors/compare/google-jobs-scrapers/) · [Google Trends scrapers compared](https://retracn.github.io/automationnation-actors/compare/google-trends-scrapers/) · [App Store review scrapers compared](https://retracn.github.io/automationnation-actors/compare/app-store-review-scrapers/) · [Google Play review scrapers compared](https://retracn.github.io/automationnation-actors/compare/google-play-review-scrapers/) · [YouTube transcript scrapers compared](https://retracn.github.io/automationnation-actors/compare/youtube-transcript-scrapers/) · [Google Flights scrapers compared](https://retracn.github.io/automationnation-actors/compare/google-flights-scrapers/) · [Google Hotels scrapers compared](https://retracn.github.io/automationnation-actors/compare/google-hotels-scrapers/) · [Google Ads Transparency scrapers compared](https://retracn.github.io/automationnation-actors/compare/google-ads-transparency-scrapers/) · [Google Shopping scrapers compared](https://retracn.github.io/automationnation-actors/compare/google-shopping-scrapers/) · [Google News scrapers compared](https://retracn.github.io/automationnation-actors/compare/google-news-scrapers/)

---

This repository holds usage examples. The scraper itself runs on the [Apify platform](https://apify.com/automationnation/ai-visibility-tracker); you need a free Apify account and API token. Examples are MIT licensed.
