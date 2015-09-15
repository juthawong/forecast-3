/*global define */

define(['underscore'], function(_) {

    'use strict';

    var universalUtils = {};


    universalUtils.getCurrentPosition = function() {
        return new Promise(function(resolve, reject) {
            var coords = null;

            navigator.geolocation.getCurrentPosition(
                function(position) {
                    coords = {};
                    coords.latitude = position.coords.latitude;
                    coords.longitude = position.coords.longitude;

                    resolve(coords);
                }
            );
        });
    };
        
    return universalUtils;

});
