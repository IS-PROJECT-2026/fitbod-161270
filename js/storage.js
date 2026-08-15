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

/* ==========================================
   FITNESS ANALYTICS HELPERS (ISSUE #9)
========================================== */

function getWorkoutAnalytics() {
    const workouts = loadWorkouts() || [];

    if (workouts.length === 0) {
        return {
            totalWorkouts: 0,
            totalCalories: 0,
            totalDuration: 0,
            avgCaloriesPerWorkout: 0,
            avgDurationPerWorkout: 0,
            mostFrequentType: "N/A",
            weeklyCalories: 0,
            workoutStreak: 0
        };
    }

    const totalWorkouts = workouts.length;

    const totalCalories = workouts.reduce(
        (sum, w) => sum + (Number(w.calories) || 0), 0
    );

    const totalDuration = workouts.reduce(
        (sum, w) => sum + (Number(w.duration) || 0), 0
    );

    const avgCaloriesPerWorkout = Math.round(totalCalories / totalWorkouts);
    const avgDurationPerWorkout = Math.round(totalDuration / totalWorkouts);

    // Most Frequent Workout Type
    const typeCounts = {};
    workouts.forEach(w => {
        const type = w.name ? w.name.trim() : "Other";
        typeCounts[type] = (typeCounts[type] || 0) + 1;
    });

    let mostFrequentType = "N/A";
    let maxCount = 0;
    Object.entries(typeCounts).forEach(([type, count]) => {
        if (count > maxCount) {
            maxCount = count;
            mostFrequentType = type;
        }
    });

    // Calculate Last 7 Days Calories
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const weeklyCalories = workouts.reduce((sum, w) => {
        const workoutDate = new Date(w.date);
        if (!isNaN(workoutDate) && workoutDate >= sevenDaysAgo) {
            return sum + (Number(w.calories) || 0);
        }
        return sum;
    }, 0);

    // Calculate Workout Streak (Consecutive Active Days)
    const uniqueDates = [...new Set(
        workouts
            .map(w => w.date)
            .filter(Boolean)
            .sort((a, b) => new Date(b) - new Date(a))
    )];

    let streak = 0;
    let checkDate = new Date();
    
    // Check if performed today or yesterday to maintain active streak
    const todayStr = checkDate.toISOString().split("T")[0];
    checkDate.setDate(checkDate.getDate() - 1);
    const yesterdayStr = checkDate.toISOString().split("T")[0];

    if (uniqueDates.includes(todayStr) || uniqueDates.includes(yesterdayStr)) {
        let current = new Date(uniqueDates.includes(todayStr) ? todayStr : yesterdayStr);
        while (true) {
            const dateStr = current.toISOString().split("T")[0];
            if (uniqueDates.includes(dateStr)) {
                streak++;
                current.setDate(current.getDate() - 1);
            } else {
                break;
            }
        }
    }

    return {
        totalWorkouts,
        totalCalories,
        totalDuration,
        avgCaloriesPerWorkout,
        avgDurationPerWorkout,
        mostFrequentType,
        weeklyCalories,
        workoutStreak: streak
    };
}