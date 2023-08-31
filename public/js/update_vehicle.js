/*
Adapted from CS340 Starter Application GitHub
Safonte, D & Curry, M (May 2023)
[Source] https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data
*/


function updateVehicle(Vehicle_ID) {

    // Get the object we need to modify
    let updateVehicleForm = document.getElementById('updateVehicleForm');

    // Enable update fields
    document.getElementById("updateMake").removeAttribute("disabled");
    document.getElementById("updateModel").removeAttribute("disabled");
    document.getElementById("updateProductionYear").removeAttribute("disabled");
    document.getElementById("updateColor").removeAttribute("disabled");
    document.getElementById("updatePlateNumber").removeAttribute("disabled");
    document.getElementById("updateVinNumber").removeAttribute("disabled");
    document.getElementById("updateMileage").removeAttribute("disabled");
    document.getElementById("updateVehicleInformation").removeAttribute("disabled"); // button

    // Auto populate update fields
    const updateRow = document.querySelector(`[data-value="${Vehicle_ID}"]`);

    document.getElementById("updateVehicleID").value = Vehicle_ID;
    let Make = updateRow.getElementsByClassName("Make")[0].textContent;
    document.getElementById("updateMake").value = Make;

    let Model = updateRow.getElementsByClassName("Model")[0].textContent;
    document.getElementById("updateModel").value = Model;

    let ProductionYear = updateRow.getElementsByClassName("ProductionYear")[0].textContent;
    document.getElementById("updateProductionYear").value = ProductionYear;

    let Color = updateRow.getElementsByClassName("Color")[0].textContent;
    document.getElementById("updateColor").value = Color;

    let PlateNumber = updateRow.getElementsByClassName("PlateNumber")[0].textContent;
    document.getElementById("updatePlateNumber").value = PlateNumber;

    let VinNumber= updateRow.getElementsByClassName("VinNumber")[0].textContent;
    document.getElementById("updateVinNumber").value = VinNumber;

    let Mileage = updateRow.getElementsByClassName("Mileage")[0].textContent;
    document.getElementById("updateMileage").value = Mileage;

    // Event listener for button
    updateVehicleForm.addEventListener("submit", function (e) {
   
        // Prevent the form from submitting with nothing
        e.preventDefault();

        // Get form fields we need to get data from
        let updateVehicleID = document.getElementById("updateVehicleID");
        let updateMake = document.getElementById("updateMake");
        let updateModel = document.getElementById("updateModel");
        let updateProductionYear = document.getElementById("updateProductionYear");
        let updateColor = document.getElementById("updateColor");
        let updatePlateNumber = document.getElementById("updatePlateNumber");
        let updateVinNumber = document.getElementById("updateVinNumber");
        let updateMileage = document.getElementById("updateMileage");

        // Get the values from the form fields
        let vehicleIDValue = updateVehicleID.value;
        let makeValue = updateMake.value;
        let modelValue = updateModel.value;
        let production_yearValue = updateProductionYear.value;
        let colorValue = updateColor.value;
        let plate_numberValue = updatePlateNumber.value;
        let vin_numberValue = updateVinNumber.value;
        let mileageValue = updateMileage.value;

        // Put our data we want to send in a javascript object
        let data = {
            vehicleID: vehicleIDValue,
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
        xhttp.open("PUT", "/updateVehicle", true);
        xhttp.setRequestHeader("Content-type", "application/json");

        // Tell our AJAX request how to resolve
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {

                // Reload page
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
