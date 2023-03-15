#merchant game
#caleb james russell
#march 11 2023

'''
player has money
player has a mode of transportation, which can be upgraded
there are different cities
each city has a market where you buy and sell things
different cities will have different prices for each item
Maybe sometimes, an item will not be available in a city. It will then be valuable
Maybe there will be pirates who attack you while traveling
Don't worry about learning to code, but just learn how to do each thing you want to do
'''

import time
import random
import os

'''
if save data exists in current directory: load the variables
else: give intro with asking name etc.
'''

#starting variables
currentDay = 1
name = "Leb"
Money = 10
months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
userInventory = []


#Functions------------------------------
#blankScreen(): clear the terminal screen between menu decisions
def market(currentCity):
   blankScreen()
   print("*Add buy and sell functionality*")
   for good in currentCity.goods:
      print(good.name, end = ' ')
      print(good.quantity)
   input("Press any key to continue")

def travel(currentCity):
   blankScreen()
   print("*Add travel functionality*")
   for city in currentCity.nodes:
      print(city.name)
   input()

def blankScreen():
    os.system('cls||clear')

def inventory():
    blankScreen()
    for good in userInventory:
       print(good.name, end = ' ')
       print(good.quantity)
    input()

'''
This block of code is the introduction. It will execute when there is no save file already
#player name
name = input('What is your name?')

#literal string interpolation
print(f"Hello, {name}. Welcome to being a merchant")
time.sleep(2)
blankScreen()
'''

#"City" class
class City:
   def __init__(self, name):
      self.name = name
      self.nodes = []
      self.goods = []

#list of Cities-------------------------
Kutaisi = City("Kutaisi ქუთაისი")
Zestafoni = City("Zestafoni ზესტაფონი")
Baghdati = City("Baghdati ბაღდათი")
currentCity = Kutaisi#starting city is Kutaisi
#City nodes / connections---------------
Kutaisi.nodes.append(Zestafoni)
Kutaisi.nodes.append(Baghdati)
#City starting goods

#"Goods" class and inventory
class Good:
  def __init__(self, name):
    self.name = name
    self.quantity = 1
#list of Goods--------------------------
#goods: tyemali, sugar, shotaspuri, beans, potatoes, gold, paper
tyemali = Good("Tyemali ტყემალი")
tyemali.quantity = 1
userInventory.append(tyemali)
sugar = Good("Sugar")
sugar.quantity = 5
userInventory.append(sugar)
Kutaisi.goods.append(tyemali)
Baghdati.goods.append(tyemali)
Baghdati.goods.append(tyemali)


#main menu
while True:
    blankScreen()
    print(f"Current city:\t{currentCity.name}")#Print the name of your current city
    print(f"Day: {currentDay}", end = ' ')#end = ' ' is for printing the following line on this line 
    print(f"\t\tMoney: {Money}ლ")
    print("-----------")#barrier newline between user's stats, and the list of menu options
    print(f"1. Visit market")
    print(f"2. Travel")
    print(f"3. Rest")
    print(f"4. Inventory")
    menuChoice = str(input())

    #menuChoices
    if menuChoice == "1":#market
       market(currentCity)
    if menuChoice == "2":#travel
       travel(currentCity)
    if menuChoice == "3":#rest
       currentDay = currentDay + 1#"sleep" and increase the Day by 1
       #goods in city will change price and quantity
       continue
    elif menuChoice == "4":#inventory
        inventory()
    else:
       continue