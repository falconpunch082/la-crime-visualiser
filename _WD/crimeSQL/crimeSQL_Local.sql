DROP TABLE IF EXISTS crime;

CREATE TABLE crime (
	dr_no INT NOT NULL PRIMARY KEY,
	date_rptd DATE,
	date_occ DATE,
	time_occ INT,
	area_name VARCHAR NOT NULL,
	crime_category VARCHAR NOT NULL,
	crm_cd INT NOT NULL,
	crm_cd_desc VARCHAR NOT NULL,
	vict_age INT NOT NULL,
	vict_sex CHAR(1),
	vict_descent CHAR(1),
	premis_desc VARCHAR,
	location VARCHAR,
	cross_street VARCHAR,
	lat NUMERIC NOT NULL,
	lon NUMERIC NOT NULL
);

ALTER TABLE crime
ALTER COLUMN time_occ TYPE TIME
    USING TO_TIMESTAMP(TO_CHAR(time_occ, 'FM0000'), 'HH24MI');

SELECT *
FROM crime LIMIT 100;

SELECT DISTINCT EXTRACT (YEAR FROM date_occ) AS year
FROM crime;

SELECT DISTINCT crime_category
FROM crime;

SELECT DISTINCT vict_sex
FROM crime;

SELECT DISTINCT vict_descent
FROM crime;

SELECT DISTINCT area_name
FROM crime;