# create sqllite3 connection
import sqlite3
con = sqlite3.connect("la_areas.sqlite")

# create cursor
cur = con.cursor()

# create table
cur.execute("CREATE TABLE Crime_Data_LA_AreaCode(AreaCode, AreaName)")

# list of data
data = [
    (1, "Central"),
    (2, "Rampart"),
    (3, "Southwest"),
    (4, "Hollenbeck"),
    (5, "Harbor"),
    (6, "Hollywood"),
    (7, "Wilshire"),
    (8, "West LA"),
    (9, "Van Nuys"),
    (10, "West Valley"),
    (11, "Northeast"),
    (12, "77th Street"),
    (13, "Newton"),
    (14, "Pacific"),
    (15, "N Hollywood"),
    (16, "Foothill"),
    (17, "Devonshire"),
    (18, "Southeast"),
    (19, "Mission"),
    (20, "Olympic"),
    (21, "Topanga")
    ]
# insert into table
cur.executemany("INSERT INTO Crime_Data_LA_AreaCode VALUES(?, ?, ?)", data)
con.commit() 