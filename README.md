# Tinder Clone - Backend with Next.js

This project is a Tinder-like application focused on backend functionality. It is built using Next.js, with Shadcn for UI components, Kinde for user authentication, and Neo4j as the database for handling relationships between users.

## Features

- **User Authentication**: Secure user login and signup using Kinde.
- **User Profiles**: Backend handling for user profiles, including details like name, age, preferences, etc.
- **Matching Algorithm**: Backend logic to match users based on preferences and interactions, powered by Neo4j.
- **Real-time Messaging**: Handles real-time messaging between matched users.
- **UI Components**: Built with Shadcn for clean and accessible user interfaces.
  
## Tech Stack

- **Next.js**: React framework for building server-side rendered and statically generated web applications.
- **Shadcn**: For UI components and styling.
- **Kinde**: User authentication and management.
- **Neo4j**: Graph database used for storing user profiles and relationships.
  
## Prerequisites

Make sure you have the following installed:

- Node.js (v14 or above)
- Neo4j (local or cloud instance)
- Kinde account for authentication

### Installing Required Packages

Install dependencies using npm or yarn:

```bash
npm install
# or
yarn install


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
