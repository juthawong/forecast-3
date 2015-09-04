/*global define */

define([
    'backbone',
    'handlebars',
    'text!templates/app.tmpl',
    
    'backbone-layoutmanager'
], function(
    Backbone,
    Handlebars,
    appTemplate
) {

    'use strict';

    var AppView = Backbone.Layout.extend({
        el: '.root',
        template: Handlebars.compile(appTemplate),
        initialize: function() {
            // ...
            this.render();
        }
    });

    window.appView = new AppView();

    return window.appView;

});