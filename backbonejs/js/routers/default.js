/*global define */

define([
    'backbone',
    'underscore',

    'views/app',
    'views/dashboard',

    'models/weather',

    'collections/weather',

    'views/cityWeather'
], function(
    Backbone,
    _,

    appView,
    DashboardView,

    WeatherModel,

    WeatherCollection,

    CityWeatherView
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

            'city': 'cityWeather'
            // 'news/:id': 'newsEdit'
        },

        dashboard: function() {
            var dashboardView = new DashboardView();

            appView.setView(MAIN_SELECTOR, dashboardView);
            dashboardView.render();
        },

        cityWeather: function() {
            var weatherCollection,
                cityWeatherView;

            weatherCollection = new WeatherCollection();

            cityWeatherView = new CityWeatherView({
                collection: weatherCollection
            });

            appView.setView(MAIN_SELECTOR, cityWeatherView);
            cityWeatherView.render();

            weatherCollection.fetch();
        }

    });

    router = new DefaultRouter();

    return router;
});