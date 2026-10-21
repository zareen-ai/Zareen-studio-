# WE-20261021-003 · social comparison short

60-second, 9:16 Urdu-English video about comparing real life with curated social-media moments. The visual arc shifts color continuously: indigo/teal hook → saturated coral/fuchsia/cyan feed → cool comparison blue → slate/coral reveal → warm amber reset → golden-hour close. Six ten-second motion scenes and 60 time-coded visual beats are specified in `timeline.json`, `shot-plan.csv`, and `second-by-second.csv`.

The protagonist is fictional; no user likeness or source photo is used. The chosen voice is feminine Pakistani Urdu (`voice-01`). No caption pills, active-word strips, logos, social handles or generic end card.

## Rebuild

```bash
P=workflows/current/payload/WE-20261021-003
.venv/bin/python -m pip install -r styles/premium-motion-editing/requirements.txt
.venv/bin/python "$P/build_assets.py"
.venv/bin/python "$P/prepare_project.py"
.venv/bin/python styles/premium-motion-editing/src/wf05.py validate "$P/project.json"
.venv/bin/python styles/premium-motion-editing/src/wf05.py render "$P/project.json" --preview
```

Review all motion clips and title previews, set `motion_review` to `approved` only after that review, then render the master and run `wf05.py verify`. Source plates (`media/*.png`) and the selected narration (`media/voiceover.mp3`) are retained as rebuild inputs; derived scene clips, WAV renders, previews, logs, and the master MP4 are ignored. Human listening and word-level ASR are not automatic; the QA receipt records that they were not performed.
