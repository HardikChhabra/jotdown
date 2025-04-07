# 📓 Jotdown – A Full-Stack Note-Taking Application

Jotdown is a full-stack, intuitive note-taking web application designed to deliver a seamless and secure user experience. Built with modern technologies on both frontend and backend, it enables users to register or log in, and perform full CRUD (Create, Read, Update, Delete) operations on their personal notes.

## 🔧 Tech Stack

### 🖥 Frontend

- **Framework**: Next.js (React-based)
- **Styling**: Tailwind CSS for rapid and responsive UI design
- **Type Safety**: TypeScript ensures compile-time error checking and strong typing

### 🧠 Backend

- **Runtime**: Node.js
- **Framework**: Express.js for building a fast and minimal RESTful API
- **Authentication**: JWT (JSON Web Tokens) for stateless and secure user authentication
- **ORM**: Drizzle ORM for efficient and type-safe interactions with the PostgreSQL database
- **Schema Validation**: Zod for runtime validation and parsing of incoming data

### 🗃 Database

- **PostgreSQL**: A powerful, open-source relational database that stores users and their notes

## ✨ Features

- **Authentication**: Secure user registration and login with JWT-based authentication
- **Notes Management**: Users can create, read, update, and delete their personal notes
- **Note Structure**: Each note contains a `title` and `content`, offering flexibility for various use-cases (to-do lists, journal entries, study notes, etc.)
- **Schema Validation**: All incoming requests are validated using Zod to ensure integrity and prevent malformed or malicious data
- **Database Abstraction**: Drizzle ORM manages database operations with strong typing and clarity, making the system robust and developer-friendly
- **Protected Routes**: Only authenticated users can access their respective notes; user data isolation is strictly enforced

## 🧩 Architecture Highlights

- **Token-based Stateless Sessions**: JWT is used to manage sessions securely without server-side state
- **Component-driven UI**: The frontend leverages reusable, responsive components powered by Tailwind and optimized by Next.js
- **API Design**: RESTful endpoints designed with clarity and scalability in mind

## 🚀 Goals

- To provide a clean, fast, and user-friendly note-taking experience
- To build an example of a production-ready full-stack app using modern best practices
- To demonstrate effective state management, type safety, and secure data handling in a real-world application

## 🏁 Getting Started

### Prerequisites

- Node.js (v16+)
- notes-api (https://github.com/hardikchhabra/notes-api)
- PostgreSQL
- npm or yarn

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/hardikchhabra/jotdown
   cd jotdown
   ```

2. Install dependencies

   ```bash
   npm install

   ```

3. Set up environment variables

   ```bash
   cp .env.example .env
   # Edit .env with your database credentials and JWT secret
   ```

4. Start the development server
   ```bash
   npm run dev
   ```

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📧 Contact

Project Link: [https://github.com/hardikchhabra/jotdown](https://github.com/hardikchhabra/jotdown)
