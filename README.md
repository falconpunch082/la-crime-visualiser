--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
# **Los Angeles: Crime Data Analytics Dashboard**

<p align="center">
<img src="./Images/Dashboard_Demo.gif" width="100%">
</p>

## Project Contributors
  * **Nicholas Dale**
    - [Github] https://github.com/falconpunch082
 * **Talieh Sheikholeslami**
    - [Github] https://github.com/Talieh-Sh
 * **Michael Zabala**
    - [Github] https://github.com/michaelz-id
 * **Wassim Deen**
    - [Github] https://github.com/wdeen
  

## Project Overview
- To extract data provided by [LAPD API](https://data.lacity.org/Public-Safety/Crime-Data-from-2020-to-Present/2nrs-mtv8/about_data) and modifying it to best suit the project's purposes.

- To host modified data online as a Flask API that takes data from a database hosted on the Internet.

- To create an interactive dashboard displaying data from the API, complete with a map displaying where crimes occur, summary statistics displayed on graphs and a filter where enduser can select crimes based on crime type, area and year range.

## Contributions
**Nicholas Dale (falconpunch082)**
    - [Frontend] Full web development of Analytics Dashboard (HTML / CSS)

    - Implementation of input solutions (Bootstrap.js / D3.js).

    - [Data Visualisation #1] Leaflet Map (Leaflet.js)

**Talieh Sheikholeslami (Talieh-Sh)**
    - [Python Flask / SQLAlchemy] Development of Flask API to stream data from PostgreSQL Database for initialisation of JavaScript data visualisations.

    - [Cloud-Based App Hosting] Migration of entire project solution to 'Render' Cloud

    - For more information: https://render.com/

**Michael Zabala (michaelz-id)**
    - [Python API Calling] Extraction of raw dataset

    - [Python Pandas] Data cleaning + manipulation + export to CSV

    - [PostgreSQL] Database schema design + setup
    
**Wassim Deen (wdeen)**
    - [Backend] Full integration of Analytical Dashboard webpage with Python Flask API (local / online)

    - [Frontend] Final polishing to Analytics Dashboard webpage (HTML / CSS)

    - [Miscellaneous] Additional support with PostgreSQL / Python Flask development 

    - [Data Visualisation #2] Time Series Plot (Chart.js / D3.js)

    - [Data Visualisation #3] Stacked Bar Chart (Chart.js / D3.js)

    - [Data Visualisation #4] Doughnut Chart (Chart.js / D3.js)

    - [Data Visualisation #5] Pie Chart (Chart.js / D3.js)

---

**Technologies used**

- Python (SQL database generation and Flask).

- PostgresSQL + [neon.tech](https://neon.tech/).

- [Render](https://render.com/) for API hosting.

- HTML + CSS (with assistance from [teleport.io](https://teleporthq.io/)).

- Javascript libraries like Leaflet, [charts.js](https://www.chartjs.org/), [rSlider](https://github.com/slawomir-zaziablo/range-slider/tree/master) and [heatmap.js](https://www.patrick-wied.at/static/heatmapjs/plugin-leaflet-layer.html).

- [Bootstrap](https://getbootstrap.com/) and the [bootstrap-multiselect](https://github.com/davidstutz/bootstrap-multiselect) library.

- Leaflet libaries like [markercluster](https://github.com/Leaflet/Leaflet.markercluster), [FeatureGroup.SubGroup](https://github.com/ghybs/Leaflet.FeatureGroup.SubGroup?tab=readme-ov-file), and [leaflet-heatmap](https://www.patrick-wied.at/static/heatmapjs/example-heatmap-leaflet.html).

---

**Flow chart for data visualisation process**

![Flow chart for data visualisation process](https://github.com/falconpunch082/la-crime-visualiser/assets/26648391/a7b5e73f-9049-46b2-aa30-8eb205913943)

---

**Launch**

There is no need for installation to view this project. The visualisation is hosted on a GitHub Pages website that is linked in this repository. As for the API, the link is provided within the visualisation website during startup.

---

**App Server Setup (Local/Cloud)**  
+ Add DB Password  
    You need to create dbpassword.txt in the project working directory and paste your database password there.  
    Note: make sure to NOT commit this file to Git.
+ (Once Only) Add New Virtual Environment
    * Open a new terminal and change directory to project working directory
    * Run below command in your project working directory  
      * On macOS and Linux:  
       ``` python3 -m venv .venv```
      * On Windows:   
       ``` python -m venv .venv```
+ Activate the virtual environment  
    * Run below command in your project working directory
      * On macOS and Linux:  
       ``` source .venv/bin/activate```
      * On Windows:   
      ``` .venv\Scripts\activate```
    * Verify Python is correctly configured.
      Run below command, it should shows path to your .venv directory
      ``` which python```  
+ Install Required Python Packages 
    * Run below command in your project working directory  
    ``` pip install -r requirements.txt```


 



 

