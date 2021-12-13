import os

x = 1
contenido = os.listdir("C:/Users/Jony/Desktop/Web-practices/pags-individuales")
practiceList = []
singlePractice = {"ident": "", "short_name": "", "name": "", "url": ""}

jsonHand = open("practices.json","w",encoding='utf-8')

for pag in contenido:
    singlePractice["ident"] = x
    singlePractice["short_name"] = pag[0:2] + "_" + str(x)
    singlePractice["name"] = pag
    singlePractice["url"] = "C:/Users/Jony/Desktop/Web-practices/pags-individuales/" + pag + "/index.html"
    x = x + 1
    practiceList.append(singlePractice.copy())

practiceList = str(practiceList)
practiceList = practiceList.replace(' ', '')
practiceList = practiceList.replace("'", '"')
jsonHand.write(practiceList)
