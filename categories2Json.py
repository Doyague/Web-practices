import os

x = 0
contenido = os.listdir("C:/Users/Jony/Desktop/Web-practices/rsc/pictures/supermarket/itemCat")
categoryList = []
singleCategory = {"id": "", "short_name": "", "name": "", "url": ""}

jsonHand = open("C:/Users/Jony/Desktop/Web-practices/rsc/jsonFiles/categories.json","w",encoding='utf-8')

for cat in contenido:
    singleCategory["id"] = x
    singleCategory["short_name"] = cat[0:2] + "_" + str(x)
    singleCategory["name"] = cat
    singleCategory["url"] = "C:/Users/Jony/Desktop/Web-practices/rsc/jsonFiles/" + str(x) + ".json"
    x = x + 1
    categoryList.append(singleCategory.copy())

categoryList = str(categoryList)
categoryList = categoryList.replace(' ', '')
categoryList = categoryList.replace("'", '"')
jsonHand.write(categoryList)
