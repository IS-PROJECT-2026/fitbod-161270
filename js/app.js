/* ==========================================
   FITBOD MAIN APP INITIALIZER, ROUTER & THEME
========================================== */

function initTheme() {
    const themeBtn = document.getElementById("themeToggle") || document.getElementById("theme-toggle");
    
    // Check saved local storage preference or default to light
    const savedTheme = localStorage.getItem("fitbod_theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-theme");
        if (themeBtn) themeBtn.textContent = "☀️ Light Mode";
    } else {
        document.body.classList.remove("dark-theme");
        if (themeBtn) themeBtn.textContent = "🌙 Dark Mode";
    }

    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            document.body.classList.toggle("dark-theme");
            const isDark = document.body.classList.contains("dark-theme");

            // Persist setting to LocalStorage
            localStorage.setItem("fitbod_theme", isDark ? "dark" : "light");

            // Update button label
            themeBtn.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
        });
    }
}

function initNavigation() {
    const navLinks = document.querySelectorAll("[data-nav]");
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetSectionId = link.getAttribute("data-nav");
            
            navLinks.forEach(l => l.classList.remove("active"));
            link.classList.add("active");

            document.querySelectorAll("section.page-view, .view-section").forEach(section => {
                if (section.id === targetSectionId) {
                    section.style.display = "block";
                    section.classList.add("active");
                } else {
                    section.style.display = "none";
                    section.classList.remove("active");
                }
            });
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize Theme Switcher (Issue #10)
    initTheme();

    // 2. Initialize Router / Navigation
    initNavigation();

    // 3. Ensure Workout Submit Listener is Initialized
    if (typeof initWorkouts === "function") {
        initWorkouts();
    }

    // 4. Render Initial Dashboard Analytics
    if (typeof renderDashboard === "function") {
        renderDashboard();
    }
});