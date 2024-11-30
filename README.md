#Event Management Application
A simple and efficient web application for managing events. Users can add, view, and filter events by category with an interactive calendar and upcoming events list. The application leverages React, Redux, and Tailwind CSS, with react-toastify for notifications.

🚀 Features
1. Add Events with Custom Details
Add new events by providing:
Category (e.g., Meeting, Conference, Birthday)
Description (Title or short note for the event)
Start and End Date/Time
Custom Color to visually differentiate events
Events are stored using Redux for global state management.

2. Interactive Calendar
View all scheduled events on a calendar interface.
Easily navigate through different months to view upcoming or past events.
3. Upcoming Events
A dedicated section to display a list of upcoming events sorted by date.
Keep track of imminent deadlines or appointments.

4. Filter Events by Category
Quickly filter events to focus on specific types (e.g., Meetings or Conferences).
Helps in managing different event types efficiently.

5. Real-Time Notifications
Provides instant feedback using react-toastify:
Success: When an event is successfully added.
Error: Alerts when required fields are missing or invalid data is entered.

6. Responsive Design
Fully responsive layout built with Tailwind CSS.
Optimized for both desktop and mobile users.

7. Persistent State Management
Events are managed using Redux, providing a single source of truth.
Future improvement: Can be enhanced with localStorage or backend persistence.

8. Clean and Modern UI
User-friendly design for easy navigation and interaction.
Minimalistic yet functional UI using Tailwind CSS for styling.

🛠️ Tech Stack
Frontend: React, Tailwind CSS
State Management: Redux
Notifications: react-toastify
Calendar Component: Custom-built
Design: Responsive, modern UI
