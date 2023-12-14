
# Importing related libraries and modules
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, jsonify, render_template

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
    return (
        "<h1>Available routes:</h1>"
        "/api/v1.0/crimes<br/>"
        "/api/v1.0/summary<br/>"
        "/api/v1.0/filters<br/>"
    )
# Flask route to retrieve crimes data
@app.route("/api/v1.0/crimes")
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
# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True, port=8080)


