#App para crear carpetas individuales para un grupo de png's qu están dentro de una misma carpeta
import os
import errno
import shutil

contenidoUpper = os.listdir("C:/Users/Jony/Desktop/Web-practices/rsc/pictures/supermarket/itemCat") #carpeta con las categorías
for upperFolder in contenidoUpper:
    contenido = os.listdir("C:/Users/Jony/Desktop/Web-practices/rsc/pictures/supermarket/itemCat/" + upperFolder) #carpeta de cada categoría
    y = 0
    for folderFile in contenido:
        if folderFile[-4:] == ".png":
            newFolderName = upperFolder[0:1] + str(y) #creamos nombres para la carpeta de cada archivo

            try:
                os.mkdir("C:/Users/Jony/Desktop/Web-practices/rsc/pictures/supermarket/itemCat/" + upperFolder + "/" + newFolderName)       #maneja el error si ya existe el directorio

            except OSError as e:
                if e.errno != errno.EEXIST:
                    raise

            source = r"C:/Users/Jony/Desktop/Web-practices/rsc/pictures/supermarket/itemCat/" + upperFolder + "/" + folderFile
            destination = r"C:/Users/Jony/Desktop/Web-practices/rsc/pictures/supermarket/itemCat/" + upperFolder + "/" + newFolderName + "/" + folderFile
                            #movemos a la carpeta individual de cada uno
            try:
                shutil.move(source,destination)
            except:
                continue

            y = y + 1
