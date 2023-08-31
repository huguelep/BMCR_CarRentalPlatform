/*
Based on information and sample queries found in Canvas Modules
Safonte, D & Curry, M (April 2023)
[Source] https://canvas.oregonstate.edu/courses/1914747
*/

SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

-- CardInformation
-- Contains a customer's credit/debit card information saved on file for a particular reservation

CREATE OR REPLACE TABLE CardInformation (
    card_info_id int NOT NULL AUTO_INCREMENT,
    first_name varchar(45) NOT NULL,
    last_name varchar(45) NOT NULL,
    street_address varchar(255) NOT NULL,
    city_name varchar(45) NOT NULL,
    state_code varchar(2) NOT NULL,
    zip_code varchar(10) NOT NULL,
    card_number varchar(19) NOT NULL,
    card_expiry_date date NOT NULL,
    security_code varchar(3) NOT NULL,
    phone_number varchar(12) NOT NULL,
    email_address varchar(45),
    PRIMARY KEY (card_info_id)
);

-- Branches
-- Contains information about the various branch locations of Beaver Motors

CREATE OR REPLACE TABLE Branches (
    branch_id int NOT NULL AUTO_INCREMENT,
    street_address varchar(255) NOT NULL,
    city_name varchar(45) NOT NULL,
    state_code varchar(2) NOT NULL,
    zip_code varchar(10) NOT NULL,
    phone_number varchar(12) NOT NULL,
    email_address varchar(45) NOT NULL,
    PRIMARY KEY (branch_id)
);

-- Drivers
-- Contains information about the driver[s] on a reservation

CREATE OR REPLACE TABLE Drivers (
    driver_id int NOT NULL AUTO_INCREMENT,
    first_name varchar(45) NOT NULL,
    last_name varchar(45) NOT NULL,
    date_of_birth date NOT NULL,
    license_state_code varchar(2) NOT NULL,
    license_number varchar(16) NOT NULL,
    license_expiry_date date NOT NULL,
    insurance_provider varchar(45) NOT NULL,
    insurance_policy_number varchar(45) NOT NULL,
    PRIMARY KEY (driver_id)
);

-- DriversReservations
-- Intersection table for M:N relationship between Drivers and Reservations

CREATE OR REPLACE TABLE DriversReservations (
    driver_reservation_id int NOT NULL AUTO_INCREMENT,
    driver_id int NOT NULL,
    reservation_id int NOT NULL,
    PRIMARY KEY (driver_reservation_id),
    FOREIGN KEY (driver_id) REFERENCES Drivers(driver_id) ON DELETE CASCADE,
    FOREIGN KEY (reservation_id) REFERENCES Reservations(reservation_id) ON DELETE CASCADE
);

-- Reservations
-- Contains information about a vehicle reservation

CREATE OR REPLACE TABLE Reservations (
    reservation_id int NOT NULL AUTO_INCREMENT,
    res_begin datetime NOT NULL,
    res_end datetime NOT NULL,
    payment_total dec(6,2) NOT NULL,
    payment_method_id int NOT NULL,
    card_info_id int NOT NULL,
    branch_id int NOT NULL,
    vehicle_id int,
    PRIMARY KEY (reservation_id),
    FOREIGN KEY (payment_method_id) REFERENCES PaymentMethods(payment_method_id) ON DELETE RESTRICT,
    FOREIGN KEY (card_info_id) REFERENCES CardInformation(card_info_id) ON DELETE RESTRICT,
    FOREIGN KEY (branch_id) REFERENCES Branches(branch_id) ON DELETE RESTRICT,
    FOREIGN KEY (vehicle_id) REFERENCES Vehicles(vehicle_id) ON DELETE SET NULL
);

-- PaymentMethods
-- Contains information about the various acceptable payment methods for the initial reservation total

CREATE OR REPLACE TABLE PaymentMethods (
    payment_method_id int NOT NULL AUTO_INCREMENT,
    payment_method varchar(10) NOT NULL,
    PRIMARY KEY (payment_method_id)
);

-- Vehicles
-- Contains information about a vehicle available to rent in the Beaver Motors' fleet

