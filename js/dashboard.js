function renderDashboard() {

    const data = getData();

    const workoutCount = data.workouts.length;

    const totalCalories =
        data.workouts.reduce(
            (total, workout) =>
                total + Number(workout.calories),
            0
        );

    document.getElementById("workoutCount")
        .textContent = workoutCount;

    document.getElementById("waterCount")
        .textContent = data.water.toFixed(1);

    document.getElementById("waterDisplay")
        .textContent = `${data.water.toFixed(1)} L`;

    document.getElementById("stepsCount")
        .textContent = data.steps.toLocaleString();

    document.getElementById("stepDisplay")
        .textContent = data.steps.toLocaleString();

    document.getElementById("calorieCount")
        .textContent = totalCalories;

    document.getElementById("summaryProgress")
        .textContent = `${workoutCount} sessions`;

    const percentage =
        Math.min((workoutCount / 5) * 100, 100);

    document.getElementById("goalProgress")
        .textContent = `${Math.round(percentage)}%`;

    document.getElementById("goalBar")
        .style.width = `${percentage}%`;

    renderWorkouts();
}


function renderWorkouts() {

    const data = getData();

    const container =
        document.getElementById("workoutList");

    if (data.workouts.length === 0) {

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

    container.innerHTML =
        data.workouts.map(workout => `
            <div class="workout">

                <div>
                    <strong>${escapeHTML(workout.name)}</strong>

                    <p>
                        ${workout.duration} minutes ·
                        ${workout.date}
                    </p>
                </div>

                <div>
                    <span class="calories">
                        ${workout.calories} kcal
                    </span>

                    <button
                        onclick="deleteWorkout(${workout.id})"
                        style="
                            border:none;
                            background:none;
                            cursor:pointer;
                            margin-left:10px;
                        "
                    >
                        🗑️
                    </button>
                </div>

            </div>
        `).join("");
}


function addWater() {

    const data = getData();

    data.water =
        Math.min(data.water + 0.25, 10);

    saveData(data);

    renderDashboard();
}


function addSteps() {

    const data = getData();

    data.steps =
        Math.min(data.steps + 1000, 100000);

    saveData(data);

    renderDashboard();
}


function calculateBMI() {

    const height =
        Number(document.getElementById("height").value);

    const weight =
        Number(document.getElementById("weight").value);

    const result =
        document.getElementById("bmiResult");

    if (height <= 0 || weight <= 0) {

        result.textContent =
            "Please enter valid height and weight.";

        return;
    }

    const heightMeters = height / 100;

    const bmi =
        weight / (heightMeters * heightMeters);

    let category;

    if (bmi < 18.5) {
        category = "Underweight";
    } else if (bmi < 25) {
        category = "Normal weight";
    } else if (bmi < 30) {
        category = "Overweight";
    } else {
        category = "Obesity";
    }

    result.innerHTML =
        `<strong>Your BMI: ${bmi.toFixed(1)}</strong>
         <br>
         Category: ${category}`;
}


function escapeHTML(value) {

    const div = document.createElement("div");

    div.textContent = value;

    return div.innerHTML;
}