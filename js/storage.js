const STORAGE_KEY = "fittrackData";

const defaultData = {
    workouts: [],
    water: 0,
    steps: 0,
    theme: "light"
};

function getData() {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
        return defaultData;
    }

    try {
        return JSON.parse(saved);
    } catch {
        return defaultData;
    }
}

function saveData(data) {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
    );
}