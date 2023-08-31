/*
Based on information and sample queries found in Canvas Modules
Safonte, D & Curry, M (May 2023)
[Source] https://canvas.oregonstate.edu/courses/1914747
*/

-------------- CardInformation --------------

-- READ card_info_id, first_name, last_name, card_number to populate CardInformation drop_down menu on Reservations form and for DELETE confirmation message
SELECT card_info_id, concat(first_name, ' ', last_name, ', ', card_number) AS Customer_Card_Information FROM CardInformation ORDER BY card_info_id ASC;

-- READ all CardInformation to populate CardInformation table
SELECT card_info_id AS Card_Info_ID, first_name AS First_Name, last_name AS Last_Name, street_address AS Street_Address, city_name AS City_Name,
state_code AS State_Code, zip_code AS ZIP_Code, card_number AS Card_Number, card_expiry_date AS Card_Expiry_Date, security_code AS Security_Code,
phone_number AS Phone_Number, email_address AS Email_Address FROM CardInformation ORDER BY card_info_id ASC;

-- CREATE new CardInformation entry (: character being used to denote the variables that will have data from the backend programming language)
INSERT INTO CardInformation (first_name, last_name, street_address, city_name, state_code, zip_code, card_number, card_expiry_date, security_code, phone_number, email_address)
VALUE (:new_first_name, :new_last_name, :new_street_address, :new_city_name, :new_state_code, :new_zip_code,
:new_card_number, :new_card_expiry_date, :new_security_code, :new_phone_number, :new_email_address);

-- UPDATE existing CardInformation (: character being used to denote the variables that will have data from the backend programming language)
UPDATE CardInformation
SET first_name = :new_first_name, last_name = :new_last_name, street_address = :new_street_address, city_name = :new_city_name, 
state_code = :new_state_code, zip_code = :new_zip_code, card_number = :new_card_number, card_expiry_date = :new_card_expiry_date, 
security_code = :new_security_code, phone_number = :new_phone_number, email_address = :new_email_address
WHERE card_info_id = :update_card_info_id;

-- DELETE existing CardInformation (: character being used to denote the variables that will have data from the backend programming language)
DELETE FROM CardInformation WHERE card_info_id = :delete_card_info_id;


-------------- Branches --------------

-- READ branch_id, street_address to populate Branches drop_down menu on Reservations form and for DELETE confirmation message
SELECT branch_id, concat(street_address, ', ', city_name, ' ', state_code, ', ', zip_code) AS Branch_Location FROM Branches ORDER BY branch_id ASC;

-- READ all Branches to populate Branches table
SELECT branch_id AS Branch_ID, street_address AS Street_Address, city_name AS City_Name, state_code AS State_Code, zip_code AS ZIP_Code,
phone_number AS Phone_Number, email_address AS Email_Address FROM Branches ORDER BY branch_id ASC;

-- CREATE new Branch entry (: character being used to denote the variables that will have data from the backend programming language)
INSERT INTO Branches (street_address, city_name, state_code, zip_code, phone_number, email_address)
VALUE (:new_street_address, :new_city_name, :new_state_code, :new_zip_code, :new_phone_number, :new_email_address);

-- UPDATE existing Branch (: character being used to denote the variables that will have data from the backend programming language)
UPDATE Branches
SET street_address = :new_street_address, city_name = :new_city_name, state_code = :new_state_code,
zip_code = :new_zip_code, phone_number = :new_phone_number, email_addres = :new_email_address
WHERE branch_id = :update_branch_id;

-- DELETE existing Branch (: character being used to denote the variables that will have data from the backend programming language)
DELETE FROM Branches WHERE branch_id = :delete_branch_id;


-------------- Vehicles --------------

-- READ vehicle_id, make, model, plate_number to populate Vehicles drop_down menu on Reservations form and for DELETE confirmation message
SELECT vehicle_id, concat(make, ' ', model, ', ', plate_number) AS Rental_Vehicle FROM Vehicles ORDER BY vehicle_id ASC;

-- READ all Vehicles to populate Vehicles table
SELECT vehicle_id AS Vehicle_ID, make AS Make, model AS Model, production_year AS Production_Year, color AS Color,
plate_number AS Plate_Number, vin_number AS VIN_Number, mileage AS Mileage FROM Vehicles ORDER BY vehicle_id ASC;

