/*
Adapted from CS340 Starter Application GitHub
Safonte, D & Curry, M (May 2023)
[Source] https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data
*/

// Get the objects we need to modify
let addPaymentMethodForm = document.getElementById('addPaymentMethodForm');
addPaymentMethodForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputPaymentMethod = document.getElementById("insert_payment_method");

    // Get the values from the form fields
    let valuePaymentMethod = inputPaymentMethod.value;

    // Put our data we want to send in a javascript object
    let data = {
        payment_method: valuePaymentMethod,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-payment-method-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputPaymentMethod.value = '';

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
    let currentTable = document.getElementById("payment-methods-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create new rows and cells
    let row = document.createElement("TR");
    let cellPaymentMethodID = document.createElement("TD");
    let cellPaymentMethod = document.createElement("TD");
    cellPaymentMethod.classList.add('Payment_Method');
    let cellEdit = document.createElement("TD");
    let cellDelete = document.createElement("TD");

    // Fill the cells with correct data
    cellPaymentMethodID.innerText = newRow.Payment_Method_ID;
    cellPaymentMethod.innerText = newRow.Payment_Method;
    buttonEdit = document.createElement("button");
    buttonEdit.innerHTML = "Edit";
    buttonEdit.onclick = function() {
        updatePayment(newRow.Payment_Method_ID);
        showButton('updatePaymentInformation');
    }
    buttonEdit.classList.add("editButtons");
    cellEdit.append(buttonEdit)
    buttonDelete = document.createElement("button");
    buttonDelete.innerHTML = "Delete";
    buttonDelete.onclick = function() {
        deletePaymentMethod(newRow.Payment_Method_ID);
    }
    buttonDelete.classList.add("cancelButtons");
    cellDelete.append(buttonDelete);

    // Add the cells to the row 
    row.appendChild(cellPaymentMethodID);
    row.appendChild(cellPaymentMethod);
    row.appendChild(cellEdit);
    row.appendChild(cellDelete);

    row.setAttribute('data-value', newRow.Payment_Method_ID);
    
    // Add the row to the table
    currentTable.appendChild(row);
}