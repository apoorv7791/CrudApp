# HELP STUDY ABROAD – Frontend Assessment

A responsive web application built using Next.js, TypeScript, Material UI, and Zustand. The application provides authentication, user management, and product management using the DummyJSON REST API.

## Tech Stack

- Next.js 16
- TypeScript
- Material UI (MUI)
- Zustand
- NextAuth.js
- DummyJSON REST API

## Features

### Authentication
- Login using DummyJSON authentication API.
- Authentication handled through NextAuth.js.
- Zustand manages authentication state.
- Protected dashboard with logout functionality.

### User Management
- Fetch and display users.
- Search users by query.
- Server-side pagination using API limit and skip.
- View individual user details.
- In-memory caching using Zustand to avoid repeated API requests.

### Product Management
- Fetch and display products.
- Search products.
- Filter products by category.
- Server-side pagination.
- View individual product details.
- Image carousel for product images.
- In-memory caching using Zustand to avoid repeated API requests.

## State Management – Zustand

Zustand is used for global state management.

It was chosen over Redux because:

- **Simplicity:** Minimal boilerplate and an easy-to-understand API.
- **Lightweight:** Small library with low overhead.
- **Async support:** Asynchronous API calls can be handled directly inside store actions without additional middleware.
- **Maintainability:** Separate stores for authentication, users, and products keep the application organized.

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/apoorv7791/CrudApp.git
```

### 2. Navigate to the project

```bash
cd CrudApp
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env.local` file in the project root and add the environment variables required by the application.

For example, if your NextAuth configuration uses these variables:

```env
NEXTAUTH_SECRET=your_generated_secret
NEXTAUTH_URL=http://localhost:3000
```

Generate a secret using:

```bash
openssl rand -base64 32
```

Do not commit `.env.local` or expose your secret values.

### 5. Start the development server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## API

This project uses [DummyJSON](https://dummyjson.com/) for authentication, users, and products.

- Authentication: `/auth/login`
- Users: `/users`
- Products: `/products`

## Author

Developed as part of the HELP STUDY ABROAD Frontend Development Assessment.