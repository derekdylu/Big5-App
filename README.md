# 5ee You

<img width="1488" height="912" alt="1776402402170-proj_SEE" src="https://github.com/user-attachments/assets/29f8610d-c889-417f-8d25-e6c3d5af1d97" />

5ee you is a web-based application specially designed for mobile. Utilizing our machine learning model, It provides instant prediction of Big Five personality based on a 15 seconds clip containing the user's face.

## Project status

This repository is preserved for study, not as a supported product:

- The previously documented frontend and backend deployments are offline.
- Model checkpoints are not distributed in the current tree, so inference is disabled until an operator supplies a trusted checkpoint.
- The backend data API has no end-user authorization model and is disabled by default. Do not expose it to a public network.
- The model and its outputs have not been established as valid psychological, medical, educational, or employment assessments.
- The maintained frontend and Python dependency sets have been upgraded from their 2022 versions and audited locally.

## Historical features

- Record a 15-second video in a mobile browser.
- Process sampled face frames with an experimental 3D convolutional model.
- Store interview metadata and display Big Five result charts.
- Offer guest and Google Identity Services login flows in the frontend prototype.

## Repository layout

```text
backend/                 FastAPI routes, MongoDB models, and ML inference code
frontend/                React and Vite frontend
backend/.env.defaults    Safe backend configuration template
frontend/.env.example    Safe public frontend configuration template
requirements.txt         Python dependency pins
```

## Requirements

The backend requires Python 3.13. The maintained frontend toolchain supports Node.js 20.19+, 22.13+, or 24+ with npm. You will also need:

- MongoDB for the data API;
- FFmpeg and FFprobe for video inspection;
- native build tooling required by `dlib` and PyTorch;
- a trusted, compatible model checkpoint for inference.

The checks documented below were verified with Python 3.13, Node.js 24, and npm 11.

## Frontend setup

```bash
cd frontend
cp .env.example .env.local
npm ci
npm start
```

Set `VITE_API_URL` to the local backend address. `VITE_GOOGLE_CLIENT_ID` is a public browser OAuth client identifier, not a secret. Never place secrets in a `VITE_*` variable because Vite embeds those values in the browser bundle.

## Backend setup

From the repository root:

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
cp backend/.env.defaults .env
uvicorn backend.main:app --host 127.0.0.1 --port 8000
```

The health endpoint and API documentation remain available with the default configuration. All data and upload routes return `503` unless `ENABLE_UNAUTHENTICATED_DEMO_API=true` is set. That switch exists only for isolated local research; it does not provide authentication or authorization.

`BIG5_MODEL_PATH` must point to a trusted local checkpoint before inference can run. PyTorch checkpoints can execute unsafe deserialization behavior, so do not load files from untrusted sources.

## Configuration

| Variable | Surface | Purpose |
| --- | --- | --- |
| `MONGO_URI` | Backend | MongoDB connection URI; keep credentials out of Git. |
| `ENABLE_UNAUTHENTICATED_DEMO_API` | Backend | Explicitly enables the local-only research API. |
| `CORS_ORIGINS` | Backend | Comma-separated browser origins; defaults to local development origins. |
| `MAX_UPLOAD_BYTES` | Backend | Maximum accepted video size; defaults to 25 MiB. |
| `BIG5_MODEL_PATH` | Backend | Absolute path to a trusted model checkpoint. |
| `VITE_API_URL` | Frontend | Public URL used by the browser client. |
| `VITE_GOOGLE_CLIENT_ID` | Frontend | Public Google browser OAuth client identifier. |

## Testing and verification

Run the frontend tests and production build with:

```bash
cd frontend
npm test
npm run build
```

Run the backend smoke tests from the repository root after installing the Python requirements:

```bash
python -m unittest backend.test_smoke
```

These checks cover dependency integration and basic API schema behavior; they are not a production-readiness claim.

## Third-party material

Portions of the 3D ResNet implementation were adapted from an MIT-licensed upstream project. See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md). Model checkpoints, datasets, and other large research assets are not distributed here; their separate terms must be reviewed before use.

## License

This project is licensed under the [MIT License](LICENSE). Third-party components remain subject to the terms listed in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
