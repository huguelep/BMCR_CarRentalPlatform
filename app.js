/*
Adapted from CS340 Starter Application GitHub
Safonte, D & Curry, M (May 2023)
[Source] https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%204%20-%20Dynamically%20Displaying%20Data
[Source] https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data
[Source] https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data
[Source] https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data
*/

/*
    SETUP
*/

// Express
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
PORT        = 9002;                 // Set a port number at the top so it's easy to change in the future

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

// Database
var db = require('./database/db-connector')

// Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

/*
    ROUTES
*/

// Render the index.hbs file, and also send the renderer 
app.get('/', function(req, res) {
    res.render('index');  
});


// Route for Reservations page with SELECT query
app.get('/reservations', function(req, res) {

    // Generate SELECT query
    let selectReservations = "SELECT reservation_id AS Reservation_ID, res_begin AS Reservation_Begin, res_end AS Reservation_End, Payment_Total, \
    PaymentMethods.payment_method_id AS Payment_Method_ID, PaymentMethods.payment_method AS Payment_Method, \
    CardInformation.card_info_id AS Customer_Card_Information_ID, \
    concat(CardInformation.first_name, ' ', CardInformation.last_name, ', ', CardInformation.card_number) AS Customer_Card_Information, \
    Branches.branch_id AS Branch_Location_ID, \
    concat(Branches.street_address, ', ', Branches.city_name, ' ', Branches.state_code, ', ', Branches.zip_code) AS Branch_Location, \
    Vehicles.vehicle_id as Rental_Vehicle_ID, \
    concat(Vehicles.make, ' ', Vehicles.model, ', ', Vehicles.plate_number) AS Rental_Vehicle FROM Reservations \
    INNER JOIN PaymentMethods ON Reservations.payment_method_id = PaymentMethods.payment_method_id \
    INNER JOIN CardInformation ON Reservations.card_info_id = CardInformation.card_info_id \
    INNER JOIN Branches ON Reservations.branch_id = Branches.branch_id \
    LEFT JOIN Vehicles ON Reservations.vehicle_id = Vehicles.vehicle_id \
    ORDER BY reservation_ID ASC;";

    // Generate queries for drop-down menus
    let paymentMethodQuery = "SELECT payment_method_id AS Payment_Method_ID, payment_method AS Payment_Method FROM PaymentMethods;"
    let cardInformationQuery = "SELECT card_info_id, concat(first_name, ' ', last_name, ', ', card_number) AS Customer_Card_Information FROM CardInformation;"
    let branchQuery = "SELECT branch_id, concat(street_address, ', ', city_name, ' ', state_code, ', ', zip_code) AS Branch_Location FROM Branches;"
    let vehicleQuery = "SELECT vehicle_id, concat(make, ' ', model, ', ', plate_number) AS Rental_Vehicle FROM Vehicles;"

    // Run queries and process
    db.pool.query(selectReservations, function(error, rows, fields){

        // Format dates into proper format for HTML
        for (reservation of rows) {
            let rb_year = reservation.Reservation_Begin.getFullYear().toString();
            let rb_month = reservation.Reservation_Begin.getMonth() + 1;
            let rb_month_corrected = (rb_month < 10) ? ('0' + rb_month.toString()):rb_month.toString();
            let rb_day = reservation.Reservation_Begin.getDate();
            let rb_day_Corrected = (rb_day < 10) ? ('0' + rb_day.toString()):rb_day.toString()
            let rb_hours = reservation.Reservation_Begin.getHours();
            let rb_hours_Corrected = (rb_hours < 10) ? ('0' + rb_hours.toString()):rb_hours.toString();
            let rb_minutes = reservation.Reservation_Begin.getMinutes();
            let rb_minutes_Corrected = (rb_minutes < 10) ? ('0' + rb_minutes.toString()):rb_minutes.toString();
            let rb_formatted = (rb_year + '-' + rb_month_corrected + '-' + rb_day_Corrected + ' ' + rb_hours_Corrected + ':' + rb_minutes_Corrected);
            reservation.Reservation_Begin = rb_formatted;

            let re_year = reservation.Reservation_End.getFullYear().toString();
            let re_month = reservation.Reservation_End.getMonth() + 1;
            let re_month_corrected = (re_month < 10) ? ('0' + re_month.toString()):re_month.toString();
            let re_day = reservation.Reservation_End.getDate();
            let re_day_Corrected = (re_day < 10) ? ('0' + re_day.toString()):re_day.toString()
            let re_hours = reservation.Reservation_End.getHours();
            let re_hours_Corrected = (re_hours < 10) ? ('0' + re_hours.toString()):re_hours.toString();
            let re_minutes = reservation.Reservation_End.getMinutes();
            let re_minutes_Corrected = (re_minutes < 10) ? ('0' + re_minutes.toString()):re_minutes.toString();
            let re_formatted = (re_year + '-' + re_month_corrected + '-' + re_day_Corrected + ' ' + re_hours_Corrected + ':' + re_minutes_Corrected);
            reservation.Reservation_End = re_formatted;
        }
        let reservations = rows;
        db.pool.query(paymentMethodQuery, (error, rows, fields) => {
            let payment_methods = rows;
            db.pool.query(cardInformationQuery, (error, rows, fields) => {
                let customer_card_information = rows;
                db.pool.query(branchQuery, (error, rows, fields) => {
                    let branch_locations = rows;
                    db.pool.query(vehicleQuery, (error, rows, fields) => {
                        let rental_vehicles = rows;
                        res.render('reservations', {data: reservations, payment_methods: payment_methods, customer_card_information: customer_card_information, branch_locations: branch_locations, rental_vehicles: rental_vehicles});
                    })
                })
            })
        })
    })  
});


