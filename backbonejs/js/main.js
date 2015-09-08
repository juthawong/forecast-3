/*global requirejs */

requirejs.config({
    baseUrl: '/~ash/forecast/backbonejs/js',
    paths: {
        'backbone': 'lib/backbone',
        'backbone-layoutmanager': 'lib/backbone.layoutmanager',
        // 'backbone-queryparams': 'lib/backbone.queryparams',
        // 'backbone-route-filter': 'lib/backbone-route-filter',
        'text': 'lib/text',
        'cocktail': 'lib/cocktail',
        'handlebars': 'lib/handlebars-v3.0.3',
        'underscore': 'lib/underscore',

        'jquery': 'lib/jquery',
        'templates': '../templates'
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'backbone-layoutmanager': {
            deps: ['backbone']
        },
        'underscore': {
            exports: '_'
        },
        'jquery': {
            exports: 'jQuery'
        },
        'handlebars': {
            exports: 'Handlebars'
        }
    }
});

// bootstrap
requirejs(['backbone', 'views/app', 'routers/default'], function() {
    // check out router and app view for actual initialization, chief.
});