A meeting tracking demo app built with [Next.js](https://nextjs.org/) 15 and React 18. Meetings are persisted in `localStorage`. You can remove them by clearing local storage in your browser dev tools.

Default seed meetings are defined in `data/meetingData.json`.

## Features

- Add upcoming meetings with title, who, date, time, and URL
- Delete individual meetings
- Toggle past meetings visibility
- Monalisa ASCII art preview for the next upcoming meeting
- Form validation (title required, date/time must be in the future)

## Requirements

- Node.js ≥ 20 (see `.nvmrc`)

## Getting Started

Install dependencies:

```bash
yarn
```

Run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Other Commands

```bash
yarn build   # production build
yarn start   # start production server
yarn lint    # run ESLint
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