// Route for DriversReservation page with SELECT query
app.get('/driversreservations/:reservation_id', function(req, res) {

    // Get param from URL
    let Reservation_ID = req.params.reservation_id;

    // Generate SELECT query
    let selectDriversReservations = `SELECT DriversReservations.driver_reservation_id AS Driver_Reservation_ID, DriversReservations.driver_id AS Driver_ID, \
    DriversReservations.reservation_id AS Reservation_ID, Drivers.first_name AS First_Name, \
    Drivers.last_name AS Last_Name, Drivers.date_of_birth AS Date_of_Birth, Drivers.license_state_code AS License_State_Code, \
    Drivers.license_number AS License_Number, Drivers.license_expiry_date AS License_Expiry_Date, Drivers.insurance_provider AS Insurance_Provider, \
    Drivers.insurance_policy_number AS Insurance_Policy_Number FROM DriversReservations \
    INNER JOIN Drivers ON Drivers.driver_id = DriversReservations.driver_id \
    INNER JOIN Reservations ON Reservations.reservation_id = DriversReservations.reservation_id \
    WHERE Reservations.reservation_id = ${Reservation_ID} \
    ORDER BY Driver_Reservation_ID ASC;`;

    // Generate query of Drivers not on the Reservation for the drop-down menu
    let selectNonDrivers = `SELECT Drivers.driver_id AS Driver_ID, \
    concat(Drivers.first_name, ' ', Drivers.last_name, ', ', Drivers.license_number) \
    AS Driver_Information FROM Drivers \
    INNER JOIN DriversReservations ON Drivers.driver_id = DriversReservations.driver_id \
    EXCEPT SELECT Drivers.driver_id AS Driver_ID, \
    concat(Drivers.first_name, ' ', Drivers.last_name, ', ', Drivers.license_number) \
    AS Driver_Information FROM Drivers \
    INNER JOIN DriversReservations ON Drivers.driver_id = DriversReservations.driver_id \
    WHERE DriversReservations.reservation_id = ${Reservation_ID}`;

    // Generate a query of ALL Drivers for the UPDATE drop-down menu
    let selectDrivers = `SELECT Drivers.driver_id AS Driver_ID, \
    concat(Drivers.first_name, ' ', Drivers.last_name, ', ', Drivers.license_number) \
    AS Driver_Information FROM Drivers
    ORDER BY Driver_ID ASC;`;

    // Run queries and process data
    db.pool.query(selectDriversReservations, function(error, rows, fields){
        let Drivers_Reservations = rows;

        // Format dates into correct format for HTML
        for (driver of rows) {
            driver.Reservation_ID = Reservation_ID;

            let dob_year = driver.Date_of_Birth.getFullYear().toString();
            let dob_month = driver.Date_of_Birth.getMonth() + 1;
            let dob_month_corrected = (dob_month < 10) ? ('0' + dob_month.toString()):dob_month.toString();
            let dob_day = driver.Date_of_Birth.getDate();
            let dob_day_Corrected = (dob_day < 10) ? ('0' + dob_day.toString()):dob_day.toString()
            let dob_formatted = (dob_year + '-' + dob_month_corrected + '-' + dob_day_Corrected);
            driver.Date_of_Birth = dob_formatted;

            let led_year = driver.License_Expiry_Date.getFullYear().toString();
            let led_month = driver.License_Expiry_Date.getMonth() + 1;
            let led_month_corrected = (led_month < 10) ? ('0' + led_month.toString()):led_month.toString();
            let led_day = driver.License_Expiry_Date.getDate();
            let led_day_corrected = (led_day < 10) ? ('0' + led_day.toString()):led_day.toString();
            let formatted_date = (led_year + '-' + led_month_corrected + '-' + led_day_corrected);
            driver.License_Expiry_Date = formatted_date;
        }
        db.pool.query(selectNonDrivers, function(error, rows, fields) {
            let Driver_Information = rows;
            db.pool.query(selectDrivers, function(error, rows, fields) {
                let Drivers = rows;
                res.render('driversreservations', {data: Drivers_Reservations, Driver_Information: Driver_Information, Drivers: Drivers, Reservation_ID: Reservation_ID});
            })
        })
    })     
});


