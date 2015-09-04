/*global define */

define(['utils/universal'], function(universalUtils) {

    'use strict';

    return {
        initialize: function(options) {
            options = options || {};
            this.queryObj = options.queryObj || {};
        },
        setQueryObj: function(params) {
            params = universalUtils.concatArrays(params, ',');
            params = universalUtils.mapRelEntities(params);
            this.queryObj = params;
        },
        url: function() {
            
            var queryObj = this.queryObj,
                pairs = [],
                queryString = '?';

            queryObj = universalUtils.filterObject(queryObj);

            Object.getOwnPropertyNames(queryObj).forEach(function(paramName) {
                pairs.push(paramName + '=' + queryObj[paramName]);
            });

            queryString += pairs.join('&');

            return this.baseUrl + queryString;

        }
    };
});
