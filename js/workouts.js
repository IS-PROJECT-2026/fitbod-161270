/* ==========================================
   FITBOD WORKOUT MANAGEMENT & MODALS
========================================== */

function initWorkouts() {
    const modal = document.getElementById("workoutModal");
    const openBtn = document.getElementById("addWorkoutBtn");
    const closeBtn = document.getElementById("closeWorkoutModal");
    const cancelBtn = document.getElementById("cancelWorkoutBtn");
    const form = document.getElementById("workoutForm");

    // Modal Control
    function showModal() {
        if (modal) {
            modal.classList.add("active");
            modal.setAttribute("aria-hidden", "false");
        }
    }

    function hideModal() {
        if (modal) {
            modal.classList.remove("active");
            modal.setAttribute("aria-hidden", "true");
        }
        if (form) form.reset();
    }

    if (openBtn) openBtn.addEventListener("click", showModal);
    if (closeBtn) closeBtn.addEventListener("click", hideModal);
    if (cancelBtn) cancelBtn.addEventListener("click", hideModal);

    // Close on overlay click
    if (modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) hideModal();
        });
    }

    // Form Submission
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.getElementById("workoutName").value;
            const duration = parseInt(document.getElementById("workoutDuration").value, 10);
            const calories = parseInt(document.getElementById("workoutCalories").value, 10);
            const date = document.getElementById("workoutDate").value;

            if (!name || isNaN(duration) || isNaN(calories) || !date) {
                alert("Please fill out all workout fields.");
                return;
            }

            const newWorkout = {
                id: Date.now(),
                name,
                duration,
                calories,
                date
            };

            const workouts = getStoredWorkouts();
            workouts.unshift(newWorkout);
            saveStoredWorkouts(workouts);

            renderWorkouts();
            hideModal();
        });
    }

    renderWorkouts();
}

function renderWorkouts() {
    const workoutList = document.getElementById("workoutList");
    const countDisplay = document.getElementById("workoutCount");
    const calorieDisplay = document.getElementById("calorieCount");
    const summaryProgress = document.getElementById("summaryProgress");

    if (!workoutList) return;

    const workouts = getStoredWorkouts();

    // Calculate totals
    const totalCount = workouts.length;
    const totalCalories = workouts.reduce((sum, w) => sum + (w.calories || 0), 0);

    if (countDisplay) countDisplay.textContent = totalCount;
    if (calorieDisplay) calorieDisplay.textContent = totalCalories.toLocaleString();
    if (summaryProgress) summaryProgress.textContent = `${totalCount} sessions`;

    if (workouts.length === 0) {
        workoutList.innerHTML = `
            <div class="empty-state" id="emptyWorkoutState">
                <div class="empty-icon" aria-hidden="true">🏃</div>
                <strong>No workouts yet</strong>
                <p>Add your first workout to start tracking.</p>
            </div>`;
        return;
    }

    const getIcon = (name) => {
        switch (name) {
            case "Running": return "🏃";
            case "Cycling": return "🚴";
            case "Weight Training": return "🏋️";
            case "Swimming": return "🏊";
            case "Walking": return "🚶";
            case "HIIT": return "⚡";
            case "Yoga": return "🧘";
            default: return "💪";
        }
    };

    workoutList.innerHTML = workouts.map(w => `
        <div class="workout-item">
            <div class="workout-information">
                <div class="workout-icon">${getIcon(w.name)}</div>
                <div>
                    <strong>${w.name}</strong>
                    <p>${w.duration} mins • ${w.date}</p>
                </div>
            </div>
            <div class="workout-details">
                <span class="calories">${w.calories} kcal</span>
            </div>
            <div class="workout-actions">
                <button type="button" class="delete-workout-btn" onclick="deleteWorkout(${w.id})">🗑️</button>
            </div>
        </div>
    `).join("");
}

function deleteWorkout(id) {
    let workouts = getStoredWorkouts();
    workouts = workouts.filter(w => w.id !== id);
    saveStoredWorkouts(workouts);
    renderWorkouts();
}