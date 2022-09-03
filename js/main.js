let today = new Date();
let monthnames = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let month = today.getMonth();
let monthname_now = monthnames[month];
let daynames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday' ];
let day = today.getDay();
let dayname_now = daynames[day];

function addZero(i) {
    if (i < 10) {i = "0" + i;}
    return i;
}


var h = addZero(today.getHours());
var m = addZero(today.getMinutes());
var s = addZero(today.getSeconds());

document.getElementById("date").innerHTML = ` ${monthname_now} ${today.getDate()}, ${today.getUTCFullYear()}, ${dayname_now}`;
document.getElementById("time").innerHTML = h + ":" + m + ":" + s;

window.onload = function(e){ 
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position.coords.latitude, position.coords.longitude);
    
            const mylat = position.coords.latitude;
            const mylong = position.coords.longitude;
            const APIkey = '60ec3181c0cb1b05ccb11f69f76993d7';
            const units = 'metric';
            
            let current_weather_api_link = `https://api.openweathermap.org/data/2.5/weather?lat=${mylat}&lon=${mylong}&appid=${APIkey}&units=${units}`

           fetch(current_weather_api_link) 
            .then(data => data.json()) 
            .then(data => {

                var iconCode = data.weather[0].icon;
                var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";

                console.log(data);
                $("#location").append(data.name);
                $("#current_temp").append(`${data.main.temp} &#8451;`);
                $("#feels_like").append(`Feels like: ${data.main.feels_like} &#8451;` );
                $("#icon").html("<img src='" + iconUrl  + "'>");
                $("#high").append(data.main.temp_max);
                $("#high").append(data.main.temp_min);
                $("#wind_speed").append(data.wind.speed);
                $("#warning").append(data.weather[0].description);
            }

            )
            .catch(err => console.log('Request Failed', err));
            
            let hourly_weather_api_link = `https://api.openweathermap.org/data/2.5/forecast?lat=${mylat}&lon=${mylong}&appid=${APIkey}&units=${units}`

            fetch(hourly_weather_api_link) 
            .then(data => data.json()) 
            .then(data => {

                for( i = 0; i<10; i++){
                    var time_hourly = data.list[i].dt_txt;
                    var temp_hourly = data.list[i].main.temp + '&#8451;';
                    var temp_max_hourly = data.list[i].main.temp_max + '&#8451;';
                    var temp_min_hourly = data.list[i].main.temp_min + '&#8451;';
                    var description_hourly = data.list[i].weather[0].description;
                    var iconCode_hourly = data.list[i].weather[0].icon;
                    var iconUrl_hourly = "http://openweathermap.org/img/w/" + iconCode_hourly + ".png";
                                            
                                    
                    $("#hourly_forecast").append (
                                                '<div class="small-card">' + 
                                                    '<p id="time_hourly">' +time_hourly + '</p>' + 
                                                    '<h3 id="temp_hourly">' + temp_hourly +' </h3>' + 
                                                    "<img src='" + iconUrl_hourly  + "'>" +
                                                    '<p id="description_hourly">' + description_hourly + '</p>' +
                                                '</div>' 
                                        );
                }



            })
            .catch(err => console.log('Request Failed', err));


    
          });
      } else {
        document.getElementById('unavailable').innerHTML = 'geolocation not available'
      }
  
}
