/*global define */

define([
    'backbone',
    'handlebars',
    'text!templates/icon/cloudRainMoon.tmpl',
    
    'backbone-layoutmanager'
], function(
    Backbone,
    Handlebars,
    cloudRainMoonIconTemplate
) {

    'use strict';

    var CloudRainMoonIconView = Backbone.Layout.extend({
        template: Handlebars.compile(cloudRainMoonIconTemplate)
    });

    return CloudRainMoonIconView;

});
