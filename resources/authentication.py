import csv
import os


def authenticate_user(ntid, password):
    file_path = os.path.join(os.path.dirname(__file__), 'user_data.csv')
    with open(file_path, 'r') as file:
        reader = csv.reader(file)
        for row in reader:
            if len(row) >= 6:  # Make sure the row has at least 5 elements
                stored_ntid = row[1].lower()  # Convert stored_ntid to lowercase
                stored_password = row[4]
                if ntid.lower() == stored_ntid and password == stored_password:
                    role = row[0]
                    return role  # Return the role if the authentication is successful
    return None  # Return None if the authentication fails




def get_user_name(ntid):
    file_path = os.path.join(os.path.dirname(__file__), 'user_data.csv')
    with open(file_path, 'r') as file:
        reader = csv.reader(file)
        for row in reader:
            if len(row) >= 5:  # Make sure the row has at least 5 elements
                stored_ntid = row[1].lower() 
                if ntid.lower() == stored_ntid:
                    name = row[2]  # Assuming the user name is in the third column
                    return name  # Return the user name
    return None  

