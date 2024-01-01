--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
# **Los Angeles: Crime Data Analytics Dashboard**

<p align="center">
<img src="./Images/Project_Title.png" width="100%">
</p>

# Table of Contents
1. [Project Members](#project-members)
2. [Project Overview](#project-overview)
3. [Analytics Dashboard (Preview)](#analytics-dashboard-preview)
4. [Contributions](#contributions)
5. [Final Repository Structure](#final-repository-structure)
6. [Crime Dataset Overview](#crime-dataset-overview)
7. [Target Audience](#target-audience)
8. [Interactive Visualisations](#interactive-visualisations)


## Project Members
  * **Nicholas Dale**
    - [Github] https://github.com/falconpunch082
 * **Talieh Sheikholeslami**
    - [Github] https://github.com/Talieh-Sh
 * **Michael Zabala**
    - [Github] https://github.com/michaelz-id
 * **Wassim Deen**
    - [Github] https://github.com/wdeen
  

## Project Overview
For this project, we utilised the [City of Los Angeles' Crime Dataset](https://data.lacity.org/Public-Safety/Crime-Data-from-2020-to-Present/2nrs-mtv8/about_data) to develop an interactive analytics dashboard for general users to accessibly discover patterns and trends of criminal acts taking place within the city.

The publicly available dataset is an official source supplied by the Los Angeles Police Department and is routinely updated. It contains over 850,000 records worth of reported crime incidents in the City of Los Angeles ranging from 2020 and onward.

The following visualisations were developed for the dashboard and references the Crime Dataset:
1. **Interactive Map (Heatmap & Markers)** - Geographically marking locations of crime incidents that have occurred in Los Angeles
2. **Time Series Plot** - No. Crime Incidents by Calendar Year(s)
3. **Stacked Bar Chart** - No. Crime Incidents by Area & Crime Category
4. **Pie Chart** - Distribution of Victim Sex
5. **Doughnut Chart** - Distribution of Ethnic Descent

The following interactive filters were developed for the dashboard:
1. **Dropdown Menu #1** - List of Areas within Los Angeles
2. **Dropdown Menu #2** - List of Crime Categories Occurred within Los Angeles
3. **Double-Handle Slider** - Calendar Years

This project primarily utilised the following technologies to develop the overall dashboard:
1. **HTML + CSS (with assistance from [teleport.io](https://teleporthq.io/))** - Frontend Web Development of Interactive Dashboard
2. **[bootstrap.js](https://getbootstrap.com/) / [bootstrap-multiselect.js](https://github.com/davidstutz/bootstrap-multiselect)** - 
3. **Leaflet.js** - Interactive Map Visualisation
4. **Chart.js** - Remaining Interactive Visualisations (Time Series Plot / Stacked Bar Chart / Pie Chart / Doughnut Chart)
5. **PostgreSQL** - Database to House the Los Angeles Crime Dataset
6. **Pandas** - Data Cleaning & Aggregation
7. **SQLAlchemy** - Connect & Interact with the PostgreSQL Database via Python
8. **Python Flask** - Custom Web Application & API Routes suitable to the project
9. **[Render](https://render.com/)** - API App Hosting via Cloud
10. **[neon.tech](https://neon.tech/)** - SQL Database Hosting via Cloud


## Analytics Dashboard (Preview)

<p align="center">
<img src="./Images/Dashboard_Demo.gif" width="100%">
</p>


## Contributions
  * **Nicholas Dale (falconpunch082)**
    - [Frontend] Full web development of Analytics Dashboard (HTML / CSS)
    - Implementation of input solutions (Bootstrap.js / D3.js).
    - [Data Visualisation #1] Leaflet Map (Leaflet.js)
    - [Miscellaneous] Quality control

   * **Talieh Sheikholeslami (Talieh-Sh)**
     - [Python Flask / SQLAlchemy] Development of Flask API to stream data from PostgreSQL Database for initialisation of JavaScript data visualisations.
     - [Cloud-Based App Hosting] Migration of entire project solution to 'Render' Cloud
     - For more information: https://render.com/

   * **Michael Zabala (michaelz-id)**
     - [Python API Calling] Extraction of raw dataset
     - [Python Pandas] Data cleaning + manipulation + export to CSV
     - [PostgreSQL] Database schema design + setup
    
   * **Wassim Deen (wdeen)**
     - [Backend] Full integration of Analytical Dashboard webpage with Python Flask API (local / online)
     - [Frontend] Final polishing to Analytics Dashboard webpage (HTML / CSS)
     - [Miscellaneous] Additional support with PostgreSQL / Python Flask development
     - [Data Visualisation #2] Time Series Plot (Chart.js / D3.js)
     - [Data Visualisation #3] Stacked Bar Chart (Chart.js / D3.js)
     - [Data Visualisation #4] Doughnut Chart (Chart.js / D3.js)
     - [Data Visualisation #5] Pie Chart (Chart.js / D3.js)


## Final Repository Structure
```
├── README.md
├── .gitignore
├── app_render.py
├── 'templates' Folder
├── 'static' Folder
├── 'CrimeSQL' Folder
├── 'Images' Folder
├── 'Slide Deck' Folder
└── '_localhost' Folder
    ├── index.html
    ├── app_local.py
    ├── 'templates' Folder
    └── 'static' Folder
```

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
## Crime Dataset Overview


## Target Audience


## Interactive Visualisations

### **#1 - Leaflet Map (Markers & Heatmap)**

<p align="center">
  <img src="./Images/Leaflet_Map.png" width="70%">
</p>

### **#2 - Time Series Plot**

<p align="center">
  <img src="./Images/TimeSeries_Plot.png" width="70%">
</p>

### **#3 - Stacked Bar Chart**

<p align="center">
  <img src="./Images/StackedBar_Chart.png" width="70%">
</p>

### **#4 - Pie Chart**

<p align="center">
  <img src="./Images/Pie_Chart.png" width="70%">
</p>

### **#5 - Doughnut Chart**

<p align="center">
  <img src="./Images/Doughnut_Chart.png" width="70%">
</p>

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Flow chart for data visualisation process**

![Flow chart for data visualisation process](https://github.com/falconpunch082/la-crime-visualiser/assets/26648391/a7b5e73f-9049-46b2-aa30-8eb205913943)

---

**Launch**

There is no need for installation to view this project. Everything is hosted online thanks to Render.
The link to the interactive dashboard is available on the repo's description. Otherwise, you can click this link [here](https://la-crime-project.onrender.com/frontend) to access it.
To access the API that contains our modified database, please click the link [here](https://la-crime-project.onrender.com/). Alternatively, the link to the API is provided during the visualisation's startup.
This repo also contains the necessary files to run the visualisation and database locally. Installation is necessary to host the visualisation through localhost.

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


 



 

