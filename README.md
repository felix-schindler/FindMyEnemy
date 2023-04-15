# Find my enemy (MWA)

## Run the app

Start frontend and backend (on [localhost](http://localhost)) and database (on :8001) with `docker-compose up`

## Services

### Development

| Service      | Port      | Directory |
|--------------|-----------|-----------|
| Frontend     | 5173      | frontend  |
| Backend      | 8000      | backend   |
| SurrealDB    | 8001      | data      |

### Deployment (Docker)

| Service      | Port      | Directory | Web-Path |
|--------------|-----------|-----------|----------|
| Frontend     | 80:3000   | frontend  | /        |
| Backend      | 80:8000   | backend   | /api/    |
| SurrealDB    | 8001:8000 | data      | -        |

## Team

- Ayse @ae074
- Marina @mb421
- Felix @fs146
- Vi Anh @vn013
- Cornelius @ck184
- Tomas @ty008
