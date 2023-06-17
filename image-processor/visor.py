import cv2
import json
import numpy as np

IMGPATH = "./assets/train-data/train_1_2.png"
font = cv2.FONT_HERSHEY_DUPLEX
font_color = (9, 255, 25)
font_scale = 1
font_org = (20, 50)
top = bottom = left = right = 150
border_color = (255, 255, 255)
box_color = (255, 255, 255)
box_thickness = 1

x_offset = left
y_offset = top

# Зчитування позицій з JSON файлу
try:
    with open('coords.json', 'r') as f:
        posList = json.load(f)
except FileNotFoundError:
    posList = []

# Отримання значень ширини і висоти
width = posList[0][2] - posList[0][0]
height = posList[0][3] - posList[0][1]

shifted_posList = [(x + x_offset, y + y_offset, x + width + x_offset, y + height + y_offset) for x, y, width, height in posList]

def save_data(spaceCounter, loadstatus):
    data = {
        "camera": "01",
        "spaces": {
            "all": len(posList),
            "free": len(posList) - spaceCounter,
            "status": loadstatus
        }
    }
    with open("data-transfer.json", "w") as f:
        json.dump(data, f)

def checkParkingSpace(img, imgPro):
    spaceCounter = 0
    count = 0
    for pos in shifted_posList:
        x, y, w, h = pos
        if x >= 0 and y >= 0 and x + w <= img.shape[1] and y + h <= img.shape[0]:
            imgCrop = imgPro[y:y + h, x:x + w]
            cv2.imshow(str(x * y), imgCrop)
            count = cv2.countNonZero(imgCrop)
        else:
            if spaceCounter < len(posList) / 3:
                loadstatus = 'light'
            elif spaceCounter < len(posList) / 1.4 and len(posList) > len(posList) / 3:
                loadstatus = 'medium'
            elif spaceCounter > len(posList) / 1.4:
                loadstatus = 'heavy'

            if count < 1000:
                box_color = (0, 255, 0)
                box_thickness = 5
                spaceCounter += 1
            else:
                box_color = (0, 0, 255)
                box_thickness = 2

            font_box_org = (x, y + height - 5)
            x, y, x2, y2 = pos
            cv2.rectangle(image_with_border, (x, y), (x2, y2), box_color, box_thickness)

    cv2.rectangle(image_with_border, (10, 70), (1080, 10), (0, 0, 0), -1)
    cv2.putText(image_with_border, f'Camera #00 / Free spaces: [{spaceCounter}] of [{len(posList)}] / Load: {loadstatus} load',
                font_org, font, fontScale=font_scale, color=font_color, thickness=1)
    print(f"Camera #00: \nSpaces: \nAll:[{len(posList)}] \nFree:[{spaceCounter}] \nUsed: [{len(posList) - spaceCounter}] \n"
          f"Load status: {loadstatus}")

    # save data
    save_data(spaceCounter=spaceCounter, loadstatus=loadstatus)

# read imagw
img = cv2.imread(IMGPATH)
image_with_border = cv2.copyMakeBorder(img, top, bottom, left, right, cv2.BORDER_CONSTANT, value=border_color)
imgGray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
imgBlur = cv2.GaussianBlur(imgGray, (3, 3), 1)
imgThreshold = cv2.adaptiveThreshold(imgBlur, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY_INV, 25, 16)
imgMedian = cv2.medianBlur(imgThreshold, 5)
kernel = np.ones((3, 3), np.uint8)
imgDilate = cv2.dilate(imgMedian, kernel, iterations=1)

checkParkingSpace(img, imgDilate)
cv2.imshow("Image with Borders", image_with_border)
key = cv2.waitKey(0)
cv2.destroyAllWindows()




