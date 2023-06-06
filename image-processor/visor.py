import cv2
import pickle
import numpy as np
import cvzone

font = cv2.FONT_HERSHEY_DUPLEX
font_color = (9, 255, 25)
font_scale = 1
font_org = (20, 50)
VIDEOPATH = "./assets/train-data/trainer.mp4"
IMGPATH = "./assets/train-data/trainer-low.jpg"
top = bottom = left = right = 150
border_color = (255, 255, 255)
# Video feed
# cap = cv2.VideoCapture(IMAGEPATH)

x_offset = left
y_offset = top

# Розпакування позицій
with open('coords', 'rb') as image:
    posList = pickle.load(image)

# Отримання значень ширини і висоти
width = posList[0][2] - posList[0][0]
height = posList[0][3] - posList[0][1]

shifted_posList = [(x + x_offset, y + y_offset, x + width + x_offset, y + height + y_offset) for x, y, width, height in posList]



def checkParkingSpace(img, imgPro):
    spaceCounter = 0
    image_with_border = cv2.copyMakeBorder(img, top, bottom, left, right, cv2.BORDER_CONSTANT, value=border_color)

    for pos in shifted_posList:
        x, y, w, h = pos
        box_color = None
        box_thickness = None
        count = 0
        if x >= 0 and y >= 0 and x + w <= img.shape[1] and y + h <= img.shape[0]:
            imgCrop = imgPro[y:y + h, x:x + w]
            cv2.imshow(str(x * y), imgCrop)
            count = cv2.countNonZero(imgCrop)


            if count < 900:
                box_color = (0, 255, 0)
                box_thickness = 5
                spaceCounter += 1
            else:
                box_color = (0, 0, 255)
                box_thickness = 2
        else:
            print("Помилка: Некоректні координати для обрізки зображення")


        # load status calculation
        if spaceCounter < len(posList) / 3:
            loadstatus = 'heavy'
        elif spaceCounter < len(posList) / 1.4 and len(posList) > len(posList) / 3:
            loadstatus = 'medium'
        elif spaceCounter > len(posList) / 1.4:
            loadstatus = 'light'
        font_box_org = (x, y + height - 5)
        x, y, x2, y2 = pos
        cv2.rectangle(image_with_border, (x, y), (x2, y2), box_color, box_thickness)
        cv2.putText(image_with_border, str(count), font_box_org , fontFace=font, fontScale=0.5, color=(255, 255, 255), thickness=1)
    cv2.rectangle(image_with_border, (10, 70), (1080, 10), (0, 0, 0), -1)
    cv2.putText(image_with_border, f'Camera #00 / Free spaces: [{spaceCounter}] of [{len(posList)}] / Load: {loadstatus} load',
                font_org, font, fontScale=font_scale, color = font_color, thickness=1)
    print(f"Camera #00: \nSpaces: \nAll:[{len(posList)}] \nFree:[{spaceCounter}] \nUsed: [{len(posList) - spaceCounter}] \n"
          f"Load status: {loadstatus}")

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
