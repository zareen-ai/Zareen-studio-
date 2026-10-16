#!/usr/bin/env python3
"""Refresh generated-media checksums after running build_assets.py."""
import csv
import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent
MEDIA = ROOT / "media"
manifest = json.loads((MEDIA / "scene-manifest.json").read_text(encoding="utf-8"))
by_path = {row["path"]: row for row in manifest}
timeline_path = ROOT / "timeline.json"
timeline = json.loads(timeline_path.read_text(encoding="utf-8"))
for shot in timeline["shots"]:
    shot["sha256"] = by_path[shot["path"]]["sha256"]
voice = MEDIA / "voiceover.mp3"
timeline["voice_clips"][0]["sha256"] = hashlib.sha256(voice.read_bytes()).hexdigest()
timeline_path.write_text(json.dumps(timeline, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
register_path = ROOT / "asset-register.csv"
with register_path.open(newline="", encoding="utf-8") as f:
    rows = list(csv.DictReader(f))
for row in rows:
    asset = ROOT / row["path"]
    if asset.is_file():
        row["sha256"] = hashlib.sha256(asset.read_bytes()).hexdigest()
        row["size_bytes"] = str(asset.stat().st_size)
with register_path.open("w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
    writer.writeheader()
    writer.writerows(rows)
print(f"Updated {len(timeline['shots'])} scene hashes and {len(rows)} asset receipts; motion review remains a separate human/agent QA decision.")
