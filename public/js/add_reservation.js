/*
Adapted from CS340 Starter Application GitHub
Safonte, D & Curry, M (May 2023)
[Source] https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data
*/

// Get the objects we need to modify
let addReservationForm = document.getElementById('addReservationForm');
addReservationForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputReservationBegin = document.getElementById("insert_reservation_begin");
    let inputReservationEnd = document.getElementById("insert_reservation_end");
    let inputPaymentTotal = document.getElementById("insert_payment_total");
    let inputPaymentMethod = document.getElementById("insert_payment_method");
    let inputCustomerCardInformation = document.getElementById("insert_customer_card_information");
    let inputBranchLocation = document.getElementById("insert_branch_location");
    let inputRentalVehicle = document.getElementById("insert_rental_vehicle");

    // Get the values from the form fields
    let valueReservationBegin = inputReservationBegin.value;
    let valueReservationEnd = inputReservationEnd.value;
    let valuePaymentTotal = inputPaymentTotal.value;
    let valuePaymentMethod = inputPaymentMethod.value;
    let valueCustomerCardInformation = inputCustomerCardInformation.value;
    let valueBranchLocation = inputBranchLocation.value;
    let valueRentalVehicle = inputRentalVehicle.value;

    // Put our data we want to send in a javascript object
    let data = {
        res_begin: valueReservationBegin,
        res_end: valueReservationEnd,
        payment_total: valuePaymentTotal,
        payment_method_id: valuePaymentMethod,
        card_info_id: valueCustomerCardInformation,
        branch_id: valueBranchLocation,
        vehicle_id: valueRentalVehicle
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-reservation-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Reload the page
            window.location.reload();

            // Clear the input fields for another transaction
            inputReservationBegin.value = '';
            inputReservationEnd.value = '';
            inputPaymentTotal.value = '';
            inputPaymentMethod.value = '';
            inputCustomerCardInformation.value = '';
            inputBranchLocation.value = '';
            inputRentalVehicle.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})
