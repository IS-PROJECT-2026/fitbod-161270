/* ==========================================
   FITBOD
   CENTRAL LOCAL STORAGE MANAGER
   ISSUE #8
========================================== */


/* ==========================================
   STORAGE KEYS
========================================== */

const FITBOD_STORAGE_KEYS = {

    workouts: "fitbodWorkouts",

    water: "fitbodDailyWater",

    steps: "fitbodDailySteps",

    trackingDate: "fitbodTrackingDate",

    theme: "fitbodTheme",

    bmi: "fitbodBMI"

};


/* ==========================================
   CHECK LOCAL STORAGE
========================================== */

function storageAvailable() {

    try {

        const testKey = "__fitbod_storage_test__";

        localStorage.setItem(
            testKey,
            "test"
        );

        localStorage.removeItem(
            testKey
        );

        return true;

    } catch (error) {

        console.error(
            "Local storage is unavailable:",
            error
        );

        return false;

    }

}


/* ==========================================
   SAVE DATA
========================================== */

function saveData(key, value) {

    if (!storageAvailable()) {

        return false;

    }

    try {

        localStorage.setItem(
            key,
            JSON.stringify(value)
        );

        return true;

    } catch (error) {

        console.error(
            "Unable to save data:",
            error
        );

        return false;

    }

}


/* ==========================================
   LOAD DATA
========================================== */

function loadData(
    key,
    defaultValue = null
) {

    if (!storageAvailable()) {

        return defaultValue;

    }

    try {

        const savedData =
            localStorage.getItem(key);


        if (savedData === null) {

            return defaultValue;

        }


        return JSON.parse(savedData);

    } catch (error) {

        console.error(
            "Unable to load data:",
            error
        );

        return defaultValue;

    }

}


/* ==========================================
   REMOVE DATA
========================================== */

function removeData(key) {

    if (!storageAvailable()) {

        return false;

    }

    try {

        localStorage.removeItem(key);

        return true;

    } catch (error) {

        console.error(
            "Unable to remove data:",
            error
        );

        return false;

    }

}


/* ==========================================
   CLEAR FITBOD DATA
========================================== */

function clearFitBodData() {

    if (!storageAvailable()) {

        return false;

    }

    Object.values(
        FITBOD_STORAGE_KEYS
    ).forEach(function(key) {

        localStorage.removeItem(key);

    });

    return true;

}


/* ==========================================
   WORKOUT STORAGE
========================================== */

function saveWorkouts(workouts) {

    return saveData(
        FITBOD_STORAGE_KEYS.workouts,
        workouts
    );

}


function loadWorkouts() {

    return loadData(
        FITBOD_STORAGE_KEYS.workouts,
        []
    );

}


/* ==========================================
   WATER STORAGE
========================================== */

function saveWater(water) {

    return saveData(
        FITBOD_STORAGE_KEYS.water,
        Number(water)
    );

}


function loadWater() {

    return Number(
        loadData(
            FITBOD_STORAGE_KEYS.water,
            0
        )
    ) || 0;

}


/* ==========================================
   STEPS STORAGE
========================================== */

function saveSteps(steps) {

    return saveData(
        FITBOD_STORAGE_KEYS.steps,
        Number(steps)
    );

}


function loadSteps() {

    return Number(
        loadData(
            FITBOD_STORAGE_KEYS.steps,
            0
        )
    ) || 0;

}


/* ==========================================
   TRACKING DATE
========================================== */

function saveTrackingDate(date) {

    return saveData(
        FITBOD_STORAGE_KEYS.trackingDate,
        date
    );

}


function loadTrackingDate() {

    return loadData(
        FITBOD_STORAGE_KEYS.trackingDate,
        null
    );

}


/* ==========================================
   THEME STORAGE
========================================== */

function saveTheme(theme) {

    return saveData(
        FITBOD_STORAGE_KEYS.theme,
        theme
    );

}


function loadTheme() {

    return loadData(
        FITBOD_STORAGE_KEYS.theme,
        "dark"
    );

}


/* ==========================================
   BMI STORAGE
========================================== */

function saveBMI(bmiData) {

    return saveData(
        FITBOD_STORAGE_KEYS.bmi,
        bmiData
    );

}


function loadBMI() {

    return loadData(
        FITBOD_STORAGE_KEYS.bmi,
        null
    );

}