-- CREATE new Vehicle entry (: character being used to denote the variables that will have data from the backend programming language)
INSERT INTO Vehicles (make, model, production_year, color, plate_number, vin_number, mileage)
VALUE (:new_make, :new_model, :new_production_year, :new_color, :new_plate_number, :new_vin_number, :new_mileage);

-- UPDATE existing Vehicle (: character being used to denote the variables that will have data from the backend programming language)
UPDATE Vehicles
SET make = :new_make, model = :new_model, production_year = :new_production_year, color = :new_color,
plate_number = :new_plate_number, vin_number = :new_vin_number, mileage = :new_mileage
WHERE vehicle_id = :update_vehicle_id;

-- DELETE existing Vehicle (: character being used to denote the variables that will have data from the backend programming language)
DELETE FROM Vehicles WHERE vehicle_id = :delete_vehicle_id;


-------------- PaymentMethods --------------

-- READ payment_method_id, pay_method to populate PaymentMethods drop-down menu on Reservations form and for DELETE confirmation message
-- READ all PaymentMethods to populate PaymentMethods table
SELECT payment_method_id AS Payment_Method_ID, payment_method AS Payment_Method FROM PaymentMethods ORDER BY payment_method_id ASC;

-- CREATE new PaymentMethod entry (: character being used to denote the variables that will have data from the backend programming language)
INSERT INTO PaymentMethods (payment_method)
VALUE (:new_payment_method);

-- UPDATE existing PaymentMethod (: character being used to denote the variables that will have data from the backend programming language)
UPDATE PaymentMethods
SET payment_method = :new_payment_method
WHERE payment_method_id = :update_payment_method_id;

-- DELETE existing PaymentMethod (: character being used to denote the variables that will have data from the backend programming language)
DELETE FROM PaymentMethods WHERE payment_method_id = :delete_payment_method_id;


-------------- Drivers --------------

-- READ driver_id, first_name, last_name, license_number to populate Drivers drop-down menu on DriversReservations form and for DELETE confirmation message
SELECT driver_id, concat(first_name, ' ', last_name, ', ', license_number) AS Driver_Information FROM Drivers ORDER BY driver_id ASC;

-- READ all Drivers to populate Drivers table
SELECT driver_id AS Driver_ID, first_name AS First_Name, last_name AS Last_Name, date_of_birth AS Date_of_Birth,
license_state_code AS License_State_Code, license_number AS License_Number, license_expiry_date AS License_Expiry_Date,
insurance_provider AS Insurance_Provider, insurance_policy_number AS Insurance_Policy_Number FROM Drivers ORDER BY driver_id ASC;

-- CREATE new Driver entry (: character being used to denote the variables that will have data from the backend programming language)
INSERT INTO Drivers (first_name, last_name, date_of_birth, license_state_code, license_number, license_expiry_date, insurance_provider, insurance_policy_number)
VALUES (:new_first_name, :new_last_name, :new_date_of_birth, :new_license_state_code, :new_license_number,
:new_license_expiry_date, :new_insurance_provider, :new_insurance_policy_number);

-- UPDATE existing Driver (: character being used to denote the variables that will have data from the backend programming language)
UPDATE Drivers
SET first_name = :new_first_name, last_name = :new_last_name, date_of_birth = :new_date_of_birth, license_state_code = :new_license_state_code, license_number = :new_license_number,
license_expiry_date = :new_license_expiry_date, insurance_provider = :new_insurance_provider, insurance_policy_number = :new_insurance_policy_number
WHERE driver_id = :update_driver_id;

-- DELETE existing Driver (: character being used to denote the variables that will have data from the backend programming language)
DELETE FROM Drivers WHERE driver_id = :delete_driver_id;

-- DELETE existing Drivers relationships (: character being used to denote the variables that will have data from the backend programming language)
DELETE FROM DriversReservations WHERE driver_id = :delete_driver_id;


-------------- Reservations --------------

