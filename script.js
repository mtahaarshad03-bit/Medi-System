document.addEventListener('DOMContentLoaded', () => {
    // Doctor Specializations Map
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

    // Doctor Selection Function
    window.selectDoctor = function(doctorName) {
        const doctorSelect = document.getElementById('doctorName');
        const specInput = document.getElementById('specialization');
        
        if (doctorSelect) doctorSelect.value = doctorName;
        if (specInput) specInput.value = doctorSpecializations[doctorName] || '';
        
        // Scroll to appointment form
        const appointmentSection = document.getElementById('appointment');
        if (appointmentSection) {
            appointmentSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Auto-update specialization when doctor is selected
    const doctorSelect = document.getElementById('doctorName');
    const specInput = document.getElementById('specialization');
    
    if (doctorSelect) {
        doctorSelect.addEventListener('change', (e) => {
            const selectedDoctor = e.target.value;
            if (specInput) specInput.value = doctorSpecializations[selectedDoctor] || '';
        });
    }

    // Form Submission with direct n8n Integration
    const form = document.getElementById('appointmentForm');
    const popup = document.getElementById('successPopup');
    const closePopup = document.getElementById('closePopup');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            submitBtn.disabled = true;

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
                // Standard Fetch call (n8n Webhook node par CORS properly allow kiya ho)
                const response = await fetch('https://tom321.app.n8n.cloud/webhook-test/3a7a770d-1ea2-492f-a3c3-83f3703e1841', {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json' 
                    },
                    body: JSON.stringify(formData)
                });

                // Ab response status bilkul accurate check hoga!
                if (response.ok) {
                    if (popup) popup.style.display = 'flex';
                    form.reset();
                    if (specInput) specInput.value = '';
                } else {
                    alert('Booking failed! Please try again later.');
                }

            } catch (error) {
                console.error('Network Error:', error);
                alert('Connection error. Could not reach the booking server.');
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    if (closePopup) {
        closePopup.addEventListener('click', () => {
            if (popup) popup.style.display = 'none';
        });
    }

    // Close popup when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.style.display = 'none';
        }
    });

    // Scroll Animations
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

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Set minimum date for appointment to today
    const dateInput = document.getElementById('appointmentDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
});