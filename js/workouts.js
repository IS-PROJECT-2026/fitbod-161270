/* ==========================================
   FITBOD WORKOUT MANAGER
   ISSUE #9
========================================== */

document.addEventListener("DOMContentLoaded", () => {
    const workoutForm = document.getElementById("workoutForm");

    if (workoutForm) {
        workoutForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const nameInput = document.getElementById("workoutName");
            const durationInput = document.getElementById("workoutDuration");
            const caloriesInput = document.getElementById("workoutCalories");
            const dateInput = document.getElementById("workoutDate");

            const name = nameInput ? nameInput.value.trim() : "";
            const duration = Number(durationInput ? durationInput.value : 0);
            const calories = Number(caloriesInput ? caloriesInput.value : 0);
            
            let date = dateInput && dateInput.value ? dateInput.value : "";
            if (!date) {
                const today = new Date();
                date = today.toISOString().split("T")[0];
            }

            if (!name || duration <= 0 || calories <= 0) {
                alert("Please enter valid workout details.");
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

            workoutForm.reset();

            if (typeof renderDashboard === "function") {
                renderDashboard();
            }
        });
    }
});