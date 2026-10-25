#!/usr/bin/env python3
"""Static server for the Khamosh Tabdeeli studio — '/' serves home.html."""
import functools, http.server, socketserver, os

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "app")
PORT = int(os.environ.get("PORT", "4321"))

class Handler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path in ("/", "/index.htm"):
            self.path = "/home.html"
        return super().do_GET()
    def log_message(self, *a):
        pass

Handler.__init__ = functools.partialmethod(Handler.__init__, directory=ROOT)
socketserver.TCPServer.allow_reuse_address = True
with socketserver.TCPServer(("0.0.0.0", PORT), Handler) as httpd:
    print(f"serving {ROOT} on 0.0.0.0:{PORT}")
    httpd.serve_forever()
