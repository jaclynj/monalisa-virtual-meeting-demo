# Virtual Meeting Tracker

A small Next.js demo app for tracking upcoming virtual meetings.

- Add meetings with a title, attendee name, date, time, and URL.
- Meetings are saved to browser `localStorage` so they persist across page reloads.
- Past meetings are automatically filtered out; the list stays sorted by date/time.
- The next upcoming meeting is displayed alongside an ASCII-art banner fetched from the [GitHub Octocat API](https://api.github.com/octocat).

Default sample meetings are loaded from `pages/meetingData.json` on first visit (i.e. when `localStorage` is empty). To reset to defaults, clear `localStorage` in your browser's developer tools.

## Getting Started

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

Other available scripts:

| Command | Description |
|---------|-------------|
| `yarn build` | Production build |
| `yarn start` | Start the production server |
| `yarn lint` | Run ESLint via `next lint` |

## Stack

- [Next.js](https://nextjs.org/) (Pages Router)
- [React 18](https://react.dev/)
- [styled-jsx](https://github.com/vercel/styled-jsx) for scoped CSS

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js GitHub repository](https://github.com/vercel/next.js/)
