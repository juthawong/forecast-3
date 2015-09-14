/*global define */

define([], function() {

    'use strict';

    if (window.location.hostname == 'localhost') {
        return 'localhost';
    }
    if (window.location.hostname == '192.168.1.100') {
        return 'ip';
    }
    if (window.location.hostname.indexOf('github')) {
    	return 'github';
    }

});
