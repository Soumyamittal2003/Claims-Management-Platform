# Claims-Management-Platform
# Claims Management Platform - Frontend

## Overview
This is the frontend application for the Claims Management Platform. It provides role-based portals for patients and insurers, allowing patients to submit and track claims and insurers to review and manage claims.

## Features
- **Role-Based Access:**
  - Separate portals for Patients and Insurers.
  - Protected routes to prevent unauthorized access.
- **Patient Portal:**
  - Submit a new claim through a user-friendly form with optional document upload.
  - View and track all submitted claims in a card layout.
  - Detailed claim information available in popups.
- **Insurer Portal:**
  - View all claims with filtering options (status, date range, and amount).
  - Manage claims with options to approve or reject and leave comments.
  - Update claim status and approved amounts.
- **Responsive Design:**
  - Built using **React.js** and **Tailwind CSS** for a modern and mobile-friendly interface.

---

## Tech Stack
- **Frontend Library:** React.js
- **Styling:** Tailwind CSS
- **State Management:** React Context API
- **Authentication:** Cookies for session management
- **Routing:** React Router DOM

---

## Installation


```bash
git clone https://github.com/username/frontend-repo.git
cd frontend-repo
npm install
npm run dev
