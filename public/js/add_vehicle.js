/*
Adapted from CS340 Starter Application GitHub
Safonte, D & Curry, M (May 2023)
[Source] https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data
*/

// Get the objects we need to modify
let addVehicleForm = document.getElementById('addVehicleForm');
addVehicleForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputMake = document.getElementById("insert_make");
    let inputModel = document.getElementById("insert_model");
    let inputProductionYear = document.getElementById("insert_production_year");
    let inputColor = document.getElementById("insert_color");
    let inputPlateNumber = document.getElementById("insert_plate_number");
    let inputVinNumber = document.getElementById("insert_vin_number");
    let inputMileage = document.getElementById("insert_mileage");

    // Get the values from the form fields
    let makeValue = inputMake.value;
    let modelValue = inputModel.value;
    let production_yearValue = inputProductionYear.value;
    let colorValue = inputColor.value;
    let plate_numberValue = inputPlateNumber.value;
    let vin_numberValue = inputVinNumber.value;
    let mileageValue = inputMileage.value;

    // Put our data we want to send in a javascript object
    let data = {
        make: makeValue,
        model: modelValue,
        production_year: production_yearValue,
        color: colorValue,
        plate_number: plate_numberValue,
        vin_number: vin_numberValue,
        mileage: mileageValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-vehicle-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputMake.value = '';
            inputModel.value = '';
            inputProductionYear.value = '';
            inputColor.value = '';
            inputPlateNumber.value = '';
            inputVinNumber.value = '';
            inputMileage.value = '';

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
    let currentTable = document.getElementById("vehicles-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create new rows and cells
    let row = document.createElement("TR");
    let vehicle_idCell = document.createElement("TD");
    let makeCell = document.createElement("TD");
    makeCell.classList.add('Make');
    let modelCell = document.createElement("TD");
    modelCell.classList.add('Model');
    let production_yearCell = document.createElement("TD");
    production_yearCell.classList.add("ProductionYear");
    let colorCell = document.createElement("TD");
    colorCell.classList.add("Color");
    let plate_numberCell = document.createElement("TD");
    plate_numberCell.classList.add("PlateNumber");
    let vin_numberCell = document.createElement("TD");
    vin_numberCell.classList.add("VinNumber");
    let mileageCell = document.createElement("TD");
    mileageCell.classList.add("Mileage");
    let editCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    vehicle_idCell.innerText = newRow.Vehicle_ID;
    makeCell.innerText = newRow.Make;
    modelCell.innerText = newRow.Model;
    production_yearCell.innerText = newRow.Production_Year;
    colorCell.innerText = newRow.Color;
    plate_numberCell.innerText = newRow.Plate_Number;
    vin_numberCell.innerText = newRow.VIN_Number;
    mileageCell.innerText = newRow.Mileage;
    editButton = document.createElement("button");
    editButton.innerHTML = "Edit";
    editButton.onclick = function() {
        updateVehicle(newRow.Vehicle_ID);
        showButton('updateVehicleInformation');
    }
    editButton.classList.add("addButtons");
    editCell.append(editButton)
    deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.onclick = function() {
        deleteVehicle(newRow.Vehicle_ID);
    }
    deleteButton.classList.add("cancelButtons");
    deleteCell.append(deleteButton);

    // Add the cells to the row 
    row.appendChild(vehicle_idCell);
    row.appendChild(makeCell);
    row.appendChild(modelCell);
    row.appendChild(production_yearCell);
    row.appendChild(colorCell);
    row.appendChild(plate_numberCell);
    row.appendChild(vin_numberCell);
    row.appendChild(mileageCell);
    row.appendChild(editCell);
    row.appendChild(deleteCell);

    row.setAttribute('data-value', newRow.Vehicle_ID);
    
    // Add the row to the table
    currentTable.appendChild(row);
}