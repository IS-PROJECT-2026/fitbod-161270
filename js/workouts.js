/* ==========================================
   FITBOD
   WATER AND STEPS TRACKING
   
========================================== */


/* ==========================================
   TRACKING SETTINGS
========================================== */

const WATER_INCREMENT = 0.25;

const WATER_GOAL = 2.5;

const STEPS_INCREMENT = 500;

const STEPS_GOAL = 10000;


/* ==========================================
   DOM ELEMENTS
========================================== */

const addWaterBtn =
    document.getElementById(
        "addWaterBtn"
    );


const addStepsBtn =
    document.getElementById(
        "addStepsBtn"
    );


const waterDisplay =
    document.getElementById(
        "waterDisplay"
    );


const stepDisplay =
    document.getElementById(
        "stepDisplay"
    );


const waterCount =
    document.getElementById(
        "waterCount"
    );


const stepsCount =
    document.getElementById(
        "stepsCount"
    );


const waterProgressBar =
    document.getElementById(
        "waterProgressBar"
    );


const stepsProgressBar =
    document.getElementById(
        "stepsProgressBar"
    );


const waterProgressText =
    document.getElementById(
        "waterProgressText"
    );


const stepsProgressText =
    document.getElementById(
        "stepsProgressText"
    );


/* ==========================================
   GET TODAY
========================================== */

function getToday() {

    const today =
        new Date();

    return today
        .toISOString()
        .split("T")[0];

}


/* ==========================================
   INITIALISE DAILY TRACKING
========================================== */

function initialiseTracking() {

    const today =
        getToday();


    const savedDate =
        loadTrackingDate();


    /*
       If this is a new day,
       reset water and steps.
    */

    if (savedDate !== today) {

        saveWater(0);

        saveSteps(0);

        saveTrackingDate(
            today
        );

    }


    updateTrackingDisplay();

}


/* ==========================================
   ADD WATER
========================================== */

function addWater() {

    let water =
        loadWater();


    water +=
        WATER_INCREMENT;


    if (water > 20) {

        water = 20;

    }


    saveWater(
        water
    );


    updateTrackingDisplay();

}


/* ==========================================
   ADD STEPS
========================================== */

function addSteps() {

    let steps =
        loadSteps();


    steps +=
        STEPS_INCREMENT;


    if (steps > 100000) {

        steps = 100000;

    }


    saveSteps(
        steps
    );


    updateTrackingDisplay();

}


/* ==========================================
   WATER DISPLAY
========================================== */

function updateWaterDisplay(
    water
) {

    if (waterDisplay) {

        waterDisplay.textContent =
            `${water.toFixed(2)} L`;

    }


    if (waterCount) {

        waterCount.textContent =
            water.toFixed(2);

    }


    const percentage =
        Math.min(
            (water / WATER_GOAL) * 100,
            100
        );


    if (waterProgressBar) {

        waterProgressBar.style.width =
            `${percentage}%`;

    }


    if (waterProgressText) {

        waterProgressText.textContent =
            `${Math.round(percentage)}% of daily goal`;

    }

}


/* ==========================================
   STEPS DISPLAY
========================================== */

function updateStepsDisplay(
    steps
) {

    if (stepDisplay) {

        stepDisplay.textContent =
            steps.toLocaleString();

    }


    if (stepsCount) {

        stepsCount.textContent =
            steps.toLocaleString();

    }


    const percentage =
        Math.min(
            (steps / STEPS_GOAL) * 100,
            100
        );


    if (stepsProgressBar) {

        stepsProgressBar.style.width =
            `${percentage}%`;

    }


    if (stepsProgressText) {

        stepsProgressText.textContent =
            `${Math.round(percentage)}% of daily goal`;

    }

}


/* ==========================================
   UPDATE OVERALL GOAL
========================================== */

function updateOverallGoal(
    water,
    steps
) {

    const waterPercentage =
        Math.min(
            water / WATER_GOAL,
            1
        );


    const stepsPercentage =
        Math.min(
            steps / STEPS_GOAL,
            1
        );


    const overallPercentage =
        (
            waterPercentage +
            stepsPercentage
        ) / 2;


    const percentage =
        Math.round(
            overallPercentage * 100
        );


    const goalProgress =
        document.getElementById(
            "goalProgress"
        );


    const goalBar =
        document.getElementById(
            "goalBar"
        );


    if (goalProgress) {

        goalProgress.textContent =
            `${percentage}%`;

    }


    if (goalBar) {

        goalBar.style.width =
            `${percentage}%`;

    }

}


/* ==========================================
   UPDATE EVERYTHING
========================================== */

function updateTrackingDisplay() {

    const water =
        loadWater();


    const steps =
        loadSteps();


    updateWaterDisplay(
        water
    );


    updateStepsDisplay(
        steps
    );


    updateOverallGoal(
        water,
        steps
    );

}


/* ==========================================
   BUTTON EVENTS
========================================== */

if (addWaterBtn) {

    addWaterBtn.addEventListener(
        "click",
        addWater
    );

}


if (addStepsBtn) {

    addStepsBtn.addEventListener(
        "click",
        addSteps
    );

}


/* ==========================================
   START
========================================== */

initialiseTracking();