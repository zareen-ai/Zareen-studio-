# WE-20261019-002 · build and review

This is a 40-second 9:16 short with a fictional adult protagonist, not the user's likeness. `second-by-second.csv` contains the 40 visual micro-beats; `shot-plan.csv` and `timeline.json` define the six-shot edit. The narration is easy Urdu-English in the previously selected feminine voice `voice-01`.

## Build

From the repository root:

```bash
P=styles/premium-motion-editing/projects/women-empowerment/versions/EMS-20261017-WE-001/revisions/04-adjustment-choice-video
.venv/bin/python -m pip install -r styles/premium-motion-editing/requirements.txt
.venv/bin/python "$P/build_assets.py"
.venv/bin/python "$P/prepare_project.py"
.venv/bin/python styles/premium-motion-editing/src/wf05.py validate "$P/project.json"
.venv/bin/python styles/premium-motion-editing/src/wf05.py render "$P/project.json" --preview
```

Review the six source clips and composite previews before approving `motion_review` in `project.json`. Then run the full render and technical verification with the same WF-05 commands.

The still plates and rendered video are intentionally ignored by Git; source code, timeline, shot plan, QA and receipts remain tracked. No user photo or likeness reference is used. The visual style uses smooth independent layers, subtle camera movement and integrated headlines—no caption pills, active-word strip, branding, social handle or generic end card.

Human listening and word-level ASR are not performed automatically; record those limits in the QA receipt.
