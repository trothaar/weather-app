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
      console.log(weatherData);
  alert( "Load was performed." );
});
}

// Toggle between F and C

});
