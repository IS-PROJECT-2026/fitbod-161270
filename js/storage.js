/* ==========================================
   FITBOD STORAGE ADAPTER
========================================== */

const STORAGE_KEYS = {
    WORKOUTS: "fitbod_workouts",
    WATER: "fitbod_water",
    STEPS: "fitbod_steps",
    THEME: "fitbod_theme"
};

// Workouts
function getStoredWorkouts() {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.WORKOUTS);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        return [];
    }
}

function saveStoredWorkouts(workouts) {
    localStorage.setItem(STORAGE_KEYS.WORKOUTS, JSON.stringify(workouts));
}

// Water Intake (Litres)
function getStoredWater() {
    return parseFloat(localStorage.getItem(STORAGE_KEYS.WATER)) || 0;
}

function saveStoredWater(val) {
    localStorage.setItem(STORAGE_KEYS.WATER, val.toFixed(2));
}

// Step Tracking
function getStoredSteps() {
    return parseInt(localStorage.getItem(STORAGE_KEYS.STEPS), 10) || 0;
}

function saveStoredSteps(val) {
    localStorage.setItem(STORAGE_KEYS.STEPS, val);
}

// Theme Preference
function getStoredTheme() {
    return localStorage.getItem(STORAGE_KEYS.THEME) || "dark";
}

function saveStoredTheme(theme) {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
}