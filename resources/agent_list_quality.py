import csv
from flask import jsonify

def get_aor_list():
    with open('user_data.csv', 'r') as csv_file:
        reader = csv.reader(csv_file)
        next(reader)  # Skip the header row
        aor_list = [row[6] for row in reader if row[6]]
    return jsonify(aor_list)


def get_aor_data(selected_aor):
    with open('user_data.csv', 'r') as csv_file:
        reader = csv.reader(csv_file)
        next(reader)  # Skip the header row
        manager_name = ''
        agents = []
        for row in reader:
            if row[6] == selected_aor:
                manager_name = row[3]  # Adjust the column index for manager name
                agents.append({'name': row[2], 'ntid': row[1]})  # Adjust the column indices for agent name and NTID
    return jsonify({'managerName': manager_name, 'agents': agents})