# WE-20261017-001 · source and archive guide

**Status: delivered and archived.** The original master and compact source-recovery ZIP are stored in the WF-05 Google Drive project folder. The large local render/media/review files are retained in this workspace archive but intentionally ignored by Git. Do not rerender unless the user requests a revision.

## Rebuild in this repository

From the repository root, set `P` to the project directory and use the repository virtual environment:

```bash
P=styles/premium-motion-editing/projects/women-empowerment/versions/EMS-20261017-WE-001/wf05_women_empowerment_20261017
.venv/bin/python -m pip install -r styles/premium-motion-editing/requirements.txt
.venv/bin/python "$P/build_assets.py"
.venv/bin/python "$P/prepare_project.py"
```

Review all six generated source clips. Only after that review, set `motion_review` to `approved` in `$P/project.json`. Then validate, render or verify with the repository engine:

```bash
.venv/bin/python styles/premium-motion-editing/src/wf05.py validate "$P/project.json"
.venv/bin/python styles/premium-motion-editing/src/wf05.py render "$P/project.json"
.venv/bin/python styles/premium-motion-editing/src/wf05.py verify "$P/project.json"
```

The separately uploaded source-recovery ZIP includes a portable WF-05 engine snapshot under `engine/styles/premium-motion-editing/`, with the approved profile, fonts and notices, and dependency list. Its `README-rebuild.md` describes restoration into an active payload directory.

## Production and review limits

The approved policy uses integrated scene-specific typography only. Bottom caption pills and active-word strips are excluded. Six 720×1280/30 fps source clips compose into a 1080×1920/30 fps H.264/AAC master. Voice is generated from `SCRIPT.md`; no speed-stretch is used. The portrait subjects are fictional AI-generated adults; the selected voice is session-generated; music/SFX are synthesized; bundled fonts retain their OFL notices.

`QA.json` reports technical, sampled visual and caption-policy passes. All six motion beats and 18 encoded samples were reviewed. Human listening and word-level ASR were not performed; broad clause timing was checked against the script and pauses. See `records/DELIVERY.md` and `delivery-receipt.json` for the remote checksums and cross-platform record IDs.
