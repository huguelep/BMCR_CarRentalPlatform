/*
Adapted from CS340 Starter Application GitHub
Safonte, D & Curry, M (May 2023)
[Source] https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data
*/

// Get the objects we need to modify
let addDriverForm = document.getElementById('addDriverForm');
addDriverForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputFirstName = document.getElementById("insert_first_name");
    let inputLastName = document.getElementById("insert_last_name");
    let inputDateofBirth = document.getElementById("insert_date_of_birth");
    let inputLicenseStateCode = document.getElementById("insert_license_state_code");
    let inputLicenseNumber = document.getElementById("insert_license_number");
    let inputLicenseExpiryDate = document.getElementById("insert_license_expiry_date");
    let inputInsuranceProvider = document.getElementById("insert_insurance_provider");
    let inputInsurancePolicyNumber = document.getElementById("insert_insurance_policy_number");

    // Get the values from the form fields
    let valueFirstName = inputFirstName.value;
    let valueLastName = inputLastName.value;
    let valueDateofBirth = inputDateofBirth.value;
    let valueLicenseStateCode = inputLicenseStateCode.value;
    let valueLicenseNumber = inputLicenseNumber.value;
    let valueLicenseExpiryDate = inputLicenseExpiryDate.value;
    let valueInsuranceProvider = inputInsuranceProvider.value;
    let valueInsurancePolicyNumber = inputInsurancePolicyNumber.value;

    // Put our data we want to send in a javascript object
    let data = {
        first_name: valueFirstName,
        last_name: valueLastName,
        date_of_birth: valueDateofBirth,
        license_state_code: valueLicenseStateCode,
        license_number: valueLicenseNumber,
        license_expiry_date: valueLicenseExpiryDate,
        insurance_provider: valueInsuranceProvider,
        insurance_policy_number: valueInsurancePolicyNumber
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-driver-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Reload the page
            window.location.reload();

            // Clear the input fields for another transaction
            inputFirstName.value = '';
            inputLastName.value = '';
            inputDateofBirth.value = '';
            inputLicenseStateCode.value = '';
            inputLicenseNumber.value = '';
            inputLicenseExpiryDate.value = '';
            inputInsuranceProvider.value = '';
            inputInsurancePolicyNumber.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})
