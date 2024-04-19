import requests
from bs4 import BeautifulSoup

# Replace this with the actual URL from your <iframe>
iframe_url = "https://docs.google.com/spreadsheets/d/1olkhJiN23CtXiqtXbelxvo6EiwEsywtg/edit?usp=sharing&ouid=113601818427212407869&rtpof=true&sd=true"

# Step 1: Fetch the content from the external URL inside the <iframe>
response = requests.get(iframe_url)
if response.status_code == 200:
    iframe_content = response.text

    # Step 2: Create a new HTML file
    with open("copied.html", "w") as copied_file:
        # Step 3: Write the fetched content to the new HTML file
        copied_file.write(iframe_content)

    # Step 4: Open the new HTML file in a web browser
    import webbrowser

    webbrowser.open("copied.html")
else:
    print("Failed to fetch the content from the URL.")
