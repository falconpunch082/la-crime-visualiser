# Los Angeles Crime Visualiser
*Monash University Data Analytics Bootcamp Project 3* \
*by Group 5 (Nicholas, Wassim, Michael, Talieh)*
---

This repository contains all code made by Group 5 that is necessary to run the following project. 
> This project is one of the four projects part of the bootcamp which requires completion to receive a certificate of completion.

---
**Project objective**

To display data from [LAPD API](https://data.lacity.org/Public-Safety/Crime-Data-from-2020-to-Present/2nrs-mtv8/about_data) on Crime Data into a website containing a Leaflet map with markers (containing info popups) and a slider (over time) and a dashboard containing summary charts, complete with a filter on area and crime code.

---

**Contributors**

- Michael Zabala (michaelz-id): Data extraction, cleaning and manipulation + database hosting with [neon.tech](https://neon.tech/).

- Talieh Sheikholeslami (Talieh-Sh): Creation of Python Flask API providing data from created database for visualisations + implementation of [Frozen-Flask](https://pypi.org/project/Frozen-Flask/).

- Wassim Deen (wdeen) and Nicholas Dale (falconpunch082): Data visualisation using data from created Flask API (Leaflet map, summary charts with [charts.js](https://www.chartjs.org/)).

- Nicholas Dale (falconpunch082): Frontend (responsive HTML + CSS) with help from [teleport.io](https://teleporthq.io/), and implementation of input solutions using [bootstrap](https://getbootstrap.com/), [bootstrap-multiselect](https://github.com/davidstutz/bootstrap-multiselect) and [rSlider](https://github.com/slawomir-zaziablo/range-slider/tree/master).

---

**Technologies used**

- Python (SQL database generation and Flask).

- PostgresSQL + neon.tech.

- HTML + CSS (with assistance from teleporthq.io).

- Javascript libraries like Leaflet, charts.js and rSlider.js.

- Bootstrap and the bootstrap-multiselect library.

---

**Launch**

There is no need for installation to view this project.

To launch the project, simply click [here](https://falconpunch082.github.io/la-crime-visualiser/).

To take a look at the database, simply click here.

---

**Changelog:**

v0.1 - Created draft HTML + CSS files to host visualisations, and created database files.
v0.2 - Created Flask API
v0.3 - Finalised frontend website
