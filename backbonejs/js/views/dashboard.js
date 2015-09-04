/*global define */

define([
    'backbone',
    'handlebars',
    'text!templates/dashboard.tmpl',
    
    'backbone-layoutmanager'
], function(
    Backbone,
    Handlebars,
    dashboardTemplate
) {

    'use strict';

    var DashboardView = Backbone.Layout.extend({
        template: Handlebars.compile(dashboardTemplate)
    });

    return DashboardView;

});
