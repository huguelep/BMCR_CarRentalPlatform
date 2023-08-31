/*
Adapted from CS340 Starter Application GitHub
Safonte, D & Curry, M (May 2023)
[Source] https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data
*/

function updateCardInformation(Card_Info_ID) {

    // Get the objects we need to modify
    let updateCardInformationForm = document.getElementById('updateCardInformationForm');

    // Enable update fields
    document.getElementById("updateFirst_Name").removeAttribute("disabled");
    document.getElementById("updateLast_Name").removeAttribute("disabled");
    document.getElementById("updateStreet_Address").removeAttribute("disabled");
    document.getElementById("updateCity_Name").removeAttribute("disabled");
    document.getElementById("updateState_Code").removeAttribute("disabled");
    document.getElementById("updateZIP_Code").removeAttribute("disabled");
    document.getElementById("updateCard_Number").removeAttribute("disabled");
    document.getElementById("updateExpiryDate").removeAttribute("disabled");
    document.getElementById("updateSecurity_Code").removeAttribute("disabled");
    document.getElementById("updatePhone_Number").removeAttribute("disabled");
    document.getElementById("updateEmail_Address").removeAttribute("disabled");
    document.getElementById("updateCardInformationButton").removeAttribute("disabled"); // button

    // Auto populate update fields
    const updateRow = document.querySelector(`[data-value="${Card_Info_ID}"]`)

    document.getElementById("updateCard_Info_ID").value = Card_Info_ID;
    let First_Name = updateRow.getElementsByClassName("First_Name")[0].textContent;
    document.getElementById("updateFirst_Name").value = First_Name;

    let Last_Name = updateRow.getElementsByClassName("Last_Name")[0].textContent;
    document.getElementById("updateLast_Name").value = Last_Name;

    let Street_Address = updateRow.getElementsByClassName("Street_Address")[0].textContent;
    document.getElementById("updateStreet_Address").value = Street_Address;

    let City_Name = updateRow.getElementsByClassName("City_Name")[0].textContent;
    document.getElementById("updateCity_Name").value = City_Name;

    let State_Code = updateRow.getElementsByClassName("State_Code")[0].textContent;
    document.getElementById("updateState_Code").value = State_Code;

    let ZIP_Code = updateRow.getElementsByClassName("ZIP_Code")[0].textContent;
    document.getElementById("updateZIP_Code").value = ZIP_Code;

    let Card_Number = updateRow.getElementsByClassName("Card_Number")[0].textContent;
    document.getElementById("updateCard_Number").value = Card_Number;

    let Card_Expiry_Date = updateRow.getElementsByClassName("Card_Expiry_Date")[0].textContent;
    document.getElementById("updateExpiryDate").value = Card_Expiry_Date;

    let Security_Code = updateRow.getElementsByClassName("Security_Code")[0].textContent;
    document.getElementById("updateSecurity_Code").value = Security_Code;

    let Phone_Number = updateRow.getElementsByClassName("Phone_Number")[0].textContent;
    document.getElementById("updatePhone_Number").value = Phone_Number;

    let Email_Address= updateRow.getElementsByClassName("Email_Address")[0].textContent;
    document.getElementById("updateEmail_Address").value = Email_Address;

    // Event listener for button
    updateCardInformationForm.addEventListener("submit", function (e) {
   
        // Prevent the form from submitting
        e.preventDefault();

        // Get form fields we need to get data from
        let updateCard_Info_ID = document.getElementById("updateCard_Info_ID");
        let updateFirst_Name = document.getElementById("updateFirst_Name");
        let updateLast_Name = document.getElementById("updateLast_Name");
        let updateStreet_Address = document.getElementById("updateStreet_Address");
        let updateCity_Name = document.getElementById("updateCity_Name");
        let updateState_Code = document.getElementById("updateState_Code");
        let updateZIP_Code = document.getElementById("updateZIP_Code");
        let updateCard_Number = document.getElementById("updateCard_Number");
        let updateExpiryDate = document.getElementById("updateExpiryDate");
        let updateSecurity_Code = document.getElementById("updateSecurity_Code");
        let updatePhone_Number = document.getElementById("updatePhone_Number");
        let updateEmail_Address = document.getElementById("updateEmail_Address");


        // Get the values from the form fields
        let Card_Info_IDValue = updateCard_Info_ID.value;
        let First_NameValue = updateFirst_Name.value;
        let Last_NameValue = updateLast_Name.value;
        let Street_AddressValue = updateStreet_Address.value;
        let City_NameValue = updateCity_Name.value;
        let State_CodeValue = updateState_Code.value;
        let ZIP_CodeValue = updateZIP_Code.value;
        let Card_NumberValue = updateCard_Number.value;
        let Expiry_DateValue = updateExpiryDate.value;
        let Security_CodeValue = updateSecurity_Code.value;
        let Phone_NumberValue = updatePhone_Number.value;
        let Email_AddressValue = updateEmail_Address.value;

        // Put our data we want to send in a javascript object
        let data = {
            Card_Info_ID: Card_Info_IDValue,
            First_Name: First_NameValue,
            Last_Name: Last_NameValue,
            Street_Address: Street_AddressValue,
            City_Name: City_NameValue,
            State_Code: State_CodeValue,
            ZIP_Code: ZIP_CodeValue,
            Card_Number: Card_NumberValue,
            Card_Expiry_Date: Expiry_DateValue,
            Security_Code: Security_CodeValue,
            Phone_Number: Phone_NumberValue,
            Email_Address: Email_AddressValue
        }
    
        // Setup our AJAX request
        var xhttp = new XMLHttpRequest();
        xhttp.open("PUT", "/updateCardInformation", true);
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
