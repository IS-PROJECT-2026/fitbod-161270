/* ==========================================
   FITBOD MAIN APP INITIALIZER & ROUTER
   ISSUE #9
========================================== */

document.addEventListener("DOMContentLoaded", () => {
    // Navigation / View Switching Logic
    const navLinks = document.querySelectorAll("[data-nav]");
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetSectionId = link.getAttribute("data-nav");
            
            // Toggle active styles on links if applicable
            navLinks.forEach(l => l.classList.remove("active"));
            link.classList.add("active");

            // Toggle views
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

    // Theme Toggle Handler (if present in app)
    const themeToggleBtn = document.getElementById("themeToggle");
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            document.body.classList.toggle("dark-theme");
            const isDark = document.body.classList.contains("dark-theme");
            localStorage.setItem("fitbod_dark_theme", isDark);
        });

        // Load saved theme preference
        if (localStorage.getItem("fitbod_dark_theme") === "true") {
            document.body.classList.add("dark-theme");
        }
    }

    // Initialize & Refresh Dashboard Analytics
    if (typeof renderDashboard === "function") {
        renderDashboard();
    }
});