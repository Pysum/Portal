from flask import request
from resources.update_password import update_password

def change_password():
    ntid = request.form['NTID']
    new_password = request.form['new-password']
    confirm_password = request.form['reenter-password']

    if new_password != confirm_password:
        return 'Passwords do not match. Please try again.'

    result = update_password(ntid, new_password)

    return result
