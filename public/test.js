$(document).ready(function() {
    $('#showCustomerInfo').on('click', function() {
        $.ajax({
            type: 'GET',
            url: '/taco', // Update with your server route
            success: function(data) {
                displayCustomerInfo(data);
            },
            error: function(error) {
                console.error('Error fetching customer info:', error);
            }
        });
    });

    function displayCustomerInfo(customers) {
        document.getElementById("viewCustomer").style.display = "flex"
        // Assuming each customer object has 'firstName', 'lastName', and 'iceCream' properties
        let popupContent = '<table><tr><th>First Name</th><th>Last Name</th><th>Ice Cream</th></tr>';
        customers.forEach(customer => {
            popupContent += `<tr><td>${customer.firstName}</td><td>${customer.lastName}</td><td>${customer.iceCream}</td></tr>`
        });
        popupContent += '</table>';
        popupContent += '<button id="closeButton">Close</button>';

        // Update the popup content with the received data
        $('#viewCustomer').html(popupContent);
        // Show the popup
        $('#viewCustomer').show();

        $('#closeButton').on('click', function() {
            $('#viewCustomer').hide();
        });
    }
});