import csv
import os
from flask import jsonify, request
from datetime import datetime


def fetch_feedback_report(months, years, employee_names):
    report_data = []
    acknowledged_feedback_ids = set()

    acknowledged_folder_path = 'acknowledged_feedback'
    if os.path.exists(acknowledged_folder_path):
        acknowledged_files = [f for f in os.listdir(acknowledged_folder_path) if f.endswith('.csv')]
        for file in acknowledged_files:
            with open(os.path.join(acknowledged_folder_path, file), 'r') as csv_file:
                csv_reader = csv.DictReader(csv_file)
                for row in csv_reader:
                    feedback_id = row['Feedback ID'].strip()
                    acknowledged_feedback_ids.add(feedback_id)

    for employee_name in employee_names:
        file_name = f"{employee_name}.csv"
        file_path = os.path.join('ATSC_Feedback', file_name)
        
        if os.path.exists(file_path):
            unique_feedback_ids = set()

            with open(file_path, 'r') as csv_file:
                csv_reader = csv.DictReader(csv_file)
                for row in csv_reader:
                    feedback_id = row['Feedback ID']
                    if feedback_id in unique_feedback_ids:
                        continue
                    unique_feedback_ids.add(feedback_id)

                    if feedback_id in acknowledged_feedback_ids:
                        acknowledged = True
                    else:
                        acknowledged = False

                    feedback_date = datetime.strptime(row['Date'], '%m/%d/%Y')
                    if feedback_date.month in months and feedback_date.year in years:
                        report_data.append({
                            'Date': row['Date'],
                            'EmployeeName': employee_name.replace('_', ' '),
                            'TeamLeader': row['Team Leader'],
                            'FeedbackId': feedback_id,
                            'IncidentNumber': row['Incident Number'],
                            'FeedbackType': row['Feedback Type'],
                            'SubCategory': row['Sub-Category'],
                            'Feedback': row['Feedback'],
                            'Acknowledged': acknowledged
                        })
    
    return jsonify(report_data)
