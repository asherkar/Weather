var APPID = "cf1a49f30b74f8861edeabfbe336bee6";
var temp;
var wind;
var direction;
var loc;
var humidity;
var icon;
var forecastTime;
var forecastIcon;
var forecastHumid;
var forecastTemp;
var forecastWind;
var forecastDirection;
var forecastCity;

function updateByCity(city) {
	var url = "http://api.openweathermap.org/data/2.5/weather?" +
	"q=" + city + "&units=metric"+
	"&APPID=" + APPID;
	sendRequest(url);
}

function updateF(city){
	var url = "http://api.openweathermap.org/data/2.5/forecast?" +
	"q=" + city + "&units=metric"+
	"&APPID=" + APPID;
	getF(url);
}

function sendRequest(url){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
			var data = JSON.parse(xmlhttp.responseText);
			var weather = {};
			weather.icon = data.weather[0].id;
			weather.humidity = data.main.humidity;
			weather.wind = data.wind.speed;
			weather.direction = data.wind.deg;
			weather.temp = Math.round(data.main.temp);
			weather.loc = data.name;
			update(weather);
		}
	};

	xmlhttp.open("GET",url,true);
	xmlhttp.send();
}




function update(weather){
	temp.innerHTML = weather.temp;
// 	document.getElementById("toggleC").onclick = function(){
// 	return temp.innerHTML = ((weather.temp)-32)*(5/9);
// };
// 	document.getElementById("toggleF").onclick = function(){
// 	return temp.innerHTML = Math.round((weather.temp*1.8)+32);
// };

	wind.innerHTML = weather.wind;
	direction.innerHTML = weather.direction;
	loc.innerHTML = weather.loc;
	wind.innerHTML = weather.wind;
	humidity.innerHTML = weather.humidity;
	icon.src = "images/codes/" + weather.icon + ".png";
	console.log(icon.src);
}

function getF(url){
	var tforecast = '';
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function(){
		if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
			var fdata = JSON.parse(xmlhttp.responseText);
			var forecast = {};
			forecast.forecastCity = fdata.city.name;
			fdata.list.forEach(function(item){
				tforecast += '<div class="weekly">'
				forecast.forecastTime = item.dt_text;
				tforecast += "<p>" + "Time: " + forecast.forecastTime + "</p>";
				forecast.forecastIcon = item.weather[0].id;
				tforecast += '<img src="imgs/codes/' + forecast.forecastIcon + '.png"' + "<br/>";
				forecast.forecastTemp = item.main.temp;
				tforecast += "<p>" + "Temperature: " + Math.round(forecast.forecastTemp) + "&deg</p>";
				forecast.forecastWind = item.wind.speed;
				tforecast += "<p>" + "Wind: " + forecast.forecastWind + "</p>";
				tforecast += "<p>" + "City: "  + forecast.forecastCity + "</p>";
				forecast.forecastDirection = item.wind.deg;
				tforecast += "<p>" + "Direction: " + forecast.forecastDirection + "</p>";
				forecast.forecastHumid = item.main.humidity;
				tforecast += "<p>" + "Humidity: " + forecast.forecastHumid + "</p>";
				tforecast += "</div>";
				document.getElementById('weekly').innerHTML = tforecast;
				
				
			})
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}


function usrCity(){
	usrCity = document.getElementById("inputCity").value;
	updateByCity(usrCity);
	updateF(usrCity);
}

window.onload= function () {
	temp = document.getElementById("temperature");
	loc = document.getElementById("location");
	wind = document.getElementById("wind");
	humidity = document.getElementById("humidity");
	direction = document.getElementById("direction");
	icon = document.getElementById("icon");
	
	forecastTemp = document.getElementById("forecastTemp");
	forecastHumid = document.getElementById("forecastHumid");
	forecastWind = document.getElementById("forecastWind");
	forecastDirection = document.getElementById("forecastDirection");
	forecastIcon = document.getElementById("forecastIcon");
};




