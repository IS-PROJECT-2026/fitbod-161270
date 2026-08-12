function addWorkout() {

    const name =
        document.getElementById("workoutName").value.trim();

    const duration =
        Number(document.getElementById("workoutDuration").value);

    const calories =
        Number(document.getElementById("workoutCalories").value);

    if (!name || duration <= 0 || calories < 0) {
        alert("Please enter valid workout details.");
        return;
    }

    const data = getData();

    data.workouts.unshift({
        id: Date.now(),
        name,
        duration,
        calories,
        date: new Date().toLocaleDateString()
    });

    saveData(data);

    document.getElementById("workoutName").value = "";
    document.getElementById("workoutDuration").value = "";
    document.getElementById("workoutCalories").value = "";

    document
        .getElementById("workoutModal")
        .classList.remove("show");

    renderDashboard();
}


function deleteWorkout(id) {

    const data = getData();

    data.workouts =
        data.workouts.filter(workout => workout.id !== id);

    saveData(data);

    renderDashboard();
}