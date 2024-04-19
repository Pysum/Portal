from flask import request, render_template
from resources.authentication import authenticate_user,get_user_name


def sign_in():
    if request.method == 'POST':
        ntid = request.form['ntid']
        password = request.form['password']
        role = authenticate_user(ntid, password)
        if role == 'Agent':
            name = get_user_name(ntid)
            return render_template('agent.html', name=name)
        elif role == 'Team Leader':
            name = get_user_name(ntid)
            return render_template('teamlead.html', name=name)
        elif role == 'Division Leader':
            name = get_user_name(ntid)
            return render_template('div_teamlead.html', name=name)
        elif role == 'Quality':
            name = get_user_name(ntid)
            return render_template('quality.html', name=name)
        else:
            return render_template('error_code.html')
    return render_template('login.html')
