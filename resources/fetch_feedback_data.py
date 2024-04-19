import csv
import os
from flask import jsonify, request

def fetch_all_feedback_data(name):
    file_name = name.replace(' ', '_') + '.csv'
    file_path = os.path.join('ATSC_Feedback', file_name)

    user_data = []
    acknowledged_feedback_ids = set()

    acknowledged_folder_path = 'acknowledged_feedback'
    if os.path.exists(acknowledged_folder_path):
        acknowledged_files = [f for f in os.listdir(acknowledged_folder_path) if f.endswith('.csv')]
        for file in acknowledged_files:
            with open(os.path.join(acknowledged_folder_path, file), 'r') as csv_file:
                csv_reader = csv.DictReader(csv_file)
                for row in csv_reader:
                    feedback_id = row['Feedback ID'].lstrip()  # Remove leading spaces
                    acknowledged_feedback_ids.add(feedback_id)
                    print(acknowledged_feedback_ids)

    with open(file_path, 'r') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        for row in csv_reader:
            feedback_id = row['Feedback ID']
            acknowledged = feedback_id in acknowledged_feedback_ids
            user_data.append({
                'Date': row['Date'],
                'FeedbackId': feedback_id,
                'IncidentNumber': row['Incident Number'],
                'FeedbackType': row['Feedback Type'],
                'Feedback': row['Feedback'],
                'Acknowledged': acknowledged
            })
           

    if not user_data:
        return jsonify({'message': 'You have already acknowledged all feedback.'})

    return jsonify(user_data)

def feedbackData_csv():
    name = request.args.get('name')
    if name:
        user_data = fetch_all_feedback_data(name)
        return user_data
    else:
        return "User name not provided."
