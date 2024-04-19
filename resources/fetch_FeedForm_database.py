import csv
from flask import Flask, jsonify, request
import os



def fetch_FeedForm_aor_data():
    aor_data = set()  # Using a set to store unique values
    file_path = os.path.join(os.path.dirname(__file__), 'user_data.csv')
    with open(file_path, 'r') as file:
        reader = csv.reader(file)
        next(reader)  # Skip the header row
        for row in reader:
            aor = row[6]
            if aor.strip():  # Check if the 'aor' variable is not empty or contains only whitespace
                aor_data.add(aor.strip())
    return jsonify(list(aor_data))


def fetch_FeedForm_team_leaders():
    selected_aor = request.args.get('selectedAOR')
    team_leaders = set()  # Using a set to store unique values
    file_path = os.path.join(os.path.dirname(__file__), 'user_data.csv')
    with open(file_path, 'r') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        for row in csv_reader:
            if row['AOR'] == selected_aor and row['Role'] != 'Division Leader':
                if row['Role'] != 'Team Leader':
                    team_leaders.add(row['Manager'])
    return jsonify(list(team_leaders))


def fetch_FeedForm_employee_data():
    team_leader = request.args.get('teamLeader')
    employee_names = []

    file_path = os.path.join(os.path.dirname(__file__), 'user_data.csv')
    with open(file_path, 'r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            if row['Manager'] == team_leader:
                employee_names.append(row['Name'])

    return jsonify(employee_names)