// Route for Drivers page with SELECT query
app.get('/drivers', function(req, res) {

    // Generate SELECT query for Drivers
    let selectDrivers = "SELECT driver_id AS Driver_ID, first_name AS First_Name, last_name AS Last_Name, date_of_birth AS Date_of_Birth, \
    license_state_code AS License_State_Code, license_number AS License_Number, license_expiry_date AS License_Expiry_Date, \
    insurance_provider AS Insurance_Provider, insurance_policy_number AS Insurance_Policy_Number FROM Drivers \
    ORDER BY driver_id ASC;";

    // Run query and process data
    db.pool.query(selectDrivers, function(error, rows, fields){

        // Format dates into the proper format for HTML
        for (driver of rows) {
            let dob_year = driver.Date_of_Birth.getFullYear().toString();
            let dob_month = driver.Date_of_Birth.getMonth() + 1;
            let dob_month_corrected = (dob_month < 10) ? ('0' + dob_month.toString()):dob_month.toString();
            let dob_day = driver.Date_of_Birth.getDate();
            let dob_day_Corrected = (dob_day < 10) ? ('0' + dob_day.toString()):dob_day.toString()
            let dob_formatted = (dob_year + '-' + dob_month_corrected + '-' + dob_day_Corrected);
            driver.Date_of_Birth = dob_formatted;

            let led_year = driver.License_Expiry_Date.getFullYear().toString();
            let led_month = driver.License_Expiry_Date.getMonth() + 1;
            let led_month_corrected = (led_month < 10) ? ('0' + led_month.toString()):led_month.toString();
            let led_day = driver.License_Expiry_Date.getDate();
            let led_day_corrected = (led_day < 10) ? ('0' + led_day.toString()):led_day.toString();
            let formatted_date = (led_year + '-' + led_month_corrected + '-' + led_day_corrected);
            driver.License_Expiry_Date = formatted_date;
        }
        res.render('drivers', {data: rows});
    })  
});


// Route for CardInformation page with SELECT query
app.get('/cardinformation', function(req, res) {

    // Generate SELECT query for CardInformation
    let selectCardInformation = "SELECT card_info_id AS Card_Info_ID, first_name AS First_Name, last_name AS Last_Name, street_address AS Street_Address, \
    city_name AS City_Name, state_code AS State_Code, zip_code AS ZIP_Code, card_number AS Card_Number, card_expiry_date AS Card_Expiry_Date, \
    security_code AS Security_Code, phone_number AS Phone_Number, email_address AS Email_Address FROM CardInformation \
    ORDER BY card_info_id ASC;"

    // Run query and process data
    db.pool.query(selectCardInformation, function(error, rows, fields){    // Execute the query

        // Format dates into correct format for HTML
        for (card_information of rows) {
            let ced_year = card_information.Card_Expiry_Date.getFullYear().toString();
            let ced_month = card_information.Card_Expiry_Date.getMonth() + 1;
            let ced_month_corrected = (ced_month < 10) ? ('0' + ced_month.toString()):ced_month.toString();
            let ced_day = card_information.Card_Expiry_Date.getDate();
            let ced_day_Corrected = (ced_day < 10) ? ('0' + ced_day.toString()):ced_day.toString()
            let ced_formatted = (ced_year + '-' + ced_month_corrected + '-' + ced_day_Corrected);
            card_information.Card_Expiry_Date = ced_formatted;
        }
        res.render('cardinformation', {data: rows});
    })      
});


