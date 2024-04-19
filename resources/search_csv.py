import csv
from flask import jsonify, request

def search_csv_file():
    name = request.args.get('name')
    if name:
        file_path = f"ATSC_Teams/{name.replace(' ', '_')}.csv"
        user_data = []
        with open(file_path, 'r') as csv_file:
            csv_reader = csv.DictReader(csv_file)
            for row in csv_reader:
                user_data.append({'NTID': row['NTID'], 'Name': row['Name']})
        return jsonify(user_data)
    else:
        return "User name not provided."
