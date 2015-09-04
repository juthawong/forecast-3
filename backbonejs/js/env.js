/*global define */

define([], function() {

    'use strict';

    if (window.location.hostname == 'localhost') {
    	return 'localhost';
    } else {
    	return 'github';
    }

});
