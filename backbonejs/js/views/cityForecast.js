/*global define */

define([
    'backbone',
    'handlebars',
    'text!templates/city-forecast.tmpl',
    
    'backbone-layoutmanager'
], function(
    Backbone,
    Handlebars,
    cityForecastTemplate
) {

    'use strict';

    var CityForecastView = Backbone.Layout.extend({
        template: Handlebars.compile(cityForecastTemplate),
        now: new Date(),
        dayTime: null,
        forecast: null,
        events: {
            'submit form': function() {
                this.searchCity();
                return false;
            }
        },
        initialize: function(options) {
            this.listenTo(this.model, 'sync', this.render);            
        },
        searchCity: function() {
            this.trigger('search', this);
        },
        setDayTime: function() {
            // basically weather icon delivers this info as 10d or 10n
            if (this.dayTime == null) {
                if (this.now >= this.model.getTime('sunrise') && this.now < this.model.getTime('sunset')) {
                    this.dayTime = 'day';
                }
                if (this.now < this.model.getTime('sunrise') || this.now >= this.model.getTime('sunset')) {
                    this.dayTime = 'night';
                }
            }
        },
        setBackground: function() {
            // if (this.dayTime) {
            // console.log(this.model.getWeatherIconCode());.substring(2,3));
                // if (this.dayTime == 'day') {
                    $('body').attr('class', 'day bg-' + this.model.getWeatherIconCode(this.model.get('list')[0].weather));
                // }
                // if (this.dayTime == 'night') {
                    // $('body').attr('class', 'night bg-' + this.model.getWeatherIconCode());
                // }
            // }
        },
        serialize: function() {
            var data = this.model.toJSON();

            console.log(this.model);

            if (this.model.get('list')) {
                data['forecast'] = {};
                _.each(this.model.get('list'), function(weather) {
                    var parts = weather.dt_txt.split(' ');

                    if (data['forecast'][parts[0]]) {
                        data['forecast'][parts[0]][parts[1]] = weather;
                    } else {
                        data['forecast'][parts[0]] = {};
                        data['forecast'][parts[0]][parts[1]] = weather;
                    }
                });
                this.forecast = data['forecast'];
            }
            // console.log(data['forecast']);
            var days = [
                '2015-09-12',
                '2015-09-13',
                '2015-09-14'
            ];
            // console.log()
            data.days = [];
            for (var i = 0, len = days.length; i < len; i++) {
                var params = this.findParamsForDate(days[i]);
                // params.temp = this.model.getTemp('round', params);
                params.temp = Math.round(params.main.temp);
                params.icon = CityForecastView.icons[params.weather[0].icon];

                data.days.push(params);
            }

            // data.days.push(this.findTempForDate('2015-09-12'));
            // data.days.push(this.findTempForDate('2015-09-13'));
            // data.days.push(this.findTempForDate('2015-09-14'));

            // var list = this.model.get('list');

            // data.icon = this.model.getWeatherIconCode(this.model.get('list')[0].weather);
            // console.log(this.model.get('list')[0]);
            if (this.model) {
                data.temp = this.model.getTemp('round', this.model.get('list')[0]);
            }
            // data.sunrise = this.model.getTime('sunrise');
            // data.sunset = this.model.getTime('sunset');

            data.dayTime = this.dayTime;
            
            return data;
        },
        findParamsForDate: function(date) {
            if (this.forecast && this.forecast[date]) {
                var day = (new Date(date)).getDay();
                
                for (var dt = 0, dtlen = CityForecastView.dayTimes.length; dt < dtlen; dt++) {
                    if (this.forecast[date][CityForecastView.dayTimes[dt]]) {
                        this.forecast[date][CityForecastView.dayTimes[dt]]['day'] = CityForecastView.dayNames[day];
                        return this.forecast[date][CityForecastView.dayTimes[dt]];
                    }
                }
            }
        },
        afterRender: function () {
            this.setDayTime();
            this.setBackground();
        }
    });


    CityForecastView.icons = {
        '01d': 'icon-sun',
        '01n': 'icon-moon',
        '02d': 'icon-cloudy',
        '02n': 'icon-cloud',
        '03d': 'icon-cloud2',
        '03n': 'icon-cloud2',
        '04d': 'icon-cloudy2',
        '04n': 'icon-cloudy2',
        '09d': 'icon-rainy',
        '09n': 'icon-rainy',
        '10d': 'icon-rainy2',
        '10n': 'icon-rainy2',
        '11d': 'icon-icon-lightning3',
        '11n': 'icon-icon-lightning3',
        '13d': 'icon-icon-snowy3',
        '13n': 'icon-icon-snowy3',
        '50d': 'icon-lines',
        '50n': 'icon-lines'
    }

    CityForecastView.dayNames = [
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fr',
        'Sat'
    ];

    CityForecastView.dayTimes = [
        '12:00:00',
        '09:00:00',
        '06:00:00',
        '03:00:00',
        '00:00:00',
        '21:00:00',
        '18:00:00',
        '15:00:00'
    ];

    return CityForecastView;

});
