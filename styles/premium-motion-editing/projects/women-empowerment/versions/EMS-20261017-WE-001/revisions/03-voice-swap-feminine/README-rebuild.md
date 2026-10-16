# WE-20261017-001-R3 · voice-only revision

This follow-up changes only the narration voice: the user auditioned and selected the feminine Pakistani Urdu voice `voice-01`. The approved Urdu-English script is unchanged. All six scene clips, visual timeline, typography, transitions, effects and ending are copied unchanged from R2. The final picture/master from R2 remains intact.

## Rebuild and verify

From the repository root:

```bash
P=styles/premium-motion-editing/projects/women-empowerment/versions/EMS-20261017-WE-001/revisions/03-voice-swap-feminine
.venv/bin/python -m pip install -r styles/premium-motion-editing/requirements.txt
.venv/bin/python "$P/build_assets.py"
.venv/bin/python "$P/prepare_project.py"
.venv/bin/python styles/premium-motion-editing/src/wf05.py validate "$P/project.json"
.venv/bin/python styles/premium-motion-editing/src/wf05.py render "$P/project.json"
.venv/bin/python styles/premium-motion-editing/src/wf05.py verify "$P/project.json"
```

Private media is intentionally ignored by Git. The original selfie and standalone exact-eye crop are not included in Git or Drive; the crop appears only inside the requested closing video shot. Do not invent features hidden below the niqab.

The R2 picture and visual QA are retained unchanged. This version's voiceover passed technical decode/level checks; human listening and word-level ASR were not performed.
