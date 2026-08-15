/* ==========================================
   FITBOD TRACKING MANAGER (WATER & STEPS)
   ISSUE #9
========================================== */

function addWater(amount) {
    let currentWater = typeof loadWater === "function" ? loadWater() : 0;
    currentWater += amount;
    if (typeof saveWater === "function") {
        saveWater(currentWater);
    }
    updateTrackingDisplay();
}

function resetWater() {
    if (typeof saveWater === "function") {
        saveWater(0);
    }
    updateTrackingDisplay();
}

function updateSteps(count) {
    const stepCount = Math.max(0, Number(count) || 0);
    if (typeof saveSteps === "function") {
        saveSteps(stepCount);
    }
    updateTrackingDisplay();
}

function updateTrackingDisplay() {
    const water = typeof loadWater === "function" ? loadWater() : 0;
    const steps = typeof loadSteps === "function" ? loadSteps() : 0;

    const waterDisplay = document.getElementById("waterDisplay");
    if (waterDisplay) {
        waterDisplay.textContent = `${typeof water === "number" ? water.toFixed(2) : water} L`;
    }

    const stepsDisplay = document.getElementById("stepDisplay");
    if (stepsDisplay) {
        stepsDisplay.textContent = steps.toLocaleString();
    }

    // Refresh Dashboard analytics & counters in real-time
    if (typeof renderDashboard === "function") {
        renderDashboard();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    updateTrackingDisplay();

    const addWaterBtn = document.getElementById("addWaterBtn");
    if (addWaterBtn) {
        addWaterBtn.addEventListener("click", () => addWater(0.25));
    }

    const resetWaterBtn = document.getElementById("resetWaterBtn");
    if (resetWaterBtn) {
        resetWaterBtn.addEventListener("click", resetWater);
    }

    const stepsInput = document.getElementById("stepsInput");
    if (stepsInput) {
        stepsInput.addEventListener("input", (e) => updateSteps(e.target.value));
    }
});