/* =========================================
   FITBOD APPLICATION CONTROLLER
   ISSUE #6
========================================= */


/* =========================================
   THEME MANAGEMENT
========================================= */

const themeToggle =
    document.getElementById("themeToggle");


const savedTheme =
    localStorage.getItem("fitbodTheme");


/*
   Apply saved theme when the page loads.
*/

if (savedTheme === "light") {

    document.body.classList.add("light-mode");

}


/* =========================================
   UPDATE THEME BUTTON
========================================= */

function updateThemeButton() {

    if (!themeToggle) {
        return;
    }


    const lightMode =
        document.body.classList.contains(
            "light-mode"
        );


    if (lightMode) {

        themeToggle.textContent = "🌙";

        themeToggle.setAttribute(
            "aria-label",
            "Switch to dark mode"
        );

        themeToggle.setAttribute(
            "title",
            "Switch to dark mode"
        );

    } else {

        themeToggle.textContent = "☀️";

        themeToggle.setAttribute(
            "aria-label",
            "Switch to light mode"
        );

        themeToggle.setAttribute(
            "title",
            "Switch to light mode"
        );

    }

}


/* =========================================
   TOGGLE THEME
========================================= */

if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        function () {

            document.body.classList.toggle(
                "light-mode"
            );


            const isLight =
                document.body.classList.contains(
                    "light-mode"
                );


            localStorage.setItem(
                "fitbodTheme",
                isLight
                    ? "light"
                    : "dark"
            );


            updateThemeButton();

        }
    );

}


updateThemeButton();


/* =========================================
   NAVIGATION
========================================= */

const navLinks =
    document.querySelectorAll(
        ".nav-link"
    );


navLinks.forEach(
    function (link) {

        link.addEventListener(
            "click",
            function () {

                navLinks.forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                link.classList.add(
                    "active"
                );

            }
        );

    }
);


/* =========================================
   SMOOTH SCROLLING
========================================= */

navLinks.forEach(
    function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const targetId =
                    link.getAttribute("href");


                if (
                    !targetId ||
                    !targetId.startsWith("#")
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                target.scrollIntoView({

                    behavior: "smooth",

                    block: "start"

                });

            }
        );

    }
);


/* =========================================
   BMI CALCULATOR
========================================= */

const bmiForm =
    document.getElementById(
        "bmiForm"
    );


const heightInput =
    document.getElementById(
        "height"
    );


const weightInput =
    document.getElementById(
        "weight"
    );


const bmiResult =
    document.getElementById(
        "bmiResult"
    );


const bmiCategory =
    document.getElementById(
        "bmiCategory"
    );


/* =========================================
   LOAD SAVED BMI
========================================= */

const savedBmi =
    localStorage.getItem(
        "fitbodBMI"
    );


const savedBmiCategory =
    localStorage.getItem(
        "fitbodBMICategory"
    );


if (
    savedBmi &&
    bmiResult
) {

    bmiResult.textContent =
        `Your BMI is ${savedBmi}`;

}


if (
    savedBmiCategory &&
    bmiCategory
) {

    bmiCategory.textContent =
        savedBmiCategory;

}


/* =========================================
   BMI FORM SUBMISSION
========================================= */

if (bmiForm) {

    bmiForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const height =
                Number(
                    heightInput.value
                );


            const weight =
                Number(
                    weightInput.value
                );


            /* VALIDATION */

            if (
                !height ||
                !weight ||
                height <= 0 ||
                weight <= 0
            ) {

                showBmiError(
                    "Please enter a valid height and weight."
                );

                return;

            }


            if (
                height < 50 ||
                height > 250
            ) {

                showBmiError(
                    "Height must be between 50 cm and 250 cm."
                );

                return;

            }


            if (
                weight < 10 ||
                weight > 500
            ) {

                showBmiError(
                    "Weight must be between 10 kg and 500 kg."
                );

                return;

            }


            /* =================================
               BMI FORMULA

               BMI =
               weight / height²

               Height converted from
               centimetres to metres.
            ================================= */

            const heightInMetres =
                height / 100;


            const bmi =
                weight /
                (
                    heightInMetres *
                    heightInMetres
                );


            const roundedBmi =
                bmi.toFixed(1);


            const category =
                getBmiCategory(
                    bmi
                );


            /* DISPLAY RESULT */

            if (bmiResult) {

                bmiResult.textContent =
                    `Your BMI is ${roundedBmi}`;

            }


            if (bmiCategory) {

                bmiCategory.textContent =
                    `Category: ${category}`;

            }


            /* SAVE RESULT */

            localStorage.setItem(
                "fitbodBMI",
                roundedBmi
            );


            localStorage.setItem(
                "fitbodBMICategory",
                `Category: ${category}`
            );

        }
    );

}


/* =========================================
   BMI CATEGORY
========================================= */

function getBmiCategory(bmi) {

    if (bmi < 18.5) {

        return "Underweight";

    }


    if (bmi < 25) {

        return "Normal weight";

    }


    if (bmi < 30) {

        return "Overweight";

    }


    return "Obesity";

}


/* =========================================
   BMI ERROR
========================================= */

function showBmiError(message) {

    if (bmiResult) {

        bmiResult.textContent =
            message;

    }


    if (bmiCategory) {

        bmiCategory.textContent =
            "";

    }

}