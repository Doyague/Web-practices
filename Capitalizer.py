#App para poner la primera letra del nombre de archivo en mayúscula

import os

raiz = "C:/Users/Jony/Desktop/Web-practices/rsc/pictures/supermarket/itemCat"

contenidoFolderCats = os.listdir(raiz)
for cat in contenidoFolderCats:
    contenidoSingleCat = os.listdir(raiz + "/" + cat)
    for itemFold in contenidoSingleCat:
        contenidoItemPic = os.listdir(raiz + "/" + cat + "/" + itemFold)
        for item in contenidoItemPic:
            oldNamePath = raiz + "/" + cat + "/" + itemFold + "/" + item
            item = item.replace("_", " ")
            item = item.capitalize()
            newNamePath = raiz + "/" + cat + "/" + itemFold + "/" + item
            os.rename(oldNamePath, newNamePath)
