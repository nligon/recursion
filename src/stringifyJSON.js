// This is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// But you don't, so you're going to write it from scratch:

var stringifyJSON = function(obj) {
    var results = "";
    // if string, return with quotes
    if (typeof obj === 'string') {
        return '"' + obj + '"';
    // if array
    } else if (Array.isArray(obj)) {
        results += "[";
        // iterate over array, recursing each element and pushing a comma to results
        for (var i = 0; i < obj.length; i++) {
            results += stringifyJSON(obj[i]);
            if (i !== obj.length - 1) {
                results += ",";
            }
        };
        results += "]";
    // if non-null object
    } else if (typeof obj === 'object' && obj !== null) {
        results += "{";
        // iterate over object
        for (var i in obj) {
            // if the object value property is undefined, return empty object
            if (typeof obj[i] === 'undefined') {
                return '{}';
            }
            // recurse each element and push a colon and a comma to results
            results += stringifyJSON(i) + ":" + stringifyJSON(obj[i]) + ",";
        }
        // if the last character before bracket-adding is a comma, remove it
        if (results.charAt(results.length - 1) === ",") {
            results = results.slice(0, -1);
        }
        results += "}";
    // if number of boolean
    } else {
        return String(obj);
    }
    return results;