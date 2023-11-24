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
        // Assuming each customer object has 'firstName', 'lastName', and 'iceCream' properties
        let popupContent = '<ul>';
        customers.forEach(customer => {
            popupContent += `<li>${customer.firstName} - ${customer.lastName} - ${customer.iceCream}</li>`
        });
        popupContent += '</ul>';
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