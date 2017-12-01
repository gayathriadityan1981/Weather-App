
cede = 0;

if ("geolocation" in navigator) {

    navigator.geolocation.getCurrentPosition(function(position) {
        getter(position.coords.latitude, position.coords.longitude);
    });
} else {
    /* geolocation IS NOT available */
}

function getter(lat, lon) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": `https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${lon}`,
        "method": "GET",
        "headers": {
            "cache-control": "no-cache",
            "postman-token": "e38a0378-abf7-2842-b83c-942559ffa361"
        }
    }

    $.ajax(settings).done(function(response) {
        console.log(response);
        var res = response;
        cede = res['main']['temp'];
        $(".position").html(`${res['name']}, ${res['sys']['country']}`);
     
        $(".degree").html(`${res['main']['temp']}`);
        $(".tempertext").html(`${res['weather'][0]['main']}, ${res['weather'][0]['description']}`);
        $(".weather-icon").attr("src", res['weather'][0]['icon']);
        $(".weather-icon").show();
        $(".temperwind").html('Pressure <br>'+`${res['main']['pressure']}`);
        $(".temperHumidity").html('Humidity <br>'+`${res['main']['humidity']}`+'%');
        
        $(".temperwind").html('Pressure <br>'+`${res['main']['pressure']}`+' hPa');
        $(".temperWindSpeed").html('Wind Speed<br>'+`${res['wind']['speed']}`+' mps');
        $(".degree-celcius").show();
        $(".degree-c").show();
    });
}

function change() {
    if ($("#change-degree").html() == 'C') {
        $("#change-degree").html('F');
        cede = ((cede * 9) / 5) + 32;
        cede = cede.toFixed(2);
        $(".degree").html(cede);
    } else if ($("#change-degree").html() == 'F') {
        $("#change-degree").html('C');
        cede = ((cede - 32) * 5) / 9;
        cede = cede.toFixed(2);
        $(".degree").html(cede);
    }
}