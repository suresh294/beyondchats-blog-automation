# BeyondChats Blog Automation

[![CI](https://github.com/suresh294/beyondchats-blog-automation/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/suresh294/beyondchats-blog-automation/actions/workflows/ci.yml)

A Node.js and React practice project for scraping article links from the BeyondChats blog, saving new article records in MongoDB, and exposing article CRUD endpoints through Express.

> **Deployment status:** A verified public deployment URL has not been confirmed. This repository should be treated as a local prototype, not as a production publishing service.

## Current Features

- Scrapes up to five article links from `https://beyondchats.com/blogs`.
- Avoids inserting duplicate records based on the article source URL.
- Stores article titles, source URLs, content placeholders, and update metadata in MongoDB.
- Exposes REST endpoints for listing, creating, updating, and deleting article records.
- Provides a manual scrape endpoint and a scheduled daily scrape job.
- Includes a React frontend for viewing articles.

The current scraper stores a placeholder for article content. Do not assume full article extraction, AI rewriting, or automatic publishing is implemented unless those workflows are verified in the current code.

## Technology Stack

- Backend: Node.js, Express, Mongoose
- Scraping: Axios, Cheerio
- Scheduling: node-cron
- Frontend: React, React Scripts, Axios

## Prerequisites

- Node.js 18 or newer
- npm
- A MongoDB instance (local or hosted)

## Run the Backend

From the repository root:

```bash
cd backend
npm install
```

Create `backend/.env` from the provided template and set your MongoDB connection string:

```dotenv
MONGO_URI=mongodb://127.0.0.1:27017/beyondchats_blog_automation
PORT=5000
```

Start the API:

```bash
npm start
```

The API listens on the configured port (default `5000`) after MongoDB connects. The root endpoint is `GET /`.

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/articles` | List article records |
| POST | `/api/articles` | Create an article record |
| PUT | `/api/articles/:id` | Update an article record |
| DELETE | `/api/articles/:id` | Delete an article record |
| POST | `/api/scrape` | Scrape article links and save new records |

The article CRUD and scrape endpoints currently have no authentication middleware. Do not expose them to the public internet without adding authorization, request validation, rate limiting, and appropriate CORS restrictions.

## Run the Frontend

Open a second terminal:

```bash
cd frontend
npm install
npm start
```

Use the local URL printed by the development server. Confirm the frontend API base URL matches the backend port if requests fail.

## Current Limitations

- Scraping depends on the source website's HTML structure and may return fewer than five links if the page changes.
- The current scraper saves placeholder content rather than full article text.
- No verified public demo or production deployment is documented.
- Automated tests and dependency/security audit results have not been established for this repository.
- Public deployment requires authentication, stronger validation, CORS restrictions, and careful review of scraping permissions and rate limits.

## Repository

[View BeyondChats Blog Automation on GitHub](https://github.com/suresh294/beyondchats-blog-automation)
