#!/usr/bin/env python3
"""Static server — threaded, no-cache, '/' -> home.html."""
import functools, os
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "app")
PORT = int(os.environ.get("PORT", "4321"))

class Handler(SimpleHTTPRequestHandler):
    protocol_version = "HTTP/1.1"
    def do_GET(self):
        if self.path in ("/", "/index.htm"):
            self.path = "/home.html"
        return super().do_GET()
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
