# App para crear los json de categorías y productos individuales
import os
import json

x = 0

categoryList = [] #Lista de categorías
singleCategory = {"id": "", "short_name": "", "name": "", "url": ""} #Atributos de cada categoría


contenidoCat = os.listdir("C:/Users/Jony/Desktop/Web-practices/rsc/pictures/supermarket/itemCat") #dir categorías
jsonCatHand = open("C:/Users/Jony/Desktop/Web-practices/rsc/jsonFiles/categories.json","w",encoding='utf-8') # crea y abre categories.json

allItemsOfCat = ""

for cat in contenidoCat:  #Itera sobre las categorías del directorio y escribe
                            #sobre "categories.json"
                            #para poblar "category-snippet"
    singleCategory["id"] = x
    singleCategory["short_name"] = cat[0:1] + str(x)
    singleCategory["name"] = cat
    singleCategory["url"] = "C:/Users/Jony/Desktop/Web-practices/rsc/jsonFiles/" + singleCategory["short_name"] + ".json"
                    ###########################
    catItems = {"cat_items": "", "category": {"short_name": "", "name": ""}}
    singleItem ={"id": "", "short_name": "", "name": "", "description": "", "price": ""} #crea cada item individual, que irán dentro del "cat_items" de cada categoría

    contenidoCategoryFolder = os.listdir("C:/Users/Jony/Desktop/Web-practices/rsc/pictures/supermarket/itemCat/" + cat) #dir conlas carpetas de cada item de cada categoría
    # print(contenidoCategoryFolder)

    y = 0
    itemList = []       #Añadiremos aquí cada artículo individual
    jsonItemHand = open("C:/Users/Jony/Desktop/Web-practices/rsc/jsonFiles/" + singleCategory["short_name"] + ".json","w",encoding='utf-8') #json de caaa categoría individual con el nombre corto
    for itemFolder in contenidoCategoryFolder: #Itera sobre los items del directorio y crea una lista de
                                            # "singleItems" para el contenido de  cada categoría
                                                #y así luego poblar "single-item-snippet"

        singleItem["id"] = str(x) + str(y)
        singleItem["short_name"] = itemFolder
        contenidoSingleFolder = os.listdir("C:/Users/Jony/Desktop/Web-practices/rsc/pictures/supermarket/itemCat/" + cat + "/" + singleItem["short_name"]) # buscamos los nombres de los artículos en las .png
        for item in contenidoSingleFolder:  #entramos en cada carpeta individual de artículo para coger el nombre sin .png
            singleItem["name"] = item[:-4]
        singleItem["description"] = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        singleItem["price"] = 9.99

        y = y + 1

        itemList.append(singleItem.copy()) #añadimos a la lista de items
    catItems["cat_items"] = itemList
    catItems["category"]["short_name"]= cat[0:1] + str(x)
    catItems["category"]["name"] = cat
    print(catItems)
    # allItemsOfCat.append(catItems.copy())

    # allItemsOfCat = allItemsOfCat + catItems.copy()

    # catItems = str(catItems)  #pasamos lista a string
    # catItems = catItems.replace(' ', '')
    # catItems = catItems.replace("'", '"')
    # wholeJson = wholeJson + catItems
    # print(wholeJson)


    categoryList.append(singleCategory.copy())
    x = x + 1
    allItemsOfCatJson = json.dumps(catItems)
    print(catItems)
    jsonItemHand.write(allItemsOfCatJson)


categoryListJson = json.dumps(categoryList)
jsonCatHand.write(categoryListJson)




# categoryList = str(categoryList) #pasamos lista a string
# categoryList = categoryList.replace(' ', '')
# categoryList = categoryList.replace("'", '"')
