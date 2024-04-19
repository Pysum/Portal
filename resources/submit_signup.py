from flask import request, render_template
from storedata import check_existing_user, store_user_data
from organization import create_manager_tables

def create_account():
    Role = request.form['Role']
    NTID = request.form['NTID']
    Name = request.form['First and last name']
    Manager = request.form['Manager']
    Password = request.form['password']
    Email = request.form['Email']

    if check_existing_user(NTID):
        return render_template('existing_user.html')

    store_user_data(Role, NTID, Name, Manager, Password, Email)
    create_manager_tables()
    
    return render_template('signup_success.html')
