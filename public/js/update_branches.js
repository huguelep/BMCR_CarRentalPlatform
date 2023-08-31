/*
Adapted from CS340 Starter Application GitHub
Safonte, D & Curry, M (May 2023)
[Source] https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data
*/

function updateBranches(Branch_ID) {

    // Get the objects we need to modify
    let updateBranchesForm = document.getElementById('updateBranchesForm');

    // Enable update fields
    document.getElementById("updateStreet_Address").removeAttribute("disabled");
    document.getElementById("updateCity_Name").removeAttribute("disabled");
    document.getElementById("updateState_Code").removeAttribute("disabled");
    document.getElementById("updateZIP_Code").removeAttribute("disabled");
    document.getElementById("updatePhone_Number").removeAttribute("disabled");
    document.getElementById("updateEmail_Address").removeAttribute("disabled");
    document.getElementById("updateBranchesInformation").removeAttribute("disabled"); // button

    // Auto populate update fields
    const updateRow = document.querySelector(`[data-value="${Branch_ID}"]`)

    document.getElementById("updateBranch_ID").value = Branch_ID;
    let Street_Address = updateRow.getElementsByClassName("Street_Address")[0].textContent;
    document.getElementById("updateStreet_Address").value = Street_Address;

    let City_Name = updateRow.getElementsByClassName("City_Name")[0].textContent;
    document.getElementById("updateCity_Name").value = City_Name;

    let State_Code = updateRow.getElementsByClassName("State_Code")[0].textContent;
    document.getElementById("updateState_Code").value = State_Code;

    let ZIP_Code = updateRow.getElementsByClassName("ZIP_Code")[0].textContent;
    document.getElementById("updateZIP_Code").value = ZIP_Code;

    let Phone_Number = updateRow.getElementsByClassName("Phone_Number")[0].textContent;
    document.getElementById("updatePhone_Number").value = Phone_Number;

    let Email_Address= updateRow.getElementsByClassName("Email_Address")[0].textContent;
    document.getElementById("updateEmail_Address").value = Email_Address;

    // Event listener for button
    updateBranchesForm.addEventListener("submit", function (e) {
   
        // Prevent the form from submitting
        e.preventDefault();

        // Get form fields we need to get data from
        let updateBranch_ID = document.getElementById("updateBranch_ID");
        let updateStreet_Address = document.getElementById("updateStreet_Address");
        let updateCity_Name = document.getElementById("updateCity_Name");
        let updateState_Code = document.getElementById("updateState_Code");
        let updateZIP_Code = document.getElementById("updateZIP_Code");
        let updatePhone_Number = document.getElementById("updatePhone_Number");
        let updateEmail_Address = document.getElementById("updateEmail_Address");

        // Get the values from the form fields
        let Branch_IDValue = updateBranch_ID.value;
        let Street_AddressValue = updateStreet_Address.value;
        let City_NameValue = updateCity_Name.value;
        let State_CodeValue = updateState_Code.value;
        let ZIP_CodeValue = updateZIP_Code.value;
        let Phone_NumberValue = updatePhone_Number.value;
        let Email_AddressValue = updateEmail_Address.value;
    
        // Put our data we want to send in a javascript object
        let data = {
            Branch_ID: Branch_IDValue,
            Street_Address: Street_AddressValue,
            City_Name: City_NameValue,
            State_Code: State_CodeValue,
            ZIP_Code: ZIP_CodeValue,
            Phone_Number: Phone_NumberValue,
            Email_Address: Email_AddressValue
        }
    
        // Setup our AJAX request
        var xhttp = new XMLHttpRequest();
        xhttp.open("PUT", "/updateBranches", true);
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