// Route for Branches page with SELECT query
app.get('/branches', function(req, res) {

    // Generate SELECT query for Branches
    let selectBranches = "SELECT branch_id AS Branch_ID, street_address AS Street_Address, city_name AS City_Name, state_code AS State_Code, \
    zip_code AS ZIP_Code, phone_number AS Phone_Number, email_address AS Email_Address FROM Branches \
    ORDER BY branch_id ASC;";

    // Run query
    db.pool.query(selectBranches, function(error, rows, fields){
        res.render('branches', {data: rows});
    })       
});


// Route for Vehicles page with SELECT query
app.get('/vehicles', function(req, res) {

    // Generate SELECT query for Vehicles
    let selectVehicles = 'SELECT vehicle_id AS Vehicle_ID, make AS Make, model AS Model, production_year AS Production_Year, color AS Color, \
    plate_number AS Plate_Number, vin_number AS VIN_Number, mileage AS Mileage FROM Vehicles \
    ORDER BY vehicle_id ASC;';

    // Run query
    db.pool.query(selectVehicles, function(error, rows, fields){
        res.render('vehicles', {data: rows});
    })       
});


// Route for PaymentMethods page with SELECT query
app.get('/paymentmethods', function(req, res) {

    // Generate SELECT query for PaymentMethods
    let selectPaymentMethods = "SELECT payment_method_id AS Payment_Method_ID, payment_method as Payment_Method FROM PaymentMethods ORDER BY payment_method_id ASC;";

    // Run query
    db.pool.query(selectPaymentMethods, function(error, rows, fields){
        res.render('paymentmethods', {data: rows});
    })  
});


// Route for INSERT operation on Vehicles
app.post('/add-vehicle-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Generate the query
    let createVehicle = `INSERT INTO Vehicles (make, model, production_year, color, plate_number, vin_number, mileage) \
    VALUES ('${data.make}', '${data.model}', ${data.production_year}, '${data.color}', '${data.plate_number}', '${data.vin_number}', ${data.mileage});`;
    db.pool.query(createVehicle, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);

        } else {

            // If there was no error, perform a SELECT * on Vehicles
            let selectVehicle = 'SELECT vehicle_id AS Vehicle_ID, make AS Make, model AS Model, production_year AS Production_Year, color AS Color, \
            plate_number AS Plate_Number, vin_number AS VIN_Number, mileage AS Mileage FROM Vehicles ORDER BY vehicle_id ASC;';
            db.pool.query(selectVehicle, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);

                }

                // If all went well, send the results of the query back.
                else
                
                {

                    res.send(rows);

                }
            })
        }
    })
});

// Route for DELETE operation on Vehicles
app.delete('/delete-vehicle-ajax/', function(req,res,next){

    // Parse ID from data and generate query
    let data = req.body;
    let Vehicle_ID = parseInt(data.id);
    let deleteVehicle= `DELETE FROM Vehicles WHERE vehicle_id = ${Vehicle_ID};`;
  
    // Run the query
    db.pool.query(deleteVehicle, function(error, rows, fields) {
  
        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);

        } else {

            // Request succeeded
            res.sendStatus(204);

        }
    })
});

//updateVehicle is same path as update_vehicle AJAX request.
app.put('/updateVehicle', function(req,res,next){                                   
    let data = req.body;
  
    let Vehicle_ID = parseInt(data.vehicleID);
    let make = data.make;
    let model = data.model;
    let production_year = parseInt(data.production_year);
    let color = data.color;
    let plate_number = data.plate_number;
    let vin_number = data.vin_number;
    let mileage = parseInt(data.mileage);

    queryUpdateVehicle = `UPDATE Vehicles \
    SET make = '${make}', model = '${model}', production_year = ${production_year}, color = '${color}', \
    plate_number = '${plate_number}', vin_number = '${vin_number}', mileage = ${mileage} \
    WHERE vehicle_id = ${Vehicle_ID}`;
    selectVehicleUpdate = 'SELECT vehicle_id AS Vehicle_ID, make AS Make, model AS Model, production_year AS Production_Year, color AS Color, \
            plate_number AS Plate_Number, vin_number AS VIN_Number, mileage AS Mileage FROM Vehicles ORDER BY vehicle_id ASC;'; // 
  
          // Run the 1st query
          db.pool.query(queryUpdateVehicle, function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
              else
              {
                  // Run the second query
                  db.pool.query(selectVehicleUpdate, [Vehicle_ID], function(error, rows, fields) {
          
                      if (error) {
                          console.log(error);
                          res.sendStatus(400);
                      } else {
                          res.send(rows);
                      }
                  })
              }
})});

