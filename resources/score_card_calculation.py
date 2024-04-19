
from datetime import datetime


def time_to_seconds(t):
    return t.hour * 3600 + t.minute * 60 + t.second
def row1_and_row2(row):

        value_string = row['value']
        off_track_string = row['off_track']
        meet_some_expectations_string = row['meet_some_expectations']
        on_track_string = row['on_track']
        raise_the_bar_string = row['raise_the_bar']
        lead_the_way_string = row['lead_the_way']   


        if not value_string :
            return 3  # Or handle the empty strings as needed in your application

        value = datetime.strptime(value_string, '%H:%M:%S').time()
        off_track = datetime.strptime(off_track_string, '%H:%M:%S').time()
        meet_some_expectations = datetime.strptime(meet_some_expectations_string, '%H:%M:%S').time()
        on_track = datetime.strptime(on_track_string, '%H:%M:%S').time()
        raise_the_bar = datetime.strptime(raise_the_bar_string, '%H:%M:%S').time()
        lead_the_way = datetime.strptime(lead_the_way_string, '%H:%M:%S').time()

        value_seconds = time_to_seconds(value)
        off_track_seconds = time_to_seconds(off_track)
        meet_some_expectations_seconds = time_to_seconds(meet_some_expectations)
        on_track_seconds = time_to_seconds(on_track)
        raise_the_bar_seconds = time_to_seconds(raise_the_bar)
        lead_the_way_seconds = time_to_seconds(lead_the_way)
        if value_seconds == 0 or value_seconds == "":
            return 3
        
        elif value_seconds > 0 and value_seconds <= lead_the_way_seconds:
            return 5
        elif value_seconds <= raise_the_bar_seconds:
            return 5 - (on_track_seconds - value_seconds) / (meet_some_expectations_seconds - raise_the_bar_seconds)
        elif value_seconds <= on_track_seconds:
            return 4 - (raise_the_bar_seconds - value_seconds) / (raise_the_bar_seconds - on_track_seconds)
        elif value_seconds <= meet_some_expectations_seconds:
            return 3 - (on_track_seconds - value_seconds) / (on_track_seconds - meet_some_expectations_seconds)
        elif value_seconds <= off_track_seconds:
            return 2 - (meet_some_expectations_seconds - value_seconds) / (meet_some_expectations_seconds - off_track_seconds)
        else:
            return 1
        
def row3_to_row7(row):
    value_string = row['value']
    off_track_string = row['off_track']
    meet_some_expectations_string = row['meet_some_expectations']
    on_track_string = row['on_track']
    raise_the_bar_string = row['raise_the_bar']
    lead_the_way_string = row['lead_the_way']

    if value_string == "0.00%" or value_string == "0%":
        return 3  

    # Convert percentage strings to integers
    value = int(float(value_string.replace('%', '')))
    off_track = int(float(off_track_string.replace('%', '')))
    meet_some_expectations = int(float(meet_some_expectations_string.replace('%', '')))
    on_track = int(float(on_track_string.replace('%', '')))
    raise_the_bar = int(float(raise_the_bar_string.replace('%', '')))
    lead_the_way = int(float(lead_the_way_string.replace('%', '')))

    if value >= lead_the_way:
        return 5
    elif value >= raise_the_bar:
        return 5 - (on_track - value) / (meet_some_expectations - raise_the_bar)
    elif value >= on_track:
        return 4 - (raise_the_bar - value) / (raise_the_bar - on_track)
    elif value >= meet_some_expectations:
        return 3 - (on_track - value) / (on_track - meet_some_expectations)
    elif value >= off_track:
        return 2 - (meet_some_expectations - value) / (meet_some_expectations - off_track)
    else:
        return 1
    

def row2 (row):
    value_string = row['value']
    off_track_string = row['off_track']
    meet_some_expectations_string = row['meet_some_expectations']
    on_track_string = row['on_track']
    raise_the_bar_string = row['raise_the_bar']
    lead_the_way_string = row['lead_the_way']

    if value_string == "0.00%" or value_string == "0%":
        return 3  

    # Convert percentage strings to integers
    value = int(float(value_string.replace('%', '')))
    off_track = int(float(off_track_string.replace('%', '')))
    meet_some_expectations = int(float(meet_some_expectations_string.replace('%', '')))
    on_track = int(float(on_track_string.replace('%', '')))
    raise_the_bar = int(float(raise_the_bar_string.replace('%', '')))
    lead_the_way = int(float(lead_the_way_string.replace('%', '')))

    if value <= lead_the_way:
        return 5
    elif value <= raise_the_bar:
        return 5 - (on_track - value) / (meet_some_expectations - raise_the_bar)
    elif value <= on_track:
        return 4 - (raise_the_bar - value) / (raise_the_bar - on_track)
    elif value <= meet_some_expectations:
        return 3 - (on_track - value) / (on_track - meet_some_expectations)
    elif value <= off_track:
        return 2 - (meet_some_expectations - value) / (meet_some_expectations - off_track)
    else:
        return 1


def row9_to_row12 (row):
    value_string = row['value']
    # off_track_string = row['off_track']
    # meet_some_expectations_string = row['meet_some_expectations']
    # on_track_string = row['on_track']
    # raise_the_bar_string = row['raise_the_bar']
    # lead_the_way_string = row['lead_the_way']

    if value_string == "0" or value_string == "0.00":
        return 3  

    # Convert percentage strings to integers
    value = int(float(value_string))

    # off_track = int(float(off_track_string.replace('%', '')))
    # meet_some_expectations = int(float(meet_some_expectations_string.replace('%', '')))
    # on_track = int(float(on_track_string.replace('%', '')))
    # raise_the_bar = int(float(raise_the_bar_string.replace('%', '')))
    # lead_the_way = int(float(lead_the_way_string.replace('%', '')))
    if value >= 5:
        return 5
    elif value >= 4:
        return 5 - (3 - value) / (2 - 4)
    elif value >= 3:
        return 4 - (4 - value) / (4 - 3)
    elif value >= 2:
        return 3 - (3 - value) / (3 - 2)
    elif value >= 1:
        return 2 - (2 - value) / (2 - 1)
    else:
        return 1
