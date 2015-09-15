/*global define */

define([
    'backbone',
    'underscore',
    'extensions/router-query-manager',
    'utils/universal',

    'views/app',
    'views/dashboard',

    'models/weather',
    'models/forecast',

    'collections/weather',
    // 'collections/weather',

    'views/cityWeather',
    'views/cityForecast',

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
    universalUtils,

    appView,
    DashboardView,

    WeatherModel,
    ForecastModel,

    WeatherCollection,
    // ForecastCollection,

    CityWeatherView,
    CityForecastView,

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

            'weather': 'cityWeather',
            'forecast': 'cityForecast'
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
                iconView,
                promise,
                coords,
                params,
                city,
                icon;
            
            params = {
                units: 'metric'
            };

            promise = universalUtils.getCurrentPosition();

            weatherModel = new WeatherModel();

            cityWeatherView = new CityWeatherView({
                model: weatherModel
            });

            cityWeatherView.on('search', function() {
                params.q = $('#city-name').val();

                weatherModel.fetch({
                    data: params
                }).then(function() {
                    weatherIconView = new WeatherIconView({
                        icon: weatherModel.getWeatherIconCode()
                    });

                    cityWeatherView.setView('.weather-icon', weatherIconView.icon);

                    cityWeatherView.render();
                    weatherIconView.render();
                });
            });

            appView.setView(MAIN_SELECTOR, cityWeatherView);
            
            promise.then(function(result) {
                params.lat = result.latitude;
                params.lon = result.longitude;

                weatherModel.fetch({
                    data: params
                }).then(function() {
                    weatherIconView = new WeatherIconView({
                        icon: weatherModel.getWeatherIconCode()
                    });

                    cityWeatherView.setView('.weather-icon', weatherIconView.icon);

                    cityWeatherView.render();
                    weatherIconView.render();
                });
            }, function(err) {
                params.q = $('#city-name').val();

                weatherModel.fetch({
                    data: params
                }).then(function() {
                    weatherIconView = new WeatherIconView({
                        icon: weatherModel.getWeatherIconCode()
                    });

                    cityWeatherView.setView('.weather-icon', weatherIconView.icon);

                    cityWeatherView.render();
                    weatherIconView.render();
                });
            });
        },

        cityForecast: function() {
            var forecastModel,
                cityForecastView,
                forecastIconView,
                weatherIconView,
                iconView,
                promise,
                params,
                city,
                icon;

            params = {
                units: 'metric'
            };

            promise = universalUtils.getCurrentPosition();

            forecastModel = new ForecastModel();

            cityForecastView = new CityForecastView({
                model: forecastModel
            });

            cityForecastView.on('search', function() {
                params.q = $('#city-name').val();

                forecastModel.fetch({
                    data: params
                }).then(function() {
                    weatherIconView = new WeatherIconView({
                        icon: forecastModel.getWeatherIconCode(forecastModel.get('list')[0].weather)
                    });

                    cityForecastView.setView('.weather-icon', weatherIconView.icon);

                    cityForecastView.render();
                    weatherIconView.render();
                });
            });

            appView.setView(MAIN_SELECTOR, cityForecastView);

            promise.then(function(result) {
                params.lat = result.latitude;
                params.lon = result.longitude;

                forecastModel.fetch({
                    data: params
                }).then(function() {
                    weatherIconView = new WeatherIconView({
                        icon: forecastModel.getWeatherIconCode(forecastModel.get('list')[0].weather)
                    });

                    cityForecastView.setView('.weather-icon', weatherIconView.icon);

                    cityForecastView.render();
                    weatherIconView.render();
                });
            }, function(err) {
                params.q = $('#city-name').val();

                forecastModel.fetch({
                    data: params
                }).then(function() {
                    weatherIconView = new WeatherIconView({
                        icon: forecastModel.getWeatherIconCode(forecastModel.get('list')[0].weather)
                    });

                    cityForecastView.setView('.weather-icon', weatherIconView.icon);

                    cityForecastView.render();
                    weatherIconView.render();
                });
            });
        }

    });

    router = new DefaultRouter();

    return router;
});