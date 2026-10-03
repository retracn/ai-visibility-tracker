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
