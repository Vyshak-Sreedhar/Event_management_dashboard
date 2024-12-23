Event Management Dashboard

Overview

The Event Management Dashboard is a web-based application designed to streamline the process of organizing and managing events. It allows users to:

Manage Events: Create, read, update, and delete events.

Manage Attendees: Add attendees, assign them to events, and remove them as needed.

Track Tasks: Monitor the progress of tasks related to events with visual progress indicators.

Visualize Events: Display events on a calendar.

Authentication: Secure access to the dashboard using login/logout functionality.

Features

Core Features

Event Management:

Create events with details like name, description, location, and date.

Edit or delete existing events.

View a list of all events.

Attendee Management:

Add and remove attendees.

Assign attendees to specific events and tasks.

Task Management:

Create tasks associated with events.

Update task status (Pending/Completed).

Track task progress with a visual progress bar.

Bonus Features

Authentication:

Login and logout functionality using JWT.

Protected routes to ensure only authenticated users can access the dashboard.

Progress Visualization:

Display task completion status using a progress bar.

Calendar View:

Visualize events in a calendar format.

Real-Time Updates:

Leverage WebSockets to dynamically update task progress.

Project Structure

Event-Management-Dashboard/
├── backend/
│   ├── server.js
│   ├── app.js
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── Event.js
│   │   ├── Attendee.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── eventRoutes.js
│   │   ├── attendeeRoutes.js
│   │   └── taskRoutes.js
│   ├── .env
│   ├── package.json
│   └── package-lock.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   ┒   ├── App.js
│   ┒   └── index.js
│   ├── public/
│   ├── package.json
│   └── package-lock.json

Installation and Setup

Prerequisites

Node.js (v18.x or later)

MongoDB (locally or via MongoDB Atlas)

Git

Backend Setup

Navigate to the backend directory:

cd backend

Install dependencies:

npm install

Configure the .env file:

MONGO_URI=<Your MongoDB URI>
JWT_SECRET=<Your Secret Key>
PORT=5000

Start the backend server:

npm run dev

Frontend Setup

Navigate to the frontend directory:

cd frontend

Install dependencies:

npm install

Start the frontend development server:

npm run dev

Usage

Authentication

Navigate to the login page.

Enter your credentials to log in.

Once logged in, the JWT token will be stored and used for authenticated API calls.

Adding Events

Go to the Event Management page.

Click "Add Event" and fill in the required details.

Save the event to see it listed.

Adding Attendees

Navigate to the Attendee Management page.

Add attendees by filling in their details.

Assign attendees to specific events or tasks.

Tracking Progress

Open the Task Tracker page.

Update task statuses (Pending/Completed).

View the progress bar to monitor completion.

Calendar Visualization

Navigate to the Calendar page.

View events visually on the calendar.

API Endpoints

Event Routes

POST /api/events - Create an event

GET /api/events - Get all events

PUT /api/events/:id - Update an event

DELETE /api/events/:id - Delete an event

Attendee Routes

POST /api/attendees - Add an attendee

GET /api/attendees - Get all attendees

DELETE /api/attendees/:id - Delete an attendee

Task Routes

POST /api/tasks - Create a task

GET /api/tasks/:eventId - Get tasks for an event

PUT /api/tasks/:id - Update task status

Technologies Used

Frontend: React, Vite, @fullcalendar/react

Backend: Node.js, Express, MongoDB

Authentication: JWT

Styling: CSS

Contributing

Feel free to fork this repository and submit pull requests for any improvements or bug fixes.

License

This project is licensed under the MIT License.

Acknowledgments

MongoDB

Node.js

React

FullCalendar
