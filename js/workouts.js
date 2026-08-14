/* =========================================
   FITBOD WORKOUT TRACKING
   ISSUE #5
========================================= */

const workoutForm = document.getElementById("workoutForm");
const workoutList = document.getElementById("workoutList");

const addWorkoutBtn = document.getElementById("addWorkoutBtn");
const closeWorkoutModal = document.getElementById("closeWorkoutModal");
const cancelWorkoutBtn = document.getElementById("cancelWorkoutBtn");

const workoutModal = document.getElementById("workoutModal");

const workoutCount = document.getElementById("workoutCount");
const calorieCount = document.getElementById("calorieCount");
const summaryProgress = document.getElementById("summaryProgress");

const goalProgress = document.getElementById("goalProgress");
const goalBar = document.getElementById("goalBar");


/* =========================================
   LOAD SAVED WORKOUTS
========================================= */

let workouts =
    JSON.parse(localStorage.getItem("fitbodWorkouts")) || [];


/* =========================================
   OPEN MODAL
========================================= */

function openWorkoutModal() {

    if (!workoutModal) {
        return;
    }

    workoutModal.classList.add("active");

    workoutModal.setAttribute(
        "aria-hidden",
        "false"
    );

    const dateInput =
        document.getElementById("workoutDate");

    if (dateInput && !dateInput.value) {

        dateInput.value =
            new Date().toISOString().split("T")[0];

    }

}


/* =========================================
   CLOSE MODAL
========================================= */

function closeWorkoutForm() {

    if (!workoutModal) {
        return;
    }

    workoutModal.classList.remove("active");

    workoutModal.setAttribute(
        "aria-hidden",
        "true"
    );

}


/* =========================================
   BUTTON EVENTS
========================================= */

if (addWorkoutBtn) {

    addWorkoutBtn.addEventListener(
        "click",
        openWorkoutModal
    );

}


if (closeWorkoutModal) {

    closeWorkoutModal.addEventListener(
        "click",
        closeWorkoutForm
    );

}


if (cancelWorkoutBtn) {

    cancelWorkoutBtn.addEventListener(
        "click",
        closeWorkoutForm
    );

}


/* =========================================
   CLOSE WHEN CLICKING OUTSIDE
========================================= */

if (workoutModal) {

    workoutModal.addEventListener(
        "click",
        function (event) {

            if (event.target === workoutModal) {

                closeWorkoutForm();

            }

        }
    );

}


/* =========================================
   ADD WORKOUT
========================================= */

if (workoutForm) {

    workoutForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document.getElementById(
                    "workoutName"
                ).value;


            const duration =
                Number(
                    document.getElementById(
                        "workoutDuration"
                    ).value
                );


            const calories =
                Number(
                    document.getElementById(
                        "workoutCalories"
                    ).value
                );


            const date =
                document.getElementById(
                    "workoutDate"
                ).value;


            /* VALIDATION */

            if (
                !name ||
                duration <= 0 ||
                calories <= 0 ||
                !date
            ) {

                alert(
                    "Please enter valid workout details."
                );

                return;

            }


            /* CREATE WORKOUT */

            const workout = {

                id: Date.now(),

                name: name,

                duration: duration,

                calories: calories,

                date: date,

                completed: false

            };


            /* ADD TO ARRAY */

            workouts.push(workout);


            /* SAVE */

            saveWorkouts();


            /* UPDATE DISPLAY */

            renderWorkouts();

            updateWorkoutStatistics();


            /* RESET FORM */

            workoutForm.reset();


            /* CLOSE MODAL */

            closeWorkoutForm();

        }
    );

}


/* =========================================
   SAVE WORKOUTS
========================================= */

function saveWorkouts() {

    localStorage.setItem(
        "fitbodWorkouts",
        JSON.stringify(workouts)
    );

}


/* =========================================
   RENDER WORKOUTS
========================================= */

