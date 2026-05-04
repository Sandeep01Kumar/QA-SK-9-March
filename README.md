# hao-backprop-test
test project for backprop integration. Do not touch!

## Running the Server

```bash
npm install
node server.js
```

The server binds to `127.0.0.1:3000` and emits `Server running at http://127.0.0.1:3000/` on successful startup.

## Endpoints

| Method | Path       | Status | Content-Type | Response Body     |
|--------|------------|--------|--------------|-------------------|
| GET    | `/`        | 200    | `text/plain` | `Hello, World!\n` |
| GET    | `/evening` | 200    | `text/plain` | `Good evening`    |
