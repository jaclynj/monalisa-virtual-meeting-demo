# Monalisa Virtual Meeting Demo

A meeting tracking app built with **Next.js 15** and **React 18**. Meetings are persisted in the browser via `localStorage`. Clear them at any time through your browser's developer tools.

To pre-seed meetings, edit `data/meetingData.json`.

## Stack

- [Next.js 15](https://nextjs.org/) — Pages Router
- [React 18](https://react.dev/) — functional components and hooks throughout
- [ESLint](https://eslint.org/) — `next/core-web-vitals` ruleset

## Project layout

```
components/   MeetingForm, MeetingList, MonalisaMessage
data/         meetingData.json (default seed data)
pages/        index.js (home page), api/hello.js
public/       static assets
```

## Development

Install dependencies and start the dev server:

```bash
yarn
yarn dev
```

Then open <http://localhost:3000>.

## Available scripts

| Command | Description |
|---------|-------------|
| `yarn dev` | Start the development server |
| `yarn build` | Production build (includes linting) |
| `yarn start` | Start the production server |
| `yarn lint` | Run ESLint |

## Resources

- [Next.js docs](https://nextjs.org/docs)
- [Next.js GitHub repository](https://github.com/vercel/next.js/)
