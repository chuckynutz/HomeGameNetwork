# The Home Game Network

A Next.js web application for finding and hosting poker games in your area. This is the web version of The Home Game Network, converted from the original React Native mobile app.

## Features

- **Find Games**: Browse available poker games in your area
- **Host Games**: Create and host your own poker games
- **User Authentication**: Secure user registration and login
- **Age Verification**: Ensures users are 21+ to comply with gaming regulations
- **Game Details**: View detailed information about each game including players, location, and buy-in
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Icons**: Lucide React
- **Authentication**: Custom auth store (mock implementation)

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:3000`

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication pages
│   │   ├── verify/        # Age verification
│   │   └── register/      # User registration
│   ├── games/             # Games listing page
│   ├── game/[id]/         # Individual game details
│   ├── host/              # Host a new game
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # Reusable components
│   └── Logo.tsx          # App logo component
├── constants/            # App constants
│   └── colors.ts         # Color scheme
└── hooks/               # Custom hooks
    └── use-auth-store.ts # Authentication state management
```

## Pages

- **Homepage** (`/`): Welcome screen with featured games and main actions
- **Games** (`/games`): Browse all available poker games
- **Game Details** (`/game/[id]`): Detailed view of a specific game
- **Host Game** (`/host`): Form to create a new poker game
- **Age Verification** (`/auth/verify`): Age verification for new users
- **Registration** (`/auth/register`): User account creation

## Development

This project uses:
- **TypeScript** for type safety
- **Tailwind CSS** for styling with a custom dark blue color scheme
- **Zustand** for lightweight state management
- **Lucide React** for consistent iconography

## Mock Data

The app currently uses mock data for demonstration purposes. In a production environment, you would:
- Connect to a real backend API
- Implement proper authentication (e.g., NextAuth.js)
- Add a database for storing game and user data
- Implement real-time features for game updates

## Color Scheme

The app uses a poker-themed dark blue color scheme:
- Primary: `#0052CC` (Bright blue - poker chip color)
- Background: `#001233` (Dark blue background)
- Card: `#001845` (Slightly lighter blue for cards)
- Border: `#0A2463` (Dark blue border)
- Text: `#FFFFFF` (White)
- Text Secondary: `#A0A0A0` (Gray)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is for demonstration purposes. Please ensure compliance with local gaming regulations when implementing real poker game functionality.
