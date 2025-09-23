# Meeting Tracking Demo App

This is a meeting tracking demo app built with Next.js. It saves meetings to localstorage and displays them with ASCII art from the GitHub Octocat API. You can clear saved meetings by clearing local storage in your browser.

You can also set some default meetings in `pages/meetingData.json`.

## Prerequisites

- Node.js 18.0.0 or higher
- npm 8.0.0 or higher

## Getting Started

### Installation

```bash
# Install dependencies
npm install
```

### Development

To run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Production Build

To create a production build:

```bash
npm run build
npm run start
```

### Linting

To run the linter:

```bash
npm run lint
```

## Keeping the Build Up to Date

### Dependency Management

To keep your dependencies current and secure:

```bash
# Update all dependencies to their latest compatible versions
npm run update-deps

# Or manually update and audit
npm update
npm audit fix

# Check for outdated packages
npm outdated
```

### Major Version Updates

For major version updates that might require code changes:

```bash
# Check what packages have major updates available
npx npm-check-updates

# Update package.json to latest versions (review changes carefully)
npx npm-check-updates -u
npm install

# Test thoroughly after major updates
npm run build
npm run lint
```

### Regular Maintenance Schedule

1. **Weekly**: Run `npm audit` to check for security vulnerabilities
2. **Monthly**: Update patch and minor versions with `npm update`
3. **Quarterly**: Review and update major versions with `npx npm-check-updates`
4. **After any updates**: Always run `npm run build` and test functionality

### Node.js Version Updates

Keep your Node.js version current:

1. Check current version: `node --version`
2. Visit [nodejs.org](https://nodejs.org/) for latest LTS version
3. Update the `engines` field in `package.json` when upgrading
4. Test build and functionality after Node.js updates

### Build Troubleshooting

If you encounter build issues:

1. **Clear cache and reinstall**:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Check Node.js compatibility**: Ensure your Node.js version meets the requirements in `package.json`

3. **Review error messages**: Many issues are dependency-related and can be resolved by updating or downgrading specific packages

## Project Structure

```
├── components/          # Reusable React components
│   ├── MeetingForm.js   # Form for adding meetings
│   ├── MeetingList.js   # Component to display meetings list
│   └── MonalisaMessage.js # ASCII art display component
├── pages/               # Next.js pages (routes)
│   ├── api/            # API routes
│   ├── index.js        # Main page
│   └── meetingData.json # Default meeting data
├── public/             # Static assets
└── package.json        # Dependencies and scripts
```

## Learn More

This is a [Next.js](https://nextjs.org/) project. To learn more about Next.js:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial
- [Next.js GitHub repository](https://github.com/vercel/next.js/) - feedback and contributions welcome!
