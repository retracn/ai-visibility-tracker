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
