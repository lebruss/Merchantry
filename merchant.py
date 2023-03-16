#merchant game
#caleb james russell
#march 11 2023

import time
import random
import os

#starting variables
currentDay = 1
name = "Leb"
Money = random.randrange(2,10)
months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
userInventory = []
shelter = ''#this is where the player sleeps
maxHealth = random.randrange(2,10)
currentHealth = maxHealth#Player begins with maximum health

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

#intro
print("Welcome to Merchantry.")
time.sleep(1)
print("You must use your social acumen to support yourself via trade.")
time.sleep(2)
blankScreen()

#main menu
while True:
    blankScreen()
    print(f"{name}", end = ' '
          f'\t\tHealth: {currentHealth} / {maxHealth} \n'
          f"Current city:\t{currentCity.name}\n"
          f"Day: {currentDay}"
          f"\t\tMoney: {Money}ლ\n"
          "------------------------\n"
          "1. Visit market\n"
          "2. Travel\n"
          "3. Rest\n"
          "4. Inventory\n"
    )
    menuChoice = str(input())

    #menuChoices
    if menuChoice == "1":#market
       market(currentCity)
    if menuChoice == "2":#travel
       travel(currentCity)
    if menuChoice == "3":#rest
       currentDay = currentDay + 1#"sleep" and increase the Day by 1
       #goods in city will change price and quantity
       blankScreen()
       print("You rest outside.")#default until more shelter types added
       time.sleep(1)
       continue
    elif menuChoice == "4":#inventory
        inventory()
    else:
       continue