// Get time and date and display on page
function startTime() {
    var today=new Date();
    var h=today.getHours();
    var m=today.getMinutes();
    var s=today.getSeconds();
    var ampm = "";
    m = checkTime(m);

    if (h > 12) {
    	h = h - 12;
    	ampm = " PM";
    } else if (h == 12){
        h = 12;
    	ampm = " AM";
    } else if (h < 12){
        ampm = " AM";
    } else {
        ampm = "PM";
    };

  if(h==0) {
    h=12;
  }

    document.getElementById('time').innerHTML = h+":"+m+ampm;
    var t = setTimeout(function(){startTime()},500);
}

function checkTime(i) {
    if (i<10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

function startDate() {
  var d = new Date();
  var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  var months = ["January", "February", "March", "April", "May", "June", "July", "August",
                "September", "October", "November", "December"]
  document.getElementById("date").innerHTML = days[d.getDay()]+", "+months[d.getMonth()]+" "+d.getDate()+", "+d.getFullYear();
}

/* Begin jquery */
$(document).ready(function(){
  getLocation();

// Get the user's location using GEO IP API to fetch latitutde and longitude
function getLocation() {
  $.get('http://ip-api.com/json', function (loc) {
      $('#city').text(loc.city + ', ' + loc.region);
      getWeather(loc.lat, loc.lon, loc.countryCode);
    })
    .fail(function (err) {
      getWeather();
  });
}
// Get weather and update background image/icon
function getWeather(lat, lon, countryCode) {
  var weatherAPI = 'http://api.openweathermap.org/data/2.5/weather?lat=' +
    lat + '&lon=' + lon + '&units=imperial' + '&type=accurate' +
    '&APPID=15bbcb4fa894e02d487f4695efcf4ed2';
    $.get( weatherAPI, function(weatherData) {
      var temp = weatherData.main.temp.toFixed(0);
      var tempC = ((temp - 32) * (5 / 9)).toFixed(0);


   var city = weatherData.name;
   var condition = weatherData.weather[0].description;
   var id = weatherData.weather[0].id;
   var main = weatherData.weather[0].main;
   var speed = Number((weatherData.wind.speed * 0.86897624190816).toFixed(1));
   var deg = weatherData.wind.deg;
   var countryShort = weatherData.sys.country;

   //Display conditions and icon on page
   $('#condition').text(main);
   $('#weather-icon').html("<img src='http://openweathermap.org/img/w/" + weatherData.weather[0].icon + ".png' alt='Icon depicting current weather.'>");


   //Determine F or C based on country and display appropriate temp on button.
    var fahrenheit = ['US', 'BS', 'BZ', 'KY', 'PL'];
    if (fahrenheit.indexOf(countryShort) > -1) {
      $('#convert-button').val(temp + '° F');
    } else {
      $('#convert-button').val(tempC + '° C');
    }

//Allow user to toggle between F and C
     $('#convert-button').click(function () {
     if ($('#convert-button').val().indexOf('F') > -1) {
       $('#convert-button').val(tempC + '° C');
     } else {
       $('#convert-button').val(temp + '° F');
     }
   });

});
}

});
