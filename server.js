// -----------------------------------------------------------------------------
// server.js — Minimal Express 5 HTTP server exposing two static plain-text
// endpoints, replacing the previous Node.js built-in `http` implementation.
//
// Per the Agent Action Plan (AAP) Section 0.5.1 (Group 2) and Section 0.7.3
// "Non-Negotiable Behavioral Guarantees":
//   • GET /         -> 200 text/plain "Hello, World!\n"  (preserves the
//                       byte-for-byte response contract on which the backprop
//                       integration system depends, per README.md).
//   • GET /evening  -> 200 text/plain "Good evening"     (new endpoint,
//                       literal payload exactly as specified by the user — no
//                       trailing newline, no punctuation alteration).
//
// The bind address (`127.0.0.1`), port (`3000`), and startup log message are
// preserved verbatim from the prior `http`-based implementation so that
// externally observable startup behavior remains identical (AAP Section 0.7.2).
//
// Module system: CommonJS `require(...)` is used (no ES module `import`,
// no `"type": "module"` in package.json) per the project's existing
// convention (AAP Section 0.7.2).
// -----------------------------------------------------------------------------

// Import Express 5.x. Express provides the route-based request dispatch
// (`app.get`), response helpers (`res.status`, `res.type`, `res.send`), and
// HTTP listener (`app.listen`) used below. The Node.js built-in `http` module
// is no longer imported here — Express uses it internally to bind the listener.
const express = require('express');

// Instantiate the application. No `app.use(...)` middleware and no
// `app.set(...)` configuration is registered in this increment per
// AAP Section 0.4.1 ("Middleware / Interceptor Impact") and Section 0.6.2.
const app = express();

// Bind configuration. Hardcoded literals are preserved exactly as in the
// original implementation; no `process.env.PORT` / `process.env.HOST` parsing
// is introduced (AAP Section 0.6.2 explicitly excludes environment-variable-
// driven configuration).
const hostname = '127.0.0.1';
const port = 3000;

// Route: GET /
// Reproduces the previous `http.createServer` callback's response byte-for-byte:
//   • Status 200
//   • Content-Type: text/plain (Express appends "; charset=utf-8" automatically
//     when `res.send` is called with a string body — this is standard HTTP
//     behavior and satisfies the AAP-stated `text/plain` invariant).
//   • Body: literal "Hello, World!\n" (with comma, capital W, exclamation
//     point, and trailing newline — preserved exactly per AAP Section 0.7.3).
app.get('/', (req, res) => {
  res.status(200).type('text/plain').send('Hello, World!\n');
});

// Route: GET /evening
// New endpoint added in this increment. Returns the user-specified literal
// "Good evening" with no trailing newline (per AAP Section 0.7.2 "Trailing-
// newline literal preserved" — the user's literal phrasing is honored
// exactly, including the absence of a terminating newline).
app.get('/evening', (req, res) => {
  res.status(200).type('text/plain').send('Good evening');
});

// Start the listener. Express 5 accepts the (port, hostname, callback)
// signature identically to `http.Server#listen`, so the binding semantics are
// unchanged from the previous implementation. The startup log message is
// preserved character-for-character per AAP Section 0.7.2 / 0.7.3.
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
