#!/bin/bash
# export APIFY_TOKEN=your_token
curl -X POST "https://api.apify.com/v2/acts/automationnation~ai-visibility-tracker/run-sync-get-dataset-items?token=$APIFY_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"brand": "Notion", "domain": "notion.so", "competitors": ["Obsidian (obsidian.md)", "Evernote (evernote.com)"], "prompts": ["What is the best note-taking app for teams?"], "engines": ["google-ai-overviews", "gemini", "claude"]}'
