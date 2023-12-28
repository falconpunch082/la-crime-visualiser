# Los Angeles Crime Visualiser
*Monash University Data Analytics Bootcamp Project 3*
*[Working Copy from Wassim Deen]*
---

**TODO**

1. Include key metrics within the 'card' HTML elements e.g. total crimes
2. Remove debugging code
3. Add additional comments to the code
4. Finalise group project README


**Changelog:**

- [24/12/2023] v1.0 End-to-end workflow process of Interactive Dashboard (`la-crime-visualiser\_WD`)
  
    - Updated `data_cleanup_WD.ipynb`
        - Replaced values with actual category name for Victim Sex and Descent columns
        - Re-extracted the full LA Crime Dataset (`full_crime_data.csv`)
            - Stored in ZIP folder to push to repo (`full_crime_data.zip`)
        - Other tweaks...
        
    - Updated `crimeSQL_Local.sql`
        - `vict_sex` & `vict_descent` are now VARCHAR type
    
    - Updated `index.html`
        - Each Carousel containers contains its own canvas HTML element (to house the chart visualisations)
        - Other tweaks...

    - Updated `visualisations.js`
        - [NEW] Chart JS functions to intialise and re-initialise Doughnut/Stacked Bar/Pie Charts (`init_DonutChart`, `init_StackedBarChart`, `init_PieChart`)
        - [UPDATED] Leaflet Map now reinitialises when running a new query
        - [UPDATED] Other cleanup...



- [23/12/2023] v0.2 End-to-end workflow process of Interactive Dashboard (`la-crime-visualiser\_WD`)
    - Deleted `map.js` file (`la-crime-visualiser\_WD\static\js`)
        - Code from file transferred to `visualisations.js`
    
    - Updated `data_cleanup_WD.ipynb`
        - Utilised App Token key for API call (`api_keys.py`)
        - Extracted the full LA Crime Dataset (`full_crime_data.csv`)
            - Stored in ZIP folder to push to repo (`full_crime_data.zip`)
        
    - Updated `crimeSQL_Local.sql`
        - `id` is now PRIMARY KEY
        - Additional tweaks to the schema in order to import the full LA Crime Dataset
    
    - Updated `index.html`
        - Re-added - Added Chart.js library as CDN in `<body>`
        - Images in Carousel replaced with `<div>` elements to house the Chart JS plots (`jsChart_TimeSeries` / `jsChart_Bar` / `jsChart_Pie`)
        - Updated id tag for `<input>` element in 'Slider'object (`selYear`)
        - Updated id tag for `<button>` element (`runQuery`)
            - Also tweaked text appearance
        - Removed `<script>` element for `map.js`
            - Code merged into `visualisations.js`

    - Updated `app.py`
        - Deleted 'All Data' API Route (`/api/v1.0/all_data`)
        - Added 'Sample Data' API Route (`/api/v1.0/sample_data`)
        - Added 'Filtered Data' Dynamic API Route (`/api/v1.0/<years_str>/<area_names_str>/<crime_categories_str>`)
        - Added 'Test' API Route (`/api/v1.0/test`)
            - For debugging purposes; to be deleted...

    - Updated `visualisations.js`
        - [UPDATED] StartUp now pre-selects the first two options for Year/Area/Crime
        - [NEW] All code from `map.js` added to new function (`init_Map`)
        - [NEW] Startup now programmatically triggers the button to initialise all visualisations
        - [NEW] Skeleton functions for the Chart JS plots (`init_PieChart` / `init_BarChart` / `init_TimeSeries`)
        - [NEW] In startup, fully defined 'Query' function (`runQuery`)
            - [UPDATED] Returns current selection(s) from 'Area Names' dropdown w/ URIEncoding
            - [UPDATED] Returns current selection(s) from 'Crime Categories' dropdown w/ URIEncoding
            - [NEW] Returns current selection(s) from 'Year' slider
            - [NEW] Dynamically generate & call customised URL for the dynamic Flask API route 
            - [NEW] Centralised function to initialise all visualisations (`init_AllVisuals(queryData)`)
            
    


- [18/12/2023] v0.1 End-to-end workflow process of Interactive Dashboard
    - Changes to HTML file `(la-crime-visualiser\_WD\index.html)`
        - Added CDN to Chart.js library in `<body>`
        - Added visualisation Javascript solution file `(visualisations.js)`
        - Updated id tags for dropdown menu (`selArea` / `selCrime`)
    - Extracted & cleaned raw sample dataset via LA City API `(la-crime-visualiser\_WD\crimeSQL\data_cleanup_WD.ipynb)`
    - Exported CSV Sample Dataset`(crime_data.csv)`
    - Built local postgreSQL Database to house data `(la-crime-visualiser\_WD\crimeSQL\crimeSQL_Local.sql)`
    - Built Python Flask App to establish link to the postgreSQL Database & Generate JSON data `(la-crime-visualiser\_WD\app.py)`
    - Partially developed solution to generate data visualisations via JavaScript (`C:\Users\wazithepa\Desktop\Bootcamp\la-crime-visualiser\_WD\static\js\visualisations.js`)
        - [On Startup] Linked with Python Flask App `(la-crime-visualiser\_WD\app.py)`
        - [On Startup] Albeit flawed, successfully populated both dropdown menus with their own unique list of options





**NOTES**
- Within my working copy directory (`la-crime-visualiser\_WD`), review the following files in sequential order:
    1. `data_cleanup_WD.ipynb`
    2. `crime_data.csv`
    3. `crimeSQL_Local.sql`
    4. `app.py`
    5. `visualisations.js`
