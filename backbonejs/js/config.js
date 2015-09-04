/*global define */

define(['env'], function(env) {

    'use strict';

    var configurations = {
        github: {
            apiUrl: 'http://api.openweathermap.org/data/2.5/',
            frontUrl: 'http://lukasz-jakub-adamczuk.github.io/forecast/backbonejs/index.html'
        },
        localhost: {
            apiUrl: 'http://api.openweathermap.org/data/2.5/',
            frontUrl: 'http://localhost/~ash/forecast/backbonejs/index.html'
        },
        relative: {
            apiUrl: '/api/',
            frontUrl: '/oca/s/'
        }
    };

    return configurations[env];

});
