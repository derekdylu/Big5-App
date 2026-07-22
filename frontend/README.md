# 5ee You frontend

This directory contains the archived React frontend. Vite provides the development server, tests, and production build.

```bash
cp .env.example .env.local
npm ci
npm start
```

The development server prints its local URL when it starts. Run the checks with:

```bash
npm test
npm run build
npm audit
```

Only public browser configuration belongs in `VITE_*` variables. See the [repository README](../README.md) for backend setup, security limitations, and responsible-use guidance.
