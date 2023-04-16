# Find my enemy (MWA)

## Run the app

Start frontend and backend (on [localhost](http://localhost)) and database (on :8001) with `docker-compose up`

## Services

### Development

| Service      | Standard Port | Directory |
|--------------|---------------|-----------|
| Frontend     | 5173          | frontend  |
| Backend      | 8000          | backend   |

### Deployment (Docker)

| Service      | Port      | Directory | Web-Path |
|--------------|-----------|-----------|----------|
| Frontend     | 80:3000   | frontend  | /        |
| Backend      | 80:8000   | backend   | /api/    |
| SurrealDB    | 80:8000   | data      | /db/     |

## Team

- Ayse @ae074
- Marina @mb421
- Felix @fs146
- Vi Anh @vn013
- Cornelius @ck184
- Tomas @ty008
