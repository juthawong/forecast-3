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
    

    /*
     * namespace utils 
     *
     * help with back and forth conversion with dot-delimited namespaces to objects
     */

    universalUtils._namespaceWalk = function(object, path, create) {
        var i,
            objectPosition = object,
            splitPath = path.split('.');

        for(i = 0; i < splitPath.length - 1; i++) {
            if(create && objectPosition[splitPath[i]] === undefined) {
                if(this.tryNumberConversion(splitPath[i + 1]) === 0) {
                    objectPosition[splitPath[i]] = [];
                }
                else {
                    objectPosition[splitPath[i]] = {};
                }
            }
            objectPosition = objectPosition[splitPath[i]];
        }

        return {
            objectPosition: objectPosition,
            lastKeyName: splitPath[i]
        };
    };

   /*
    * puts value into object under namespace specified as string
    *
    * example: 
    * obj = {};
    * namespacePut(obj, 'some.stuff', 42)
    * obj -> {
    *   some: {
    *       stuff: 42
    *   }
    * };
    *
    * example with array:
    * obj = {};
    * namespacePut(obj, 'some.stuff.0', 42)
    * namespacePut(obj, 'some.stuff.1', 43)
    * obj -> {
    *   some: {
    *       stuff: [
    *           42, 43
    *       ]
    *
    *   }
    * };
    */
    universalUtils.namespacePut = function(object, path, value) {
        var end = this._namespaceWalk(object, path, true);

        if(Array.isArray(end.objectPosition[end.lastKeyName])) {
            end.objectPosition[this.tryNumberConversion(end.lastKeyName)] = value;
        }
        else {
            end.objectPosition[end.lastKeyName] = value;
        }

        return object;

    };

    universalUtils.namespaceGet = function(object, path) {
        var end = this._namespaceWalk(object, path);

        return end.objectPosition[end.lastKeyName];
        
    };

    universalUtils.walkObject = function(obj, transformFunction) {
        Object.getOwnPropertyNames(obj).forEach(function(property) {
            if(_.isObject(obj[property])) {
                obj[property] = universalUtils.walkObject(obj[property], transformFunction);
            }
            else {
                obj[property] = transformFunction.call(obj, property, obj[property]);
            }
        });

        return obj;
    };

    universalUtils.tryNumberConversion = function(candidate) {
        var converted = parseInt(candidate, 10);

        if(converted !== converted) { // NaN
            return candidate;
        }
        if('' + converted !== candidate) { // "1925-10-10" converted to "1925"
            return candidate;
        }
        return converted;
    };

    universalUtils.filterValue = function(val, index, reference) {
        if(Array.isArray(val)) {
            reference[index] = val.filter(universalUtils.filterValue);
            val = reference[index];
        }
        else if(val && typeof val === 'object') {
            reference[index] = universalUtils.filterObject(val);
            val = reference[index];
        }

        return (
            val !== '' &&
            !(Array.isArray(val) && val.length === 0) &&
            !(typeof val === 'object' && _.isEmpty(val))
        );
    };
    universalUtils.filterObject = function(obj) {
        return _.pick(obj, Object.keys(obj).filter(function(key) {
            return universalUtils.filterValue(obj[key], key, obj);
        }));
    };

    // deep joins arrays in object/array with provided glue string
    universalUtils.concatArrays = function(thing, glue) {
        if(Array.isArray(thing)) {
            return thing.map(function(val) {
                return universalUtils.concatArrays(val, glue);
            }).join(glue);
        }
        else if(thing && typeof thing === 'object') {
            Object.keys(thing).forEach(function(key) {
                thing[key] = universalUtils.concatArrays(thing[key], glue);
            });
            return thing;
        }
        return thing;
    };

    universalUtils.getQueryParameters = function(sourceStr, list) {
        if(sourceStr.indexOf('?') > -1) {
            return _.object(sourceStr.replace(/{[a-zA-Z0-9&,]+}/g, '').split('?')[1].split('&')
                .map(function(pairJoined) {
                    return pairJoined.split('=');
                })
                .filter(function(pairSplit) {
                    return list.indexOf(pairSplit[0]) > -1;
                }));
        }

        return {};
    };

    universalUtils.camelToDash = function(camelCasedString) {
        return camelCasedString.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    };

    universalUtils.mapRelEntities = function(obj) {
        for (var field in obj) {
            if ((typeof obj[field]) === 'object') {
                for (var x in obj[field]) {
                    if (x == 'id') {
                        obj[field + '.' + x] = obj[field][x].toString();
                        delete obj[field];
                    }
                }
            } 
        }
        return obj;
    }
    
    universalUtils.getBrowserNameAndVersion = function(){
        var ua= navigator.userAgent, tem,
        M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if(/trident/i.test(M[1])){
            tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
            return 'IE '+(tem[1] || '');
        }
        if(M[1]=== 'Chrome'){
            tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
            if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
        }
        M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
        if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
        return M.join(' ');
    }
    
    return universalUtils;

});
