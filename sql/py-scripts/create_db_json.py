import requests
import json
import pandas as pd
from pathlib import Path
from datetime import datetime

# Define the base URL and initial parameters
base_url = "https://data.lacity.org/resource/2nrs-mtv8.json"
params = {
    "$limit": 50000,  # Number of records per request
    "$offset": 0     # Initial offset
}

#print url
print(base_url, params["$limit"])

#create empty list
all_records = []

while True:
    response = requests.get(base_url, params=params)

    # Check if the response is successful
    if response.status_code == 200:
        data = response.json()
        
        # If data is returned, append it to the list
        if data:
            all_records.extend(data)
            
            #print rowcount
            print(params)

            # Increment the offset for the next page
            params["$offset"] += params["$limit"]

            # today's datetime
            now = datetime.now()

            #print round
            print(now)
        else:
            #print finish
            print("finish loop")

            # No more data, break the loop
            break
    else:
        # Handle errors or break if unsuccessful
        print("Error:", response.status_code)
        break

# Save all the records to a JSON file
with open('jsondata_from_api.json', 'w') as json_file:
    json.dump(all_records, json_file)