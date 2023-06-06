import cv2 as cv
import pickle

image = "./assets/train-data/trainer-low.jpg"
fimg = cv.imread(image)

top = bottom = left = right = 150
border_color = (255, 255, 255)


try:
    with open('park-positions', 'rb') as f:
        posList = pickle.load(f)
except:
    posList = []

drawing = False
start_point = (-1, -1)

def mouseCallback(event, x, y, flags, param):
    global start_point, drawing

    if event == cv.EVENT_LBUTTONDOWN:
        drawing = True
        start_point = (x, y)
    elif event == cv.EVENT_LBUTTONUP:
        drawing = False
        width = x - start_point[0]
        height = y - start_point[1]
        posList.append((start_point[0], start_point[1], width, height))
        print(f"{posList}")

    elif event == cv.EVENT_RBUTTONDOWN:
        for i, pos in enumerate(posList):
            x1, y1, w, h = pos
            if x1 <= x <= x1 + w and y1 <= y <= y1 + h:
                posList.pop(i)
                print(f"{i} + + + {posList}")

cv.namedWindow("Trainer")
cv.setMouseCallback("Trainer", mouseCallback)

while True:
    img = fimg.copy()

    for position in posList:
        x, y, w, h = position
        cv.rectangle(img, (x, y), (x + w, y + h), (219, 12, 21), 3)

    cv.imshow("Trainer", img)

    top = bottom = left = right = 150
    border_color = (255, 255, 255)

    try:
        with open('coords', 'rb') as f:
            posList = pickle.load(f)
    except:
        posList = []

    drawing = False
    start_point = (-1, -1)


    def mouseCallback(event, x, y, flags, param):
        global start_point, drawing

        if event == cv.EVENT_LBUTTONDOWN:
            drawing = True
            start_point = (x, y)
        elif event == cv.EVENT_LBUTTONUP:
            drawing = False
            width = x - start_point[0]
            height = y - start_point[1]
            posList.append((start_point[0], start_point[1], width, height))
            print(f"{posList}")

        elif event == cv.EVENT_RBUTTONDOWN:
            for i, pos in enumerate(posList):
                x1, y1, w, h = pos
                if x1 <= x <= x1 + w and y1 <= y <= y1 + h:
                    posList.pop(i)
                    print(f"{i} + + + {posList}")


    cv.namedWindow("Trainer")
    cv.setMouseCallback("Trainer", mouseCallback)

    while True:
        img = fimg.copy()

        for position in posList:
            x, y, w, h = position
            cv.rectangle(img, (x, y), (x + w, y + h), (219, 12, 21), 3)

        cv.imshow("Trainer", img)

        # LANG ! Eng
        key = cv.waitKey(1)
        if key == ord('q'):
            with open('coords', 'wb') as f:
                pickle.dump(posList, f)
            break

    cv.destroyAllWindows()