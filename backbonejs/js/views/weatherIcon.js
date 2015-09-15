/*global define */

define([
    'backbone',
    'handlebars',
    'text!templates/weather-icon.tmpl',

    'views/icon/sun',
    'views/icon/moon',
    'views/icon/cloudSun',
    'views/icon/cloudMoon',
    'views/icon/cloud',
    'views/icon/clouds',
    'views/icon/cloudRain',
    'views/icon/cloudRainSun',
    'views/icon/cloudRainMoon',
    'views/icon/cloudLightning',
    'views/icon/cloudSnow',
    'views/icon/cloudFog',
    
    'backbone-layoutmanager'
], function(
    Backbone,
    Handlebars,
    weatherIconTemplate,

    SunIconView,
    MoonIconView,
    CloudSunIconView,
    CloudMoonIconView,
    CloudIconView,
    CloudsIconView,
    CloudRainIconView,
    CloudRainSunIconView,
    CloudRainMoonIconView,
    CloudLightningIconView,
    CloudSnowIconView,
    CloudFogIconView
) {

    'use strict';

    var WeatherIconView = Backbone.Layout.extend({
        template: Handlebars.compile(weatherIconTemplate),
        className: '.weather-icon-wrapper',
        icon: null,
        initialize: function(options) {
            // console.log(options);
            this.icon = WeatherIconView.icons[options.icon];
        },
        serialize: function() {
            // var data = this.model.toJSON();
            // return data;
        }
    });

    WeatherIconView.icons = {
        '01d': new SunIconView,
        '01n': new MoonIconView,
        '02d': new CloudSunIconView,
        '02n': new CloudMoonIconView,
        '03d': new CloudIconView,
        '03n': new CloudIconView,
        '04d': new CloudsIconView,
        '04n': new CloudsIconView,
        '09d': new CloudRainIconView,
        '09n': new CloudRainIconView,
        '10d': new CloudRainSunIconView,
        '10n': new CloudRainMoonIconView,
        '11d': new CloudLightningIconView,
        '11n': new CloudLightningIconView,
        '13d': new CloudSnowIconView,
        '13n': new CloudSnowIconView,
        '50d': new CloudFogIconView,
        '50n': new CloudFogIconView
    }

    return WeatherIconView;

});
