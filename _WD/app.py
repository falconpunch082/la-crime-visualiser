
# Importing related libraries and modules
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, and_, desc

from flask import Flask, jsonify, render_template

# Use Flask CORS Library to allow access to fetch from Python Flask API routes that would have otherwise been blocked by the CORS policy by default
# Reference: https://stackoverflow.com/questions/26980713/solve-cross-origin-resource-sharing-with-flask
from flask_cors import CORS

#################################################
# SQLAlchemy Database Setup
#################################################

username = "postgres"
password = "123456"
host = "localhost"
port = "5432"
db_name = "crime_db"

url = f"postgresql://{username}:{password}@{host}:{port}/{db_name}"

#Create connecton to my local PostgreSQL database
engine = create_engine(url)

# Create a base for automatically mapping database tables to Python classes
Base = automap_base()

# Reflect the tables in database
Base.prepare(autoload_with = engine)

# Access the "crime" table
crime = Base.classes.crime


#################################################
# Flask API App Setup
#################################################
 
# Create a Flask web application instance
app = Flask(__name__)

# [IMPORTANT] Enable CORS for all API routes
CORS(app)


#################################################
# Flask API Routes
#################################################

############# Route #1 (Homepage) ###############
@app.route("/")
def homepage():
    # [For Testing] List of All Flask API Routes
    return (
        f"[Testing Page] List of all Python Flask API Routes (Los Angeles Crime Dataset) <br/>"
        f"Available Routes:<br/>"
        f"/api/v1.0/frontend<br/>"
        f"/api/v1.0/filter_options<br/>"
        f"/api/v1.0/all_data<br/>"
    )


############# Route #2 (Interactive Dashboard) ###############
@app.route("/api/v1.0/frontend")
def frontend():
    return render_template("index.html")


############# Route #3 (Filter Options) ###############
@app.route("/api/v1.0/filter_options")
def filter_options():
    # Establish session (link) from Python to the SQLite DB
    session = Session(engine)

    # Using 'func', query and extract the unique years from the date of crime occurred (date_occ) column
    query_years = session.query(func.extract('year', crime.date_occ).\
                                label('year')).distinct().all()
    
    years = [row.year for row in query_years]


    # Query the unique crime categories from the appropriate column
    query_crime_categories = session.query(crime.crime_category).distinct().all()

    crime_categories = [row.crime_category for row in query_crime_categories]


    # Query the unique area names from the appropriate column
    query_area_names = session.query(crime.area_name).distinct().all()

    area_names = [row.area_name for row in query_area_names]


    # Stores the information in a dictionary (years, crime_categories, area_names)
    results = {
        "years": years,
        "crime_categories": crime_categories,
        "area_names": area_names
    }    

    # Return the JSON 'results' dictionary that includes all options to populate for the HTML interactive filter tools 
    return jsonify(results)


############# Route #4 (Filter Options) ###############
@app.route("/api/v1.0/all_data")
def all_data():

    session = Session(engine)

    # Using 'func', query and extract the unique years from the date of crime occurred (date_occ) column
    query_all = session.query(
        func.extract('year', crime.date_occ).label('year'),
        crime.dr_no,
        crime.date_rptd,
        crime.date_occ,
        crime.time_occ,
        crime.area_name,
        crime.crime_category,
        crime.crm_cd,
        crime.crm_cd_desc,
        crime.vict_age,
        crime.vict_sex,
        crime.vict_descent,
        crime.premis_desc,
        crime.location,
        crime.cross_street,
        crime.lat,
        crime.lon
    ).all()
        

    data_dict = []

    for row in query_all:
        temp_dict = {
            'dr_no': row.dr_no,
            'date_rptd': row.date_rptd,
            'date_occ': row.date_occ,
            'time_occ': str(row.time_occ),
            'area_name': row.area_name,
            'crime_category': row.crime_category,
            'crm_cd': row.crm_cd,
            'crm_cd_desc': row.crm_cd_desc,
            'vict_age': row.vict_age,
            'vict_sex': row.vict_sex,
            'vict_descent': row.vict_descent,
            'premis_desc': row.premis_desc,
            'location': row.location,
            'cross_street': row.cross_street,
            'lat': row.lat,
            'lon': row.lon
        }
        data_dict.append(temp_dict)

    
    results = {
        "crime_data": data_dict,
    }       

    return jsonify(results)
   


# Run the Flask app
if __name__ == '__main__':
    app.run(debug = True)