# Study Tracker

A full-stack study task management application built using React, Node.js, Express, and MongoDB.

## Features
- **Task Management:** Create, view, update, and delete study tasks
- **Progress Tracking:** Mark study tasks as completed or pending
- **Persistent Storage:** RESTful API backend connected to MongoDB

## Tech Stack
- **Frontend:** React, Vite, JavaScript, CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB (Mongoose)

## Project Structure
```text
Study-Tracker/
├── client/          # React frontend (Vite)
└── server/          # Node.js & Express backend
Getting StartedPrerequisitesNode.js installed on your machineMongoDB Atlas account or local MongoDB instance1. Clone the repositoryBashgit clone [https://github.com/fardeenmalik1059/Study-Tracker.git](https://github.com/fardeenmalik1059/Study-Tracker.git)
cd Study-Tracker
2. Backend SetupBashcd server
npm install
Create a .env file inside the server folder and add your environment variables:Code snippetMONGO_URI=your_mongodb_connection_string
PORT=5000
Start the backend server:Bashnpm start
3. Frontend SetupOpen a new terminal window and run:Bashcd client
npm install
npm run dev
API EndpointsMethodEndpointDescriptionGET/api/tasksGet all study tasksPOST/api/tasksCreate a new study taskPUT/api/tasks/:idUpdate an existing taskDELETE/api/tasks/:idDelete a study task
