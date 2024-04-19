import os
import csv

def acknowledge(json_data):
    agent_name = json_data.get('agentName')
    feedback_id = json_data.get('feedbackId')
    reporting_manager = json_data.get('reportingManager')
    aor = json_data.get('aor')
    incident_number = json_data.get('incidentNumber')
    chat_id = json_data.get('chatId')
    date = json_data.get('date')
    feedback_type = json_data.get('feedbackType')
    feedback = json_data.get('feedback')
    feedback_by = json_data.get('feedbackBy')
    
    if agent_name and feedback_id:
        agent_name = agent_name.replace(' ', '_')  # Replace spaces with underscores in agent name
       
        data = {
            'Employee Name': agent_name,
            'Feedback ID': feedback_id,
            'Reporting Manager': reporting_manager,
            'AOR': aor,  # Modified header for 'aor'
            'Incident Number': incident_number,
            'Conversation ID': chat_id,
            'Date': date,
            'Feedback Type': feedback_type,
            'Feedback': feedback,
            'Feedback By': feedback_by
        }
        

        folder = 'acknowledged_feedback'
        if not os.path.exists(folder):
            os.makedirs(folder)
        filename = os.path.join(folder, f'{agent_name}.csv')

        write_header = not os.path.exists(filename)

        with open(filename, 'a', newline='') as file:
            writer = csv.DictWriter(file, fieldnames=['Employee Name', 'Feedback ID', 'Reporting Manager', 'AOR', 'Incident Number', 'Conversation ID', 'Date', 'Feedback Type', 'Feedback','Feedback By'])
            if write_header:
                writer.writeheader()
            writer.writerow(data)

        return 'Acknowledgment recorded and file saved.'

    return 'Error: Invalid request data.'
