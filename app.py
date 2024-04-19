from flask import Flask, render_template, redirect, url_for, request,jsonify,send_from_directory


from resources.submit_signin import sign_in
from resources.password_change import change_password
from resources.ticket_generator import generate_ticket
from resources.get_date import get_formatted_date
from resources.quality_random_feedID import generate_quality_ticket
from resources.search_csv import search_csv_file
from resources.save_feedback_form import save_feedback_data
from resources.fetch_feedback_data import feedbackData_csv
from resources.acknowledge_feedback import acknowledge
from resources.display_unacfeedback import fetch_unacfeedback
from resources.fetch_FReport_database import fetch_FReport_aor_data, fetch_FReport_team_leaders,fetch_FReport_employee_data
from resources.fetch_FeedForm_database import fetch_FeedForm_aor_data,fetch_FeedForm_team_leaders,fetch_FeedForm_employee_data
from resources.fetch_unAcknowledged_feedback import unack_feedbackData_csv
from resources.score_card_calculation import row1_and_row2, row3_to_row7,row2,row9_to_row12
from resources.pull_feedback_report import fetch_feedback_report
from resources.export_feedbackReport import receive_feedback_report






app = Flask(__name__, static_folder='static')
app.config['ATSC_TEAMS_FOLDER'] = 'ATSC_Teams'  
app.config['ATSC_FEEDBACK_FOLDER'] = 'ATSC_Feedback'  
app.config['ACKNOWLEDGED_FEEDBACK_FOLDER'] = 'acknowledged_feedback'

@app.route('/')
def index():
    return render_template('index.html')



@app.route('/submit_signin', methods=['POST'])
def sign_in_route():
    return sign_in()
  

@app.route('/favicon.ico')
def favicon():
    return app.send_static_file('favicon.ico')

@app.route('/index.html')
def login():
    return render_template('index.html')

@app.route('/cpwd.html')
def cpwd():
    return render_template('cpwd.html')

@app.route('/agent.html')
def agent_page():
    return render_template('agent.html')

@app.route('/teamlead.html')
def team_lead_page():
    return render_template('teamlead.html')

@app.route('/error_code.html')
def error_code():
    return render_template('error_code.html')

@app.route('/existing_user.html')
def existing_user():
    return render_template('existing_user.html')

@app.route('/signup_success.html')
def signup_success():
    return render_template('signup_success.html')

@app.route('/display_unacfeedback.html')
def unack_feedback():
    
    return render_template('display_unacfeedback.html')

@app.route('/display_acfeedback.html')
def ack_feedback():
    
    return render_template('display_acfeedback.html')


@app.route('/fetch_all_feedback', methods=['GET'])
def fetch_feedback():
    name = request.args.get('name')
    feedback_id = request.args.get('feedbackId')
    return fetch_unacfeedback(name=name,feedback_id=feedback_id)
    

@app.route('/feedback_form.html')
def feedback_form():
    name = request.args.get('name')  # Retrieve the name from the query parameter
    ticket_id = generate_ticket()
    current_date = get_formatted_date()
    return render_template('feedback_form.html', name=name,ticket_id = ticket_id,date=current_date)

@app.route('/feedback_report.html')
def feedback_report():
    name = request.args.get('name')  # Retrieve the name from the query parameter
    return render_template('feedback_report.html', name=name)

@app.route('/create_scorecard.html')
def create_scorecard():
    name = request.args.get('name')  # Retrieve the name from the query parameter
    current_date = get_formatted_date()
    return render_template('create_scorecard.html', date = current_date,name=name)

@app.route('/quality_feedback_form.html')
def quality_feedback_form():
    name = request.args.get('name')  # Retrieve the name from the query parameter
    current_date = get_formatted_date()
    return render_template('quality_feedback_form.html', name=name,date=current_date)


  

@app.route('/search_csv')
def search_csv():
    return search_csv_file()


@app.route("/save-feedback", methods=["POST"])
def save_feedback():
    return save_feedback_data()


@app.route('/all_feedbackData_csv')
def feedbackDataRoute():
    return feedbackData_csv()

@app.route('/unack_feedbackData_csv')
def unack_feedbackDataRoute():
    return unack_feedbackData_csv()



@app.route('/acknowledge', methods=['POST'])
def acknowledge_feedback():
    if request.is_json:
        json_data = request.get_json()
        return acknowledge(json_data=json_data)
    
@app.route('/feedback_report', methods=['POST'])
def pull_feedback_report():
    data = request.json

    months = list(map(int, data['month']))  # Convert months to integers
    years = list(map(int, data['year']))   # Convert years to integers
    employee_names = data['employeeName']

    print(months, years, employee_names)
    
    return fetch_feedback_report(months, years, employee_names)

@app.route('/evaluate', methods=['POST'])
def evaluate():
    data = request.get_json()
    selected_count = data.get('selectedCount', 0)
    total_score = selected_count  # Correct scoring logic (Yes/NA=5, No=0 for each question)
    print(data)

    return jsonify({'totalScore': total_score})

############ Feedback form page user data#####################
@app.route('/fetch_FeedForm_aor_data')
def display_FeedForm_aor ():
    return fetch_FeedForm_aor_data()

@app.route('/fetch_FeedForm_team_leaders')
def display_FeedForm_manager():
    return fetch_FeedForm_team_leaders()

@app.route('/fetch_FeedForm_employee_data')
def display_FeedForm_agents():
    return fetch_FeedForm_employee_data()

############ Feedback report page user data#####################
@app.route('/fetch_FReport_aor_data', methods=['GET'])
def display_FReport_aor ():
    return fetch_FReport_aor_data()

@app.route('/fetch_FReport_team_leaders' , methods=['POST'])
def display_FReport_manager():
    return fetch_FReport_team_leaders()

@app.route('/fetch_FReport_employee_data' , methods=['POST'])
def display_FReport_agents():
    return fetch_FReport_employee_data()


@app.route('/export-feedbackReport', methods=['POST'])
def handle_feedback_report():
    data = request.json
    result = receive_feedback_report(data)
    return result


@app.route('/calculate_points', methods=['POST'])
def calculate_points():
    data = request.get_json()
    row_number = data['rowNumber']
    if row_number == 0 or row_number == 1:
        points = row1_and_row2(data)
        return jsonify({'points': points})
    elif row_number == 3 or row_number == 4 or row_number == 5 or row_number == 6 or row_number == 7:
        points = row3_to_row7(data)
        return jsonify({'points': points})
    elif row_number == 2:
        points = row2(data)
        return jsonify({'points': points})
    elif row_number == 9 or row_number == 10 or row_number == 11 or row_number == 12:
        points = row9_to_row12(data)
        return jsonify({'points': points})
    else:
         return jsonify({'message': 'Invalid rowNumber'})



if __name__ == '__main__':
    app.run(debug=True)


















