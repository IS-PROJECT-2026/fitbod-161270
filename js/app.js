/* ==========================================
   FITBOD APP INITIALIZER & ROUTER
========================================== */

function initTheme() {
    const themeBtn = document.getElementById("themeToggle");
    const savedTheme = getStoredTheme();

    function applyTheme(theme) {
        if (theme === "light") {
            document.body.classList.add("light-mode");
            if (themeBtn) {
                themeBtn.textContent = "🌙";
                themeBtn.setAttribute("aria-label", "Switch to dark mode");
                themeBtn.setAttribute("title", "Switch to dark mode");
            }
        } else {
            document.body.classList.remove("light-mode");
            if (themeBtn) {
                themeBtn.textContent = "☀️";
                themeBtn.setAttribute("aria-label", "Switch to light mode");
                themeBtn.setAttribute("title", "Switch to light mode");
            }
        }
    }

    applyTheme(savedTheme);

    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            const isLight = document.body.classList.contains("light-mode");
            const newTheme = isLight ? "dark" : "light";
            saveStoredTheme(newTheme);
            applyTheme(newTheme);
        });
    }
}



document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initNavigation();
    if (typeof initWorkouts === "function") initWorkouts();
    if (typeof initTracking === "function") initTracking();
});

function initNavigation() {
    const navLinks = document.querySelectorAll(".nav-link");
    const pageViews = document.querySelectorAll(".page-view");

    navLinks.forEach(link => {
        link.addEventListener("click", function () {
            const targetId = this.getAttribute("data-target");

            // 1. Update Active Navigation Tab State
            navLinks.forEach(l => l.classList.remove("active"));
            this.classList.add("active");

            // 2. Hide All Views and Display Target View
            pageViews.forEach(view => {
                if (view.id === targetId) {
                    view.classList.remove("hidden");
                    view.classList.add("active");
                } else {
                    view.classList.add("hidden");
                    view.classList.remove("active");
                }
            });

            // 3. Re-render View Component Data
            if (typeof renderWorkouts === "function") renderWorkouts();
            if (typeof renderTracking === "function") renderTracking();
        });
    });
}