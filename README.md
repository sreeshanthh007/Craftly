# Craftly 🚀

Craftly is an advanced AI-powered software engineering assistant designed to turn app ideas into fully functional, production-ready codebases. By orchestrating multiple specialized AI agents, Craftly plans, builds, and deploys full-stack applications with a focus on speed, quality, and maintainability.

## ✨ Key Features

- **Multi-Agent Orchestration**: Specialized agents for Planning, UI/UX, Backend, and DevOps work together to build cohesive applications.
- **Full-Stack Projects**: Automatically generates complete monorepo projects with React/Vite frontends and Node/Express backends.
- **Interactive Sandbox**: Instant previews using Docker-isolated environments for real-time testing of generated code.
- **Smart Git Management**: Every project is initialized with Git, ensuring version control and easy deployment.
- **AI-Driven Logic**: Powered by Google's Gemini AI for state-of-the-art code generation and architectural planning.
- **Modern Tech Stack**: Pre-configured with TypeScript, Tailwind CSS, Vite, and more.

## 🏗️ Architecture

Craftly follows a strict monorepo structure for generated projects:

- `/frontend`: React application using Vite and Tailwind CSS.
- `/backend`: Node.js API using Express and TypeScript.
- `/devops`: Automated Docker and deployment configurations.

## 🚀 Getting Started

### Prerequisites

- Node.js (v20+)
- Docker Desktop (required for the sandbox preview feature)
- Supabase account (for database and authentication)
- Google Gemini API Key

### Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/sreeshanthh007/Craftly.git
   cd Craftly
   ```

2. **Backend Configuration**:
   ```bash
   cd api
   cp .env.example .env
   # Update .env with your Gemini API Key, Supabase credentials, etc.
   npm install
   ```

3. **Frontend Configuration**:
   ```bash
   cd ../client
   npm install
   ```

4. **Running Locally**:
   - Start the API: `cd api && npm run dev`
   - Start the Client: `cd client && npm run dev`

## 🛠️ Built With

- **AI**: Google Gemini API (LangChain)
- **Frontend**: React, TypeScript, Tailwind CSS, Vite
- **Backend**: Node.js, Express, TypeScript
- **Infrastructure**: Docker, Dockerode
- **Database**: Supabase
- **Git**: Simple-Git