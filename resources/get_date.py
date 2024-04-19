import datetime

def get_formatted_date():
    current_date = datetime.datetime.now()
    formatted_date = current_date.strftime("%m/%d/%Y")
    return formatted_date

# Example usage:
curent_date = get_formatted_date()


