# BeyondChats Blog Automation

## Overview
This project automates blog scraping, enhancement, and publishing for BeyondChats.
It includes backend APIs, an AI-powered article updater, and a React frontend.

---

## Tech Stack
- Backend: Node.js, Express, MongoDB
- Automation: Node.js, Cheerio, Axios, OpenAI API
- Frontend: ReactJS, Tailwind CSS

---

## Architecture / Data Flow
1. Blogs are scraped from BeyondChats website
2. Stored in database using CRUD APIs
3. Automation script:
   - Searches article titles on Google
   - Scrapes top 2 ranking blogs
   - Uses LLM to enhance content
   - Updates article via APIs with references
4. Frontend fetches and displays original and updated articles

---

## Local Setup Instructions

### Backend
```bash
cd backend
npm install
npm start
