/*global define */

define([
    'backbone',
    'underscore',
    'extensions/router-query-manager',

    'views/app',
    'views/dashboard',

    'models/weather',

    'collections/weather',

    'views/cityWeather',

    'views/weatherIcon',
    'views/icon/sun',
    'views/icon/moon',
    'views/icon/cloud',
    'views/icon/cloudSun',
    'views/icon/cloudMoon',
    'views/icon/cloudRain'

    // router plugins
    // 'backbone-queryparams',
], function(
    Backbone,
    _,
    QueryManager,

    appView,
    DashboardView,

    WeatherModel,

    WeatherCollection,

    CityWeatherView,

    WeatherIconView,
    SunIconView,
    MoonIconView,
    CloudIconView,
    CloudSunIconView,
    CloudMoonIconView,
    CloudRainIconView
) {
    'use strict';

    var MAIN_SELECTOR = '.main';

    var router;

    var DefaultRouter = Backbone.Router.extend({

        initialize: function() {
            Backbone.history.start();
        },

        routes: {
            '': 'dashboard',

            // 'weather/:city': 'cityWeather'
            'weather': 'cityWeather'
            // 'forecast/:city': 'cityForecast'
        },

        dashboard: function() {
            var dashboardView = new DashboardView();

            appView.setView(MAIN_SELECTOR, dashboardView);
            dashboardView.render();
        },

        cityWeather: function() {
            var weatherModel,
                weatherCollection,
                cityWeatherView,
                weatherIconView,
                paramsManager,
                iconView,
                params,
                city,
                icon;

            console.log(city);

            city = $('#city-name').val() || 'Krakow';

            params = {
                q: city,
                units: 'metric'
            };

            console.log('inside router');

            
            // paramsManager = new QueryManager(params);

            // weatherCollection = new WeatherCollection();
            weatherModel = new WeatherModel();

            cityWeatherView = new CityWeatherView({
                // collection: weatherCollection,
                model: weatherModel
            });

            cityWeatherView.on('search', function() {
                params.q = $('#city-name').val();

                weatherModel.fetch({
                    data: params
                }).then(function() {
                    console.log(weatherModel.getWeatherIconCode());

                    weatherIconView = new WeatherIconView({
                        icon: weatherModel.getWeatherIconCode()
                    });

                    cityWeatherView.setView('.weather-icon', weatherIconView.icon);

                    // cityWeatherView.changeBackground()

                    weatherIconView.render();

                    cityWeatherView.render();
                });
            });

            // var iconCode = Math.round(Math.random()) ? '01d' : '02d';


            

            // console.log(weatherIconView.icon);

            // icon = weatherIconView.icon;


            // iconView = new icon();

            appView.setView(MAIN_SELECTOR, cityWeatherView);
            // appView.setView(MAIN_SELECTOR, sun);
            // cityWeatherView.setView('.weather-icon', weatherIconView.icon);
            

            // cityWeatherView.changeBackground();

            // weatherCollection.fetch();
            weatherModel.fetch({
                data: params
            }).then(function() {
                console.log(weatherModel.getWeatherIconCode());

                // weatherIconView = new WeatherIconView();

                weatherIconView = new WeatherIconView({
                    icon: weatherModel.getWeatherIconCode()
                });

                cityWeatherView.setView('.weather-icon', weatherIconView.icon);

                // cityWeatherView.changeBackground()

                weatherIconView.render();

                cityWeatherView.render();
            });



            // cityWeatherView.changeBackground();

            // weatherIconView.render();
        }

    });

    router = new DefaultRouter();

    return router;
});