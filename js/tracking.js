/* ==========================================
   FITBOD TRACKING & BMI CALCULATOR
========================================== */

function initTracking() {
    // Buttons
    const addWaterBtn = document.getElementById("addWaterBtn");
    const addStepsBtn = document.getElementById("addStepsBtn");
    const bmiForm = document.getElementById("bmiForm");

    if (addWaterBtn) {
        addWaterBtn.addEventListener("click", () => {
            let currentWater = getStoredWater();
            currentWater += 0.25; // Add 250ml
            saveStoredWater(currentWater);
            renderTracking();
        });
    }

    if (addStepsBtn) {
        addStepsBtn.addEventListener("click", () => {
            let currentSteps = getStoredSteps();
            currentSteps += 500; // Add 500 steps
            saveStoredSteps(currentSteps);
            renderTracking();
        });
    }

    if (bmiForm) {
        bmiForm.addEventListener("submit", (e) => {
            e.preventDefault();
            calculateBMI();
        });
    }

    renderTracking();
}

function renderTracking() {
    // Water Displays
    const waterVal = getStoredWater();
    const waterDisplay = document.getElementById("waterDisplay");
    const waterCount = document.getElementById("waterCount");
    const waterBar = document.getElementById("waterProgressBar");
    const waterText = document.getElementById("waterProgressText");

    const waterTarget = 2.5;
    const waterPct = Math.min(Math.round((waterVal / waterTarget) * 100), 100);

    if (waterDisplay) waterDisplay.textContent = `${waterVal.toFixed(2)} L`;
    if (waterCount) waterCount.textContent = waterVal.toFixed(2);
    if (waterBar) waterBar.style.width = `${waterPct}%`;
    if (waterText) waterText.textContent = `${waterPct}% of daily goal`;

    // Step Displays
    const stepsVal = getStoredSteps();
    const stepDisplay = document.getElementById("stepDisplay");
    const stepsCount = document.getElementById("stepsCount");
    const stepsBar = document.getElementById("stepsProgressBar");
    const stepsText = document.getElementById("stepsProgressText");

    const stepsTarget = 10000;
    const stepsPct = Math.min(Math.round((stepsVal / stepsTarget) * 100), 100);

    if (stepDisplay) stepDisplay.textContent = stepsVal.toLocaleString();
    if (stepsCount) stepsCount.textContent = stepsVal.toLocaleString();
    if (stepsBar) stepsBar.style.width = `${stepsPct}%`;
    if (stepsText) stepsText.textContent = `${stepsPct}% of daily goal`;

    // Overall Goal Bar
    const goalBar = document.getElementById("goalBar");
    const goalProgress = document.getElementById("goalProgress");
    const avgProgress = Math.round((waterPct + stepsPct) / 2);

    if (goalBar) goalBar.style.width = `${avgProgress}%`;
    if (goalProgress) goalProgress.textContent = `${avgProgress}%`;
}

function calculateBMI() {
    const heightInput = document.getElementById("height");
    const weightInput = document.getElementById("weight");
    const bmiResult = document.getElementById("bmiResult");
    const bmiCategory = document.getElementById("bmiCategory");

    const heightCm = parseFloat(heightInput.value);
    const weightKg = parseFloat(weightInput.value);

    if (!heightCm || !weightKg || heightCm <= 0 || weightKg <= 0) {
        if (bmiResult) bmiResult.textContent = "Please enter valid height and weight values.";
        return;
    }

    const heightM = heightCm / 100;
    const bmi = (weightKg / (heightM * heightM)).toFixed(1);

    let category = "";
    let color = "";

    if (bmi < 18.5) {
        category = "Underweight";
        color = "#eab308";
    } else if (bmi >= 18.5 && bmi < 24.9) {
        category = "Normal weight";
        color = "#22c55e";
    } else if (bmi >= 25 && bmi < 29.9) {
        category = "Overweight";
        color = "#f97316";
    } else {
        category = "Obesity";
        color = "#ef4444";
    }

    if (bmiResult) {
        bmiResult.textContent = `Your calculated BMI is ${bmi}`;
    }

    if (bmiCategory) {
        bmiCategory.textContent = `Category: ${category}`;
        bmiCategory.style.color = color;
    }
}