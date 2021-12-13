import os

x = 1
y = 1
contenidoCat = os.listdir("C:/Users/Jony/Desktop/Web-practices/rsc/pictures/supermarket/productCat")
categoryList = []
productList = []
singleCategory = {"id": "", "short_name": "", "name": "", "url": ""}
catProducts = {"category": {"short_name": "", "name": "", }, "cat_items": "[]" }
singleItem ={"id": "", "short_name": "", "name": "", "price": ""}

jsonCatHand = open("C:/Users/Jony/Desktop/Web-practices/rsc/jsonFiles/categories.json","w",encoding='utf-8')

for cat in contenidoCat:
    singleCategory["id"] = x
    singleCategory["short_name"] = cat[0:2] + "_" + str(x)
    singleCategory["name"] = cat
    singleCategory["url"] = "C:/Users/Jony/Desktop/Web-practices/rsc/jsonFiles/" + str(x) + ".json"

    categoryList.append(singleCategory.copy())
    contenidoProd = os.listdir("C:/Users/Jony/Desktop/Web-practices/rsc/pictures/supermarket/productCat" + cat)
    for product in contenidoProd:
        singleItem["id"] = str(x) + "_" + str(y) # continuar aqui

    x = x + 1


categoryList = str(categoryList)
categoryList = categoryList.replace(' ', '')
categoryList = categoryList.replace("'", '"')
jsonCatHand.write(categoryList)
