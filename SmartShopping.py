#!/usr/bin/env python

import csv
import json
import pymongo
import copy
import os.path
import sys
import datetime as dt
import sys
import pandas as pd
import io



def Insert ():

    Markets = []
    Products = []

    myclient = pymongo.MongoClient("mongodb://localhost:27017/")
    mydb = myclient["SuperMarkets"]

    ShopsDB = mydb["shops"]
    ProductsDB = mydb["products"]

    ShopsDB.delete_many({})
    ProductsDB.delete_many({})

    # TODO Lat Lng
    # loc: { "lng": -73.974, "lat": 40.764 }

    with open('SuperMarkets.csv', encoding="utf8") as csv_file:

        print ("Opened Markets !")

        csv_reader = csv.reader(csv_file, delimiter=';')
        line_count = 0

        for row in csv_reader:

            print(row)

            if line_count > 0:
                temp_market = {"id": row[0], "name": row[1]}
                temp_market["_id"] = ShopsDB.insert_one(temp_market).inserted_id
                Markets.append(temp_market)

            line_count += 1

    with open('SuperMarketDB.csv', encoding="utf8") as csv_file:

        print ("Opened Markets DB !")

        csv_reader = csv.reader(csv_file, delimiter=';')
        line_count = 0

        for row in csv_reader:

            print(row)

            if line_count > 0:

                temp_price = (float(row[2]))
                temp_id = list(filter(lambda item: item['id'] == row[0], Markets))[0]['_id']

                temp_product = { "market_id": temp_id, "id": row[0], "name": row[1], "price": temp_price, "category": row[3]}
                temp_product["_id"] = ProductsDB.insert_one(temp_product).inserted_id
                Products.append(temp_product)

            line_count += 1     
    
if __name__ == "__main__":
    Insert()