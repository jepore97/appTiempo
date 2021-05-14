function ajax_get(url, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            try {
                var data = JSON.parse(xmlhttp.responseText);
            } catch(err) {
                console.log(err.message + " in " + xmlhttp.responseText);
                return;
            }
            callback(data);
        }
    };
 
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

ajax_get('http://api.openweathermap.org/data/2.5/weather?q=Bogota&appid=b90510135d2590bea2fb457e60b3abff', function(data) {
    var iconcode = data["weather"][0]["icon"];
    var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
    document.getElementById("icon-icon").src=iconurl;
    document.getElementById("txt-icon").innerHTML=data["weather"][0]["main"]
    document.getElementById("txt-temp").innerHTML=data["main"].temp+"°"
    document.getElementById("txt-banner").innerHTML=data["name"]
});



ajax_get('http://api.openweathermap.org/data/2.5/forecast?q=bogota&appid=b90510135d2590bea2fb457e60b3abff', function(data) {
    for (var i=0; i < data["list"].length; i++) {
        console.log(data["list"][i].dt_txt)
    }
   
});