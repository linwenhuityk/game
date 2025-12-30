# Pixel Art Quiz Game

A retro-style pixel art quiz game built with React + Vite and Google Apps Script.

## Features
- **Pixel Art Aesthetic**: Custom fonts and styling.
- **Dynamic Avatars**: "Boss" images generated via DiceBear.
- **Backend Integration**: Scores saved to Google Sheets via Apps Script.

## Setup

### 1. Prerequisites
- Node.js (v18+)
- Google Account (for Sheets & Apps Script)

### 2. Local Development
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and fill in your values.
4. Run locally:
   ```bash
   npm run dev
   ```

## Backend Deployment (Google Apps Script)
1. Create a new Google Sheet.
2. Go to **Extensions > Apps Script**.
3. Copy the code from `backend/code.gs` into the script editor.
4. Run the `setup()` function once to create necessary sheets.
5. Deploy as Web App:
   - **Deploy > New Deployment**.
   - Type: **Web App**.
   - Access: **Anyone**.
   - Copy the URL.

## Automatic Deployment (GitHub Pages)

This repository includes a GitHub Action to automatically deploy the game to GitHub Pages.

### Configuration Steps
1. Push your code to GitHub.
2. Go to **Settings > Secrets and variables > Actions**.
3. Click **New repository secret**.
4. Add the following secrets (values from your `.env`):
   - `VITE_GOOGLE_APP_SCRIPT_URL`: Your Web App URL.
   - `VITE_PASS_THRESHOLD`: (Optional, e.g. 3)
   - `VITE_QUESTION_COUNT`: (Optional, e.g. 5)
5. Go to **Settings > Pages**.
   - **Build and deployment > Source**: Select **GitHub Actions** (beta).
6. Push a change to `main` or manually run the workflow from the **Actions** tab.

The game will be live at `https://<your-username>.github.io/<repo-name>/`.
