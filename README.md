# MathWhiz — Interactive Mathematical Explorer

**Explore functions. Understand mathematics. See the equations come to life.**

MathWhiz is a full-stack web application designed to help students develop an intuitive understanding of mathematical functions through interactive graphs and real-time parameter adjustments. Instead of relying solely on equations and formulas, users can experiment with functions, observe how their graphs change, evaluate them at specific input values, and save their explorations for later.

**Live Demo:** https://mathwhiz-phi.vercel.app/

## Table of Contents

- [Problem Statement](#problem-statement)
- [Features](#features)
- [Supported Functions](#supported-functions)
- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Challenges Faced](#challenges-faced)
- [Future Improvements](#future-improvements)
- [Author](#author)

## Problem Statement

Students often struggle to understand abstract mathematical concepts because equations and formulas alone do not effectively illustrate how mathematical functions behave or how changes in their parameters affect their graphs. This creates a gap between symbolic mathematical representations and their visual interpretation.

MathWhiz aims to bridge this gap through an interactive learning platform that combines mathematical calculations, dynamic visualizations, and persistent storage of user explorations.

## Features

- **Interactive Function Explorer:** Select a function family and experiment with its coefficients.
- **Dynamic Graphs:** Visualize how parameter changes affect the shape and behavior of a function.
- **Function Evaluation:** Enter an input value \(x\) and calculate the corresponding function output.
- **Multiple Function Families:** Explore quadratic, cubic, and exponential functions.
- **Save Explorations:** Store named mathematical explorations in MongoDB.
- **Edit Explorations:** Load a saved exploration and modify its parameters.
- **Delete Explorations:** Remove saved explorations when they are no longer needed.
- **REST API:** Communicate between the React frontend and the Express backend.
- **Cloud Deployment:** Deploy the frontend and backend separately.

## Supported Functions

| Function    | General Form            | Parameters  |
| ----------- | ----------------------- | ----------- |
| Quadratic   | \(f(x)=ax^2+bx+c\)      | \(a,b,c\)   |
| Cubic       | \(f(x)=ax^3+bx^2+cx+d\) | \(a,b,c,d\) |
| Exponential | \(f(x)=a\cdot b^x\)     | \(a,b\)     |

The explorer recalculates function values and graph coordinates when the selected function or its parameters change.

## Tech Stack

| Layer              | Technologies           |
| ------------------ | ---------------------- |
| Frontend           | React, JavaScript, CSS |
| Frontend tooling   | Vite, React Router     |
| Graphing           | React graph component  |
| Backend            | Node.js, Express.js    |
| Database           | MongoDB, Mongoose      |
| HTTP communication | Axios, REST API        |
| Frontend hosting   | Vercel                 |
| Backend hosting    | Render                 |
| Database hosting   | MongoDB Atlas          |

## System Architecture

MathWhiz follows a client-server architecture.

```text
User
  |
  v
React Frontend (Vite)
  |
  | HTTP requests through Axios
  v
Express REST API (Node.js)
  |
  | Mongoose
  v
MongoDB Atlas
```

The frontend handles user interaction, mathematical calculations, and graph visualization. The backend exposes REST endpoints for saving, retrieving, updating, and deleting explorations. MongoDB stores the saved exploration data so it can be retrieved after the page is refreshed.

## Project Structure

The main project structure is organized as follows. Some filenames may differ depending on the final repository.

```text
mathwhiz/
├── public/
├── src/
│   ├── components/
│   │   └── FunctionGraph.jsx
│   ├── pages/
│   │   ├── landing.jsx
│   │   └── funcExplore.jsx
│   ├── utils/
│   │   └── mathEngine.js
│   ├── api.js
│   ├── App.jsx
│   └── App.css
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── models/
│   │   │   └── Exploration.js
│   │   ├── routes/
│   │   │   └── explorationRoutes.js
│   │   └── server.js
│   ├── .env
│   └── package.json
├── .gitignore
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

Install the following before running the application locally:

- [Node.js](https://nodejs.org/)
- npm, included with Node.js
- A MongoDB instance, either local MongoDB or a MongoDB Atlas cluster
- Git

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd mathwhiz
```

Replace the placeholder with your actual GitHub repository URL.

### 2. Install frontend dependencies

From the project root:

```bash
npm install
npm install axios react-router-dom
```

### 3. Configure the frontend

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Install backend dependencies

```bash
cd backend
npm install
```

If the backend dependencies are not already declared in `backend/package.json`, install the required packages:

```bash
npm install express cors dotenv mongoose
npm install --save-dev nodemon
```

### 5. Configure the backend

Create `backend/.env`:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/mathwhiz
FRONTEND_URL=http://localhost:5173
```

This example uses a local MongoDB instance. To use MongoDB Atlas, replace the database URI with your own connection string.

**Important:** Never commit `.env` files, database credentials, or other secrets to GitHub.

### 6. Start the backend

From the `backend` directory:

```bash
node src/server.js
```

The server should connect to MongoDB and start listening on the configured port.

The health endpoint is available at:

```text
http://localhost:5000/api/health
```

A successful response should indicate that the API is running.

### 7. Start the frontend

Open a second terminal, navigate to the project root, and run:

```bash
npm run dev
```

Open the local URL printed by Vite, usually:

```text
http://localhost:5173
```

You can now explore the functions and use the saved-exploration features.

## Environment Variables

| Variable       | Used by  | Purpose                                  |
| -------------- | -------- | ---------------------------------------- |
| `VITE_API_URL` | Frontend | Base URL of the backend API              |
| `PORT`         | Backend  | Port on which the Express server listens |
| `MONGODB_URI`  | Backend  | MongoDB connection string                |
| `FRONTEND_URL` | Backend  | Allowed frontend origin for CORS         |

For deployment, configure the variables in the respective hosting platforms rather than hardcoding production credentials.

Example production frontend configuration:

```env
VITE_API_URL=https://mathwhiz-5dcu.onrender.com/api
```

The frontend URL above points to the deployed backend. The MongoDB connection string must remain a backend-only environment variable.

## API Endpoints

The backend exposes the following endpoints under `/api/explorations`.

| Method | Endpoint                | Purpose                        |
| ------ | ----------------------- | ------------------------------ |
| GET    | `/api/explorations`     | Retrieve saved explorations    |
| GET    | `/api/explorations/:id` | Retrieve one exploration       |
| POST   | `/api/explorations`     | Create a new exploration       |
| PUT    | `/api/explorations/:id` | Update an existing exploration |
| DELETE | `/api/explorations/:id` | Delete an exploration          |

### Example exploration object

```json
{
  "name": "My Quadratic Exploration",
  "functionType": "quadratic",
  "parameters": {
    "a": 1,
    "b": 2,
    "c": -3
  }
}
```

Each saved exploration records its name, function family, and associated parameters. MongoDB documents also include timestamps when configured in the schema.

## Challenges Faced

Developing MathWhiz involved more than implementing the user interface. Connecting the frontend, backend, and database introduced practical debugging and deployment challenges.

### 1. Connecting the frontend and backend

The React application and Express API run as separate services. Making them communicate required configuring the API base URL correctly and ensuring that frontend requests reached the expected backend endpoints.

**What I learned:** A full-stack application requires clearly defined API routes and consistent configuration across its components.

### 2. Managing environment variables

The application uses different configuration values during local development and cloud deployment. The frontend needs the deployed API URL, while the backend needs the database connection string and permitted frontend origin.

**What I learned:** Environment variables make applications configurable across environments, and frontend-exposed variables must never contain private credentials.

### 3. Connecting to MongoDB Atlas

Establishing a remote database connection involved debugging connection-string configuration and network-access restrictions. The backend initially could not reach the Atlas cluster until its connectivity configuration was corrected.

**What I learned:** Database connectivity depends on more than a valid URI; network access rules and deployment environment settings also matter.

### 4. Fixing frontend compilation errors

During development, duplicate imports in the React application caused compilation errors. Resolving the issue required checking the component imports and removing duplicate declarations.

**What I learned:** Small structural errors can prevent an otherwise functional React application from compiling, so reading the actual error message is an important debugging skill.

### 5. Deploying multiple application layers

The frontend, backend, and database have separate deployment and configuration requirements. The application needed to use the correct production API URL rather than the local development address.

**What I learned:** Deploying a full-stack application requires coordinating service URLs, environment variables, database access, and cross-origin requests—not simply uploading frontend files.

## Future Improvements

Potential improvements include:

- User authentication and private, user-specific explorations.
- More mathematical functions, such as trigonometric and logarithmic functions.
- Interactive graph controls, including zooming and panning.
- Root finding, intercept analysis, and derivative visualization.
- A more detailed explanation of how each parameter affects a graph.
- Unit and integration tests for the mathematical engine and API.
- Improved input validation, error handling, and accessibility.
- More robust database access controls and API security.

## Author

**Baswa Vinaya Sangeeta Lahari**  
2024169782
B.Tech — Computer Science and Engineering

- **Live Application:** https://mathwhiz-phi.vercel.app/

---

_MathWhiz was developed as a full-stack learning project to explore interactive mathematical visualization, REST API development, database integration, and cloud deployment._
