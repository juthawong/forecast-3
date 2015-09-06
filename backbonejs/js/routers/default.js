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

    'views/icon/sun',
    'views/icon/cloud'

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

    SunIconView,
    CloudIconView
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
                params,
                city;

            console.log(city);

            city = $('#city-name').val() || 'London';

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
                });
            });


            weatherIconView = new SunIconView();

            appView.setView(MAIN_SELECTOR, cityWeatherView);
            // appView.setView(MAIN_SELECTOR, sun);
            cityWeatherView.setView('.weather-icon', weatherIconView);
            cityWeatherView.render();

            // cityWeatherView.changeBackground();

            weatherIconView.render();

            // cityWeatherView.changeBackground();

            // weatherCollection.fetch();
            weatherModel.fetch({
                data: params
            });
        }

    });

    router = new DefaultRouter();

    return router;
});