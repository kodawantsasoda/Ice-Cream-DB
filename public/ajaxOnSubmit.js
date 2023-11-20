document.getElementById('form').addEventListener('submit', function(e){
    e.preventDefault() //this intercepts the way the form submits

    fetch('/form', {
        method:'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(new FormData(this)),
    })
    .then(response => response.text())
    .then(message => {
        // Display the server response message
        document.getElementById('messageContainer').innerText = message;
      })
      .catch(error => console.error('Error submitting form:', error));

});