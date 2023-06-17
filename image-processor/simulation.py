import json
import requests
import random
import time
from datetime import datetime

def calculate_status(all, free):
    status = 0
    if free < all / 3:
        status = 2
    elif free > (all / 3) and free < (all / 1.4):
        status = 1
    elif free > (all / 1.4) and free <= all:
        status = 0
    else:
        status = 2
    return status

def simulate_device():
    while True:
        # Data Generator
        camera = random.randint(1, 15)
        all_spaces = random.randint(5, 20)
        free_spaces = random.randint(0, all_spaces)
        status = calculate_status(all_spaces, free_spaces)
        updated_at = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        # port specificator
        PORT = '192.168.0.110'
        PORT2 = '127.0.0.1'
        # Data structure
        data = {
            "camera": f"Камера №{str(camera)}",
            "parking": camera,
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
        with open('datas.json', 'w') as file:
            json.dump(data, file)
        # Calling server
        url = f"http://{PORT}:8000/save-data/"
        headers = {"Content-Type": "application/json"}
        response = requests.post(url, data=json_data, headers=headers)

        # checking status
        if response.status_code == 200:
            print("Дані відправлено успішно!")
        else:
            print(f"Помилка під час відправки даних.\n"
                  f"CODE: {response.status_code} / {response.reason}")

        # Iteration freeze
        time.sleep(60)  # seconds


# Call main func
simulate_device()
