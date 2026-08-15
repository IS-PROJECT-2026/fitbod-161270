/* ==========================================
   FITBOD DASHBOARD & ANALYTICS MANAGER
   ISSUE #9
========================================== */

function renderDashboard() {
    const workouts = typeof loadWorkouts === "function" ? loadWorkouts() : [];
    const water = typeof loadWater === "function" ? loadWater() : 0;
    const steps = typeof loadSteps === "function" ? loadSteps() : 0;
    const analytics = typeof getWorkoutAnalytics === "function" ? getWorkoutAnalytics() : {
        totalWorkouts: 0,
        totalCalories: 0,
        totalDuration: 0,
        avgCaloriesPerWorkout: 0,
        avgDurationPerWorkout: 0,
        mostFrequentType: "N/A",
        weeklyCalories: 0,
        workoutStreak: 0
    };

    // DOM Element Updates with Safe Guards
    const updateEl = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.textContent = val;
    };

    updateEl("workoutCount", analytics.totalWorkouts);
    updateEl("calorieCount", analytics.totalCalories.toLocaleString());
    updateEl("waterCount", typeof water === "number" ? water.toFixed(1) : water);
    updateEl("waterDisplay", `${typeof water === "number" ? water.toFixed(2) : water} L`);
    updateEl("stepsCount", steps.toLocaleString());
    updateEl("stepDisplay", steps.toLocaleString());

    // Analytics Specific Updates
    updateEl("totalDuration", `${analytics.totalDuration} mins`);
    updateEl("avgCalories", `${analytics.avgCaloriesPerWorkout} kcal/session`);
    updateEl("weeklyCalories", `${analytics.weeklyCalories.toLocaleString()} kcal`);
    updateEl("frequentWorkout", analytics.mostFrequentType);
    updateEl("workoutStreak", `${analytics.workoutStreak} day(s)`);

    // Goal Progress Calculation (Target: 5 weekly workouts)
    const targetWorkouts = 5;
    const percentage = Math.min((analytics.totalWorkouts / targetWorkouts) * 100, 100);

    updateEl("summaryProgress", `${analytics.totalWorkouts} / ${targetWorkouts} sessions`);
    updateEl("goalProgress", `${Math.round(percentage)}%`);

    const goalBar = document.getElementById("goalBar");
    if (goalBar) {
        goalBar.style.width = `${percentage}%`;
    }

    renderWorkouts();
}

function renderWorkouts() {
    const workouts = typeof loadWorkouts === "function" ? loadWorkouts() : [];
    const container = document.getElementById("workoutList");

    if (!container) return;

    if (workouts.length === 0) {
        container.innerHTML = `
            <div class="workout">
                <div>
                    <strong>No workouts yet</strong>
                    <p>Add your first workout to start tracking.</p>
                </div>
            </div>
        `;
        return;
    }

    container.innerHTML = workouts.map(workout => `
        <div class="workout">
            <div>
                <strong>${escapeHTML(workout.name || 'Workout')}</strong>
                <p>
                    ${workout.duration || 0} mins · ${workout.date || 'N/A'}
                </p>
            </div>
            <div>
                <span class="calories">
                    ${workout.calories || 0} kcal
                </span>
                <button
                    onclick="deleteWorkout(${workout.id})"
                    aria-label="Delete workout"
                    style="border:none; background:none; cursor:pointer; margin-left:10px;"
                >
                    🗑️
                </button>
            </div>
        </div>
    `).join("");
}

function deleteWorkout(id) {
    if (typeof loadWorkouts !== "function" || typeof saveWorkouts !== "function") return;
    
    let workouts = loadWorkouts();
    workouts = workouts.filter(w => w.id !== id);
    saveWorkouts(workouts);
    renderDashboard();
}

function escapeHTML(value) {
    const div = document.createElement("div");
    div.textContent = value;
    return div.innerHTML;
}

// Initial Call
document.addEventListener("DOMContentLoaded", renderDashboard);