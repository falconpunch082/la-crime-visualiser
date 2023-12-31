
# Importing related libraries and modules
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, and_

from flask import Flask, jsonify, render_template

from urllib.parse import unquote

import os
import re  # Add this import for regular expressions


#################################################
# SQLAlchemy Database Setup
#################################################


# Check if the "dbpassword.txt" file exists
if os.path.isfile("dbpassword.txt"):
    # Read the database password from the external file
    with open("dbpassword.txt", "r") as password_file:
        db_password = password_file.read().strip()

else:
    # Provide guidance when the file is not found
    print("The 'dbpassword.txt' file was not found. Please create the file and add your database password to it.")
    exit()

    # Use the password in your URL
url = f"postgresql://talieh.sh.mail:{db_password}@ep-curly-waterfall-09913600.us-east-2.aws.neon.tech/LA_Crime_Data_Project?sslmode=require"

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
    # Run the homepage HTML webpage (homepage.html)
    return render_template("homepage.html")


############# Route #2 (Interactive Dashboard) ###############
@app.route("/frontend")
def frontend():
    # Run the Analytical Dashboard HTML webpage (index.html)
    return render_template("index.html")


############# Route #3 (Filter Options) ###############
@app.route("/api/v1.0/filter_options")
def filter_options():
    #  Used to populate the interactive filters on the Analytical Dashboard (index.html) webpage
    #  Returns the unique list of years, crime categories and area names

    # Establish session (link) from Python to the Crime DB (PostgreSQL)
    session = Session(engine)

    # Using 'func', query and extract the unique years from the date of crime occurred (date_occ) column
    query_years = session.query(func.extract('year', crime.date_occ).\
                                label('year')).distinct().all()
    
    # Terminate the session to Crime DB
    session.close()

    
    # [Python List Comprehension] For every year in the returned query_years, store the year in the list
    years = [row.year for row in query_years]


    # Query the unique crime categories from the appropriate column
    query_crime_categories = session.query(crime.crime_category).distinct().all()

    # [Python List Comprehension] For every crime category in the returned query_crime_categories, store the crime category in the list
    crime_categories = [row.crime_category for row in query_crime_categories]


    # Query the unique area names from the appropriate column
    query_area_names = session.query(crime.area_name).distinct().all()

    # [Python List Comprehension] For every area name in the returned query_area_names, store the area_name in the list
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
    # Used everytime the user runs a new query from the Analytical Dashboard (index.html) webpage and reinitialises the JS visualisations
    # Returns a new query using filters selected from the frontend user

    # Use a regular expression to check if years_str matches the expected pattern
    if not re.match(r'^\d{4},\d{4}$', years_str):
        # Return a 400 Bad Request response with the error message
        return jsonify({"error": "Bad Request: Years parameter expected to contain two years separated with a comma (e.g., 2020,2022)"}), 400

    
    # For every year in the passed string of years (e.g. 2020,2021), split it, convert it to int and store in a new list
    years_list = [int(year) for year in years_str.split(',')]

    # For every area name in the passed string of area names (e.g. Central,77th%20Street), split it and store in a new list
    areas_list = area_names_str.split(',')

    # For every crime category in the passed string of crime categories (e.g. Theft,Grand%20Theft%20Auto), split it and store in a new list
    crimes_list = crime_categories_str.split(',')

    # Using urllib.parse, perform URL decoding for all string elements in the lists
    # i.e. replace '%20' with regular spacing in the string element
    areas_list = [unquote(area) for area in areas_list]
    crimes_list = [unquote(crime) for crime in crimes_list]

    # When querying the SQL table, the data is filtered by...
        # The years selected and...
        # The area names selected and...
        # The crime categories selected
    filters_selected = [func.extract('year', crime.date_occ).between(years_list[0], years_list[1]),
                        crime.area_name.in_(areas_list),
                        crime.crime_category.in_(crimes_list)]
    
    
    # Establish session (link) from Python to the Crime DB (PostgreSQL)
    session = Session(engine)
  
    # Run the SQLAlchemy query of all data (filtered)
    # The '*' operator is used to unpack everything from filters_selected so that all is applied to the query
    query_all_filtered = session.query(crime).\
        filter(
            and_(*filters_selected)
        ).all()

    # Terminate the session to Crime DB
    session.close()

    # Create empty dictionary to store the queried data
    data_dict = []

    # For every datapoint (row) in the query...
    # Store each cell in its respective key within a new dictionary
    # Append data_dict with the new dictionary
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

    # Stores the following in a new dictionary prior to being JSONified:
    results = {
        "years": years_list,                # Selected Years
        "area_names": areas_list,           # Selected Area Names
        "crime_categories": crimes_list,    # Selected Crime Categories
        "crime_data": data_dict             # Final Queried Data
    }       

    # Return the JSON 'results' dictionary the selected filter options and final queried data
    return jsonify(results)



############# Route #5 (Sample Data) ###############
@app.route("/api/v1.0/sample_data")
def sample_data():
    # Used to preview some of the data from Crime DB
    # Returns sample data

    # Establish session (link) from Python to the Crime DB (PostgreSQL)
    session = Session(engine)

    # Using 'func', query and extract the unique years from the date of crime occurred (date_occ) column
    query_sample = session.query(crime).limit(1000)
    
    # Terminate the session to Crime DB
    session.close()

    # Create empty dictionary to store the queried data
    data_dict = []

    # For every datapoint (row) in the query...
    # Store each cell in its respective key within a new dictionary
    # Append data_dict with the new dictionary
    for row in query_sample:
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

    
    # Stores the queried sample data dictionary in a new dictionary prior to being JSONified
    results = {
        "crime_data": data_dict,
    }       

    # Return the JSON 'results' dictionary containing the sample data
    return jsonify(results)


# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True, port=8080)