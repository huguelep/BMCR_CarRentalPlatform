/*
Adapted from CS340 Starter Application GitHub
Safonte, D & Curry, M (May 2023)
[Source] https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data
*/

// Get the objects we need to modify
let addBranchForm = document.getElementById('addBranchForm');
addBranchForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputStreetAddress = document.getElementById("insert_street_address");
    let inputCityName = document.getElementById("insert_city_name");
    let inputStateCode = document.getElementById("insert_state_code");
    let inputZIPCode = document.getElementById("insert_zip_code");
    let inputPhoneNumber = document.getElementById("insert_phone_number");
    let inputEmailAddress = document.getElementById("insert_email_address");

    // Get the values from the form fields
    let valueStreetAddress = inputStreetAddress.value;
    let valueCityName = inputCityName.value;
    let valueStateCode = inputStateCode.value;
    let valueZIPCode = inputZIPCode.value;
    let valuePhoneNumber = inputPhoneNumber.value;
    let valueEmailAddress = inputEmailAddress.value;

    // Put our data we want to send in a javascript object
    let data = {
        street_address: valueStreetAddress,
        city_name: valueCityName,
        state_code: valueStateCode,
        zip_code: valueZIPCode,
        phone_number: valuePhoneNumber,
        email_address: valueEmailAddress,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-branch-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputStreetAddress.value = '';
            inputCityName.value = '';
            inputStateCode.value = '';
            inputZIPCode.value = '';
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

addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("branches-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create new rows and cells
    let row = document.createElement("TR");
    let cellBranchID = document.createElement("TD");
    let cellStreetAddress = document.createElement("TD");
    cellStreetAddress.classList.add('Street_Address');
    let cellCityName = document.createElement("TD");
    cellCityName.classList.add('City_Name');
    let cellStateCode = document.createElement("TD");
    cellStateCode.classList.add('State_Code');
    let cellZIPCode = document.createElement("TD");
    cellZIPCode.classList.add('ZIP_Code');
    let cellPhoneNumber = document.createElement("TD");
    cellPhoneNumber.classList.add('Phone_Number');
    let cellEmailAddress = document.createElement("TD");
    cellEmailAddress.classList.add('Email_Address');
    let cellEdit = document.createElement("TD");
    let cellDelete = document.createElement("TD");

    // Fill the cells with correct data
    cellBranchID.innerText = newRow.Branch_ID;
    cellStreetAddress.innerText = newRow.Street_Address;
    cellCityName.innerText = newRow.City_Name;
    cellStateCode.innerText = newRow.State_Code;
    cellZIPCode.innerText = newRow.ZIP_Code;
    cellPhoneNumber.innerText = newRow.Phone_Number;
    cellEmailAddress.innerText = newRow.Email_Address;
    buttonEdit = document.createElement("button");
    buttonEdit.innerHTML = "Edit";
    buttonEdit.onclick = function() {
        updateBranches(newRow.Branch_ID);
        showButton('updateBranchesInformation');
    }
    buttonEdit.classList.add("editButtons");
    cellEdit.append(buttonEdit)
    buttonDelete = document.createElement("button");
    buttonDelete.innerHTML = "Delete";
    buttonDelete.onclick = function() {
        deleteBranch(newRow.Branch_ID);
    }
    buttonDelete.classList.add("cancelButtons");
    cellDelete.append(buttonDelete);

    // Add the cells to the row 
    row.appendChild(cellBranchID);
    row.appendChild(cellStreetAddress);
    row.appendChild(cellCityName);
    row.appendChild(cellStateCode);
    row.appendChild(cellZIPCode);
    row.appendChild(cellPhoneNumber);
    row.appendChild(cellEmailAddress);
    row.appendChild(cellEdit);
    row.appendChild(cellDelete);

    row.setAttribute('data-value', newRow.Branch_ID);
    
    // Add the row to the table
    currentTable.appendChild(row);
}