CREATE OR REPLACE TABLE Vehicles (
    vehicle_id int NOT NULL AUTO_INCREMENT,
    make varchar(45) NOT NULL,
    model varchar(45) NOT NULL,
    production_year year NOT NULL,
    color varchar(45) NOT NULL,
    plate_number varchar(10) NOT NULL,
    vin_number varchar(17) NOT NULL,
    mileage int NOT NULL,
    PRIMARY KEY (vehicle_id) 
);

-- Sample Data and insertion queries --

-- Sample Data for CardInformation table

INSERT INTO CardInformation (first_name, last_name, street_address, city_name, state_code, zip_code, card_number, card_expiry_date, security_code, phone_number, email_address)
VALUES ('John', 'Smith', '4901 Cedarstone Drive', 'Toledo', 'OH', '43604', '4539157378614713', '280401', '606', '541-902-1283', 'john.smith@sampledata.com'),
('Jane', 'Doe', '288 Tampico Road', 'Corvallis', 'OR', '97330', '4929323881473587', '300901', '370', '541-908-4009', 'jane.doe@sampledata.com'),
('William', 'Jackson', '147 Thunder Road', 'San Francisco', 'CA', '94108', '4716320529755612', '240701', '866', '415-940-5191', 'william.jackson@sampledata.com');
 
-- Sample Data for Branches table

INSERT INTO Branches (street_address, city_name, state_code, zip_code, phone_number, email_address)
VALUES ('1414 NW 9th Street', 'Corvallis', 'OR', '97330', '541-758-0000', '1414ezrentals@beavermotors.com'),
('1885 NW 9th Street', 'Corvallis', 'OR', '97330', '541-753-0512', '1885ezrentals@beavermotors.com'),
('1623 W Burnside Street', 'Portland', 'OR', '97209', '503-220-8200', '1623ezrentals@beavermotors.com');

-- Sample Data for Drivers table

INSERT INTO Drivers (first_name, last_name, date_of_birth, license_state_code, license_number, license_expiry_date, insurance_provider, insurance_policy_number)
VALUES ('John', 'Smith', 19700512, 'OH', 'AB123456', 20250121, 'Geico', '0123456789'),
('Jane', 'Doe', 19890715, 'OR', 'A1234567', 20270325, 'Progressive', '1256125612'),
('Andrew', 'Johnson', 19900918, 'WA', 'WDL123456789', 20230515, 'Prudential', '2367236723'),
('Sarah', 'Jackson', 19750215, 'OH', 'DC987654', 20241215, 'Geico', '7812781278');

-- Sample Data for DriversReservations table

INSERT INTO DriversReservations (driver_id, reservation_id)
VALUES (1, 1), (2, 2), (3, 3), (4, 3), (1, 4);

-- Sample Data for Reservations table

INSERT INTO Reservations (res_begin, res_end, payment_total, payment_method_id, branch_id, card_info_id, vehicle_id)
VALUES ("2023-05-03 08:00:00", "2023-05-05 12:00:00", 412.75, 1, 1, 1, 1),
("2023-05-15 12:00:00", "2023-05-18 15:30:00", 315.25, 1, 2, 2, 3),
("2023-05-19 04:00:00", "2023-05-21 08:00:00", 375.50, 2, 3, 3, 3),
("2023-05-21 12:00:00", "2023-05-24 14:00:00", 415.50, 2, 3, 1, 2);

-- Sample Data for PaymentMethods table

INSERT INTO PaymentMethods (payment_method)
VALUES ('Cash'), ('Card'), ('Check'), ('Bitcoin');

-- Sample Data for Vehicles table

INSERT INTO Vehicles (make, model, production_year, color, plate_number, vin_number, mileage)
VALUES ('Pontiac', 'Sunfire', 1993, 'Red', 'JNV0264', 'YV1LS53D4X2596502', 100000),
('Saturn', 'Ion', 2001, 'Silver', '389JHM', '1G1PC5SH2C7383160', 80000),
('Lincoln', 'MKZ', 2010, 'Black', 'C35FCV', '2G1WH55KX29115832', 40000);

SET FOREIGN_KEY_CHECKS=1;
COMMIT;