// Route for INSERT operation on Branches
app.post('/add-branch-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    let query1 = `INSERT INTO Branches (street_address, city_name, state_code, zip_code, phone_number, email_address) \
    VALUES ('${data.street_address}', '${data.city_name}', '${data.state_code}', '${data.zip_code}', '${data.phone_number}', '${data.email_address}');`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);

        } else {

            // If there was no error, perform a SELECT * on Branches
            let query2 = "SELECT branch_id AS Branch_ID, street_address AS Street_Address, city_name AS City_Name, state_code AS State_Code, \
            zip_code AS ZIP_Code, phone_number AS Phone_Number, email_address AS Email_Address FROM Branches ORDER BY branch_id ASC;";
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                
                // If all went well, send the results of the query back.
                else

                {

                    res.send(rows);

                }
            })
        }
    })
});

// Route for DELETE operation on Branches
app.delete('/delete-branch-ajax/', function(req,res,next){

    // Parse ID from data and generate query
    let data = req.body;
    let Branch_ID = parseInt(data.id);
    let deleteBranch= `DELETE FROM Branches WHERE branch_id = ${Branch_ID};`;

    // Run the query
    db.pool.query(deleteBranch, function(error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);

        } else {

            // Request succeeded
            res.sendStatus(204);
        }
    })
});

//updateBranches is same path as update_Branches AJAX request.
app.put('/updateBranches', function(req,res,next){                                   
    let data = req.body;
  
    let Branch_ID = parseInt(data.Branch_ID);
    let Street_Address = data.Street_Address;
    let City_Name = data.City_Name;
    let State_Code = data.State_Code;
    let ZIP_Code = data.ZIP_Code;
    let Phone_Number = data.Phone_Number;
    let Email_Address = data.Email_Address;

    queryUpdateBranches = `UPDATE Branches \
    SET Street_Address = '${Street_Address}', City_Name = '${City_Name}', State_Code = '${State_Code}', ZIP_Code = '${ZIP_Code}', \
    Phone_Number = '${Phone_Number}', Email_Address = '${Email_Address}' \
    WHERE Branch_ID = ${Branch_ID}`;
    selectBranchesUpdate = "SELECT branch_id AS Branch_ID, street_address AS Street_Address, city_name AS City_Name, state_code AS State_Code, \
    zip_code AS ZIP_Code, phone_number AS Phone_Number, email_address AS Email_Address FROM Branches;"; // 
  
          // Run the 1st query
          db.pool.query(queryUpdateBranches, function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
              else
              {
                  // Run the second query
                  db.pool.query(selectBranchesUpdate, [Branch_ID], function(error, rows, fields) {
          
                      if (error) {
                          console.log(error);
                          res.sendStatus(400);
                      } else {
                          res.send(rows);
                      }
                  })
              }
})});

// Route for INSERT operation on PaymentMethods
app.post('/add-payment-method-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    let query1 = `INSERT INTO PaymentMethods (payment_method) VALUES ('${data.payment_method}');`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);

        } else {

            // If there was no error, perform a SELECT * on PaymentMethods
            let query2 = "SELECT payment_method_id AS Payment_Method_ID, payment_method as Payment_Method FROM PaymentMethods ORDER BY payment_method_id ASC;";
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);

                }

                // If all went well, send the results of the query back.
                else

                {

                    res.send(rows);

                }
            })
        }
    })
});

//updatePaymentMethod is same path as update-payment-method AJAX request.
app.put('/update-payment-method', function(req,res,next){                                   
    let data = req.body;
  
    let PaymentMethodID = parseInt(data.PaymentMethodID);
    let PaymentMethod = data.PaymentMethod;

    queryUpdatePayment = `UPDATE PaymentMethods SET payment_method = '${PaymentMethod}' WHERE payment_method_id = ${PaymentMethodID};`;
    selectPaymentUpdate = "SELECT payment_method_id AS Payment_Method_ID, payment_method as Payment_Method FROM PaymentMethods;"; // 
  
          // Run the 1st query
          db.pool.query(queryUpdatePayment, function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
              else
              {
                  // Run the second query
                  db.pool.query(selectPaymentUpdate, [PaymentMethodID], function(error, rows, fields) {
          
                      if (error) {
                          console.log(error);
                          res.sendStatus(400);
                      } else {
                          res.send(rows);
                      }
                  })
              }
})});

