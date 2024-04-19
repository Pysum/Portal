import csv
from flask import Flask, jsonify, request



def fetch_FReport_aor_data():
    aor_data = set()  # Using a set to store unique values
    with open('user_data.csv', 'r') as file:
        reader = csv.reader(file)
        next(reader)  # Skip the header row
        for row in reader:
            aor = row[6]
            if aor.strip():  # Check if the 'aor' variable is not empty or contains only whitespace
                aor_data.add(aor.strip())
                
    return jsonify(list(aor_data))


def fetch_FReport_team_leaders():
    data = request.get_json()
    selected_aors = data.get('aors')
    print(f"Selected AORs: {selected_aors}")  # Add this line for debugging

    team_leaders = set()  # Using a set to store unique values
    with open('user_data.csv', 'r') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        for row in csv_reader:
            if ('all' in selected_aors or row['AOR'] in selected_aors) and row['Role'] != 'Division Leader' and (row['Role'] == 'Team Leader' or row['Role'] == 'Quality'):
                team_leaders.add(row['Name'])
            if row['AOR'] in selected_aors and row['Role'] != 'Division Leader' and (row['Role'] == 'Team Leader' or row['Role'] == 'Quality'):
                team_leaders.add(row['Name'])
    print(f"Team Leaders: {team_leaders}") 
    return jsonify(list(team_leaders))




def fetch_FReport_employee_data():
    data = request.get_json()
    selected_team_leader = data.get('teamLeaders')

    employee_names = []

    with open('user_data.csv', 'r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            managers = row['Manager'].split(',') if ',' in row['Manager'] else [row['Manager']]
            if 'all' in selected_team_leader:
                # If "Select All" is selected, include all employees
                employee_names.append(row['Name'])
            elif any(manager in managers for manager in selected_team_leader):
                employee_names.append(row['Name'])
    print(f"Employee name: {employee_names}")
    return jsonify(employee_names)
