import cv2 as cv
import pickle

image = "./assets/train-data/trainer-mid.png"
fimg = cv.imread(image)

width = 107
height = 48

try:
    with open('park-positions', 'rb') as f:
        posList = pickle.load(f)
except:
    posList = []

def mouseClick(events, x,y, flags, params):
    img = cv.imread(image)
    if events == cv.EVENT_LBUTTONDOWN:
        posList.append((x, y))
        print(f"{posList}")
    elif events == cv.EVENT_RBUTTONDOWN:
        for i, pos in enumerate(posList):
            x1, y1 = pos
            if x1 < x < x1 + width and y1 < y < y1 + height:
                posList.pop(i)
                print(f"{i} + + + {posList}")

    with open('park-positions', 'wb') as f:
        pickle.dump(posList, f)



while True:
    for position in posList:
        cv.rectangle(fimg, position, (position[0]+width, position[1]+height), (255, 50, 255), 1)

    cv.imshow("Trainer", fimg)
    cv.setMouseCallback("Trainer", mouseClick)
    cv.waitKey(1)
