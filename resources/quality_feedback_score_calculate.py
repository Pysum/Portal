def calculate_total_score(counts):
    total_score = 0
    max_score = 100

    for parameter in counts:
        yes_count = counts[parameter]["yesCount"]
        no_count = counts[parameter]["noCount"]
        na_count = counts[parameter]["naCount"]

        # Calculate the percentage contribution of each answer option
        yes_contribution = (yes_count * 5) / max_score
        no_contribution = (no_count * 0) / max_score
        na_contribution = (na_count * 5) / max_score

        # Calculate the total score for this parameter
        parameter_score = yes_contribution + no_contribution + na_contribution

        # Add the parameter score to the total score
        total_score += parameter_score

    # Scale the total score back to 100
    total_score *= max_score

    return total_score