import random

def generate_ticket():
    try:
        with open("ticket_counter.txt", "r+") as file:
            ticket_counter = int(file.read().strip())
    except (FileNotFoundError, ValueError):
        ticket_counter = 0

    ticket_counter += 1
    ticket_id = "ATSC" + str(ticket_counter).zfill(6)

    with open("ticket_counter.txt", "w") as file:
        file.write(str(ticket_counter))

    return ticket_id

ticket = generate_ticket()

