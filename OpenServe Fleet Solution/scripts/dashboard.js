// scripts/dashboard.js
document.addEventListener('DOMContentLoaded', () => {
    // === 1. WELCOME USER ===
    const urlParams = new URLSearchParams(window.location.search);
    let staffNo = urlParams.get('user') || localStorage.getItem('staffNo') || 'Guest';
    const welcomeEl = document.getElementById('welcomeMessage');
    if (welcomeEl) welcomeEl.textContent = `Welcome, ${staffNo}`;
    if (urlParams.get('user')) localStorage.setItem('staffNo', staffNo);

    // === 2. MENU NAVIGATION ===
    document.querySelectorAll('.sidebar-menu a').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();

            // Update active menu
            document.querySelectorAll('.sidebar-menu a').forEach(a => a.classList.remove('active'));
            link.classList.add('active');

            // Show correct section
            const sectionId = link.dataset.section;
            document.querySelectorAll('.section-content').forEach(s => s.classList.remove('active'));
            const target = document.getElementById(sectionId);
            if (target) {
                target.classList.add('active');

                // FIXED: Scroll to the actual section
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }

            // Logout
            if (sectionId === 'logout') {
                localStorage.removeItem('staffNo');
                alert('Logged out successfully.');
                window.location.href = '/index.html';
            }
        });
    });

    // === 3. CTA BUTTON ===
    document.getElementById('startAnalysisBtn')?.addEventListener('click', () => {
        document.querySelector('[data-section="search"]')?.click();
    });

    // === 4. SEARCH FORM LOGIC ===
    const useRoutes = document.getElementById('useRoutes');
    const routeFile = document.getElementById('routeFile');
    const searchForm = document.getElementById('searchForm');
    const resultsDiv = document.getElementById('searchResults');

    // Show/hide file input
    useRoutes?.addEventListener('change', () => {
        routeFile.style.display = useRoutes.checked ? 'block' : 'none';
    });

    // Handle form submission
    searchForm?.addEventListener('submit', e => {
        e.preventDefault();
        resultsDiv.style.display = 'block';
        resultsDiv.innerHTML = '<p><strong>Searching...</strong> Please wait...</p>';

        setTimeout(() => {
            const type = document.querySelector('input[name="searchType"]:checked')?.parentElement.textContent.trim() || 'Overall';
            resultsDiv.innerHTML = `
                <div style="background:#fff;padding:20px;border-radius:8px;">
                    <h3 style="color:#2E8B57;">Search Results</h3>
                    <p><strong>Type:</strong> ${type}</p>
                    <p><strong>AI Data:</strong> ${document.getElementById('useAI').checked ? 'Included' : 'Not used'}</p>
                    <p><strong>Station Availability:</strong> ${document.getElementById('stationAvail').checked ? 'Filtered' : 'All'}</p>
                    <hr>
                    <p><strong>Top Match:</strong> Sandton, Gauteng (Score: 95)</p>
                    <p><em>High charger density, excellent route coverage.</em></p>
                </div>
            `;
        }, 1200);
    });
});