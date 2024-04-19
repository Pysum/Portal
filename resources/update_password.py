import csv

def update_password(ntid, new_password):
    rows = []
    with open('user_data.csv', 'r') as file:
        reader = csv.reader(file)
        rows = list(reader)

    found = False
    for row in rows:
        if row and row[1] == ntid:
            row[4] = new_password
            found = True
            break

    if found:
        with open('user_data.csv', 'w', newline='') as file:
            writer = csv.writer(file)
            writer.writerows(rows)

        return 'Password updated successfully!'
    else:
        return 'NTID not found. Password not updated.'