// Route for DELETE operation on PaymentMethods
app.delete('/delete-payment-method-ajax/', function(req,res,next){

    // Parse ID from data and generate query
    let data = req.body;
    let Payment_Method_ID = parseInt(data.id);
    let deletePaymentMethod= `DELETE FROM PaymentMethods WHERE payment_method_id = ${Payment_Method_ID};`;
  
    // Run the query
    db.pool.query(deletePaymentMethod, function(error, rows, fields) {
  
        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);

        } else {

            // Request succeeded
            res.sendStatus(204);

        }
    })
});

// Route for INSERT operation on CardInformation
app.post('/add-card-information-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    let query1 = `INSERT INTO CardInformation (first_name, last_name, street_address, city_name, state_code, zip_code, card_number, card_expiry_date, security_code, phone_number, email_address) \
    VALUES ('${data.first_name}', '${data.last_name}', '${data.street_address}', '${data.city_name}', '${data.state_code}', '${data.zip_code}', \
    '${data.card_number}', '${data.card_expiry_date}', '${data.security_code}', '${data.phone_number}', '${data.email_address}');`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);

        } else {

            // If there was no error, perform a SELECT * on Branches
            let query2 = "SELECT card_info_id AS Card_Info_ID, first_name AS First_Name, last_name AS Last_Name, street_address AS Street_Address, city_name AS City_Name, \
            state_code AS State_Code, zip_code AS ZIP_Code, card_number AS Card_Number, card_expiry_date AS Card_Expiry_Date, security_code AS Security_Code, \
            phone_number AS Phone_Number, email_address AS Email_Address FROM CardInformation ORDER BY card_info_id ASC;";
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                
                // If all went well, send the results of the query back.
                else

                {

                    res.send(rows);

                }
            })
        }
    })
});

//updateCardInformation is same path as update_Branches AJAX request.
app.put('/updateCardInformation', function(req,res,next){                                   
    let data = req.body;
  
    let Card_Info_ID = parseInt(data.Card_Info_ID);
    let First_Name = data.First_Name;
    let Last_Name = data.Last_Name;
    let Street_Address = data.Street_Address;
    let City_Name = data.City_Name;
    let State_Code = data.State_Code;
    let ZIP_Code = data.ZIP_Code;
    let Card_Number = data.Card_Number;
    let Card_Expiry_Date = data.Card_Expiry_Date;
    let Phone_Number = data.Phone_Number;
    let Email_Address = data.Email_Address;

    queryUpdateCards = `UPDATE CardInformation \
    SET First_Name = '${First_Name}', Last_Name = '${Last_Name}', Street_Address = '${Street_Address}', City_Name = '${City_Name}', \
    State_Code = '${State_Code}', ZIP_Code = '${ZIP_Code}', Card_Number = '${Card_Number}', Card_Expiry_Date = '${Card_Expiry_Date}', \
    Phone_Number = '${Phone_Number}', Email_Address = '${Email_Address}' \
    WHERE Card_Info_ID = ${Card_Info_ID}`;
    selectCardsUpdate = "SELECT card_info_id AS Card_Info_ID, first_name AS First_Name, last_name AS Last_Name, street_address AS Street_Address, \
    city_name AS City_Name, state_code AS State_Code, zip_code AS ZIP_Code, card_number AS Card_Number, card_expiry_date AS Card_Expiry_Date, \
    phone_number AS Phone_Number, email_address AS Email_Address FROM CardInformation;"; // 
  
          // Run the 1st query
          db.pool.query(queryUpdateCards, function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
              else
              {
                  // Run the second query
                  db.pool.query(selectCardsUpdate, [Card_Info_ID], function(error, rows, fields) {
          
                      if (error) {
                          console.log(error);
                          res.sendStatus(400);
                      } else {
                          res.send(rows);
                      }
                  })
              }
})});


