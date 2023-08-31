/*
Adapted from CS340 Starter Application GitHub
Safonte, D & Curry, M (May 2023)
[Source] https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data
*/

function updateReservation(Reservation_ID) {

    // Get the objects we need to modify
    let updateReservationForm = document.getElementById('updateReservationForm');

    // Enable update fields
    document.getElementById("updateReservationBegin").removeAttribute("disabled");
    document.getElementById("updateReservationEnd").removeAttribute("disabled");
    document.getElementById("updatePaymentTotal").removeAttribute("disabled");
    document.getElementById("updatePaymentMethod").removeAttribute("disabled");
    document.getElementById("updateCustomerCardInformation").removeAttribute("disabled");
    document.getElementById("updateBranchLocation").removeAttribute("disabled");
    document.getElementById("updateRentalVehicle").removeAttribute("disabled");

    // Auto populate update fields
    const updateRow = document.querySelector(`[data-value="${Reservation_ID}"]`)

    document.getElementById("updateReservationID").value = Reservation_ID;

    let Reservation_Begin = updateRow.getElementsByClassName("Reservation_Begin")[0].textContent;
    document.getElementById("updateReservationBegin").value = Reservation_Begin;

    let Reservation_End = updateRow.getElementsByClassName("Reservation_End")[0].textContent;
    document.getElementById("updateReservationEnd").value = Reservation_End;

    let Payment_Total = updateRow.getElementsByClassName("Payment_Total")[0].textContent;
    document.getElementById("updatePaymentTotal").value = Payment_Total;

    let Payment_Method = updateRow.getElementsByClassName("Payment_Method")[0];
    let Payment_Method_ID = Payment_Method.getAttribute('data-PaymentMethodID');
    document.getElementById("updatePaymentMethod").value = Payment_Method_ID;

    let Customer_Card_Information = updateRow.getElementsByClassName("Customer_Card_Information")[0];
    let Customer_Card_Information_ID = Customer_Card_Information.getAttribute('data-CustomerCardInfoID');
    document.getElementById("updateCustomerCardInformation").value = Customer_Card_Information_ID;

    let Branch_Location = updateRow.getElementsByClassName("Branch_Location")[0];
    let Branch_Location_ID = Branch_Location.getAttribute('data-BranchLocationID');
    document.getElementById("updateBranchLocation").value = Branch_Location_ID;

    let Rental_Vehicle = updateRow.getElementsByClassName("Rental_Vehicle")[0];
    let Rental_Vehicle_ID = Rental_Vehicle.getAttribute('data-RentalVehicleID');
    document.getElementById("updateRentalVehicle").value = Rental_Vehicle_ID;

    // Event listener for button
    updateReservationForm.addEventListener("submit", function (e) {
   
        // Prevent the form from submitting
        e.preventDefault();

        // Get form fields we need to get data from
        let updateReservationID = document.getElementById("updateReservationID");
        let updateReservationBegin = document.getElementById("updateReservationBegin");
        let updateReservationEnd = document.getElementById("updateReservationEnd");
        let updatePaymentTotal = document.getElementById("updatePaymentTotal");
        let updatePaymentMethod = document.getElementById("updatePaymentMethod");
        let updateCustomerCardInformation = document.getElementById("updateCustomerCardInformation");
        let updateBranchLocation = document.getElementById("updateBranchLocation");
        let updateRentalVehicle = document.getElementById("updateRentalVehicle");

        // Get the values from the form fields
        let valueReservationID = updateReservationID.value;
        let valueReservationBegin = updateReservationBegin.value;
        let valueReservationEnd = updateReservationEnd.value;
        let valuePaymentTotal = updatePaymentTotal.value;
        let valuePaymentMethod = updatePaymentMethod.value;
        let valueCustomerCardInformation = updateCustomerCardInformation.value;
        let valueBranchLocation = updateBranchLocation.value;
        let valueRentalVehicle = updateRentalVehicle.value;

        // Put our data we want to send in a javascript object
        let data = {
            Reservation_ID: valueReservationID,
            Reservation_Begin: valueReservationBegin,
            Reservation_End: valueReservationEnd,
            Payment_Total: valuePaymentTotal,
            Payment_Method: valuePaymentMethod,
            Customer_Card_Information: valueCustomerCardInformation,
            Branch_Location: valueBranchLocation,
            Rental_Vehicle: valueRentalVehicle
        }
    
        // Setup our AJAX request
        var xhttp = new XMLHttpRequest();
        xhttp.open("PUT", "/updateReservation", true);
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
