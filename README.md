# CS4400_Phase4 - README

## Technologies Used

- **Frontend**: React JS
- **Backend**: ExpressJS, NodeJS
- **Database**: SQL (MySQL)

---

## Setup Instructions

### Prerequisites

Node.js and npm (for React frontend and Express Backend)
MySQL (for the database)

Clone the repository:

```bash
git clone https://github.com/your-repo/project-name.git
```

### Backend Setup (ExpressJS)

1. Install Dependencies

```bash
cd project_name/backend
npm install
```

2. Configure the `.env` file with database credentials:

   ```env
   DB_HOST=your_database_host
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_NAME=your_database_name
   ```

3. Start the backend server:
   ```bash
   node app.js
   ```

### Frontend Setup (ReactJS)

1. Install Dependencies

```bash
cd project_name/frontend
npm install
```

2. Start the development server:
   ```bash
   npm start
   ```

---

## Running the Application

1. Ensure both the backend and frontend servers are running:
   - Backend: `http://localhost:3030`
   - Frontend: `http://localhost:3000`
2. Open your browser and visit `http://localhost:3000`.
3. Follow the application workflow to experience the functionality.

---

---

## Work Distribution

Akanksh Bandaru:
Worked primarily on the frontend for this project. He primarily used ReactJs to create forms where the users can add information that to be stored to the database. In each forms, Akanksh implemented dropdowns, text fields, and button routing to allow the user move from the home page to the specific form and back.

Boris Kodappully:
Worked primarily on the views pages where he pulled data from the backend api and dynamically displayed the data on the frontend so that the users can visualize the information in each of the views.

Arnav Ganga:
Worked a lot on the UI and connecting the backend and frontend during this project. In reference to the UI, Arnav cleaned up formatting and spacing between form data and the visual aspect of the views. In addition to this, he worked to connect the backend and frontend for multiple procedures so that the user can submit information which could be added to our database.

Hardik Kolisetty:
Worked primarily on the backend portion of the project. He created api connections to all the stored procedures and views while adding debugging statement to check if certain procedure worked as intended or had a problem. After creating the connections, he worked to debug and help connect the backend and frontend of the application.

---
