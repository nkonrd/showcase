import os
import sqlite3

folder = r"D:\Archive\Movies"
movies = [movie for movie in os.listdir(folder) if "(" in movie]

fields = []
for movie in movies:
    fields.append((str(movie[:-7]), int(movie[-5:-1])))

fields.sort(key = lambda t: t[0])

if os.path.isfile('movies.db'):
	os.remove('movies.db')

connection = sqlite3.connect('movies.db')
cursor = connection.cursor()

cursor.execute("CREATE TABLE movies (name text, year int)")

cursor.executemany('INSERT INTO movies VALUES (?,?)', fields)
connection.commit()
connection.close()
