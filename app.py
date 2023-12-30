
# Importing related libraries and modules
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, and_, desc

from flask import Flask, jsonify, render_template

from urllib.parse import unquote # Reference: https://docs.python.org/3/library/urllib.parse.html

# Use Flask CORS Library to allow access to fetch from Python Flask API routes that would have otherwise been blocked by the CORS policy by default
# Reference: https://stackoverflow.com/questions/26980713/solve-cross-origin-resource-sharing-with-flask
from flask_cors import CORS

#################################################
# SQLAlchemy Database Setup
#################################################

username = "postgres"
password = "1234567"
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

# [IMPORTANT] Enable CORS for all API routes; in order for JS scripts to connect to Flask API routes if Flask instance is running locally
CORS(app)

# From the Flask library, configure to not sort the keys when serializing JSON responses
#app.json.sort_keys = False

#####
# Configure JSONIFY_SETTINGS to control JSON serialization behavior
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = False  # Disable pretty-printing JSON responses
app.config['JSON_SORT_KEYS'] = False  # Disable sorting JSON keys
#####

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
        f"/api/v1.0/<years_str>/<area_names_str>/<crime_categories_str><br/>"
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
        "area_names": area_names,
        "crime_categories": crime_categories
    }    

    # Return the JSON 'results' dictionary that includes all options to populate for the HTML interactive filter tools 
    return jsonify(results)


############# Route #4 ([Dynamic API Route] Query Data based on Filters Applied) ###############
@app.route("/api/v1.0/<years_str>/<area_names_str>/<crime_categories_str>")
def filtered_data(years_str, area_names_str, crime_categories_str):
    
    years_list = [int(year) for year in years_str.split(',')]
    areas_list = area_names_str.split(',')
    crimes_list = crime_categories_str.split(',')

    # Using urllib.parse, perform URL decoding for all string elements in the lists
    # i.e. replace '%20' with spacing in the string element
    areas_list = [unquote(area) for area in areas_list]
    crimes_list = [unquote(crime) for crime in crimes_list]

    # When querying the SQL table, the data is filtered by...
        # The years selected and...
        # The area names selected and...
        # The crime categories selected
    filters_selected = [func.extract('year', crime.date_occ).between(years_list[0], years_list[1]),
                        crime.area_name.in_(areas_list),
                        crime.crime_category.in_(crimes_list)]
    
    
    session = Session(engine)
  
    # Run the SQLAlchemy query of all data (filtered)
    query_all_filtered = session.query(crime).\
        filter(
            and_(*filters_selected)
        ).all()

    # Run the SQLAlchemy query of all unique victim sex (filtered)
    #query_sex_filtered = session.query(crime.vict_sex).\
    #    filter(
    #        and_(*filters_selected)
    #    ).distinct().all()

    # Run the SQLAlchemy query of all unique victim descents (filtered)
    #query_descent_filtered = session.query(crime.vict_descent).\
    #    filter(
    #        and_(*filters_selected)
    #    ).distinct().all()
    

    session.close()


    #sexes_list = [row.vict_sex for row in query_sex_filtered]

    #descents_list = [row.vict_descent for row in query_descent_filtered]


    data_dict = []

    for row in query_all_filtered:
        row_dict = {
            'id': row.id,
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
        
        data_dict.append(row_dict)


    results = {
        "years": years_list,
        "area_names": areas_list,
        "crime_categories": crimes_list,
        #"vict_sexes": sexes_list,
        #"vict_descents": descents_list,
        "crime_data": data_dict
    }       

    return jsonify(results)




############# Route #5 (Sample Data) ###############
@app.route("/api/v1.0/sample_data")
def all_data():

    session = Session(engine)

    # Using 'func', query and extract the unique years from the date of crime occurred (date_occ) column
    query_all = session.query(crime).limit(1000)
        
    session.close()


    data_dict = []

    for row in query_all:
        temp_dict = {
            'id': row.id,
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


############# Route #6 (Test) ###############
@app.route("/api/v1.0/test")
def test():

    session = Session(engine)

    query_all = session.query(crime).\
        filter(
            and_(
                func.extract('year', crime.date_occ).in_([2020, 2021]),
                crime.area_name.in_(["77th Street"]),
                crime.crime_category.in_(["Other Theft"])
            )
        ).limit(100)

    session.close()


    data_dict = []

    for row in query_all:
        temp_dict = {
            'id': row.id,
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