// Route for DELETE operation on CardInformation
app.delete('/delete-card-information-ajax/', function(req,res,next){

    // Parse ID from data and generate query
    let data = req.body;
    let Card_Info_ID = parseInt(data.id);
    let deleteCardInformation= `DELETE FROM CardInformation WHERE card_info_id = ${Card_Info_ID};`;
  
    // Run the query
    db.pool.query(deleteCardInformation, function(error, rows, fields) {
  
        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);

        } else {

            // Request succeeded
            res.sendStatus(204);

        }
    })
});

// Route for INSERT operation on Drivers
app.post('/add-driver-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    let query1 = `INSERT INTO Drivers (first_name, last_name, date_of_birth, license_state_code, license_number, license_expiry_date, insurance_provider, insurance_policy_number) \
    VALUES ('${data.first_name}', '${data.last_name}', '${data.date_of_birth}', '${data.license_state_code}', '${data.license_number}', \
    '${data.license_expiry_date}', '${data.insurance_provider}', '${data.insurance_policy_number}');`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);

        } else {

            // If there was no error, perform a SELECT * on Branches
            let query2 = "SELECT driver_id AS Driver_ID, first_name AS First_Name, last_name AS Last_Name, date_of_birth AS Date_of_Birth, \
            license_state_code AS License_State_Code, license_number AS License_Number, license_expiry_date AS License_Expiry_Date, \
            insurance_provider AS Insurance_Provider, insurance_policy_number AS Insurance_Policy_Number FROM Drivers ORDER BY driver_id ASC;";
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                
                // If all went well, send the results of the query back.
                else

                {

                    res.send(rows);

                }
            })
        }
    })
});


//updateDrivers is same path as updateDrivers AJAX request.
app.put('/updateDrivers', function(req,res,next){                                   
    let data = req.body;
  
    let Driver_ID = parseInt(data.Driver_ID);
    let First_Name = data.First_Name;
    let Last_Name = data.Last_Name;
    let Date_of_Birth = data.Date_of_Birth;
    let License_State_Code = data.License_State_Code;
    let License_Number = data.License_Number;
    let License_Expiry_Date = data.License_Expiry_Date;
    let Insurance_Provider = data.Insurance_Provider;
    let Insurance_Policy_Number = data.Insurance_Policy_Number;

    queryUpdateDrivers = `UPDATE Drivers \
    SET First_Name = '${First_Name}', Last_Name = '${Last_Name}', Date_of_Birth = '${Date_of_Birth}', License_State_Code = '${License_State_Code}', \
    License_Number = '${License_Number}', License_Expiry_Date = '${License_Expiry_Date}', Insurance_Provider = '${Insurance_Provider}', Insurance_Policy_Number = '${Insurance_Policy_Number}' \
    WHERE Driver_ID = ${Driver_ID}`;
    selectDriversUpdate = "SELECT driver_id AS Driver_ID, first_name AS First_Name, last_name AS Last_Name, date_of_birth AS Date_of_Birth, \
    license_state_code AS License_State_Code, license_number AS License_Number, license_expiry_date AS License_Expiry_Date, \
    insurance_provider AS Insurance_Provider, insurance_policy_number AS Insurance_Policy_Number FROM Drivers;"; // 
  
          // Run the 1st query
          db.pool.query(queryUpdateDrivers, function(error, rows, fields){

              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);

              } else {

                  // Run the second query
                  db.pool.query(selectDriversUpdate, [Driver_ID], function(error, rows, fields) {
          
                      if (error) {

                          console.log(error);
                          res.sendStatus(400);

                      } else {

                          res.send(rows);

                      }
                  })
              }
})});


// Route for DELETE operation on Drivers
app.delete('/delete-driver-ajax/', function(req,res,next){

    // Parse ID from data and generate query
    let data = req.body;
    let Driver_ID = parseInt(data.id);
    let deleteDriver = `DELETE FROM Drivers WHERE driver_id = ${Driver_ID};`;
  
    // Run the query
    db.pool.query(deleteDriver, function(error, rows, fields) {
  
        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);

        } else {

            // Request succeeded
            res.sendStatus(204);

        }
    })
});


