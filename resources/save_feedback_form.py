import os
import csv
from flask import jsonify, request

def save_feedback_data():
    feedback_data = request.get_json()

    agent_name = feedback_data.get("agent", "")
    agent_name_with_underscore = agent_name.replace(" ", "_")

    folder_path = "ATSC_Feedback"
    if not os.path.exists(folder_path):
        os.makedirs(folder_path)

    file_path = os.path.join(folder_path, f"{agent_name_with_underscore}.csv")

    feedback_id = feedback_data.get("feedbackId", "")
    if not is_feedback_id_unique(file_path, feedback_id):
        return "Feedback ID already exists", 400

    file_mode = "a" if os.path.exists(file_path) else "w"

    with open(file_path, file_mode, newline="") as csvfile:
        writer = csv.writer(csvfile)
        if os.path.getsize(file_path) == 0 or file_mode == "w":
            writer.writerow(["Feedback Type","Sub-Category", "AOR", "Team Leader", "Employee Name", "Incident Number", "Conversation ID", "Feedback", "Feedback ID", "Date","Feedback By"])
        writer.writerow([
            feedback_data.get("feedbackType", ""),
            feedback_data.get("subCategory", ""),
            feedback_data.get("aor", ""),
            feedback_data.get("teamLeader", ""),
            feedback_data.get("agent", ""),
            feedback_data.get("incidentNumber", ""),
            feedback_data.get("chatId", ""),
            feedback_data.get("feedbackText", ""),
            feedback_id,
            feedback_data.get("date", ""),
            feedback_data.get("name", ""),
        ])
 

    return "OK", 200

def is_feedback_id_unique(file_path, feedback_id):
    if os.path.exists(file_path):
        with open(file_path, "r", newline="") as csvfile:
            reader = csv.reader(csvfile)
            next(reader)  # Skip header row
            for row in reader:
                if row[7] == feedback_id:
                    return False
    return True
