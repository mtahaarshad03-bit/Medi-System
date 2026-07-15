document.addEventListener('DOMContentLoaded', () => {
    // 1. Doctor Specializations Map
    const doctorSpecializations = {
        'Dr. Muhammad Taha': 'Orthopedic Surgeon',
        'Dr. Minahil Sultan Alvi': 'Cardiologist',
        'Dr. Muhammad Saad': 'General Physician',
        'Dr. Ayesha Khan': 'Gynecologist',
        'Dr. Hassan Raza': 'ENT Specialist',
        'Dr. Fatima Ahmed': 'Pediatrician',
        'Dr. Ali Hamza': 'Ophthalmologist',
        'Dr. Mahnoor Ali': 'Dermatologist',
        'Dr. Usman Tariq': 'Gastroenterologist',
        'Dr. Zainab Malik': 'Neurologist'
    };

    // 2. Doctor Selection Function (Exposed to Global Window for cards click)
    window.selectDoctor = function(doctorName) {
        const doctorSelect = document.getElementById('doctorName');
        const specInput = document.getElementById('specialization');
        
        if (doctorSelect) doctorSelect.value = doctorName;
        if (specInput) specInput.value = doctorSpecializations[doctorName] || '';
        
        // Scroll to appointment form smoothly
        const appointmentSection = document.getElementById('appointment');
        if (appointmentSection) {
            appointmentSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // 3. Auto-update specialization when doctor is manually selected from dropdown
    const doctorSelect = document.getElementById('doctorName');
    const specInput = document.getElementById('specialization');
    
    if (doctorSelect) {
        doctorSelect.addEventListener('change', (e) => {
            const selectedDoctor = e.target.value;
            if (specInput) specInput.value = doctorSpecializations[selectedDoctor] || '';
        });
    }

    // 4. Form Submission with standard fetch (No-cors bypass removed to deliver full JSON payload)
    const form = document.getElementById('appointmentForm');
    const popup = document.getElementById('successPopup');
    const closePopup = document.getElementById('closePopup');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Set loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            submitBtn.disabled = true;

            // Collect Form Data
            const formData = {
                fullName: document.getElementById('fullName').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value,
                doctorName: document.getElementById('doctorName').value,
                specialization: document.getElementById('specialization').value,
                appDate: document.getElementById('appointmentDate').value,
                appTime: document.getElementById('appointmentTime').value,
                notes: document.getElementById('notes').value,
                timestamp: new Date().toLocaleString()
            };

            try {
                // Standard fetch request using application/json
                const response = await fetch('https://tom321.app.n8n.cloud/webhook/3a7a770d-1ea2-492f-a3c3-83f3703e1841', {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json' 
                    },
                    body: JSON.stringify(formData)
                });

                // Check if n8n returned a successful response (e.g., Status 200 OK)
                if (response.ok) {
                    if (popup) popup.style.display = 'flex';
                    form.reset();
                    if (specInput) specInput.value = '';
                } else {
                    const errText = await response.text();
                    console.error('Server Error:', errText);
                    alert('Booking failed. Please check if n8n workflow is active.');
                }

            } catch (error) {
                console.error('Network Error:', error);
                alert('Connection error. Could not reach the booking server. Please ensure n8n CORS is configured.');
            } finally {
                // Restore button status
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // 5. Success Popup Close Listeners
    if (closePopup) {
        closePopup.addEventListener('click', () => {
            if (popup) popup.style.display = 'none';
        });
    }

    // Close popup when clicking outside the modal content
    window.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.style.display = 'none';
        }
    });

    // 6. IntersectionObserver Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // 7. Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // 8. Mobile Menu Hamburger Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // 9. Set minimum appointment date to Today
    const dateInput = document.getElementById('appointmentDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
});