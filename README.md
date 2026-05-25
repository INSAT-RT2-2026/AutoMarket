# TunLuxAuto

A luxury car dealership web app. 
Browse premium cars, or submit your own!

https://automarket-production-ac0c.up.railway.app

## Features

- **Browse & Search** — filter by make, model, type, and sort by price or power
- **Car Details** — dedicated page per vehicle with specs, description, and a Buy Now flow
- **Authentication** — register and login with session persistence via localStorage
- **Contact / Inquiries** — logged-in users can submit inquiries pre-filled with their info
- **My Activity** — users can track their inquiry history and admin replies
- **Sell Your Car** — form to submit a listing with images for admin review
- **Admin Panel** — manage users (roles, passwords, deletion) — admin-only
- **Welcome Email** — sent on registration via Resend API

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML, CSS, JavaScript |
| Backend | PHP 8.2 |
| Database | MySQL |
| Email | Resend API |
| Containerization | Docker + Docker Compose |
| Deployment | Railway |

## Structure

- `frontend/` - HTML/CSS/JS frontend
- `backend/` - Raw PHP API endpoints
- `symfony/` - Symfony application (framework layer)

## Local Setup

### Prerequisites
- Docker and Docker Compose

### Run

```bash
docker compose up --build
```

- App: http://localhost:8080/frontend/
- phpMyAdmin: http://localhost:8081

### Environment Variables (set in `docker-compose.yml`)

| Variable | Description |
|---|---|
| `DB_HOST` | Database host |
| `DB_NAME` | Database name |
| `DB_USER` | Database user |
| `DB_PASSWORD` | Database password |
| `DB_PORT` | Database port |
| `MAIL_PASS` | Resend API key |
| `MAIL_FROM` | Sender email address |

## Deployment

Hosted on **Railway** using a MySQL database . The `db.php` file reads all database credentials from environment variables set in the railway dashboard.

## Email

Welcome emails are sent via the [Resend](https://resend.com) HTTP API on registration. With `onboarding@resend.dev` as the sender.

## Creating an Admin

Manually update a user's role in the database:

Or use the Admin Panel to change roles once you have at least one admin account.