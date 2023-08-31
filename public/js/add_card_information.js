/*
Adapted from CS340 Starter Application GitHub
Safonte, D & Curry, M (May 2023)
[Source] https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data
*/

// Get the objects we need to modify
let addCardInformationForm = document.getElementById('addCardInformationForm');
addCardInformationForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputFirstName = document.getElementById("insert_first_name");
    let inputLastName = document.getElementById("insert_last_name");
    let inputStreetAddress = document.getElementById("insert_street_address");
    let inputCityName = document.getElementById("insert_city_name");
    let inputStateCode = document.getElementById("insert_state_code");
    let inputZIPCode = document.getElementById("insert_zip_code");
    let inputCardNumber = document.getElementById("insert_card_number");
    let inputCardExpiryDate = document.getElementById("insert_card_expiry_date");
    let inputSecurityCode = document.getElementById("insert_security_code");
    let inputPhoneNumber = document.getElementById("insert_phone_number");
    let inputEmailAddress = document.getElementById("insert_email_address");

    // Get the values from the form fields
    let valueFirstName = inputFirstName.value;
    let valueLastName = inputLastName.value;
    let valueStreetAddress = inputStreetAddress.value;
    let valueCityName = inputCityName.value;
    let valueStateCode = inputStateCode.value;
    let valueZIPCode = inputZIPCode.value;
    let valueCardNumber = inputCardNumber.value;
    let valueCardExpiryDate = inputCardExpiryDate.value;
    let valueSecurityCode = inputSecurityCode.value;
    let valuePhoneNumber = inputPhoneNumber.value;
    let valueEmailAddress = inputEmailAddress.value;

    // Put our data we want to send in a javascript object
    let data = {
        first_name: valueFirstName,
        last_name: valueLastName,
        street_address: valueStreetAddress,
        city_name: valueCityName,
        state_code: valueStateCode,
        zip_code: valueZIPCode,
        card_number: valueCardNumber,
        card_expiry_date: valueCardExpiryDate,
        security_code: valueSecurityCode,
        phone_number: valuePhoneNumber,
        email_address: valueEmailAddress
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-card-information-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Reload the page
            window.location.reload();

            // Clear the input fields for another transaction
            inputFirstName.value = '';
            inputLastName.value = '';
            inputStreetAddress.value = '';
            inputCityName.value = '';
            inputStateCode.value = '';
            inputZIPCode.value = '';
            inputCardNumber.value = '';
            inputCardExpiryDate.value = '';
            inputSecurityCode.value = '';
            inputPhoneNumber.value = '';
            inputEmailAddress.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})
