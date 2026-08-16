# FitBod - Your Fitness & Wellness Dashboard 

FitBod is an interactive, browser-based health and wellness tracking application. It enables users to log workouts, monitor daily hydration and step goals, calculate Body Mass Index (BMI), and visualize overall progress in real time. All data persists locally in the browser using the Web Storage API.

 **Live Demo:** https://is-project-2026.github.io/fitbod-161270/

---

## Key Features

* **Dashboard Overview:** Quick-glance metrics summary including workout sessions, burned calories, hydration level, and step counts.
* **Workout Logging:** Add, view, and delete custom workout routines with automated calorie and duration metrics aggregation.
* **Water & Step Tracking:** Real-time visual progress bars tracking daily hydration and physical activity.
* **BMI Calculator:** Instant Body Mass Index calculation with health category feedback and color coding.
* **Progress Tracker:** Visual breakdown of overall goal completion across fitness metrics.
* **Dark / Light Theme:** Persistent theme toggle stored across user sessions.
* **Local Storage Persistence:** Full client-side data persistence with zero backend dependency.

---

## Technologies Used

* **HTML5:** Semantic structure, accessible modal dialogs, and form input controls.
* **CSS3:** Custom properties (variables), Flexbox, CSS Grid layouts, and dynamic theme classes (`.light-mode`).
* **JavaScript (ES6+):** Modular DOM manipulation, event routing, state management, and calculation logic.
* **Local Storage API:** Persistent client-side data serialization (`JSON.parse` / `JSON.stringify`).

---

## The Project Structure

```text
fitbod-161270/
├── index.html          # Main HTML structure and section views
├── css/
│   └── style.css       # Global styles, component layouts, and theme variables
└── js/
    ├── app.js          # App initialization, navigation routing, and theme handler
    ├── storage.js      # LocalStorage data access layer
    ├── tracking.js     # Hydration, step counter, and BMI calculation logic
    └── workouts.js     # Workout CRUD operations and modal controls