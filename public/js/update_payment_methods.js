/*
Adapted from CS340 Starter Application GitHub
Safonte, D & Curry, M (May 2023)
[Source] https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data
*/

function updatePayment(Payment_Method_ID) {

    // Get the objects we need to modify
    let updatePaymentForm = document.getElementById('updatePaymentMethodForm');

    // Enable update fields
    document.getElementById("updatePayment_Method").removeAttribute("disabled");
    document.getElementById("updatePaymentInformation").removeAttribute("disabled");

    // Auto populate update fields
    const updateRow = document.querySelector(`[data-value="${Payment_Method_ID}"]`);

    document.getElementById("UpdatePayment_Method_ID").value = Payment_Method_ID;
    let PaymentMethod = updateRow.getElementsByClassName("Payment_Method")[0].textContent;
    document.getElementById("updatePayment_Method").value = PaymentMethod;

    // Event listener for button
    updatePaymentForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
        e.preventDefault();

        // Get form fields we need to get data from
        let updatePaymentMethodID = document.getElementById("UpdatePayment_Method_ID");
        let updatePaymentMethod = document.getElementById("updatePayment_Method");

        // Get the values from the form fields
        let PaymentMethodIDValue = updatePaymentMethodID.value;
        let PaymentMethodValue = updatePaymentMethod.value;
    
        // Put our data we want to send in a javascript object
        let data = {
            PaymentMethodID: PaymentMethodIDValue,
            PaymentMethod: PaymentMethodValue
        }
    
        // Setup our AJAX request
        var xhttp = new XMLHttpRequest();
        xhttp.open("PUT", "/update-payment-method", true);
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
