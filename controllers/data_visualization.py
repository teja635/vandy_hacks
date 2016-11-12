%matplotlib inline
import matplotlib.pyplot as plt
import matplotlib.image as mpimg
import json
import sys
import urllib2
import numpy as np
from PIL import Image

class DiseaseData(object):
    def __init__(self, jsonStr):
        self.__dict__ = json.loads(jsonStr)

def get_weight_arr(json):
    diseaseData = DiseaseData(json)
    
    # Generates 2D Array of 0's
    maxRow = 0
    maxCol = 0
    for dataIndex in xrange(len(diseaseData.data)):
        if diseaseData.data[dataIndex]["x"] > maxRow:
            maxRow = diseaseData.data[dataIndex]["x"]
        if diseaseData.data[dataIndex]["y"] > maxCol:
            maxCol = diseaseData.data[dataIndex]["y"]
    weightArr = []
    for x in xrange(0, maxRow + 1):
        tempArr = []
        for y in xrange(0, maxCol + 1):
            tempArr.append({"one":0,"two":0,"three":0,"week":0,"month":0})
        weightArr.append(tempArr)
    
    # Assignes each index in weightArr to the weight in each index.
    for dataIndex in xrange(len(diseaseData.data)):
        weightArr[diseaseData.data[dataIndex]['x']][diseaseData.data[dataIndex]['y']] = diseaseData.data[dataIndex]['time']
    
    return weightArr

def get_overlay_image(weightArr, timeCode):
    img = Image.new("RGB", (len(weightArr), len(weightArr[0])), (255, 255, 255))
    for x in xrange(len(weightArr)):
        for y in xrange(len(weightArr[0])):
            img.putpixel((x, y), (weightArr[x][y][timeCode], 0, 255 - weightArr[x][y][timeCode]))
    
    rowBlock = 1000/len(weightArr)
    colBlock = 1000/len(weightArr[0])
    scaledImg = Image.new("RGB", (1000, 1000), (255, 255, 255))
    startRow = 0
    startCol = 0
    
    for x in xrange(len(weightArr)):
        for y in xrange(len(weightArr)):
            for scaledX in xrange(startRow, rowBlock + startRow):
                for scaledY in xrange(startCol, colBlock + startCol):
                    scaledImg.putpixel((scaledX, scaledY), 
                                       (weightArr[x][y][timeCode] * 255/100, 0, 255 - weightArr[x][y][timeCode] * 255/100))
            startCol += colBlock
        startRow += rowBlock
        startCol = 0
    scaledImg.save(timeCode + ".png")

req = urllib2.Request('http://10.67.229.19:3000/data')
data = urllib2.urlopen(req)
jsonStr = data.read()

weightArr = get_weight_arr(jsonStr)

get_overlay_image(weightArr, "one")
get_overlay_image(weightArr, "two")
get_overlay_image(weightArr, "three")
get_overlay_image(weightArr, "week")
get_overlay_image(weightArr, "month")
