# Monalisa Virtual Meeting Demo

A small Next.js demo for tracking virtual meetings. It lets you add upcoming meetings, keeps them in browser local storage, and shows a fun Monalisa-themed message for the next meeting in the list.

## Features

- Add meetings with a title, person, date, time, and meeting link
- Automatically sorts meetings by soonest upcoming date and time
- Persists meetings in your browser using `localStorage`
- Seeds the app with sample meetings from `data/meetingData.json`
- Displays an ASCII art message for the next meeting using GitHub’s Octocat endpoint

## Getting started

### Prerequisites

- Node.js 22 or newer

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Create a production build

```bash
npm run build
```

### Start the production server

```bash
npm run start
```

### Lint the project

```bash
npm run lint
```

## How it works

- On first load, the app reads sample meetings from `data/meetingData.json`
- After you add a meeting, the list is saved in `localStorage`
- Clear browser storage to reset the app back to the default sample data
- Past meetings are filtered out so the list only shows upcoming meetings

## Project structure

- `pages/index.js` — main app page
- `components/MeetingForm.js` — meeting entry form
- `components/MeetingList.js` — upcoming meetings list
- `components/MonalisaMessage.js` — Monalisa/Octocat message display
- `data/meetingData.json` — default meeting data

## Notes

This is a demo app, so the meeting data lives entirely in the browser. No backend or database is required.
