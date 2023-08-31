/*
Adapted from CS340 Starter Application GitHub
Safonte, D & Curry, M (May 2023)
[Source] https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data
*/

function updateDriver(Driver_ID) {

    // Get the objects we need to modify
    let updateDriversForm = document.getElementById('updateDriversForm');

    // Enable update fields
    document.getElementById("updateFirst_Name").removeAttribute("disabled");
    document.getElementById("updateLast_Name").removeAttribute("disabled");
    document.getElementById("updateDate_of_Birth").removeAttribute("disabled");
    document.getElementById("updateLicense_State_Code").removeAttribute("disabled");
    document.getElementById("updateLicense_Number").removeAttribute("disabled");
    document.getElementById("updateLicense_Expiry_Date").removeAttribute("disabled");
    document.getElementById("updateInsurance_Provider").removeAttribute("disabled");
    document.getElementById("updateInsurance_Policy_Number").removeAttribute("disabled");
    document.getElementById("updateDriverInformation").removeAttribute("disabled");

    // Auto populate update fields
    const updateRow = document.querySelector(`[data-value="${Driver_ID}"]`)

    document.getElementById("updateDriver_ID").value = Driver_ID;
    let First_Name = updateRow.getElementsByClassName("First_Name")[0].textContent;
    document.getElementById("updateFirst_Name").value = First_Name;

    let Last_Name = updateRow.getElementsByClassName("Last_Name")[0].textContent;
    document.getElementById("updateLast_Name").value = Last_Name;

    let Date_of_Birth = updateRow.getElementsByClassName("Date_of_Birth")[0].textContent;
    document.getElementById("updateDate_of_Birth").value = Date_of_Birth;

    let License_State_Code = updateRow.getElementsByClassName("License_State_Code")[0].textContent;
    document.getElementById("updateLicense_State_Code").value = License_State_Code;

    let License_Number = updateRow.getElementsByClassName("License_Number")[0].textContent;
    document.getElementById("updateLicense_Number").value = License_Number;

    let License_Expiry_Date= updateRow.getElementsByClassName("License_Expiry_Date")[0].textContent;
    document.getElementById("updateLicense_Expiry_Date").value = License_Expiry_Date;

    let Insurance_Provider= updateRow.getElementsByClassName("Insurance_Provider")[0].textContent;
    document.getElementById("updateInsurance_Provider").value = Insurance_Provider;

    let Insurance_Policy_Number= updateRow.getElementsByClassName("Insurance_Policy_Number")[0].textContent;
    document.getElementById("updateInsurance_Policy_Number").value = Insurance_Policy_Number;

    // Event listener for button
    updateDriversForm.addEventListener("submit", function (e) {
   
        // Prevent the form from submitting
        e.preventDefault();

        // Get form fields we need to get data from
        let updateDriver_ID = document.getElementById("updateDriver_ID");
        let updateFirst_Name = document.getElementById("updateFirst_Name");
        let updateLast_Name = document.getElementById("updateLast_Name");
        let updateDate_of_Birth = document.getElementById("updateDate_of_Birth");
        let updateLicense_State_Code = document.getElementById("updateLicense_State_Code");
        let updateLicense_Number = document.getElementById("updateLicense_Number");
        let updateLicense_Expiry_Date = document.getElementById("updateLicense_Expiry_Date");
        let updateInsurance_Provider = document.getElementById("updateInsurance_Provider");
        let updateInsurance_Policy_Number = document.getElementById("updateInsurance_Policy_Number");

        // Get the values from the form fields
        let Driver_IDValue = updateDriver_ID.value;
        let First_NameValue = updateFirst_Name.value;
        let Last_NameValue = updateLast_Name.value;
        let DOBValue = updateDate_of_Birth.value;
        let License_State_CodeValue = updateLicense_State_Code.value;
        let License_NumberValue = updateLicense_Number.value;
        let License_Expiry_DateValue = updateLicense_Expiry_Date.value;
        let Insurance_ProviderValue = updateInsurance_Provider.value;
        let Insurance_Policy_NumberValue = updateInsurance_Policy_Number.value;

        // Put our data we want to send in a javascript object
        let data = {
            Driver_ID: Driver_IDValue,
            First_Name: First_NameValue,
            Last_Name: Last_NameValue,
            Date_of_Birth: DOBValue,
            License_State_Code: License_State_CodeValue,
            License_Number: License_NumberValue,
            License_Expiry_Date: License_Expiry_DateValue,
            Insurance_Provider: Insurance_ProviderValue,
            Insurance_Policy_Number: Insurance_Policy_NumberValue
        }
    
        // Setup our AJAX request
        var xhttp = new XMLHttpRequest();
        xhttp.open("PUT", "/updateDrivers", true);
        xhttp.setRequestHeader("Content-type", "application/json");

        // Tell our AJAX request how to resolve
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {

                // Reload the page
                window.location.reload();
            }
            else if (xhttp.readyState == 4 && xhttp.status != 200) {
                console.log("There was an error with the input.")
            }
        }

        // Send the request and wait for the response
        xhttp.send(JSON.stringify(data));
    })
}
