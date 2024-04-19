from flask import jsonify, request
import os
import csv
from datetime import datetime

def receive_feedback_report(data):
    tableData = data['tableData']

    # Creating a CSV file with a unique name based on timestamp
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    desktop_path = os.path.expanduser("~/Desktop")
    csv_file_name = f"feedback_report_{timestamp}.csv"
    csv_file_path = os.path.join(desktop_path, csv_file_name)

    # Writing data to the CSV file
    with open(csv_file_path, mode='w', newline='') as csv_file:
        writer = csv.writer(csv_file)
        writer.writerow(["Date", "Employee Name", "Reporting Manager","Feedback ID",
                         "Incident Number","Feedback Type","Sub-Category","Feedback",
                         "Acknowledgment Status"])
        for row in tableData:
            writer.writerow(row)

    return {"message": f"Data exported and saved successfully as {csv_file_name}"}


