const nombreDias = [
    'domingo',
    'lunes',
    'martes',
    'miércoles',
    'jueves',
    'viernes',
    'sábado',
    'domingo',
    'lunes',
    'martes',
    'miércoles',
  ];


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
    document.getElementById("txt-temp").innerHTML=Math.round((data["main"].temp)- 273.15)+"<sup>°c</sup>"
    document.getElementById("txt-banner").innerHTML=data["name"]
});



ajax_get('http://api.openweathermap.org/data/2.5/forecast?q=bogota&appid=b90510135d2590bea2fb457e60b3abff', function(data) {
    var diaActual = new Date().getDate();
    console.log(nombreDias[new Date().getDay()+3]);
    var maxd1 = 0;
    var mind1=1000;
    var maxd2 = 0;
    var mind2=1000;
    var maxd3 = 0;
    var mind3=1000;
    for (var i=0; i < data["list"].length; i++) {
        var dias=Math.round(data["list"][i].dt_txt.substr(-11,2));
        
        if((dias-diaActual)==1) {
            if (data["list"][i]['main'].temp>maxd1) {
                maxd1=Math.round((data["list"][i]['main'].temp)- 273.15)
            }
            if (data["list"][i]['main'].temp<mind1) {
                mind1=Math.round((data["list"][i]['main'].temp)- 273.15)
            }
            document.getElementById("txt-temp-item1").innerHTML=maxd1+"<sup>°c</sup> / "+mind1+"<sup>°c</sup>"
            document.getElementById("txt-dia-item1").innerHTML=nombreDias[new Date().getDay()+1]
            
            document.getElementById("txt-desc-item1").innerHTML=data["list"][i]['weather'][0].main
            document.getElementById("icon-item1").src="http://openweathermap.org/img/w/" + data["list"][i]['weather'][0].icon + ".png";
        }else if((dias-diaActual)==2) {
            if (data["list"][i]['main'].temp>maxd2) {
                maxd2=Math.round((data["list"][i]['main'].temp)- 273.15)
            }
            if (data["list"][i]['main'].temp<mind2) {
                mind2=Math.round((data["list"][i]['main'].temp)- 273.15)
            }
            document.getElementById("txt-temp-item2").innerHTML=maxd2+"<sup>°c</sup> / "+mind2+"<sup>°c</sup>"
            document.getElementById("txt-dia-item2").innerHTML=nombreDias[new Date().getDay()+2]
            document.getElementById("icon-item2").src="http://openweathermap.org/img/w/" + data["list"][i]['weather'][0].icon + ".png";
            document.getElementById("txt-desc-item2").innerHTML=data["list"][i]['weather'][0].main
            
        }
        else if((dias-diaActual)==3) {
            if (data["list"][i]['main'].temp>maxd3) {
                maxd3=Math.round((data["list"][i]['main'].temp)- 273.15)
            }
            if (data["list"][i]['main'].temp<mind3) {
                mind3=Math.round((data["list"][i]['main'].temp)- 273.15)
            }
            document.getElementById("txt-temp-item3").innerHTML=maxd3+"<sup>°c</sup> / "+mind3+"<sup>°c</sup>"
            document.getElementById("txt-dia-item3").innerHTML=nombreDias[new Date().getDay()+3]
            document.getElementById("icon-item3").src="http://openweathermap.org/img/w/" + data["list"][i]['weather'][0].icon + ".png";
            document.getElementById("txt-desc-item3").innerHTML=data["list"][i]['weather'][0].main
            
        }

    }
   
});



ajax_get('http://api.openweathermap.org/data/2.5/weather?q=paris&appid=b90510135d2590bea2fb457e60b3abff', function(data) {
    var iconcode = data["weather"][0]["icon"];
    var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
    console.log(data["weather"][0]["icon"]);
    console.log(data["weather"][0]["main"].humidity);
    document.getElementById("icon-aliado").src=iconurl;
     document.getElementById("txt-humedad-aliado").innerHTML="Humedad: "+data["main"]["humidity"]+"%"
    document.getElementById("txt-speed-aliado").innerHTML=data["wind"]["speed"]+"km/h"
    document.getElementById("txt-nombre-aliado").innerHTML=data["name"]
    document.getElementById("txt-temp-aliado").innerHTML=Math.round((data["main"].temp)- 273.15)+"<sup>°c</sup>"
    document.getElementById("txt-pais-aliado").innerHTML=data["sys"]["country"]
    // document.getElementById("txt-banner").innerHTML=data["name"]
});