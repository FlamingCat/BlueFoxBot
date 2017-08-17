import urllib.request
from pathlib import Path

print ("Working...")

homePath = str(Path.home())
urllib.request.urlretrieve("https://codeload.github.com/FlamingCat/BlueFoxBot/zip/master", homePath + "/Desktop/Red Fox Bot.zip")

print ("Credits: flamerds, Bencat08")

input ("Success! Look on Desktop for .zip file\nYou may now close this window")

