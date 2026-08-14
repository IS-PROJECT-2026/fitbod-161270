/* ==========================================
   FITBOD
   WATER AND STEPS TRACKING
   ISSUE #7
========================================== */


/* ==========================================
   TRACKING SETTINGS
========================================== */

const WATER_INCREMENT = 0.25;

const WATER_GOAL = 2.5;

const STEPS_INCREMENT = 500;

const STEPS_GOAL = 10000;


/* ==========================================
   STORAGE KEYS
========================================== */

const WATER_STORAGE_KEY =
    "fitbodDailyWater";

const STEPS_STORAGE_KEY =
    "fitbodDailySteps";

const TRACKING_DATE_KEY =
    "fitbodTrackingDate";


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
   GET TODAY'S DATE
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
        localStorage.getItem(
            TRACKING_DATE_KEY
        );


    /*
       If the saved date is different
       from today, start a new day.
    */

    if (savedDate !== today) {

        localStorage.setItem(
            WATER_STORAGE_KEY,
            "0"
        );


        localStorage.setItem(
            STEPS_STORAGE_KEY,
            "0"
        );


        localStorage.setItem(
            TRACKING_DATE_KEY,
            today
        );

    }


    updateTrackingDisplay();

}


/* ==========================================
   GET WATER
========================================== */

function getWater() {

    return Number(
        localStorage.getItem(
            WATER_STORAGE_KEY
        )
    ) || 0;

}


/* ==========================================
   GET STEPS
========================================== */

function getSteps() {

    return Number(
        localStorage.getItem(
            STEPS_STORAGE_KEY
        )
    ) || 0;

}


/* ==========================================
   ADD WATER
========================================== */

function addWater() {

    let currentWater =
        getWater();


    currentWater +=
        WATER_INCREMENT;


    /*
       Prevent unrealistic values.
       20 litres is more than enough
       for this simple tracker.
    */

    if (currentWater > 20) {

        currentWater = 20;

    }


    localStorage.setItem(
        WATER_STORAGE_KEY,
        currentWater.toString()
    );


    updateTrackingDisplay();

}


/* ==========================================
   ADD STEPS
========================================== */

function addSteps() {

    let currentSteps =
        getSteps();


    currentSteps +=
        STEPS_INCREMENT;


    /*
       Keep the tracker within
       a realistic daily range.
    */

    if (currentSteps > 100000) {

        currentSteps = 100000;

    }


    localStorage.setItem(
        STEPS_STORAGE_KEY,
        currentSteps.toString()
    );


    updateTrackingDisplay();

}


/* ==========================================
   UPDATE WATER DISPLAY
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
   UPDATE STEPS DISPLAY
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
   UPDATE ALL TRACKING
========================================== */

function updateTrackingDisplay() {

    const water =
        getWater();


    const steps =
        getSteps();


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
   UPDATE OVERALL FITNESS GOAL
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


    /*
       Average the two daily goals.
    */

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
   WATER BUTTON EVENT
========================================== */

if (addWaterBtn) {

    addWaterBtn.addEventListener(
        "click",
        addWater
    );

}


/* ==========================================
   STEPS BUTTON EVENT
========================================== */

if (addStepsBtn) {

    addStepsBtn.addEventListener(
        "click",
        addSteps
    );

}


/* ==========================================
   START TRACKING
========================================== */

initialiseTracking();