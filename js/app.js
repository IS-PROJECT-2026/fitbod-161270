const themeToggle =
    document.getElementById("themeToggle");

const workoutModal =
    document.getElementById("workoutModal");

const openWorkout =
    document.getElementById("openWorkout");

const closeWorkout =
    document.getElementById("closeWorkout");


function applyTheme() {

    const data = getData();

    if (data.theme === "dark") {

        document.body.classList.add("dark");

        themeToggle.textContent = "☀️";

    } else {

        document.body.classList.remove("dark");

        themeToggle.textContent = "🌙";
    }
}


themeToggle.addEventListener("click", () => {

    const data = getData();

    data.theme =
        data.theme === "dark"
            ? "light"
            : "dark";

    saveData(data);

    applyTheme();
});


openWorkout.addEventListener("click", () => {

    workoutModal.classList.add("show");

});


closeWorkout.addEventListener("click", () => {

    workoutModal.classList.remove("show");

});


workoutModal.addEventListener("click", event => {

    if (event.target === workoutModal) {

        workoutModal.classList.remove("show");

    }

});


document.addEventListener("DOMContentLoaded", () => {

    applyTheme();

    renderDashboard();

});