// Route for INSERT operation on Reservations
app.post('/add-reservation-ajax', function(req, res) {

    // Parse ID from data and generate query
    let data = req.body;
    if (data.vehicle_id === '') {
        data.vehicle_id = 'NULL';
    }

    // Create the query and run it on the database
    let createReservation = `INSERT INTO Reservations (res_begin, res_end, payment_total, payment_method_id, card_info_id, branch_id, vehicle_id) \
    VALUES ('${data.res_begin}', '${data.res_end}', ${data.payment_total}, ${data.payment_method_id}, ${data.card_info_id}, ${data.branch_id}, ${data.vehicle_id});`;
    db.pool.query(createReservation, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);

        } else {
            
            // Request succeeded
            res.send(rows);

        }
    })
});


// Route for DELETE operation on Reservations
app.delete('/delete-reservation-ajax/', function(req,res,next){

    // Parse ID from data and generate query
    let data = req.body;
    let Reservation_ID = parseInt(data.id);
    let deleteReservation = `DELETE FROM Reservations WHERE reservation_ID = ${Reservation_ID};`;
  
    // Run the query
    db.pool.query(deleteReservation, function(error, rows, fields) {
  
        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);

        } else {

            // Request succeeded
            res.sendStatus(204);

        }
    })
});


//updateReservation is same path as update_reservation AJAX request.
app.put('/updateReservation', function(req,res,next){   
    
    // Parse data and generate query
    let data = req.body;
    let Reservation_ID = parseInt(data.Reservation_ID);
    let Reservation_Begin = data.Reservation_Begin;
    let Reservation_End = data.Reservation_End;
    let Payment_Total = parseInt(data.Payment_Total);
    let Payment_Method = parseInt(data.Payment_Method);
    let Customer_Card_Information = parseInt(data.Customer_Card_Information);
    let Branch_Location = parseInt(data.Branch_Location);

    // Check for NULL value
    if (data.Rental_Vehicle === '') {
        data.Rental_Vehicle = 'NULL';
    } else {
        data.Rental_Vehicle = parseInt(data.Rental_Vehicle);
    }
    let Rental_Vehicle = data.Rental_Vehicle;
    let queryUpdateReservation = `UPDATE Reservations \
    SET res_begin = '${Reservation_Begin}', res_end = '${Reservation_End}', payment_total = ${Payment_Total}, \
    payment_method_id = ${Payment_Method}, card_info_id = ${Customer_Card_Information}, branch_id = ${Branch_Location}, vehicle_id = ${Rental_Vehicle} \
    WHERE reservation_id = ${Reservation_ID};`;
  
    // Run the query
        db.pool.query(queryUpdateReservation, function(error, rows, fields){
            if (error) {
  
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error);
                res.sendStatus(400);
            
            } else {

                // Request succeeded
                res.send(rows);
                      
            }
        })
});


// Route for INSERT operation on DriversReservations
app.post('/add-driver-reservation-ajax', function(req, res) 
{
    // Parse data and generate query
    let data = req.body;
    let createDriversReservation = `INSERT INTO DriversReservations (driver_id, reservation_id) VALUES (${data.driver_id}, ${data.reservation_id});`;

    // Create the query and run it on the database
    db.pool.query(createDriversReservation, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);

        } else {

            // Request succeeded
            res.send(rows);

        }
    })
});


// Route for DELETE operation on Reservations
app.delete('/delete-driver-reservation-ajax/', function(req,res,next){

    // Parse data and generate query
    let data = req.body;
    let Driver_Reservation_ID = parseInt(data.id);
    let deleteDriverReservation = `DELETE FROM DriversReservations WHERE driver_reservation_id = ${Driver_Reservation_ID};`;
  
    // Run the query
    db.pool.query(deleteDriverReservation, function(error, rows, fields) {
  
        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);

        } else {

            // Request succeeded
            res.sendStatus(204);

        }
    })
});


//updateDriverReservation is same path as updateDriverReservation AJAX request.
app.put('/updateDriverReservation', function(req,res,next){
    
    // Parse data and generate query
    let data = req.body;
    let Driver_Reservation_ID = parseInt(data.Driver_Reservation_ID);
    let Driver_ID = parseInt(data.Driver_ID);
    let queryUpdateDrivers = `UPDATE DriversReservations SET driver_id = ${Driver_ID} WHERE driver_reservation_id = ${Driver_Reservation_ID}`;
  
    // Run the query
    db.pool.query(queryUpdateDrivers, function(error, rows, fields){
        if (error) {
  
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);

        } else {

            // Request succeeded
            res.send(rows);

        }
    })
});


/*
    LISTENER
*/
app.listen(PORT, function() {
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});