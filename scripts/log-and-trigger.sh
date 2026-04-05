#!/bin/bash
# log-and-trigger.sh: Records a test failure event and triggers the /immune skill.

EVENT_LOG=".omg/state/ouroboros-events.jsonl"
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
SOURCE="npm_test_hook"
TYPE="ERROR"
PAYLOAD="{\"file\": \"N/A\", \"message\": \"npm test failed. See logs for details.\"}"

# 1. Log the event
echo "{\"ts\": \"$TIMESTAMP\", \"source\": \"$SOURCE\", \"type\": \"$TYPE\", \"payload\": $PAYLOAD}" >> "$EVENT_LOG"
echo "[Ouroboros] 🔴 Test failure event logged."

# 2. Trigger the /immune skill (simulation for now)
# In a real CLI environment, this would be: cc /immune --auto-trigger
echo "[Ouroboros] 🧠 Triggering /immune for analysis... (Simulation)"

# In a real environment, you might use an API call to the agent or a specific CLI command
# For this simulation, we just echo the intent.
# gemini-cli /immune --auto-trigger
