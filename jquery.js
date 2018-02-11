// weather api e0f0a8b3330dc42aff1f0ae66cbbf91d
// time zone api AP6ZQOHBDQUI
// news api 654fa60020c846d5ae35f071c45b484c
/*var monthDay = {
	dates = [],
	month = [];
};*/
$(document).ready(function() {
function please() {
var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
var days2 = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
var latitude;
var longitude;
var lat;
var lon;
navigator.geolocation.getCurrentPosition(function(location) {
	lat = location.coords.latitude;
	lon = location.coords.longitude;
	var latitude = Math.floor((lat*10))/10;
	var longitude = Math.round(lon * 10)/10;
	console.log(latitude);
	console.log(longitude);
	weatherLocation(latitude, lon);
	hourLocation(latitude, lon);
});


var zipCode = 85224;
$('.submit').click(function() {
	zipCode = $('.input').val();
	if(zipCode === '') {
		alert('put something in here...')
	}
	else {
		$('.nav-bottom').empty();
		$('.temp-container').empty();
		$('.weather-container').empty();
		$('.sun-mobile').remove();
		$('.star').remove();
		$('.moon-mobile').remove();
		$('.rain-drop').remove();
		getData(zipCode);
		currentWeather(zipCode);
	}
})
var dates = [];
var month = [];
var work = 85224;
var days = [];

//Weather baseed off location
function weatherLocation(lat, lon) {
	$.ajax({
		url: 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid=e0f0a8b3330dc42aff1f0ae66cbbf91d', 
		async: true,
		success: function apiCall(data){
			currentweatherLoop(data)
		}
	});
}

//Generate Stars 
function stars() {
	var starNumber = 10;
	var height = $('.bottom-left').height() / 2;
	var width = $('.bottom-left').width();
	for(var i = 0; i < starNumber; i++) {
		var newStar = $('<div class="star"></div>');
		$('.bottom-left').append(newStar).delay(2000);
		newStar.css({
			top: Math.random() * Math.max(height), 
			left: Math.random() * Math.max(width)
		});
	}
}

//Generate Shooting Star
setInterval(function shootingStar() {
	var height 			= $('.bottom-left').height() / 9;
	var width 			= $('.bottom-left').width();
	var shootingStar 	= $('<div class="shooting-star"></div>');
	var randomSide 		= Math.random();
	var randomSpeed 	= Math.random() * 1000;
	var heightLimit 	= Math.random() * Math.max(height);
	
	if(randomSide > '.50') {
		shootingStar.css({
			top: heightLimit,
			left: -20,
		  	'transform': 'rotate(10deg)'
		});
		shootingStar.animate({
			left: '110%',top: heightLimit + 100
		}, {
			duration: randomSpeed,
			complete: function() {
				$('.shooting-star').remove();
			}
		});
		
	}
	else {
		shootingStar.css({
			top: Math.random() * Math.max(height),
			right: -20,
  			'transform': 'rotate(-10deg)'
		});
		shootingStar.animate({
			right: '110%',top: heightLimit + 100
		}, 
		{
			duration: randomSpeed,
			complete: function() {
				$('.shooting-star').remove();
			}
		});
	}
	$('.bottom-left').append(shootingStar);
}, 6000);

//Loop for current weather
function currentweatherLoop(data) {
	var dayMain 	= data.main;		
	var temp 		= dayMain.temp;
	var tempMax 	= dayMain.temp_max;
	var tempMin 	= dayMain.temp_min;
	var humidity 	= dayMain.humidity;
	var txt 		= data.dt;

	//City and Country
	var city 	= data.name;
	var country = data.sys.country;
	
	//Latitude and Longitude
	var lat = data.coord.lat;
	var lon = data.coord.lon;
	console.log(lat)
	console.log(lon)


	//Weather
	var main 			= data.weather[0].main;
	var description 	= data.weather[0].description;

	//Kevlin to Fahrenheit
	var tempConvert = Math.round(temp * 1.8 - 459.67);
	var maxConvert 	= Math.round(tempMax * 1.8 - 459.67);
	var minConvert 	= Math.round(tempMin * 1.8 - 459.67);
	var tempDegrees = Math.round(temp * 1.8 - 459.67) + '°';
	var maxDegrees 	= Math.round(tempMax * 1.8 - 459.67) + '°';
	var minDegrees = Math.round(tempMin * 1.8 - 459.67) + '°';

	//Convert Timestamp
	var date = new Date(txt*1000);
	var days 		= date.toString().split(' ')[0];
	var month 		= date.toString().split(' ')[1];
	var daysNumb 	= date.toString().split(' ')[2];
	var year 		= date.toString().split(' ')[3];
	var timePre 	= date.toString().split(' ')[4];
	var timeCovert 	= timePre.split(':');
	var timePost    = timeCovert[0];
	//e.g fri to friday converter
		console.log(timePost)
	var result2 = days2.filter(function(e) {
		return e.slice(0, 3) == days;
	});
	var sunCircle = '';
	var weatherCondition = '';
	var degrees = 0;


	//sunny rainy windy cloudy
	/*var cold = '<div class="therm-container child">\
					<div class="therm-bar"></div>\
					<div class="therm-circle">\
						<div class="inner-circle"></div>\
						<div class="inner-bar"></div>\
					</div>\
				</div>';*/
	//Rain animation

	var Clear 	= '<div class="sun-container child">\
						<div class="sun-center">'+sunCircle+'</div>\
					</div>';
	var Clouds 	= '<img src="weather-condition-icon/cloudy.png">';
	var Rainy 	= '<div class="rain-container">\
						<img src="weather-condition-icon/cloud.png">\
					</div>';
	
	if(main == 'Clear') {
		weatherCondition = Clear;

	}
	else if(main == 'Clouds') {
		weatherCondition = Clouds;
	} 
	else if(main == 'Rain' || main == 'Thunderstorm' || main == 'Drizzle') {
		weatherCondition = Rainy;
		setInterval(generateRain, 700);
	}
	
	console.log(main)
	var sunMobile 	= '<span class="sun-mobile"></span>';
	var moonMobile 	= '<img class="moon-mobile" src="moon.png">';
	if(timePost > 7 && timePost < 18) {
		$('.bottom-left').removeClass('night-time');
		$('.bottom-left').append(sunMobile);
	}
	else {
		$('.bottom-left').addClass('night-time');
		$('.bottom-left').append(moonMobile);
		stars()
		
	}

	$('.weather-container').append('<div class="city-country child">'+city+', '+country+'</div>\
									<div class="time child"></div>\
									<div class="day-month child">'+daysNumb+' '+month+'</div>\
									<div class="days child">'+result2+'</div>\
									<div class="weather-insert">'+weatherCondition+'</div>\
									<div class="tempConvert child">'+tempDegrees+'</div>\
									<div class="maxDegrees child"><h5>Maximum</h5><h5>'+maxDegrees+'</h5></div>\
									<div class="minDegrees child"><h5>Minumum</h5><h5>'+minDegrees+'</h5></div>\
									<div class="humidity child"><h5>Humidity</h5><h5>'+humidity+'</h5></div>\
									<div class="mainly child"><h5>Mainly</h5><h5>'+description+'</h5></div>\
									');
	function generateRain() {
		var cloudWidth 	= $('.rain-container').width() - 30;
		var rainDrop 	= $('<img class="rain-drop" src="weather-condition-icon/water-drop.png">');
		var heightLimit = Math.random() * Math.max(cloudWidth);
		rainDrop.css({
			top: '0',
			left: heightLimit
		});
		rainDrop.animate({
			top: '150%',
			left: heightLimit
		}, {
			duration: 500,
			complete: function() {
				$('.rain-drop').remove();
			}
		});
		
			$('.rain-container').append(rainDrop)
		
	}
	
	//Append sun rays for sun
	for(var i = 0; i < 12; i++) {
		degrees += 30;
		sunCircle = $('.sun-center').append('<div class="sun-rays" style="transform: rotate('+degrees+'deg);"></div>');
	}
	
}
var array = [];
var counts = {};
var please = [];
function forLoop(list, dayResult) {
		for(var i = 0; i < list.length; i++) {
			var hourList 	= list[i].main;
			var temp 		= hourList.temp;
			var tempMax 	= hourList.temp_max;
			var tempMin 	= hourList.temp_min;
			var humidity 	= hourList.humidity;
			var txt 		= list[i].dt_txt;

			//Type of weather
			var weatherType = list[i].weather[0].main;
			var weatherType2 = list[i].weather[0].main;
			
			//Wind Speed
			var windSpeed = list[i].wind.speed;
			
			//Wind Speed Convert m/s to m/h
			var windConvert = (windSpeed * 3600 * 3.2808)/5280;
			
			//Kevlin to Fahrenheit
			var tempConvert = Math.round(temp* 1.8 - 459.67);
			var tempPercent = (tempConvert/100) * 100;
			var tempDegrees = Math.round(temp * 1.8 - 459.67) + '°';
			var maxConvert 	= Math.round(tempMax * 1.8 - 459.67);
			var minConvert 	= Math.round(tempMin * 1.8 - 459.67);

			var timeSplit3 = '';
			var splitDay = txt.slice(8, 10);
			days.push(splitDay);
			var timeSplit = txt.split(' ');
			var timeSplit2 = timeSplit[1].slice(0,2);
			
			if(timeSplit2 == 12) {
				timeSplit3 = 12 + 'PM'
			}
			else if(timeSplit2 > 12) {
				timeSplit3 = (timeSplit2 - 12) + 'PM';
			}
			else if (timeSplit2 > 0 && timeSplit2 < 12) {
				timeSplit3 = timeSplit2.slice(1,2) +'AM';
			}
			else if(timeSplit2 = '00') {
				timeSplit3 = '12' + 'AM'
			}

			var currentIcon2 = '';
			if(weatherType = 'Clear' && (timeSplit2 == '00' || timeSplit2 == '03' || timeSplit2 == '21')) {
				currentIcon2 = '<img src="weather-hour-icon/moon.png">';
			}
			else {
				currentIcon2 = '<img src="weather-hour-icon/'+weatherType2+'.png">';
			}
			var weatherIcon = '<div class="weatherIcon" style="background-image: url(weather-hour-icon/'+weatherType+'.png);"></div>';
			var currentIcon = '<img src="weather-hour-icon/'+weatherType+'.png">'
			var leftPercent = 0;
			$('.temp-container').append('<div class="temp-hour">\
											<span class="span-container">\
												<span class="span-top">\
													<h2 class="time-3hour">'+timeSplit3+'</h2>\
												</span>\
												<span class="span-bottom">\
													<div class="temp-icon">\
														<h2 class="temp-3hour">'+tempConvert+'</h2>\
														'+currentIcon2+'\
													</div>\
													<span class="temp-height" height='+tempPercent+' style="background: #2c97c2"></span>\
												</span>\
											</span>\
										</div>');
								
			var result = list.filter(function(e) {
				return e.weather[0].main; 
			});
			var z = result[i].weather[0].main;
			var x = Math.max(z);
			array.push(z)
			
			$('.temp-height').each(function() {
				var height = $(this).attr('height');
				$(this).animate({
			        height: height + '%'
			    }, 1500).clearQueue();
			});	
			
		}
		
		array.forEach(function(x) {
			counts[x] = (counts[x] || 0) + 1;
		});
		
		var highestValue = 0;
		var highestKey;
		for (var key in counts) {
		  if (counts[key] > highestValue) {
			highestValue = counts[key];
			highestKey = key;
		  }
		} 

		//Click show today/other days
		$('.bottom-right-top').html('<div class="bottom-right-top-left">\
										<h2>'+dayResult+'<h2>\
									</div>\
									<div class="bottom-right-top-right">Today is mainly '+highestKey+'</div>\
								');

		$('.temp-hour').each(function(index) {
			var tempAmount = $('.temp-hour').length;
			var tempWidth = 100 / tempAmount;
			$(this).css('width', tempWidth + '%');
			if(tempAmount = 1) {
				$(this).css('width', tempWidth + '%');
			}
		});
	}	

function forLoop2(data) {
	for(var i = 0; i < data.list.length; i++) {
		var dayList 	= data.list[i];				
		var temp 		= dayList.main.temp;
		var tempMax 	= dayList.main.temp_max;
		var tempMin 	= dayList.main.temp_min;
		var humidity 	= dayList.main.humidity;
		var txt 		= dayList.dt_txt;

		//Weather
		var main 			= dayList.weather[0].main;
		var description 	= dayList.weather[0].description;
		
		//Lon & Lat
		var lat = data.city.coord.lat;
		var lon = data.city.coord.lon;
		
		//Wind Speed
			var windSpeed = data.list[i].wind.speed;
			
			//Wind Speed Convert m/s to m/h
			var windConvert = (windSpeed * 3600 * 3.2808)/5280;

		//Kevlin to Fahrenheit
		var tempConvert = Math.round(temp * 1.8 - 459.67);
		var tempDegrees = Math.round(temp * 1.8 - 459.67) + '°';
		var maxConvert 	= Math.round(tempMax * 1.8 - 459.67);
		var minConvert 	= Math.round(tempMin * 1.8 - 459.67);

		var timeSplit3 = '';
		var splitDay = txt.slice(8, 10);
		days.push(splitDay);
		var timeSplit = txt.split(' ');
		var timeSplit2 = timeSplit[1].slice(0,2);
		 
		//Military time to Regular Time Conversion
		if(timeSplit2 == 12) {
			timeSplit3 = 12 + ':00' + 'PM'
		}
		else if(timeSplit2 > 12) {
			timeSplit3 = '0' + (timeSplit2 - 12) + ':00' + 'PM';
		}
		else if (timeSplit2 > 0 && timeSplit2 < 12) {
			timeSplit3 = timeSplit2 + ':00' + 'AM';
		}
		else if(timeSplit2 = '00') {
			timeSplit3 = '12' + ':00' + 'AM'
		}
	}
	
}

var allDays = [];
//Weather per hour based off location
function hourLocation(lat, lon) {
	$.ajax({
		url: 'http://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+lon+'&appid=e0f0a8b3330dc42aff1f0ae66cbbf91d', 
		async: true,
		dataType: 'json',
		success: function apiCall(data){
			for(var i = 0; i < data.list.length; i++) {
				var timeStamp = data.list[i].dt;
				var date = new Date(timeStamp*1000);
				var day 		= date.toString().split(' ')[0];
				var month 		= date.toString().split(' ')[1];
				var daysNumb 	= date.toString().split(' ')[2];
				var year 		= date.toString().split(' ')[3];
				allDays.push(day);
				
			}
			forLoop2(data);
			var dayList = data.list;	
			var uniqueDays = [];
			$.each(days, function(i, el){
			    if($.inArray(el, uniqueDays) === -1) {
			    	uniqueDays.push(el)
			    };
			});
			var result = dayList.filter(function(e) {
				return e.dt_txt.slice(8, 10) == uniqueDays[0]; 
			});
			
			var uniqueDays2 = [];
			$.each(allDays, function(i, el) {
				if($.inArray(el, uniqueDays2) === -1) {
			    	uniqueDays2.push(el)
			    };
			})
			console.log(uniqueDays2)
			
			for(i = 0; i < uniqueDays2.length; i++) {
				$('.nav-bottom').append('<div class="day-box" partialDay='+uniqueDays2[i]+' day='+uniqueDays[i]+'><h3>'+uniqueDays2[i]+'</h3></div>')
				$('.day-box:first-child').addClass('active-day');
			}
			if($('.day-box').hasClass('active-day')) {
				$('.bottom-right-top').html('today')
			}

			console.log(uniqueDays)
			console.log(result)
			forLoop(result, 'today');
			$('.day-box').click(function() {
				array = [];
				counts = {};
				$('.day-box').removeClass('active-day');
				$(this).addClass('active-day');
				$('.temp-container').empty();
				var result2;
				var today = $('.day-box:first-child').attr('day');
				var getDay = $(this).attr('day');
				var partialDay = $(this).attr('partialDay');

				var result = dayList.filter(function(e) {
					return e.dt_txt.slice(8, 10) == getDay; 
				});
				
				if(getDay == today) {
					result2 = 'Today';
				}
				else {
					result2 = days2.filter(function(e) {
					return e.slice(0, 3) == partialDay; 
					});
				}

				console.log(result2)
				forLoop(result, result2);
				
			});
		}
	});
}

//Weather for today
function currentWeather(zip) {
	$.ajax({
		url: 'http://api.openweathermap.org/data/2.5/weather?zip='+zip+',us&appid=e0f0a8b3330dc42aff1f0ae66cbbf91d', 
		async: true,
		success: function apiCall(data){
			currentweatherLoop(data)
			
		}
	});
}


//Weather every 3 hours Click
function getData(zip) {
	$.ajax({
		url: 'http://api.openweathermap.org/data/2.5/forecast?zip='+zip+'&appid=e0f0a8b3330dc42aff1f0ae66cbbf91d', 
		async: true,
		success: function apiCall(data){
			for(var i = 0; i < data.list.length; i++) {
				var timeStamp = data.list[i].dt;
				var date = new Date(timeStamp*1000);
				var day 		= date.toString().split(' ')[0];
				var month 		= date.toString().split(' ')[1];
				var daysNumb 	= date.toString().split(' ')[2];
				var year 		= date.toString().split(' ')[3];
				allDays.push(day);
				
			}
			forLoop2(data);
			var dayList = data.list;	
			var uniqueDays = [];
			$.each(days, function(i, el){
			    if($.inArray(el, uniqueDays) === -1) {
			    	uniqueDays.push(el)
			    };
			});
			var result = dayList.filter(function(e) {
				return e.dt_txt.slice(8, 10) == uniqueDays[0]; 
			});
			
			var uniqueDays2 = [];
			$.each(allDays, function(i, el) {
				if($.inArray(el, uniqueDays2) === -1) {
			    	uniqueDays2.push(el)
			    };
			})
			console.log(uniqueDays2)
			
			for(i = 0; i < uniqueDays2.length; i++) {
				$('.nav-bottom').append('<div class="day-box" partialDay='+uniqueDays2[i]+' day='+uniqueDays[i]+'><h3>'+uniqueDays2[i]+'</h3></div>')
				$('.day-box:first-child').addClass('active-day');
			}
			if($('.day-box').hasClass('active-day')) {
				$('.bottom-right-top').html('today')
			}

			console.log(uniqueDays)
			console.log(result)
			forLoop(result);
			$('.day-box').click(function() {
				array = [];
				counts = {};
				$('.day-box').removeClass('active-day');
				$(this).addClass('active-day');
				$('.temp-container').empty();
				var result2;
				var today = $('.day-box:first-child').attr('day');
				var getDay = $(this).attr('day');
				var partialDay = $(this).attr('partialDay');

				var result = dayList.filter(function(e) {
					return e.dt_txt.slice(8, 10) == getDay; 
				});

				result2 = days2.filter(function(e) {
					return e.slice(0, 3) == partialDay; 
				});
				if(getDay == today) {
					result2 = 'Today';
				}

				console.log(result2)
				forLoop(result, result2);
				
			});
		}
	});
}


}

please();


function work(lat, lng){  
	$.ajax({
		url: 'http://api.timezonedb.com/v2/get-time-zone?key=AP6ZQOHBDQUI&format=json&by=position&position=lat&lat='+lat+'&lng&lng='+lng+'', 
		async: true,
		success: function apiCall(data){
			var time = data.formatted;
			var test = time.split(" ");
			var time2 = test[1];
			var time3 = time2.slice(0, 5);

			$('.time').html(time3);	
			setTimeout(work(lat, lon), 1500);

		}
	});
}

function newsLoop(data) {
	for(var i = 0; i < data.articles.length; i++) {
		var allNews 		= data.articles[i];
		var newsSource 		= allNews.source.name;
		var author			= allNews.author;
		var authorSplit		= author.split(' ')[0] + ' ' + author.split(' ')[1];
		var newsTitle 		= allNews.title;
		var newsDescription = allNews.description;
		var newsLink 		= allNews.url;
		var newsImage 		= allNews.urlToImage;
		var publishDate		= allNews.publishedAt;
		
		//News Box
		$('.top-container').append('<div class="news-box")>\
								<div class="box-top" style="background-image: url('+newsImage+');">33</div>\
								<div class="box-bottom">\
									<div class="title"><h2>'+newsTitle+'</h2></div>\
									<div class="box-bottom2">\
										<div class="author">by ' +authorSplit+'</div>\
										<div class="publish-date">'+publishDate+'</div>\
									</div>\
								</div>\
						</div>');
	}
}

function news() {
	$.get("https://newsapi.org/v2/everything?domains=space.com&apiKey=654fa60020c846d5ae35f071c45b484c").done(function (data) {
     	newsLoop(data)
	});
}
news()


/*
function work3(lat, lng) {
	$.ajax({
		url: 'http://api.timezonedb.com/v2/get-time-zone?key=AP6ZQOHBDQUI&format=json&by=position&position=lat&lat='+lat+'&lng&lng='+lng+'', 
		async: true,
		success: function apiCall(data){
			var time = data.formatted;
			
			$('.time').html(time);	
			console.log(time)
				
		}
	});
}
work3(lat, lon)*/



//news
//nasa
//sports
//http://api.timezonedb.com/v2/get-time-zone?key=AP6ZQOHBDQUI&format=json&by=position&position=lat&lat=33.3&lng&lng=-111.9


/*
//If less than certain temperature
function temp(temperature) {
	if(temperature =< 30) {
		alert('asdf1')
	}
	else if(temperature < 70 && temperature > 30) {
		alert('asdf2')
	}
	else {
		alert('asdf3')
	}
}
temp(30)
*/

/*
function getData(zip, url) {
	var asdf = 'http://api.openweathermap.org/data/2.5/forecast?zip='+zip+'&appid=e0f0a8b3330dc42aff1f0ae66cbbf91d';
	$.ajax({
	    type: "GET",
	    url: asdf,
	    dataType: "json",
	    success: function(data) {
			var result = [];
				forLoop2(data);
				var dayList = data.list;	
				var uniqueDays = [];
				$.each(days, function(i, el){
				    if($.inArray(el, uniqueDays) === -1) {
				    	uniqueDays.push(el)
				    };
				});

				var result = dayList.filter(function(e) {
					return e.dt_txt.slice(8, 10) == uniqueDays[0]; 
				});
					
				for(i = 0; i < uniqueDays.length; i++) {
					$('.nav-bottom').append('<div class="day-box" day='+uniqueDays[i]+'>'+uniqueDays[i]+'</div>')
				}

				console.log(uniqueDays)
				console.log(result)
				forLoop(result);
				$('.day-box').click(function() {
					$('.temp-container').empty();
					var test = $(this).attr('day');

					var result = dayList.filter(function(e) {
						return e.dt_txt.slice(8, 10) == test; 
					});
					forLoop(result);
					
				});
		}
				
	});
}
*/

});
