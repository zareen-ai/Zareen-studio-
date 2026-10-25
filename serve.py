#!/usr/bin/env python3
"""Static server — threaded, no-cache, '/' -> home.html."""
import functools, os
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "app")
PORT = int(os.environ.get("PORT", "4321"))

import os, re

class Handler(SimpleHTTPRequestHandler):
    protocol_version = "HTTP/1.1"
    def do_GET(self):
        if self.path in ("/", "/index.htm"):
            self.path = "/home.html"
        rng = self.headers.get("Range")
        if rng:
            path = self.translate_path(self.path)
            if os.path.isfile(path):
                return self.send_range(path, rng)
        return super().do_GET()
    def send_range(self, path, rng):
        size = os.path.getsize(path)
        m = re.match(r"bytes=(\d*)-(\d*)", rng)
        start = int(m.group(1)) if m.group(1) else 0
        end = min(int(m.group(2)) if m.group(2) else size - 1, size - 1)
        self.send_response(206)
        self.send_header("Content-Type", self.guess_type(path))
        self.send_header("Accept-Ranges", "bytes")
        self.send_header("Content-Range", f"bytes {start}-{end}/{size}")
        self.send_header("Content-Length", str(end - start + 1))
        self.end_headers()
        with open(path, "rb") as f:
            f.seek(start)
            self.wfile.write(f.read(end - start + 1))
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, must-revalidate")
        self.send_header("Access-Control-Allow-Origin", "*")
        super().end_headers()
    def log_message(self, *a):
        pass

Handler.__init__ = functools.partialmethod(Handler.__init__, directory=ROOT)
ThreadingHTTPServer.allow_reuse_address = True
ThreadingHTTPServer.daemon_threads = True
with ThreadingHTTPServer(("0.0.0.0", PORT), Handler) as httpd:
    print(f"serving {ROOT} on 0.0.0.0:{PORT} (threaded)")
    httpd.serve_forever()
