/*global define */

define([
    'backbone',
    'handlebars',
    'text!templates/icon/sun.tmpl',
    
    'backbone-layoutmanager'
], function(
    Backbone,
    Handlebars,
    sunIconTemplate
) {

    'use strict';

    var SunIconView = Backbone.Layout.extend({
        template: Handlebars.compile(sunIconTemplate)
    });

    return SunIconView;

});
