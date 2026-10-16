# WE-20261017-001-R2 · rebuild and archive guide

**Status: rendered, technically verified, visually reviewed, and uploaded.** The original WE-20261017-001 master remains unchanged. Revision 2 was uploaded to the existing WF-05 project folder; its delivery record is `delivery-receipt.json`.

## Rebuild

From the repository root:

```bash
P=styles/premium-motion-editing/projects/women-empowerment/versions/EMS-20261017-WE-001/revisions/02-user-host-hero-cut
.venv/bin/python -m pip install -r styles/premium-motion-editing/requirements.txt
.venv/bin/python "$P/build_assets.py"
.venv/bin/python "$P/prepare_project.py"
.venv/bin/python styles/premium-motion-editing/src/wf05.py validate "$P/project.json"
.venv/bin/python styles/premium-motion-editing/src/wf05.py render "$P/project.json"
.venv/bin/python styles/premium-motion-editing/src/wf05.py verify "$P/project.json"
```

Before rendering any changed media, review all six motion clips and their composite titles. The current `motion_review` approval applies only to the reviewed assets in this revision.

## Private source assets

The media binaries, rendered video, and review samples are intentionally ignored by Git. The rendered scene plates, selected voice, and exact-eye crop must be restored from the private local workspace before rebuilding. The original selfie and standalone crop are not included in Git or uploaded to Drive; the crop appears only inside the final video, as requested. If those private files are unavailable, ask the user to provide the image again rather than inventing the hidden lower face. The face remains covered by the white hijab and black niqab.

Generated views approximate the user's visible eye area; they cannot guarantee pixel-identical eyes. The closing section begins with a generated portrait, clears the final title, then hard-cuts to the source-photo eye crop. The original master was not altered.

## Verification and limitations

The verified output is 40 seconds, 1080×1920, 30 fps, H.264 High/yuv420p with AAC stereo at 48 kHz (1,200 frames). Full decode, fast-start, frame count, audio presence, peak, and caption policy passed. There are no caption pills, active-word strips, logos, social handles, or generic end card.

The narration uses the selected feminine `voice-00` Urdu voice and runs about 35.8 seconds. Music/SFX are synthesized for this revision. Human listening and word-level ASR were not performed; technical audio checks are not a substitute for listening. See `QA.json` and `delivery-receipt.json` for hashes and delivery details.
