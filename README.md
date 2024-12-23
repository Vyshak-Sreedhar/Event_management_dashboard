Event Management Dashboard Documentation

Project Overview

The Event Management Dashboard streamlines event creation, attendee management, and task tracking. It features a responsive interface, RESTful APIs, and additional features like authentication, progress visualization, and a calendar view for events.

Features

Core Features

Event Management:

Create, read, update, and delete events.

Display event details (name, description, location, date, attendees).

Attendee Management:

Add, view, and delete attendees.

Assign attendees to events or tasks.

Task Management:

Create tasks with deadlines and assigned attendees.

Update task status (Pending/Completed).

Progress Visualization:

Visual indicator (progress bar) for task completion.

Bonus Features

Authentication:

Login/logout functionality using JWT.

Secure access to the dashboard.

Calendar View:

Display events visually on a calendar.

Real-Time Updates:

Dynamically update task progress with WebSockets.

Setup Instructions

Prerequisites

Node.js and npm installed.

MongoDB instance (local or cloud).

Backend Setup

Clone the repository:

git clone <repository-link>
cd backend

Install dependencies:

npm install

Configure environment variables in a .env file:

PORT=5000
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-secret-key>

Start the backend server:

npm start

Backend will run on http://localhost:5000.

Frontend Setup

Navigate to the frontend directory:

cd frontend

Install dependencies:

npm install

Configure API URL in src/api.js:

const API_BASE_URL = 'http://localhost:5000/api';
export default API_BASE_URL;

Start the frontend server:

npm start

Frontend will run on http://localhost:3000.

API Documentation

Event Management APIs

Create Event:

Endpoint: POST /api/events

Body:

{
  "name": "Event Name",
  "description": "Event Description",
  "location": "Event Location",
  "date": "YYYY-MM-DD"
}

Get All Events:

Endpoint: GET /api/events

Update Event:

Endpoint: PUT /api/events/:id

Body: Same as Create Event.

Delete Event:

Endpoint: DELETE /api/events/:id

Attendee Management APIs

Add Attendee:

Endpoint: POST /api/attendees

Body:

{
  "name": "Attendee Name",
  "email": "email@example.com"
}

Get All Attendees:

Endpoint: GET /api/attendees

Delete Attendee:

Endpoint: DELETE /api/attendees/:id

Task Management APIs

Create Task:

Endpoint: POST /api/tasks

Body:

{
  "name": "Task Name",
  "deadline": "YYYY-MM-DD",
  "status": "Pending",
  "assignedAttendee": "Attendee ID",
  "eventId": "Event ID"
}

Get Tasks for an Event:

Endpoint: GET /api/tasks?eventId=<eventId>

Update Task Status:

Endpoint: PUT /api/tasks/:id

Body:

{
  "status": "Completed"
}

Authentication APIs

Login:

Endpoint: POST /api/auth/login

Body:

{
  "email": "email@example.com",
  "password": "password"
}

Features Overview

UI Design:

Clean and responsive interface.

Mobile-friendly design.

Progress Visualization:

Real-time task progress updates.

Calendar Integration:

Visualize events by date.

Authentication:

Secure login/logout mechanism.

Validation:

Prevent empty fields and ensure valid date formats.

Deployment

Backend Deployment

Deploy on Render:

Create a new service.

Link the GitHub repository.

Add environment variables.

Access backend via the deployed URL.

Frontend Deployment

Deploy on Vercel:

Link the GitHub repository.

Ensure API_BASE_URL points to the backend URL.

How to Run the Project

Start the backend:

cd backend
npm start

Start the frontend:

cd frontend
npm start

Open http://localhost:3000 in your browser.
