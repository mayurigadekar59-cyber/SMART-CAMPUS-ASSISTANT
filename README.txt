SMART CAMPUS ASSISTANT — UPDATED PROJECT
========================================

PROJECT TYPE
Browser-based academic mini project using HTML, CSS and JavaScript.

NEW ROLE-BASED FEATURES
- Separate Student Login and Admin Login pages
- Student login using Student ID + password
- Admin login with an administrator dashboard
- Admin can add student records (ID, name, course, semester, email, phone, attendance)
- Admin can edit and delete student records
- Admin can publish and delete campus notices
- Admin dashboard shows total students, average attendance, total notices, and important notices
- Student dashboard automatically uses the logged-in student's name and attendance
- Data is saved in browser localStorage so changes remain after refresh on the same browser
- Existing timetable, notices, attendance, events, and AI Campus Assistant are retained

DEMO LOGIN
Student: student / student123
Admin: admin / admin123

ADDITIONAL STUDENT LOGIN
After the admin creates a student record, that student can log in with the Student ID and the demo student password: student123.

HOW TO RUN
1. Extract the project ZIP.
2. Open the Smart_Campus_Assistant folder.
3. Open index.html in Chrome, Edge, or Firefox.
4. No installation or database is required for this demo.

IMPORTANT NOTE
This is still a front-end demonstration project. Authentication and records are stored in browser localStorage, not a secure server/database. For a real college deployment, use a backend, database, encrypted passwords, sessions/JWT, role-based authorization, validation, and secure APIs.

PROJECT FILES
index.html  - login screen, student portal, and admin panel structure
style.css   - portal, login, admin dashboard, tables, forms, and responsive styling
script.js   - login, role handling, localStorage records, admin CRUD, notices, timetable, attendance, events, and assistant responses
