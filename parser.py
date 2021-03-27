import os
import sqlite3

folder = r""
dbfile = ""
movies = [movie for movie in os.listdir(folder) if "(" in movie]

fields = []
for movie in movies:
    fields.append((str(movie[:-7]), int(movie[-5:-1])))

fields.sort(key = lambda t: t[0])

if os.path.isfile(dbfile):
	os.remove(dbfile)

connection = sqlite3.connect(dbfile)
cursor = connection.cursor()

cursor.execute("CREATE TABLE movies (name text, year int)")

cursor.executemany('INSERT INTO movies VALUES (?,?)', fields)
connection.commit()
connection.close()
