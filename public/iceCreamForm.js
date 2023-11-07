function loadForm(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
         document.body.innerHTML = this.responseText;
        }
    };
}