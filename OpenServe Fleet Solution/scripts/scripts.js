document.addEventListener('DOMContentLoaded', () => {
            const openBtn = document.getElementById('openPopup');
            const closeBtn = document.getElementById('closePopup');
            const popup = document.getElementById('authPopup');
            const form = document.getElementById('authForm');

            // Show popup
            openBtn?.addEventListener('click', () => {
                popup.style.display = 'flex';
            });

            // Hide popup
            closeBtn?.addEventListener('click', () => {
                popup.style.display = 'none';
            });

            // Close on outside click
            popup?.addEventListener('click', (e) => {
                if (e.target === popup) {
                    popup.style.display = 'none';
                }
            });

            // Form submission & redirect
            form?.addEventListener('submit', (e) => {
                e.preventDefault();

                const staffNo = document.getElementById('staffNo').value.trim();
                const password = document.getElementById('password').value;

                // Mock authentication
                if (staffNo && password) {
                    localStorage.setItem('staffNo', staffNo);
                    popup.style.display = 'none';
                    
                    // Redirect to dashboard
                    window.location.href = `pages/dashboard.html?user=${encodeURIComponent(staffNo)}`;
                } else {
                    alert('Please enter both Staff No. and Password.');
                }
            });
        });