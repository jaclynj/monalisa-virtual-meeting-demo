# Meeting Tracker Demo App

This is a meeting tracking demo app built with **Next.js 15** and **React 19** using modern React hooks. It saves meetings to localStorage and you can clear them by clearing local storage in your browser.

You can also set some default meetings in `pages/meetingData.json`.

## Prerequisites

- **Node.js**: Version 18.0.0 or higher
- **npm**: Version 8.0.0 or higher

You can check your versions with:
```bash
node --version
npm --version
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Creates a production build
- `npm run start` - Starts the production server
- `npm run update-deps` - Updates dependencies and fixes security issues

## Keeping Dependencies Up to Date

### Regular Updates
To keep your dependencies up to date and maintain security:

```bash
# Update all dependencies to latest versions
npm run update-deps

# Or manually:
npm update
npm audit fix
```

### Major Version Updates
For major version updates, check the changelog of each dependency:

```bash
# Check outdated packages
npm outdated

# Update specific packages
npm install package-name@latest
```

### Security Audits
Regularly run security audits:

```bash
# Check for vulnerabilities
npm audit

# Fix automatically fixable issues
npm audit fix

# For breaking changes, use with caution
npm audit fix --force
```

### Troubleshooting Build Issues

If you encounter build errors:

1. **Node.js Version Issues**: Ensure you're using Node.js 18+ as specified in `package.json`
2. **Dependency Conflicts**: Try clearing `node_modules` and reinstalling:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```
3. **OpenSSL Errors**: Usually resolved by updating to Next.js 15+ (already done)

## Architecture

This app uses modern React patterns:
- **Functional Components** with React Hooks
- **useState** for state management
- **useEffect** for side effects
- **React.memo** for performance optimization

## Learn More

This is a [Next.js](https://nextjs.org/) project. To learn more about Next.js:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial
- [React Hooks Documentation](https://react.dev/reference/react) - learn about modern React patterns

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
