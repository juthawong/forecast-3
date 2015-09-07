/*global define */

define([
    'backbone',
    'handlebars',
    'text!templates/icon/moon.tmpl',
    
    'backbone-layoutmanager'
], function(
    Backbone,
    Handlebars,
    moonIconTemplate
) {

    'use strict';

    var MoonIconView = Backbone.Layout.extend({
        template: Handlebars.compile(moonIconTemplate)
    });

    return MoonIconView;

});
