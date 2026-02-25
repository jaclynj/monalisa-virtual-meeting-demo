# Zoom Meeting Tracker

A virtual meeting tracking demo built with [Next.js](https://nextjs.org/) and React. Meetings are persisted to `localStorage`, and a default seed list can be configured in `pages/meetingData.json`.

## Features

- Add upcoming meetings with a title, attendee, date, time, and URL
- Past meetings are automatically filtered out
- Upcoming meetings are sorted chronologically
- The next meeting summary is displayed via a fun ASCII-art message powered by the GitHub Octocat API

## Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- npm 9 or later (or Yarn)

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server |
| `npm run build` | Build the app for production |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

## Seed Data

Edit `pages/meetingData.json` to pre-populate the meeting list. Entries must have a future date/time to be displayed.

## Tech Stack

- [Next.js 16](https://nextjs.org/) – React framework with file-based routing and API routes
- [React 19](https://react.dev/) – UI library (functional components with hooks throughout)
- [styled-jsx](https://github.com/vercel/styled-jsx) – Scoped CSS-in-JS (bundled with Next.js)

## Project Structure

```
pages/
  index.js          # Main page component
  meetingData.json  # Default seed meetings
  api/
    hello.js        # Example API route
components/
  MeetingForm.js    # Form for adding a new meeting
  MeetingList.js    # Table of upcoming meetings
  MonalisaMessage.js # ASCII-art next-meeting message
public/
  favicon.ico
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-change`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-change`)
5. Open a pull request

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js GitHub repository](https://github.com/vercel/next.js/)
- [React Documentation](https://react.dev/)
