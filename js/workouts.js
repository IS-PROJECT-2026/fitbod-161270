/* ==========================================
   FITBOD WORKOUT MANAGER

========================================== */

function handleWorkoutSubmit(e) {
    e.preventDefault();

    const nameInput = document.getElementById("workoutName") || document.getElementById("workout-name");
    const durationInput = document.getElementById("workoutDuration") || document.getElementById("workout-duration");
    const caloriesInput = document.getElementById("workoutCalories") || document.getElementById("workout-calories");
    const dateInput = document.getElementById("workoutDate") || document.getElementById("workout-date");

    const name = nameInput ? nameInput.value.trim() : "";
    const duration = Number(durationInput ? durationInput.value : 0);
    const calories = Number(caloriesInput ? caloriesInput.value : 0);
    
    let date = dateInput && dateInput.value ? dateInput.value : "";
    if (!date) {
        const today = new Date();
        date = today.toISOString().split("T")[0];
    }

    if (!name || duration <= 0 || calories <= 0) {
        alert("Please fill in valid workout details (name, positive duration, and calories).");
        return;
    }

    const newWorkout = {
        id: Date.now(),
        name,
        duration,
        calories,
        date
    };

    const workouts = typeof loadWorkouts === "function" ? loadWorkouts() : [];
    workouts.unshift(newWorkout);

    if (typeof saveWorkouts === "function") {
        saveWorkouts(workouts);
    }

    // Reset Form Fields
    const workoutForm = document.getElementById("workoutForm") || document.getElementById("workout-form");
    if (workoutForm) {
        workoutForm.reset();
    }

    // Immediately Refresh Dashboard & Analytics UI
    if (typeof renderDashboard === "function") {
        renderDashboard();
    }
}

function initWorkouts() {
    const workoutForm = document.getElementById("workoutForm") || document.getElementById("workout-form");
    if (workoutForm) {
        workoutForm.removeEventListener("submit", handleWorkoutSubmit);
        workoutForm.addEventListener("submit", handleWorkoutSubmit);
    }
}

// Bind when DOM is ready
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initWorkouts);
} else {
    initWorkouts();
}