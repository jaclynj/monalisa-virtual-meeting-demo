# Virtual Meeting Tracker

A simple demo application for tracking virtual meetings built with Next.js. This app saves meetings to local storage and displays upcoming meetings with ASCII art courtesy of GitHub's Octocat API.

## Features

- Track virtual meetings with title, date, time, and URL
- Automatically filters out past meetings
- Stores meetings in browser's local storage
- Displays countdown to next meeting with Octocat ASCII art
- Default meetings can be configured via JSON

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/jaclynj/monalisa-virtual-meeting-demo.git
cd monalisa-virtual-meeting-demo
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Usage

### Adding Meetings

Use the form on the left side of the page to add new meetings:
- Enter a meeting title
- Select the organizer (Devin or Allison)
- Choose the meeting date and time
- Add the meeting URL
- Click Submit

### Managing Meetings

- Meetings are automatically sorted by date and time
- Past meetings are automatically filtered out
- To clear all stored meetings, clear your browser's local storage

### Default Meetings

You can set default meetings in `pages/meetingData.json`. These will be loaded when no meetings exist in local storage.

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Creates an optimized production build
- `npm run start` - Starts the production server
- `npm run lint` - Runs ESLint to check code quality

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [React](https://reactjs.org/) - UI library
- [GitHub Octocat API](https://api.github.com/octocat) - ASCII art generation

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

