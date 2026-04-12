# DigiWallet - A Digital wallet application

A secure digital wallet application with peer-to-peer payments, bank transfers, and transaction management.

[Live link](https://wallet.aadityasingh.dev/)

![DigiWallet dashboard](.github/assets/DigiWallet.png)

## Features

- **User Authentication** : Uses [NextAuth](https://authjs.dev/) for Sign up & Sign in.
- **Onramp transactions** : Transfer money from bank account to wallet.
- **P2P transactions** : Transfer money to peers.
- **Transaction history** : Showcases history of past On-ramp & P2P transactions.

## Tech Stack

**Frontend**

- [Next.js 15](https://nextjs.org) - React framework
- [TypeScript](https://typescriptlang.org) - Type safety
- [Tailwind CSS](https://tailwindcss.com) - Styling

**Backend**

- [Node.js](https://nodejs.org) - Runtime environment
- [Express](https://expressjs.com) - Backend framework
- [Prisma](https://prisma.io) - Database ORM

**Database**

- [PostgreSQL](https://postgresql.org) - Primary database

**DevOps & Infrastructure**

- [Docker](https://docker.com) - Containerization
- [Docker Compose](https://docs.docker.com/compose) - Multi-container orchestration
- [GitHub Actions](https://github.com/features/actions) - CI/CD pipeline

**Architecture**

- [Turborepo](https://turbo.build) - Monorepo management

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (Version: >=18.x)
- Docker

## Development

### Setup

---

1. Clone the repo

```bash
git clone git@github.com:aadityasingh9601/Paytm.git
```

2. Go to the project folder

```bash
cd paytm
```

#### Manual setup

1. Install packages

```bash
npm install
```

2. Setting up `.env` files

- Duplicate `.env.example` to `.env`

  ```bash
  cp apps/user-app/.env.example apps/user-app/.env
  cp apps/mock-bank/.env.example apps/mock-bank/.env
  cp apps/bank-webhook/.env.example apps/bank-webhook/.env
  cp packages/db/.env.example packages/db/.env
  ```

- Use `openssl rand -base64 32` to generate a key and add it under `NEXTAUTH_SECRET` in the `apps/user-app/.env` file.

3. Setup postgres database locally using docker

```bash
docker compose up db
```

4. Apply database migrations

```bash
npm run db:migrate-dev
```

5. Generate prisma client

```bash
npm run db:generate
```

6. Run the development server

```bash
npm run dev
```

#### Using Docker

1. Setting up `.env` file

- Duplicate `.env.example` to `.env`

  ```bash
  cp .env.example .env
  ```

- Use `openssl rand -base64 32` to generate a key and add it under `NEXTAUTH_SECRET` in the `apps/user-app/.env` file.

2. Run the development server

```bash
docker compose up
```

3. To gracefully stop the development server

```bash
docker compose down
```

## E2E testing

Create `.env.test` file in the root directory and set the environment variable `DATABASE_URL` in the `.env.test` file. The
value should be `postgresql://postgres:mysecretpassword@localhost:5432/paytm_test_db`.

```bash
# In a terminal just run:
./scripts/run-e2e.sh

# To open the last HTML report run:
npx playwright show-report
```

### Resolving issues

#### E2E browsers not installed

Run `npx playwright install --with-deps` to download the test browsers and the dependencies.

## Author

- **GitHub**: [https://github.com/aadityasingh9601](https://github.com/aadityasingh9601)
- **LinkedIn**: [https://www.linkedin.com/in/aadityasingh999](https://www.linkedin.com/in/aadityasingh999)
- **X**: [https://x.com/AadityaSingh771](https://x.com/AadityaSingh771)
- **Portfolio**: [https://aadityasingh.dev](https://aadityasingh.dev/)
