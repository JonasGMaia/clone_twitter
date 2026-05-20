# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

Monorepo with a **Django 6.0 REST backend** (`backend/`) and a **React 19 + Vite 8 + TypeScript frontend** (`frontend/`). Database is SQLite (no external services required).

### Running services

| Service | Directory | Start command | Default port |
|---------|-----------|---------------|--------------|
| Backend | `backend/` | `poetry run python manage.py runserver 0.0.0.0:8000` | 8000 |
| Frontend | `frontend/` | `npm run dev -- --host 0.0.0.0 --port 5173` | 5173 |

### Key commands

- **Backend lint**: No linter configured yet in `pyproject.toml`.
- **Frontend lint**: `npm run lint` (ESLint, from `frontend/`).
- **Frontend build**: `npm run build` (TypeScript + Vite, from `frontend/`).
- **Django migrations**: `poetry run python manage.py migrate` (from `backend/`).

### Gotchas

- Poetry installs a virtualenv under `~/.cache/pypoetry/virtualenvs/`. All Django commands must be prefixed with `poetry run` (from `backend/`), or activate the virtualenv first.
- The `pyproject.toml` doesn't set `package-mode = false`, so use `poetry install --no-root` to avoid the "No file/folder found for package backend" error.
- Python 3.12+ is required (Django 6.0 minimum).
- The backend has `djangorestframework`, `simplejwt`, and `cors-headers` as dependencies but they are **not yet** wired into `INSTALLED_APPS` or `MIDDLEWARE` in `settings.py`.
