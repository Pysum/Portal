import csv

def check_existing_user(NTID):
    with open('user_data.csv', 'r') as file:
        reader = csv.reader(file)
        for row in reader:
            if len(row) > 1 and row[1] == NTID:
                return True
    return False

def store_user_data(Role, NTID, Name, Manager, Password, Email):
    with open('user_data.csv', 'a', newline='') as file:
        writer = csv.writer(file)
        writer.writerow([Role, NTID, Name, Manager, Password, Email])