-- READ all Reservations and resolve foreign key references
SELECT reservation_id AS Reservation_ID, res_begin AS Reservation_Begin, res_end AS Reservation_End, Payment_Total,
PaymentMethods.payment_method_id AS Payment_Method_ID, PaymentMethods.payment_method AS Payment_Method,
CardInformation.card_info_id AS Customer_Card_Information_ID,
concat(CardInformation.first_name, ' ', CardInformation.last_name, ', ', CardInformation.card_number) AS Customer_Card_Information,
Branches.branch_id AS Branch_Location_ID,
concat(Branches.street_address, ', ', Branches.city_name, ' ', Branches.state_code, ', ', Branches.zip_code) AS Branch_Location,
Vehicles.vehicle_id as Rental_Vehicle_ID,
concat(Vehicles.make, ' ', Vehicles.model, ', ', Vehicles.plate_number) AS Rental_Vehicle FROM Reservations
INNER JOIN PaymentMethods ON Reservations.payment_method_id = PaymentMethods.payment_method_id
INNER JOIN CardInformation ON Reservations.card_info_id = CardInformation.card_info_id
INNER JOIN Branches ON Reservations.branch_id = Branches.branch_id
LEFT JOIN Vehicles ON Reservations.vehicle_id = Vehicles.vehicle_id
ORDER BY reservation_ID ASC;

-- CREATE new Reservation entry (: character being used to denote the variables that will have data from the backend programming language)
INSERT INTO Reservations (res_begin, res_end, payment_total, payment_method_id, card_info_id, branch_id, vehicle_id)
VALUES (:new_res_begin, :new_res_end, :new_payment_total, :new_payment_method_id, :new_card_info_id, :new_branch_id, :new_vehicle_id);

-- UPDATE existing Reservation (: character being used to denote the variables that will have data from the backend programming language)
UPDATE Reservations
SET res_begin = :new_res_begin, res_end = :new_res_end, payment_total = :new_payment_total,
payment_method_id = :new_payment_method_id, card_info_id = :new_card_info_id, branch_id = :new_branch_id, vehicle_id = :new_vehicle_id
WHERE reservation_id = :update_reservation_id;

-- DELETE existing Reservation (: character being used to denote the variables that will have data from the backend programming language)
DELETE FROM Reservations WHERE reservation_id = :delete_reservation_id;


-------------- DriversReservations --------------

-- READ Drivers on a Reservation (: character being used to denote the variables that will have data from the backend programming language)
SELECT DriversReservations.driver_reservation_id AS Driver_Reservation_ID, DriversReservations.driver_id AS Driver_ID,
DriversReservations.reservation_id AS Reservation_ID, Drivers.first_name AS First_Name,
Drivers.last_name AS Last_Name, Drivers.date_of_birth AS Date_of_Birth, Drivers.license_state_code AS License_State_Code,
Drivers.license_number AS License_Number, Drivers.license_expiry_date AS License_Expiry_Date, Drivers.insurance_provider AS Insurance_Provider,
Drivers.insurance_policy_number AS Insurance_Policy_Number FROM DriversReservations
INNER JOIN Drivers ON Drivers.driver_id = DriversReservations.driver_id
INNER JOIN Reservations ON Reservations.reservation_id = DriversReservations.reservation_id
WHERE Reservations.reservation_id = :read_reservation_id
ORDER BY Driver_Reservation_ID ASC;

-- READ Drivers that are NOT on a Reservation (: character being used to denote the variables that will have data from the backend programming language)
SELECT Drivers.driver_id AS Driver_ID,
concat(Drivers.first_name, ' ', Drivers.last_name, ', ', Drivers.license_number)
AS Driver_Information FROM Drivers
INNER JOIN DriversReservations ON Drivers.driver_id = DriversReservations.driver_id
EXCEPT
SELECT Drivers.driver_id AS Driver_ID,
concat(Drivers.first_name, ' ', Drivers.last_name, ', ', Drivers.license_number)
AS Driver_Information FROM Drivers
INNER JOIN DriversReservations ON Drivers.driver_id = DriversReservations.driver_id
WHERE DriversReservations.reservation_id = :read_reservation_id;

-- CREATE (add) Driver to a Reservation (: character being used to denote the variables that will have data from the backend programming language)
INSERT INTO DriversReservations (driver_id, reservation_id)
VALUES (:new_driver_id, :new_reservation_id);

-- UPDATE existing DriversReservations to change existing Driver on Reservation
UPDATE DriversReservations
SET driver_id = :new_driver_id
WHERE driver_reservation_id = :update_driver_reservation_id;

-- DELETE Driver from a Reservation (: character being used to denote the variables that will have data from the backend programming language)
DELETE FROM DriversReservations WHERE driver_id = :delete_driver_id;
