📝 Task Management App
🔹 Short Description
A Task Management Application that allows users to add, edit, delete, and reorder tasks in three categories: To-Do, In Progress, and Done. The app features Firebase Authentication (Google sign-in), real-time database synchronization, and a clean, responsive UI.

🔗 Live Links
Live Demo: Task Management App
Backend Repo (if applicable): Backend Repository
📦 Dependencies
This project uses the following dependencies:

Frontend:

React.js
Tailwind CSS
Firebase Authentication
React DnD (for drag-and-drop functionality)
Backend:

Node.js
Express.js
MongoDB
Mongoose
🚀 Installation Steps
Follow these steps to set up the project locally:

Frontend Setup
Clone the repository

sh
Copy
Edit
git clone https://github.com/your-username/task-management-app.git
cd task-management-app
Install dependencies

sh
Copy
Edit
npm install
Set up Firebase

Create a Firebase project.
Enable Google Authentication.
Get your Firebase Config and create a .env file with:
sh
Copy
Edit
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
Start the development server

sh
Copy
Edit
npm run dev
Backend Setup (if applicable)
Navigate to the backend folder

sh
Copy
Edit
cd backend
Install dependencies

sh
Copy
Edit
npm install
Set up environment variables
Create a .env file in the backend directory and add:

sh
Copy
Edit
MONGO_URI=your_mongodb_connection_string
PORT=5000
Start the backend server

sh
Copy
Edit
npm start
🛠 Technologies Used
Frontend: React.js, Tailwind CSS, Firebase Authentication, React DnD
Backend: Node.js, Express.js, MongoDB
Authentication: Firebase Authentication
State Management: React Context API

