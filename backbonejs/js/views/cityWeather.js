/*global define */

define([
    'backbone',
    'handlebars',
    'text!templates/city-weather.tmpl',
    
    'backbone-layoutmanager'
], function(
    Backbone,
    Handlebars,
    cityWeatherTemplate
) {

    'use strict';

    var CityWeatherView = Backbone.Layout.extend({
        template: Handlebars.compile(cityWeatherTemplate),
        now: new Date(),
        icon: null,
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
        setBackground: function() {
            if (this.icon) {
                var classNames = [];

                classNames.push('weather');
                classNames.push(this.icon[2] === 'd' ? 'day' : 'night');
                classNames.push('bg-' + this.icon);

                $('body').attr('class', classNames.join(' '));
            }
        },
        serialize: function() {
            var data = this.model.toJSON();

            data.temp = Math.round(this.model.get('main').temp);

            if (this.model) {
                this.icon = this.model.get('weather')[0].icon;
            }
            
            return data;
        },
        afterRender: function () {
            this.setBackground();
        }
    });

    return CityWeatherView;

});
