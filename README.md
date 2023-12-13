# Instawork Project

This is a basic team management web application that allows you to view users, add users to your team, edit users in the team, and delete users from the team.

# Requirements
- Node v18
- Nvm v0.39.2
- Npm v8.1.2
- Docker v20+
- SQLite

# Building and Testing
1. [With Docker](#building-and-testing-with-docker) (recommended)
2. [Without Docker](#building-and-testing-without-docker)



## Building and Testing with Docker
1. Enter `docker compose up --build` in a terminal at the root of this project. This will create the frontend and backend services simultaneously, and project will be ready to view at `http://localhost:4173`. 


## Building and Testing without Docker
0. Make sure you are using node v18+. `nvm use 18`. 
1. Install dependencies for backend: `cd backend/ && npm install`
2. Build the backend: `npm run build` from the `backend/` directory
3. Run the backend: `npm run start`. This will serve the backend on port 3000
4. Go into frontend directory and run the scripts - `cd ../frontent && npm install`, ` npm run build`.
5. Run the frontend build: `npm run preview`. This will serve the frontend at port 4173.
6. Navigate to `http://localhost:4173` and you should see the main screen.
