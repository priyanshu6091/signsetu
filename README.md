# Flashcard Frenzy

A real-time competitive quiz game where speed and accuracy matter. Built with Next.js, Supabase, and MongoDB.

## Features

### Phase 1 (Current)
- User authentication (signup, signin, signout)
- Protected routes for authenticated users
- User profile management
- Dashboard with game statistics

### Phase 2 (Upcoming)
- Game creation and room management
- Game joining via room codes
- Real-time multiplayer quiz gameplay
- Live scoreboard
- Match history tracking

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Authentication**: Supabase Auth
- **Database**: MongoDB (game data, user stats, match history)
- **Real-time**: Supabase Realtime (planned for Phase 2)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account
- MongoDB database

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd signsetu
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Set up environment variables

Copy the `.env.local.example` file to `.env.local` and fill in your Supabase and MongoDB credentials:

```bash
cp .env.local.example .env.local
```

4. Run the development server

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
├── app/                  # Next.js app directory
│   ├── auth/             # Authentication pages
│   ├── components/       # Reusable components
│   ├── dashboard/        # Dashboard page
│   ├── profile/          # User profile page
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── lib/                  # Library code
│   ├── context/          # React context providers
│   ├── mongodb/          # MongoDB connection and models
│   └── supabase/         # Supabase client
├── public/               # Static assets
└── docs/                 # Documentation
```

## Authentication Flow

1. Users sign up with email and password
2. Email verification is required
3. After verification, users can sign in
4. Protected routes ensure only authenticated users can access certain pages

## Development Roadmap

### Phase 1 (Current)
- [x] User authentication
- [x] Protected routes
- [x] Basic UI components
- [x] User profile page
- [x] Dashboard layout

### Phase 2 (Upcoming)
- [ ] Game creation functionality
- [ ] Game joining functionality
- [ ] Real-time game interface
- [ ] Match history tracking
- [ ] User statistics and leaderboards
