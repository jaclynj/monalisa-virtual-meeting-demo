This is a meeting tracking demo app. It saves meetings to localstorage. You can clear these after you create them by clearing local storage in your browser.
You can also set some default meetings in `pages/meetingData.json`

```
     /\_/\  
    ( o.o ) 
     > ^ <
```

## Getting Started

To run the development server:

```bash
npm install
npm run dev
# or
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Build Issues Fix

If you encounter build errors related to Node.js compatibility (such as `error:0308010C:digital envelope routines::unsupported`), this project has been updated to use:

- **Next.js 14.2.5** (upgraded from 9.3.6)
- **React 18.3.1** (upgraded from 16.13.1)
- **React-DOM 18.3.1** (upgraded from 16.13.1)

### Troubleshooting Build Issues

1. **Clean install dependencies**:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Run build**:
   ```bash
   npm run build
   ```

3. **If you still have issues**: Make sure you're using Node.js 16+ (recommended: Node.js 18 or 20)

### What was fixed

- **Component organization**: Moved component files (`MeetingForm.js`, `MeetingList.js`, `MonalisaMessage.js`) from `/pages` to `/components` directory
- **Dependencies**: Updated Next.js and React to modern, compatible versions
- **Build compatibility**: Fixed Node.js 18+ compatibility issues

## Learn More

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/zeit/next.js/tree/canary/packages/create-next-app).

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/zeit/next.js/) - your feedback and contributions are welcome!
