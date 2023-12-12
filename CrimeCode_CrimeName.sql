--Create new table
CREATE TABLE [Crime_Data_LA_AreaCode](
	[CrimeCode] [int] NOT NULL,
	[CrimeDesc] [varchar](255) NULL
	);

--Insert unique values for drop down
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (110, 'CRIMINAL HOMICIDE')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (113, 'MANSLAUGHTER, NEGLIGENT')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (121, 'RAPE, FORCIBLE')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (122, 'RAPE, ATTEMPTED')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (210, 'ROBBERY')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (220, 'ATTEMPTED ROBBERY')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (230, 'ASSAULT WITH DEADLY WEAPON, AGGRAVATED ASSAULT')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (231, 'ASSAULT WITH DEADLY WEAPON ON POLICE OFFICER')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (235, 'CHILD ABUSE (PHYSICAL) - AGGRAVATED ASSAULT')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (236, 'INTIMATE PARTNER - AGGRAVATED ASSAULT')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (237, 'CHILD NEGLECT (SEE 300 W.I.C.)')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (250, 'SHOTS FIRED AT MOVING VEHICLE, TRAIN OR AIRCRAFT')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (251, 'SHOTS FIRED AT INHABITED DWELLING')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (310, 'BURGLARY')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (320, 'BURGLARY, ATTEMPTED')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (330, 'BURGLARY FROM VEHICLE')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (331, 'THEFT FROM MOTOR VEHICLE - GRAND ($950.01 AND OVER)')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (341, 'THEFT-GRAND ($950.01 & OVER)EXCPT,GUNS,FOWL,LIVESTK,PROD')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (343, 'SHOPLIFTING-GRAND THEFT ($950.01 & OVER)')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (345, 'DISHONEST EMPLOYEE - GRAND THEFT')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (347, 'GRAND THEFT / INSURANCE FRAUD')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (349, 'GRAND THEFT / AUTO REPAIR')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (350, 'THEFT, PERSON')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (351, 'PURSE SNATCHING')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (352, 'PICKPOCKET')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (353, 'DRUNK ROLL')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (354, 'THEFT OF IDENTITY')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (410, 'BURGLARY FROM VEHICLE, ATTEMPTED')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (420, 'THEFT FROM MOTOR VEHICLE - PETTY ($950 & UNDER)')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (421, 'THEFT FROM MOTOR VEHICLE - ATTEMPT')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (432, 'BLOCKING DOOR INDUCTION CENTER')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (433, 'DRIVING WITHOUT OWNER CONSENT (DWOC)')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (434, 'FALSE IMPRISONMENT')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (435, 'LYNCHING')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (436, 'LYNCHING - ATTEMPTED')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (437, 'RESISTING ARREST')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (438, 'RECKLESS DRIVING')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (439, 'FALSE POLICE REPORT')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (440, 'THEFT PLAIN - PETTY ($950 & UNDER)')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (441, 'THEFT PLAIN - ATTEMPT')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (442, 'SHOPLIFTING - PETTY THEFT ($950 & UNDER)')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (443, 'SHOPLIFTING - ATTEMPT')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (444, 'DISHONEST EMPLOYEE - PETTY THEFT')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (445, 'DISHONEST EMPLOYEE ATTEMPTED THEFT')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (446, 'PETTY THEFT - AUTO REPAIR')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (450, 'THEFT FROM PERSON - ATTEMPT')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (451, 'PURSE SNATCHING - ATTEMPT')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (452, 'PICKPOCKET, ATTEMPT')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (470, 'TILL TAP - GRAND THEFT ($950.01 & OVER)')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (471, 'TILL TAP - PETTY ($950 & UNDER)')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (473, 'THEFT, COIN MACHINE - GRAND ($950.01 & OVER)')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (474, 'THEFT, COIN MACHINE - PETTY ($950 & UNDER)')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (475, 'THEFT, COIN MACHINE - ATTEMPT')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (480, 'BIKE - STOLEN')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (485, 'BIKE - ATTEMPTED STOLEN')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (487, 'BOAT - STOLEN')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (510, 'VEHICLE - STOLEN')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (520, 'VEHICLE - ATTEMPT STOLEN')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (522, 'VEHICLE, STOLEN - OTHER (MOTORIZED SCOOTERS, BIKES, ETC)')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (622, 'BATTERY ON A FIREFIGHTER')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (623, 'BATTERY POLICE (SIMPLE)')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (624, 'BATTERY - SIMPLE ASSAULT')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (625, 'OTHER ASSAULT')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (626, 'INTIMATE PARTNER - SIMPLE ASSAULT')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (627, 'CHILD ABUSE (PHYSICAL) - SIMPLE ASSAULT')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (647, 'THROWING OBJECT AT MOVING VEHICLE')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (648, 'ARSON')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (649, 'DOCUMENT FORGERY / STOLEN FELONY')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (651, 'DOCUMENT WORTHLESS ($200.01 & OVER)')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (652, 'DOCUMENT WORTHLESS ($200 & UNDER)')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (653, 'CREDIT CARDS, FRAUD USE ($950.01 & OVER)')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (654, 'CREDIT CARDS, FRAUD USE ($950 & UNDER')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (660, 'COUNTERFEIT')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (661, 'UNAUTHORIZED COMPUTER ACCESS')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (662, 'BUNCO, GRAND THEFT')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (664, 'BUNCO, PETTY THEFT')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (666, 'BUNCO, ATTEMPT')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (668, 'EMBEZZLEMENT, GRAND THEFT ($950.01 & OVER)')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (670, 'EMBEZZLEMENT, PETTY THEFT ($950 & UNDER)')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (740, 'VANDALISM - FELONY ($400 & OVER, ALL CHURCH VANDALISMS)')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (745, 'VANDALISM - MISDEAMEANOR ($399 OR UNDER)')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (753, 'DISCHARGE FIREARMS/SHOTS FIRED')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (755, 'BOMB SCARE')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (756, 'WEAPONS POSSESSION/BOMBING')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (760, 'LEWD/LASCIVIOUS ACTS WITH CHILD')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (761, 'BRANDISH WEAPON')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (762, 'LEWD CONDUCT')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (763, 'STALKING')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (805, 'PIMPING')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (806, 'PANDERING')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (810, 'SEX,UNLAWFUL(INC MUTUAL CONSENT, PENETRATION W/ FRGN OBJ')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (812, 'CRM AGNST CHLD (13 OR UNDER) (14-15 & SUSP 10 YRS OLDER)')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (813, 'CHILD ANNOYING (17YRS & UNDER)')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (814, 'CHILD PORNOGRAPHY')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (815, 'SEXUAL PENETRATION W/FOREIGN OBJECT')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (820, 'ORAL COPULATION')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (821, 'SODOMY/SEXUAL CONTACT B/W PENIS OF ONE PERS TO ANUS OTH')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (822, 'HUMAN TRAFFICKING - COMMERCIAL SEX ACTS')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (830, 'INCEST (SEXUAL ACTS BETWEEN BLOOD RELATIVES)')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (840, 'BEASTIALITY, CRIME AGAINST NATURE SEXUAL ASSLT WITH ANIM')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (845, 'SEX OFFENDER REGISTRANT OUT OF COMPLIANCE')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (850, 'INDECENT EXPOSURE')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (860, 'BATTERY WITH SEXUAL CONTACT')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (865, 'DRUGS, TO A MINOR')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (870, 'CHILD ABANDONMENT')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (880, 'DISRUPT SCHOOL')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (882, 'INCITING A RIOT')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (884, 'FAILURE TO DISPERSE')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (886, 'DISTURBING THE PEACE')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (888, 'TRESPASSING')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (890, 'FAILURE TO YIELD')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (900, 'VIOLATION OF COURT ORDER')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (901, 'VIOLATION OF RESTRAINING ORDER')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (902, 'VIOLATION OF TEMPORARY RESTRAINING ORDER')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (903, 'CONTEMPT OF COURT')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (904, 'FIREARMS EMERGENCY PROTECTIVE ORDER (FIREARMS EPO)')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (906, 'FIREARMS RESTRAINING ORDER (FIREARMS RO)')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (910, 'KIDNAPPING')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (920, 'KIDNAPPING - GRAND ATTEMPT')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (921, 'HUMAN TRAFFICKING - INVOLUNTARY SERVITUDE')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (922, 'CHILD STEALING')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (924, 'TELEPHONE PROPERTY - DAMAGE')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (928, 'THREATENING PHONE CALLS/LETTERS')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (930, 'CRIMINAL THREATS - NO WEAPON DISPLAYED')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (931, 'REPLICA FIREARMS(SALE,DISPLAY,MANUFACTURE OR DISTRIBUTE)')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (932, 'PEEPING TOM')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (933, 'PROWLER')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (940, 'EXTORTION')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (942, 'BRIBERY')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (943, 'CRUELTY TO ANIMALS')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (944, 'CONSPIRACY')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (946, 'OTHER MISCELLANEOUS CRIME')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (948, 'BIGAMY')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (949, 'ILLEGAL DUMPING')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (950, 'DEFRAUDING INNKEEPER/THEFT OF SERVICES, OVER $950.01')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (951, 'DEFRAUDING INNKEEPER/THEFT OF SERVICES, $950 & UNDER')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (954, 'CONTRIBUTING')
INSERT INTO [Crime_Data_LA_CrimeCode] ([CrimeCode], [CrimeDesc]) VALUES (956, 'LETTERS, LEWD  -  TELEPHONE CALLS, LEWD')