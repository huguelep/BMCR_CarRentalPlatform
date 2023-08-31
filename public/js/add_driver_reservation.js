/*
Adapted from CS340 Starter Application GitHub
Safonte, D & Curry, M (May 2023)
[Source] https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data
*/

// Get the objects we need to modify
let addDriverReservationForm = document.getElementById('addDriverReservationForm');
addDriverReservationForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputDriver = document.getElementById("insert_Driver");
    let inputReservation = document.getElementById("Reservation_ID");

    // Get the values from the form fields
    let valueDriverID = parseInt(inputDriver.value);
    let valueReservationID = parseInt(inputReservation.value);

    // Put our data we want to send in a javascript object
    let data = {
        driver_id: valueDriverID,
        reservation_id: valueReservationID
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-driver-reservation-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Reload the page
            window.location.reload();

            // Clear the input fields for another transaction
            inputDriver.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})
