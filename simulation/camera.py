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
    max_failures = 50
    failure_count = 0

    while True:
        # Data Generator
        camera = random.randint(1, 15)
        all_spaces = random.randint(5, 20)
        free_spaces = random.randint(0, all_spaces)
        status = calculate_status(all_spaces, free_spaces)
        updated_at = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        # port specificator
        PORT = '192.168.0.110'

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

        # Calling server
        try:
            url = f"http://{PORT}:8000/save-data/"
            headers = {"Content-Type": "application/json"}
            response = requests.post(url, data=json_data, headers=headers)

            # checking status
            if response.status_code == 200:
                print("Дані відправлено успішно!")
                failure_count = 0
            else:
                print(f"Помилка під час відправки даних.\n"
                      f"CODE: {response.status_code} / {response.reason}")
                failure_count += 1  # збільшуємо лічильник невдалих запитів
        except requests.exceptions.RequestException as e:
            print(f"Request Error: {e}")
            failure_count += 1

        if failure_count >= max_failures:
            print(f"Досягнуто максимальну кількість невдалих запитів ({max_failures}). Зупинка системи.")
            break

        # Iteration freeze
        time.sleep(360)  # seconds


# Call main func
simulate_device()
