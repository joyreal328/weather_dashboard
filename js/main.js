console.log('main js loaded');

var today = new Date();

var monthnames = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var month = today.getMonth();
var monthname_now = monthnames[month];
var daynames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday' ];
var day = today.getDay();
var dayname_now = daynames[day];


function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
  

var h = addZero(today.getHours());
var m = addZero(today.getMinutes());
var s = addZero(today.getSeconds());
  

document.getElementById("date").innerHTML = dayname_now + " " + monthname_now+ ' ' +today.getDate() + "," + " " + today.getUTCFullYear();
document.getElementById("time").innerHTML = h + ":" + m + ":" + s;

var name_city = "Montreal";
var units = "&units=metric";
var link_current = "https://api.openweathermap.org/data/2.5/weather?q=";
var link_hourly = "https://api.openweathermap.org/data/2.5/forecast/?q=";
var appid= " ";//please use your own appid

            $.getJSON( link_current + name_city + units + appid, function(data){

                console.log(data);
                //var icon = "http://openweathermap.org/img/w/" +data.weather[0].icon +".png";
                var temp =  Math.floor(data.main.temp) + " " + '&#8451;';
                var temp_max =  'High:' + " " + Math.floor(data.main.temp_max) + " " + '&#8451;';
                var temp_min =  'Low:' + " " + Math.floor(data.main.temp_min) + " " + '&#8451;';
                //var sky_cover = data.weather[0].main;
                var iconCode = data.weather[0].icon;
                var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
                var wind = 'Wind Speed:' + " " + data.wind.speed + " " + 'km/hr';
                var description = data.weather[0].description;
                var high_low = temp_max + " " + temp_min;
            
                $("#location").append(name_city);
                $("#current_temp").append(temp);
                $("#high_low").append(high_low);
                $("#wind_speed").append(wind);
                $("#warning").append(description);
                $("#icon").html("<img src='" + iconUrl  + "'>");

            });

            //hourly forecast
            $.getJSON(link_hourly + name_city + appid + units, 
                
                function(data) {
                    //console.log(data);
                    for( i = 0; i<10; i++) {

                        var time_hourly = data.list[i].dt_txt;
                        var temp_hourly = data.list[i].main.temp + '&#8451;';
                        var temp_max_hourly = data.list[i].main.temp_max + '&#8451;';
                        var temp_min_hourly = data.list[i].main.temp_min + '&#8451;';
                        var description_hourly = data.list[i].weather[0].description;
                        var iconCode_hourly = data.list[i].weather[0].icon;
                        var iconUrl_hourly = "http://openweathermap.org/img/w/" + iconCode_hourly + ".png";
                        
                        //<img src="http://openweathermap.org/img/w/03n.png">
                        console.log(time_hourly + " " + temp_hourly + " " + temp_max_hourly + " " + temp_min_hourly + " " + description_hourly + iconUrl_hourly);
                  
                        $("#hourly_forecast").append (
                            '<div class="small-card">' + 
                                '<p id="time_hourly">' +time_hourly + '</p>' + 
                                '<h3 id="temp_hourly">' + temp_hourly +' </h3>' + 
                                "<img src='" + iconUrl_hourly  + "'>" +
                                '<p id="description_hourly">' + description_hourly + '</p>' +
                            '</div>' 
                    );

               }
        
            });




