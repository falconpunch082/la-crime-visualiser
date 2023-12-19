
# Importing related libraries and modules
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, jsonify, render_template
import os


#By printing os.environ.items(), you are inspecting and displaying all the environment variables 
#that are currently set on your system at that moment. 
#This can be helpful for debugging or understanding the environment in which your Flask application is running
print(os.environ.items())


########################  SQLAlchemy database setup   #############################

#Create connecton to the cloud PostgreSQL database in Neon
engine = create_engine("postgresql://talieh.sh.mail:WHnC3zMy8wsT@ep-curly-waterfall-09913600.us-east-2.aws.neon.tech/LA_Crime_Data?sslmode=require")

# Create a base for automatically mapping database tables to Python classes
Base = automap_base()

# Reflect the tables in database
Base.prepare(autoload_with=engine)
 
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
    crime_data_2 = Base.classes.crime_data_2
    # Create our session (link) from Python to the DB to interact with the database
    session = Session(engine)
    # Query the database to retrieve crime data (limiting to 100 records)
    results_crime = session.query(crime_data_2).limit(100).all()
    # Close the database session
    session.close()

    # Prepare a list to store crime data in JSON format  
    crimes_list = []
    # Convert query results into a list of dictionaries
    for data in results_crime:
        # Create a dictionary for each record
        crime_data = {
            "DivisionNumber": data.division_number,
            "DateReported": data.date_reported,
            "DateOccurred": data.date_occurred,
            "AreaName": data.area_name,
            "ReportingDistrict": data.reporting_district,
            "Part": data.part,
            "CrimeCode": data.crime_code,
            "CrimeDescription": data.crime_description,
            "ModusOperandi": data.modus_operandi,
            "VictimAge": data.victim_age,
            "VictimSex": data.victim_sex,
            "VictimDescent": data.victim_descent,
            "PremiseCode": data.premise_code,
            "PremiseDescription": data.premise_description,
            "WeaponCode": data.weapon_code,
            "WeaponDescription": data.weapon_description,
            "Status": data.status,
            "StatusDescription": data.status_description,
            "CrimeCode1": data.crime_code_1,
            "CrimeCode2": data.crime_code_2,
            "CrimeCode3": data.crime_code_3,
            "CrimeCode4": data.crime_code_4,
            "Location": data.location,
            "CrossStreet": data.cross_street,
            "Latitude": data.latitude,
            "Longitude": data.longitude
            
        }
        # Append the dictionary to the list
        crimes_list.append(crime_data)
  
  
    # Use jsonify to convert the list of dictionaries to JSON and return it
    return jsonify(crimes_list)
   
# Additional routes can be added here
########
@app.route("/api/v1.0/summary")
def yearly_summary():
    crime_data_2 = Base.classes.crime_data_2
    session = Session(engine)

    # Example query to get count of crimes per year
    results_yearly = session.query(
        func.extract('year', crime_data_2.date_occurred).label('year'),
        func.count().label('crime_count')
    ).group_by('year').order_by('year').all()

    session.close()

    yearly_data = [{'year': year, 'crime_count': count} for year, count in results_yearly]
    return jsonify(yearly_data)

########
@app.route("/api/v1.0/summary_yearly_monthly_area_crime_description")
def summary_yearly_monthly_area_crime_description():
    crime_data_2 = Base.classes.crime_data_2
    session = Session(engine)

    # Query to group by year, month, area_name, and crime_description
    results = session.query(
        func.extract('year', crime_data_2.date_occurred).label('year'),
        func.extract('month', crime_data_2.date_occurred).label('month'),
        crime_data_2.area_name.label('area_name'),
        crime_data_2.crime_description.label('crime_description'),
        func.count().label('crime_count')
    ).group_by(
        'year', 'month', 'area_name', 'crime_description'
    ).order_by(
        'year', 'month', 'area_name', 'crime_description'
    ).all()

    session.close()

    # Preparing the data for JSON response
    summary_data = []
    for year, month, area_name, crime_description, count in results:
        summary_data.append({
            'year': year,
            'month': month,
            'area_name': area_name,
            'crime_description': crime_description,
            'crime_count': count
        })

    return jsonify(summary_data)

########

@app.route("/api/v1.0/filter_options")
def filter_options():
    crime_data_2 = Base.classes.crime_data_2
    session = Session(engine)

    # Query to get unique years, crime descriptions, and area names
    unique_years = session.query(func.extract('year', crime_data_2.date_occurred).label('year')).distinct().order_by('year').all()
    unique_categories = session.query(crime_data_2.crime_description.distinct().label('crime_description')).order_by('crime_description').all()
    unique_areas = session.query(crime_data_2.area_name.distinct().label('area_name')).order_by('area_name').all()

    session.close()

    # Format the results into JSON
    filter_options_data = {
        'years': [year[0] for year in unique_years],
        'categories': [category[0] for category in unique_categories],
        'areas': [area[0] for area in unique_areas]
    }

    return jsonify(filter_options_data)
###########
@app.route("/api/v1.0/<int:startyear>/<int:endyear>/<string:crimes>/<string:areas>")
def filtered_data(startyear, endyear, crimes, areas):
    crime_data_2 = Base.classes.crime_data_2
    session = Session(engine)

    # Define query filters based on provided parameters
    filters = []
    if startyear:
        filters.append(func.extract('year', crime_data_2.date_occurred) >= startyear)
    if endyear:
        filters.append(func.extract('year', crime_data_2.date_occurred) <= endyear)
    if crimes:
        crime_list = crimes.split(',')
        filters.append(crime_data_2.crime_description.in_(crime_list))
    if areas:
        area_list = areas.split(',')
        filters.append(crime_data_2.area_name.in_(area_list))

    # Query the database with the applied filters and select the desired fields
    filtered_results = session.query(
        crime_data_2.crime_description.label('crime'),
        crime_data_2.area_name.label('area'),
        crime_data_2.latitude.label('lat'),
        crime_data_2.longitude.label('long'),
        func.extract('year', crime_data_2.date_occurred).label('year')
    ).filter(*filters).all()

    session.close()

    # Prepare the filtered data for JSON response
    filtered_data = []
    for data in filtered_results:
        # Create a dictionary for each record
        filtered_record = {
            "Crime": data.crime,
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
    app.run(debug=True, port=8080)


