# Los Angeles Crime Visualiser
*Monash University Data Analytics Bootcamp Project 3*
*[Working Copy from Wassim Deen]*
---


**Changelog:**

- [1st Pass for Testing] v0.1 End-to-end workflow process of Interactive Dashboard
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


**TODO**

1. [On Startup] Populate all Unique Years to Slider HTML Bootstrap element (`visualisations.js`)
    - Inspect into the build of said item (`rSlider.css` / `rSlider.js` / `index.html`)
2. [Overall Work] Utilise Chart.js library to generate pre-agreed visualisations and display on front-end interactive dashboard


**NOTES**
- Within my working copy directory (`la-crime-visualiser\_WD`), review the following files in sequential order:
    1. `data_cleanup_WD.ipynb`
    2. `crime_data.csv`
    3. `crimeSQL_Local.sql`
    4. `app.py`
    5. `visualisations.js`
