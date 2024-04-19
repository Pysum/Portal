import csv
import urllib.parse

def fetch_unacfeedback(name, feedback_id):
    # Decode the name parameter and replace spaces with underscores
    decoded_name = urllib.parse.unquote(name)
    filename = f'ATSC_Feedback/{decoded_name.replace(" ", "_")}.csv'

    try:
        with open(filename, 'r') as file:
            reader = csv.DictReader(file)
            for row in reader:
                if row['Feedback ID'] == feedback_id:
                    feedback_data = {
                        'name': row['Employee Name'],
                        'feedbackId': row['Feedback ID'],
                        'incidentNumber': row['Incident Number'],
                        'date': row['Date'],
                        'feedbackType': row['Feedback Type'],
                        'feedback': row['Feedback'],
                        'reportingManager': row['Team Leader'],
                        'aor': row['AOR'],
                        'chatId': row['Conversation ID'],
                        'feedbackBy': row['Feedback By'],
                    }
                    return feedback_data

    except FileNotFoundError:
        pass

    # Feedback not found or file not found
    return {'error': 'Feedback not found.'}
