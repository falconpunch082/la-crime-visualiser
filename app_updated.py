
# Importing related libraries and modules
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, jsonify, render_template
import os
from datetime import datetime


#By printing os.environ.items(), you are inspecting and displaying all the environment variables 
#that are currently set on your system at that moment. 
#This can be helpful for debugging or understanding the environment in which your Flask application is running
# print(os.environ.items())


########################  SQLAlchemy database setup   #############################

#Create connecton to the cloud PostgreSQL database in Neon
engine = create_engine("postgresql://talieh.sh.mail:WHnC3zMy8wsT@ep-curly-waterfall-09913600.us-east-2.aws.neon.tech/LA_Crime_Data_Updated?sslmode=require")

# Create a base for automatically mapping database tables to Python classes
Base = automap_base()

# Reflect the tables in database
Base.prepare(autoload_with=engine, schema="public")
 
print(Base.classes.keys())
# Create a Flask web application instance
app = Flask(__name__)


########################  API Routes   #############################
# List all the available routes in homepage route.
@app.route("/")
def beginning():
    # return (
    #     "<h1>Available routes:</h1>"
    #     "/api/v1.0/crimes<br/>"
    #     "/api/v1.0/summary<br/>"
    #     "/api/v1.0/summary_yearly_monthly_area_crime_description"
    #     "/api/v1.0/filter_options<br/>"
    # )
    return render_template("homepage.html")
# Flask route to retrieve crimes data
@app.route("/api/v1.0/sample_data")
def crimes():

    # Access the "crime_data_2" table
    crime_data_updated = Base.classes.crime_data_updated
    # Create our session (link) from Python to the DB to interact with the database
    session = Session(engine)
    # Query the database to retrieve crime data (limiting to 100 records)
    results_crime = session.query(crime_data_updated).limit(100).all()
    # Close the database session
    session.close()

    # Prepare a list to store crime data in JSON format  
    crimes_list = []
    # Convert query results into a list of dictionaries
    for data in results_crime:
         # Convert the integer time to a formatted time string (HH:MM:SS)
        time_occured = "{:02}:{:02}:00".format(
            data.time_occured // 100, data.time_occured % 100)

        # Create a dictionary for each record
        crime_data = {
            "DivisionNumber": data.division_number,
            "DateReported": data.date_reported,
            "DateOccured": data.date_occured,
            "TimeOccured":time_occured,
            "AreaName": data.area_name,
            "CrimeCategory":data.crime_category,
            "CrimeDescription":data.crime_description,
            "VictimAge": data.victim_age,
            "VictimSex": data.victim_sex,
            "VictimDescent": data.victim_descent_name,
            "PremiseDescription": data.premis_desc,
            "Location": data.location,
            "CrossStreet": data.cross_street,
            "Lat": data.lat,
            "Lon": data.lon

        }
        # Append the dictionary to the list
        crimes_list.append(crime_data)
  
  
    # Use jsonify to convert the list of dictionaries to JSON and return it
    return jsonify(crimes_list)
   
# Additional routes can be added here
########
@app.route("/api/v1.0/summary")
def yearly_summary():
    crime_data_updated = Base.classes.crime_data_updated
    session = Session(engine)

    # Example query to get count of crimes per year
    results_yearly = session.query(
        func.extract('year', crime_data_updated.date_occured).label('year'),
        func.count().label('crime_count')
    ).group_by('year').order_by('year').all()

    session.close()

    yearly_data = [{'year': year, 'crime_count': count} for year, count in results_yearly]
    print(yearly_data)
    return jsonify(yearly_data)


########
@app.route("/api/v1.0/summary_yearly_monthly_area_crime_description")
def summary_yearly_monthly_area_crime_description():
    crime_data_updated = Base.classes.crime_data_updated
    session = Session(engine)

    # Query to group by year, month, area_name, and crime_description
    results = session.query(
        func.extract('year', crime_data_updated.date_occured).label('year'),
        func.extract('month', crime_data_updated.date_occured).label('month'),
        crime_data_updated.area_name.label('area_name'),
        crime_data_updated.crime_category.label('crime_category'),
        func.count().label('crime_count')
    ).group_by(
        'year', 'month', 'area_name', 'crime_category'
    ).order_by(
        'year', 'month', 'area_name', 'crime_category'
    ).all()

    session.close()

    # Preparing the data for JSON response
    summary_data = []
    for year, month, area_name, crime_category, count in results:
        summary_data.append({
            'year': year,
            'month': month,
            'area_name': area_name,
            'crime_category': crime_category,
            'crime_count': count
        })

    return jsonify(summary_data)

########

@app.route("/api/v1.0/filter_options")
def filter_options():
    crime_data_updated = Base.classes.crime_data_updated
    session = Session(engine)

    # Query to get unique years, crime descriptions, and area names
    unique_years = session.query(func.extract('year', crime_data_updated.date_occured).label('year')).distinct().order_by('year').all()
    unique_categories = session.query(crime_data_updated.crime_category.distinct().label('crime_category')).order_by('crime_category').all()
    unique_areas = session.query(crime_data_updated.area_name.distinct().label('area_name')).order_by('area_name').all()

    session.close()

    # Format the results into JSON
    filter_options_data = {
        'years': [year[0] for year in unique_years],
        'categories': [category[0] for category in unique_categories],
        'areas': [area[0] for area in unique_areas]
    }

    return jsonify(filter_options_data)
###########
@app.route("/api/v1.0/<int:startyear>/<int:endyear>/<string:crime_category>/<string:areas>")
def filtered_data(startyear, endyear, crime_category, areas):
    crime_data_updated = Base.classes.crime_data_updated
    session = Session(engine)

    # Define query filters based on provided parameters
    filters = []
    if startyear:
        filters.append(func.extract('year', crime_data_updated.date_occured) >= startyear)
    if endyear:
        filters.append(func.extract('year', crime_data_updated.date_occured) <= endyear)
    if crime_category:
        crime_list = crime_category.split(',')
        filters.append(crime_data_updated.crime_category.in_(crime_list))
    if areas:
        area_list = areas.split(',')
        filters.append(crime_data_updated.area_name.in_(area_list))

    # Query the database with the applied filters and select the desired fields
    filtered_results = session.query(
        crime_data_updated.crime_category.label('crime_category'),
        crime_data_updated.area_name.label('area'),
        crime_data_updated.lat.label('lat'),
        crime_data_updated.lon.label('long'),
        func.extract('year', crime_data_updated.date_occured).label('year')
    ).filter(*filters).all()

    session.close()

    # Prepare the filtered data for JSON response
    filtered_data = []
    for data in filtered_results:
        # Create a dictionary for each record
        filtered_record = {
            "crime_category": data.crime_category,
            "Area": data.area,
            "Lat": data.lat,
            "Long": data.long,
            "Year": data.year
        }
        filtered_data.append(filtered_record)

    return jsonify(filtered_data)

##############


# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True, port=9000)


