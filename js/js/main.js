console.log('forecast app is ready...');

var iconsMap = {
	'01d': 'icon-sun',
	'01n': 'icon-moon',
	'02d': 'icon-cloudy',
	'02n': 'icon-cloud',
	'03d': 'icon-cloud2',
	'03n': 'icon-cloud2',
	'04d': 'icon-cloudy2',
	'04n': 'icon-cloudy2',
	'09d': 'icon-rainy2',
	'09n': 'icon-rainy2',
	'10d': 'icon-rainy',
	'10n': 'icon-rainy',
	'11d': 'icon-lightning3',
	'11n': 'icon-lightning3',
	'13d': 'icon-snowy3',
	'13n': 'icon-snowy3',
	'50d': 'icon-lines',
	'50n': 'icon-lines'
}

$(document).ready(function() {
	var checkCityForecast = function(city, unit) {
		var short_days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fr', 'Sat'],
			units = {C: 'metric', F: 'imperial'},
			apiUrl,
			list,
			days = [],
			icons = {},
			temps = {},
			avg_pressure = 0,
			weather,
			scale,
			now = new Date();

			scale = unit === 'F' ? 'imperial' : 'metric';

			apiUrl = 'http://api.openweathermap.org/data/2.5/forecast/city?q='+city+'&units='+scale+'&mo',
	
		$.getJSON(apiUrl)
		.done(function(data) {
			console.log(data);
			list = data.list;

			$('#forecast h1').text(data.city.name);

			if (localStorage) {
				localStorage.setItem('city', city);
			}

			$.each(list, function(idx, itm) {
				var date = itm.dt_txt.substr(0, 10),
					time = itm.dt_txt.substr(11);

				console.log(itm.dt_txt);

				if (temps[date]) {
					// ...
				} else {
					temps[date] = {};
				}

				if (icons[date]) {
					// ...
				} else {
					icons[date] = {};
				}

				temps[date][time] = itm.main.temp;
				icons[date][time] = itm.weather[0].icon;
				avg_pressure += itm.main.pressure;
			});

			console.log(temps);
			console.log(icons);

			weather = data.list[0].weather[0].main;

			if (weather == 'Clear') {
				$('body').attr('class', 'sunny');
			} else if (weather == 'Rain') {
				$('body').attr('class', 'rainy');
			} else if (weather == 'Clouds') {
				$('body').attr('class', 'cloudy');
			}

			avg_pressure = Math.round(avg_pressure / data.list.length);

			$('header span').text(avg_pressure);

			$('#forecast h2').each(function(idx, itm) {
				$(itm).text(
					short_days[((new Date()).getDay() + idx) % 7]
				);
			});

			$('#forecast .temp').each(function(idx, itm) {
				var day = (new Date()).setDate(now.getDate() + idx);
				
				day = new Date(day).toJSON().substr(0, 10);

				// console.log(day);

				temp = null;
				icon = null;
				// possibles
				if (temps[day]) {
					if (temps[day]['12:00:00']) {
						temp = temps[day]['12:00:00'];
					} else if (temps[day]['15:00:00']) {
						temp = temps[day]['15:00:00'];
					} else if (temps[day]['18:00:00']) {
						temp = temps[day]['18:00:00'];
					} else if (temps[day]['21:00:00']) {
						temp = temps[day]['21:00:00'];
					} else if (temps[day]['00:00:00']) {
						temp = temps[day]['00:00:00'];
					} else if (temps[day]['03:00:00']) {
						temp = temps[day]['03:00:00'];
					} else if (temps[day]['06:00:00']) {
						temp = temps[day]['06:00:00'];
					} else if (temps[day]['09:00:00']) {
						temp = temps[day]['09:00:00'];
					}
				}

				if (icons[day] && icons[day]['12:00:00']) {
					icon = icons[day]['12:00:00'];
				}

				temp = temp ? (Math.round(temp) + ' ' + '&deg;' + unit) : '?'; 

				$(itm).html(temp);

				$(itm).prev().prev().text(day);

				$(itm).prev().addClass(iconsMap[icon]);
				// $(itm).next().text(icon);
			});

			// show at the end
			$('#forecast').fadeIn(500);
		}).fail(function(jqxhr, textStatus, error) {
			var err = textStatus + ', ' + error;
			console.log('Request Failed: ' + err);
			// there is no error info for used and should be :)
		});
	};

	// defaults
	if (window.localStorage) {
		if (localStorage.getItem('temp_unit') === null) {
			localStorage.setItem('temp_unit', 'C');
		}
		unit = localStorage.getItem('temp_unit');

		if (localStorage.getItem('city') === null) {
			localStorage.setItem('city', 'Toronto');
		}
		city = localStorage.getItem('city');
	} else {
		unit = 'C';
		city = 'Toronto';
	}

	// fetching starting forecast
	checkCityForecast(city, unit);

	/* events */

	// enter for input search
	$('footer .input').keyup(function(event) {
		// console.log(event)
		if (event.keyCode === 13) {
			if (city = $(this).val()) {
				checkCityForecast(city, unit);
			}	
		}
	});

	// button search click
	$('footer .button').click(function() {
		var city;
		if (city = $(this).prev().val()) {
			checkCityForecast(city, unit);
		}
	});

	// changing units click
	$('#units span').click(function() {
		$(this).addClass('active').siblings().removeClass('active');
		
		unit = $(this).attr('data-unit');
		if (localStorage) {
			localStorage.setItem('temp_unit', unit);
		}
		checkCityForecast(city, unit);
	});
});