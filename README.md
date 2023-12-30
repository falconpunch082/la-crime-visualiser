# Los Angeles Crime Visualiser
*Monash University Data Analytics Bootcamp Project 3* \
*by Group 5 (Nicholas, Wassim, Michael, Talieh)*
---

This repository contains all code made by Group 5 that is necessary to run the following project. 
> This project is one of the four projects part of the bootcamp which requires completion to receive a certificate of completion.

---
**Project objectives**

- To extract data provided by [LAPD API](https://data.lacity.org/Public-Safety/Crime-Data-from-2020-to-Present/2nrs-mtv8/about_data) and modifying it to best suit the project's purposes.

- To host modified data online as a Flask API that takes data from a database hosted on the Internet.

- To create an interactive dashboard displaying data from the API, complete with a map displaying where crimes occur, summary statistics displayed on graphs and a filter where enduser can select crimes based on crime type, area and year range.

---

**Contributors**

- Michael Zabala (michaelz-id): Data extraction, cleaning and manipulation + data types.

- Talieh Sheikholeslami (Talieh-Sh): Creation of Python Flask API providing data from created database for visualisations.

- Wassim Deen (wdeen) and Nicholas Dale (falconpunch082): Data visualisation using data from created Flask API (Leaflet map, summary charts).

- Nicholas Dale (falconpunch082): Frontend (responsive HTML + CSS), and implementation of input solutions.

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

**Local Development Setup**  
You need to create dbpassword.txt in the project working directory and paste your desired database password there.  
Note: make sure to NOT commit this file to Git.