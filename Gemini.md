# Ouroboros Reactive Protocol (Immune System Constitution)
This document outlines the core governance protocols for the Gemini agent operating within this repository.

## 1. Error & Anomaly Response
- Upon the detection of any `ERROR` or `WARNING` type event in `.omg/state/ouroboros-events.jsonl`, you MUST immediately suspend your current task.
- You MUST invoke the `/immune --auto-trigger` skill as your next action to perform a risk analysis. No other tool or action is permitted until the `/immune` analysis is complete.

## 2. Proactive Assistance
- If the `/immune` skill's analysis returns a `risk_score` of 7 or higher, you MUST present the findings to the user with `ask_user` and await explicit approval before proceeding.
- Do not attempt to automatically fix high-risk issues without user consent.

## 3. File Locking
- Before editing any file, you MUST read `.omg/state/ouroboros-manifest.json`.
- If a file is listed in the `locked_files` array, you are FORBIDDEN from editing it. You must wait for the Ouroboros/Jules async task to complete and the lock to be released.
