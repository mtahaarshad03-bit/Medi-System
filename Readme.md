# Medi System: Automated AI Medical Appointment Booking System

Med_Clinic 1 ek smart, automated medical appointment scheduling platform hai jo patients ke liye doctor ki appointments book karne ke process ko streamline karta hai. Yeh system dynamic HTML/CSS frontend, Python/Flask backend, aur n8n automation workflows ka ek seamless integration hai.

---

## 🚀 Features

*   **Interactive User Interface:** Modern, user-friendly frontend jahan patients real-time mein appointments schedule kar sakte hain.
*   **Flask Backend API:** Robust Python Flask API jo frontend requests ko validation aur secure transmission ke baad automation workflows tak pohnchati hai.
*   **n8n Automated Workflow Pipeline:** Complete automation pipeline jo incoming webhooks ko process karti hai, Google Sheets mein data log karti hai, aur Google Calendar sync handle karti hai.
*   **Database & Calendar Sync:** Sabhi appointments automatically central `MediSchedule` Google Sheet aur Google Calendar mein real-time par update ho jati hain.
*   **Dual-Notification System:** 
    *   **Patient Confirmation:** Patient ko instantly booking details ka structural email confirmation milta hai.
    *   **Management Alert:** Administration team/clinic management ko automatic notification dispatch hoti hai taake operational updates transparent rahein.

---

## 🛠️ Tech Stack & Architecture

*   **Frontend:** HTML5, CSS3, JavaScript (Vanilla JS)
*   **Backend:** Python, Flask
*   **Automation Platform:** n8n (Webhooks, Google Sheets Node, Google Calendar Node, Gmail Node)
*   **Data Storage:** Google Sheets (`MediSchedule`)

---

## 📁 Project Structure

```text
├── backend/
│   ├── app.py             # Flask application engine & API routes
│   └── requirements.txt   # Python dependencies
├── frontend/
│   ├── index.html         # Main appointment booking form
│   ├── style.css          # Visual styling & responsive layouts
│   └── app.js             # Form validation & API fetch requests
└── README.md              # Project documentation