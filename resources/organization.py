import csv
import os


def create_manager_tables():
    managers = set()
    
    # Read the data from user_data.csv and extract unique manager names
    with open('user_data.csv', 'r') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            managers.add(row['Manager'])
    
    # Create a directory for the CSV files
    if not os.path.exists('ATSC_Teams'):
        os.makedirs('ATSC_Teams')
    
    # Create CSV files for each manager and populate them with unique NTID and name data
    for manager in managers:
        manager_name = manager.replace(" ", "_")
        filename = f'ATSC_Teams/{manager_name}.csv'
        
        with open(filename, 'w', newline='') as csvfile:
            writer = csv.writer(csvfile)
            writer.writerow(['NTID', 'Name'])
            
            # Filter the data from user_data.csv based on manager name
            with open('user_data.csv', 'r') as datafile:
                reader = csv.DictReader(datafile)
                for row in reader:
                    if row['Manager'] == manager:
                        writer.writerow([row['NTID'], row['Name']])
    
    print("Manager tables created successfully")


# Call the function to create manager tables
create_manager_tables()