function renderWorkouts() {

    if (!workoutList) {
        return;
    }


    workoutList.innerHTML = "";


    if (workouts.length === 0) {

        workoutList.innerHTML = `

            <div
                class="empty-state"
                id="emptyWorkoutState"
            >

                <div
                    class="empty-icon"
                    aria-hidden="true"
                >
                    🏃
                </div>

                <strong>
                    No workouts yet
                </strong>

                <p>
                    Add your first workout
                    to start tracking.
                </p>

            </div>

        `;

        return;

    }


    /* NEWEST FIRST */

    const sortedWorkouts =
        [...workouts].reverse();


    sortedWorkouts.forEach(
        function (workout) {


            const workoutItem =
                document.createElement("div");


            workoutItem.className =
                "workout-item";


            if (workout.completed) {

                workoutItem.classList.add(
                    "completed"
                );

            }


            workoutItem.innerHTML = `

                <div class="workout-information">

                    <div class="workout-icon">
                        🏋️
                    </div>

                    <div>

                        <strong>
                            ${escapeHTML(workout.name)}
                        </strong>

                        <p>
                            ${workout.date}
                        </p>

                    </div>

                </div>


                <div class="workout-details">

                    <span>
                        ${workout.duration} min
                    </span>

                    <span>
                        🔥 ${workout.calories} kcal
                    </span>

                </div>


                <div class="workout-actions">

                    <button
                        type="button"
                        class="complete-workout-btn"
                        data-id="${workout.id}"
                    >
                        ${
                            workout.completed
                                ? "Completed"
                                : "Complete"
                        }
                    </button>


                    <button
                        type="button"
                        class="delete-workout-btn"
                        data-id="${workout.id}"
                    >
                        Delete
                    </button>

                </div>

            `;


            workoutList.appendChild(
                workoutItem
            );

        }
    );


    attachWorkoutActions();

}


/* =========================================
   WORKOUT BUTTON EVENTS
========================================= */

function attachWorkoutActions() {

    const completeButtons =
        document.querySelectorAll(
            ".complete-workout-btn"
        );


    const deleteButtons =
        document.querySelectorAll(
            ".delete-workout-btn"
        );


    completeButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const id =
                        Number(
                            button.dataset.id
                        );

                    toggleWorkout(id);

                }
            );

        }
    );


    deleteButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const id =
                        Number(
                            button.dataset.id
                        );

                    deleteWorkout(id);

                }
            );

        }
    );

}


/* =========================================
   COMPLETE WORKOUT
========================================= */

function toggleWorkout(id) {

    workouts =
        workouts.map(
            function (workout) {

                if (workout.id === id) {

                    return {

                        ...workout,

                        completed:
                            !workout.completed

                    };

                }

                return workout;

            }
        );


    saveWorkouts();

    renderWorkouts();

    updateWorkoutStatistics();

}


/* =========================================
   DELETE WORKOUT
========================================= */

function deleteWorkout(id) {

    const confirmed =
        confirm(
            "Are you sure you want to delete this workout?"
        );


    if (!confirmed) {
        return;
    }


    workouts =
        workouts.filter(
            function (workout) {

                return workout.id !== id;

            }
        );


    saveWorkouts();

    renderWorkouts();

    updateWorkoutStatistics();

}


/* =========================================
   UPDATE DASHBOARD STATISTICS
========================================= */

function updateWorkoutStatistics() {

    const total =
        workouts.length;


    const calories =
        workouts.reduce(
            function (sum, workout) {

                return sum + workout.calories;

            },
            0
        );


    /* WORKOUT COUNT */

    if (workoutCount) {

        workoutCount.textContent =
            total;

    }


    /* CALORIES */

    if (calorieCount) {

        calorieCount.textContent =
            calories;

    }


    /* FITNESS SUMMARY */

    if (summaryProgress) {

        summaryProgress.textContent =
            `${total} sessions`;

    }


    /* WEEKLY GOAL */

    const weeklyGoal = 5;

    const percentage =
        Math.min(
            Math.round(
                (total / weeklyGoal) * 100
            ),
            100
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


/* =========================================
   HTML ESCAPING
========================================= */

function escapeHTML(value) {

    const element =
        document.createElement("div");

    element.textContent =
        value;

    return element.innerHTML;

}


/* =========================================
   INITIALISE
========================================= */

renderWorkouts();

updateWorkoutStatistics();