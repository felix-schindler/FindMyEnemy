# Find my enemy (MWA)

> Find Your Enemies Before they find you

Find my enemy is a web application that allows you to find your enemies and
challenge them. To figure out your personality, you have to answer 35 questions
based on the 16 personalities test. Enemies are based on the result of your
test. It is a project for the course "Mobile Web Applications" at the Stuttgart
Media University.

## Getting started

### Run the app

```bash
git clone https://gitlab.mi.hdm-stuttgart.de/mwa/ss23/findmyenemy.git
cd findmyenemy
docker-compose up      # wait a few seconds until the DB is initialized
open http://localhost  # only works on mac, otherwise open the URL in your favorite browser
```

After opening in your browser, you can login with `admin:admin`

### Services

| Service  | Port      | Directory | Path  |
| -------- | --------- | --------- | ----- |
| Frontend | 80:3000   | frontend  | /     |
| Backend  | 80:8000   | backend   | /api/ |
| Postgres | 5432:5432 | db        | -     |

## Team

| Name                    | Short  | matriculation number | Responsibilites                               |
| ----------------------- | ------ | -------------------- | --------------------------------------------- |
| Marina Banti            | @mb421 | 45489                | Project management, Frontend (UI, Logic)      |
| Felix Schindler         | @fs146 | 40892                | Project management, Frontend (Logic), Backend |
| Cornelius Moritz Kiefer | @ck184 | 39521                | Database, Backend                             |
| Vi Anh Nguyen           | @vn013 | 42908                | Design, Frontend (UI, Logic)                  |
| Ayse Erorhan            | @ae074 | 41736                | Design, Frontend (UI)                         |
| Tomas Yepes Mendez      | @ty008 | 5010639              | Design, Testing                               |

> Design means UI/UX design, not software design.

## Technologies

- Frontend: SvelteKit, TypeScript, CSS (NodeJS)
- Backend: Hono, TypeScript (Deno)
- Database: Postgres

## Tests

We had some issues with testing on both sides.

### Frontend

- End-to-End account life cycle (Quiz, Register, Logout, Login, Delete Account)
- Components: AccountButton, DiscoverEnemy

1. The component tests are using `@playwright/experimental-ct-svelte` which (as the name states) is still experimental. It's really unreliable and means sometime the tests work and other times they don't.
2. We didn't get playwright to run in the CI/CD because of issues during the playwright setup. Changing from alpine to debian didn't help much as the browser installs are still failing.

### Backend

- All API endpoints

On the backend there where leaking ressources, which is why in the tests

1. `POST /users` (creating the test user) is outside of the test
2. `GET /questions` (getting the questions) is commented out
