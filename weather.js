/* Display Current Date & Time */
/*
tday=new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
tmonth=new Array("January","February","March","April","May","June","July","August","September","October","November","December");

function GetClock(){
var d=new Date();
var nday=d.getDay(),nmonth=d.getMonth(),ndate=d.getDate(),nyear=d.getYear();
if(nyear<1000) nyear+=1900;
var nhour=d.getHours(),nmin=d.getMinutes(),ap;
if(nhour==0){ap=" AM";nhour=12;}
else if(nhour<12){ap=" AM";}
else if(nhour==12){ap=" PM";}
else if(nhour>12){ap=" PM";nhour-=12;}

if(nmin<=9) nmin="0"+nmin;
document.getElementById('clockbox').innerHTML=""+tday[nday]+", "+tmonth[nmonth]+" "+ndate+", "+nyear+" <BR> "+nhour+":"+nmin+ap+"";
}
function startClock(){
GetClock();
setInterval(GetClock,1000);
} */

/* Begin jquery */
$(document).ready(function(){
  getLocation();

// Get the user's location using GEO IP API to fetch latitutde and longitude
function getLocation() {
  $.get('http://ip-api.com/json', function (loc) {
      $('#city').text(loc.city + ', ' + loc.region + ', ' + loc.zip + ', ' + loc.country);
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
   console.log(condition);
   var id = weatherData.weather[0].id;
   var main = weatherData.weather[0].main;
   console.log(main);
   console.log(id);
   var speed = Number((weatherData.wind.speed * 0.86897624190816).toFixed(1));
   var deg = weatherData.wind.deg;
   var countryShort = weatherData.sys.country;
   console.log(countryShort);

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

// Toggle between F and C

});
