import json
import requests
import random
import time
from datetime import datetime


def simulate_device():
    while True:
        # Data Generator
        camera = str(random.randint(1, 15)).zfill(2)
        all_spaces = random.randint(5, 20)
        free_spaces = random.randint(0, all_spaces)
        status = random.randint(0, 2)
        updated_at = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        # Data structure
        data = {
            "camera": camera,
            "spaces": {
                "all": all_spaces,
                "free": free_spaces,
                "status": status
            },
            "updated_at": updated_at
        }
        print(data)

        # convert
        json_data = json.dumps(data)
        # Calling server
        url = "http://127.0.0.1:8000/save-data/"
        headers = {"Content-Type": "application/json"}
        response = requests.post(url, data=json_data, headers=headers)

        # checking status
        if response.status_code == 200:
            print("Дані відправлено успішно!")
        else:
            print(f"Помилка під час відправки даних.\n"
                  f"CODE: {response.status_code} / {response.reason}")

        # Iteration freeze
        time.sleep(180)  # seconds


# Call main func
simulate_device()
