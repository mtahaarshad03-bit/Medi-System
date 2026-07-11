from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os

app = Flask(__name__)
CORS(app)

N8N_WEBHOOK_URL = os.environ.get('N8N_WEBHOOK_URL', 'https://tom321.app.n8n.cloud/webhook/3a7a770d-1ea2-492f-a3c3-83f3703e1841')

@app.route('/api/book-appointment', methods=['POST'])
def book_appointment():
    data = request.json
    
    # Debug: Print received data
    print("📥 Received data from frontend:")
    print(f"  appDate: {data.get('appDate')}")
    print(f"  appTime: {data.get('appTime')}")
    
    # Validate required fields
    required_fields = ['fullName', 'phone', 'email', 'doctorName', 'specialization', 'appDate', 'appTime']
    for field in required_fields:
        if field not in data or not data[field]:
            return jsonify({"success": False, "message": f"Missing required field: {field}"}), 400
    
    # Transform field names for n8n email template
    payload = {
        "patientName": data.get('fullName'),
        "phoneNumber": data.get('phone'),
        "email": data.get('email'),
        "doctor": data.get('doctorName'),
        "specialization": data.get('specialization'),
        "appointmentDate": data.get('appDate'),  # ✅ Transformed
        "appointmentTime": data.get('appTime'),  # ✅ Transformed
        "notes": data.get('notes', ''),
        # Also keep original fields for backward compatibility
        "appDate": data.get('appDate'),
        "appTime": data.get('appTime')
    }
    
    print("📤 Sending to n8n:")
    print(f"  appointmentDate: {payload['appointmentDate']}")
    print(f"  appointmentTime: {payload['appointmentTime']}")
    
    try:
        response = requests.post(N8N_WEBHOOK_URL, json=payload, timeout=10)
        
        print(f"✅ n8n Response: {response.status_code}")
        
        if response.status_code == 200:
            return jsonify({"success": True, "message": "Appointment booked successfully!"}), 200
        else:
            return jsonify({"success": False, "message": "Automation failed. Please try again later."}), 500
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Error connecting to n8n: {e}")
        return jsonify({"success": False, "message": "Server error. Could not process appointment."}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)