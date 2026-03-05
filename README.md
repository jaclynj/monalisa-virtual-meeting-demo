This is a meeting tracking demo app. It saves meetings to localstorage. You can clear these after you create them by clearing local storage in your browser.
You can also set some default meetings in `pages/meetingData.json`

## Getting Started

To run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/zeit/next.js/tree/canary/packages/create-next-app).

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/zeit/next.js/) - your feedback and contributions are welcome!

## Improvement Plan

### 1. Code Organization
- **Move components out of `pages/`** — `MeetingForm.js`, `MeetingList.js`, and `MonalisaMessage.js` are not pages and should live in a `components/` directory. The `pages/` directory in Next.js is routing-specific; putting UI components there is non-standard and confusing.
- **Move `meetingData.json`** to a `data/` or `lib/` directory since it's seed data, not a page.

### 2. Modernize the Code
- **Convert class components to functional components with hooks** — `Home`, `MeetingForm`, and `MonalisaMessage` all use class components with lifecycle methods. The React hooks equivalent (`useState`, `useEffect`) is the modern pattern and reduces boilerplate significantly.
- **Upgrade Next.js** from `9.3.6` (released 2020) to a current version. This also resolves the OpenSSL build error on Node 17+ that requires the `--openssl-legacy-provider` workaround.

### 3. Bug Fixes
- **`addMeeting` doesn't reset the form** — After submitting, `MeetingForm` retains the values entered. The state should reset to defaults after a successful submit.
- **`meetingData.json` has a past-dated meeting** — The seed meeting is from 2020-05-10, so it's always filtered out by `filterPastMeetings`. Either remove it or use a future date.
- **`MeetingsList` crashes if `meetings` is empty** — `MonalisaMessage` is passed `meetings[0]`, which is `undefined` when the list is empty. Add a guard (`meetings.length > 0`) before rendering it.
- **`key={index}` in meeting list** — Using array index as React key is an anti-pattern. Use a stable unique ID (e.g., add a `uuid` or timestamp-based id when creating a meeting).
- **`meetingUrl` is rendered as a link with no validation** — The URL field accepts any string including non-URLs. Add basic URL validation or render gracefully when the URL is empty/invalid.

### 4. UX Improvements
- **Add a "delete meeting" button** — Users currently have to manually clear localStorage to remove meetings. A per-row delete button would be much more user-friendly.
- **Show a message when no meetings exist** — When the list is empty, the UI shows nothing. A "No upcoming meetings" placeholder would be clearer.
- **"Who" dropdown is hardcoded** — `Devin` and `Allison` are hardcoded options. Make this a free-text input or configurable.
- **Form has no validation** — Meeting title and URL are unchecked. Prevent submission of an empty title and show an error message.

### 5. Testing
- **Add unit tests** — There are no tests at all. Adding tests for the utility functions (`sortMeetings`, `filterPastMeetings`, `getMonaMessage`) and basic component render tests with React Testing Library would be a solid starting point.

### 6. Developer Experience
- **Add a linter and formatter** — There's no ESLint or Prettier config. Adding `eslint-config-next` and Prettier would enforce consistent style and catch common errors.
- **Add `.env` support** — The `ASCII_ENDPOINT` URL is hardcoded in `MonalisaMessage.js`. It should be an environment variable.

### 7. README
- **Update the README** with more context about the app, how to configure default meetings, and screenshots.
