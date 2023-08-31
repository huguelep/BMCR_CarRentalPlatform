/*
Adapted from CS340 Starter Application GitHub
Safonte, D & Curry, M (May 2023)
[Source] https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data
*/

function updateDriverReservation(Driver_Reservation_ID) {

    // Get the objects we need to modify
    let updateDriverReservationForm = document.getElementById('updateDriverReservationForm');

    // Enable update fields
    document.getElementById("updateDriver").removeAttribute("disabled");

    // Auto populate update fields
    const updateRow = document.querySelector(`[data-value="${Driver_Reservation_ID}"]`)

    document.getElementById("updateDriverReservationID").value = Driver_Reservation_ID;

    let Reservation_ID = updateRow.getElementsByClassName("Reservation_ID")[0].textContent;
    document.getElementById("updateReservationID").value = Reservation_ID;

    let Driver_ID = updateRow.getElementsByClassName("Driver_ID")[0].textContent;
    document.getElementById("updateDriver").value = parseInt(Driver_ID);

    // Event listener for button
    updateDriverReservationForm.addEventListener("submit", function (e) {
   
        // Prevent the form from submitting
        e.preventDefault();

        // Get form fields we need to get data from
        let updateDriverReservationID = document.getElementById("updateDriverReservationID");
        let updateDriverID = document.getElementById("updateDriver");

        // Get the values from the form fields
        let valueDriverReservationID = updateDriverReservationID.value;
        let valueDriverID = updateDriverID.value;

        // Put our data we want to send in a javascript object
        let data = {
            Driver_Reservation_ID: valueDriverReservationID,
            Driver_ID: valueDriverID
        }
    
        // Setup our AJAX request
        var xhttp = new XMLHttpRequest();
        xhttp.open("PUT", "/updateDriverReservation", true);
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