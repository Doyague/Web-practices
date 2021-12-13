
linkList = list()

linkHand = open("links.txt", "r", encoding='utf-8')
pseudoHand = open("practices.json","w",encoding='utf-8')
for line in linkHand:
    line = line.rstrip()
    line = line.replace('\n',"")
    linkList.append(line)
    pseudoHand.write("name: "+line+", https://doyague.github.io/Web-practices/"+line+"/index.html; ")
