# MathWhiz — Interactive Mathematical Explorer

**Explore. Visualize. Understand.**

MathWhiz is an interactive mathematical learning platform designed to help students understand abstract mathematical concepts through dynamic graphs and hands-on experimentation.

Instead of simply memorizing equations, users can modify function parameters, observe how graphs change, evaluate functions at specific input values, and save their explorations for future reference.

## Problem Statement

Students often struggle to understand abstract mathematical concepts because equations and formulas alone do not clearly illustrate how functions behave. MathWhiz aims to bridge this gap by connecting mathematical expressions with interactive visual representations.

## Features

- **Function Explorer:** Explore quadratic, cubic, and exponential functions.
- **Dynamic Graphs:** Visualize how changing parameters affects a function's graph.
- **Interactive Parameters:** Modify coefficients and observe changes in real time.
- **Function Evaluation:** Calculate function values for selected input values.
- **Save Explorations:** Save, revisit, edit, and manage previously explored functions.

## Supported Function Families

| Function    | General Form            |
| ----------- | ----------------------- |
| Quadratic   | \(f(x)=ax^2+bx+c\)      |
| Cubic       | \(f(x)=ax^3+bx^2+cx+d\) |
| Exponential | \(f(x)=ab^x\)           |

## Tech Stack

- **Frontend:** React.js, HTML, CSS, JavaScript
- **Graphing:** Recharts
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Version Control:** Git and GitHub
- **Deployment:** Vercel for the frontend; a compatible hosting platform for the backend

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js and npm
- Git
- MongoDB, or access to a MongoDB deployment

### Installation

Clone the repository:

```bash
git clone <your-repository-url>
cd MathWhiz
```

Install the frontend dependencies:

```bash
npm install
```

Start the development server using the script configured in your `package.json`:

```bash
npm run dev
```

> Backend setup instructions will be added once the Express API and MongoDB integration are implemented.

## Project Objective

MathWhiz aims to make mathematics more intuitive by allowing students to experiment with functions and directly observe the relationship between equations, parameters, and graphs.

## License

This project is currently developed as an academic project. A license can be added when the project's distribution terms are decided.
