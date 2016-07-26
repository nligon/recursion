// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;
//strategy: recursive function 
//  it has a terminating criteria where if you hit a primitive, you just do something (don't recurse)
// when it's an Array or Object, you recurse, for each element, run the function, return JSON object or primitive
// but you're not, so you'll write it from scratch:

// var stringTest = function(value) {
//   // console.log('JSON.Stringify turns ' + value + ' into:');
//   // console.log(JSON.stringify(value));
//   return JSON.stringify(value);
// };



var parseJSON = function(json) {

  // if (typeof json !== 'string') {
  //   throw SyntaxError;
  // }

  var testNumber = function(str) {
    for (var i = 0; i < 10; i++) {
      if (str.charAt(0) === i.toString()) {
        // console.log("Number found!");
        return true;
      }
    }
    return false;
  };

  console.log('parseJSON running on value:', json);
  if (json === undefined) {
    return 'Error: json is undefined';
  }

  var res;

  // if array
  if (json.charAt(0) === '[') { //[true, false, [1, 2, 3, '[1,2,3]']]
    // console.log('Array detected!');
    res = json.slice(1, json.length - 1); // ""
    // if array is empty
    if (res.length === 0) {
      res = [];
      // if array not empty
    } else {
      res = [];
      var inString = false;
      var arrLayer = 0;
      var objLayer = 0;
      var lastComma = 0; //
      //'1,2,3,"[1,2,3]"]'
      // iterate through string
      for (var i = 1; i < json.length - 1; i++) {

        if (json[i] === '"') {
          inString = !inString;
        }

        // Only do this if outside a string
        if (!inString) {

          // array detection within arrays
          if (json[i] === '[') {
            arrLayer++;
          } else if (json[i] === ']') {
            arrLayer--;
          }

          //object detection within arrays
          if (json[i] === '{') {
            objLayer++;
          } else if (json[i] === '}') {
            objLayer--;
          }

          // comma detection and element pusher
          if (json[i] === ',' && !arrLayer && !objLayer) {
            res.push(json.slice(lastComma + 1, i));
            lastComma = i;
          }

          // if (json[i] === '[') {
          //   res.push(json.slice(lastComma + 1, i));
          //   lastComma = i;
          // }

        }
      }
      // still in the 'for loop' of "array not empty"
      res.push(json.slice(lastComma + 1, json.length - 1));

      for (var i = 0; i < res.length; i++) {
        res[i] = parseJSON(res[i]);
      }

      // if you hit quotes, toggle inString
      // if inString === false
      // if you hit comma
      // push (slice json[lastComma+1] through json[i])
      // save index to lastComma
      // after everything, push (slice json[lastComma+1])
      // res = map over array, calling parseJSON on each value
    }


    // if object
  } else if (json.charAt(0) === '{') {
    if (json === '{}') { //TODO: are there any edge cases?
      res = {};
    } else {
      var inString = false;
      var arrLayer = 0;
      var objLayer = 0;
      var lastComma = 0;
      var resArr = [];

      for (var i = 1; i < json.length - 1; i++) {
        // console.log('iterating', i);
        if (json[i] === '"') {
          inString = !inString;
        }

        // string detection
        if (!inString) {

          // object detection within objects
          if (json[i] === '{') {
            objLayer++;
          } else if (json[i] === '}') {
            objLayer--;
          }

          // array detection within objects
          if (json[i] === '[') {
            arrLayer++;
          } else if (json[i] === ']') {
            arrLayer--;
          }

          if (json[i] === ',' && !objLayer && !arrLayer) {
            resArr.push(json.slice(lastComma + 1, i));
            lastComma = i;
          }
        }
      }

      // console.log('lastComma:', lastComma);
      resArr = resArr.concat(json.slice(lastComma + 1, json.length - 1));
      //iterate through the input
      //check if you are in a string and toggle
      //if you are not in a string
      //if you hit comma
      //push json.slice(lastComma,i)
      //update lastComma
      // after everything, push json.slice[lastComma+1])
      res = {};

      console.log('resArr is:', resArr);

      for (var j = 0; j < resArr.length; j++) {
        // console.log('j', j, resArr.length);
        var colonIndex = resArr[j].indexOf(':');
        var key = parseJSON(resArr[j].slice(0, colonIndex));
        var value = parseJSON(resArr[j].slice(colonIndex + 1));

        res[key] = value;
        // res[parseJSON(key)] = parseJSON(value);
      }

      //resArr now has key-value pairs (in string form)
      //iterate through resArr and split by colon
      //key and value should be passed into parseJSON
      //assign key and value to res
    }


    // primitives (do not recurse)
    // if number
  } else if (testNumber(json)) {
    res = Number(json);
    // if boolean true
  } else if (json === 'true') {
    console.log('found true');
    res = true;
    // if boolean false
  } else if (json === 'false') {
    console.log('found false');
    res = false;
    // if null
  } else if (json === 'null') {
    console.log('found null');
    res = null;
    // if undefined
  } else if (json === undefined) {
    console.log('found undefined');
    res = undefined;
    // if string
  } else if (json.charAt(0) === '"') {
    console.log('String detected!');
    res = json.slice(1, json.length - 1);
  } else {
    console.log("something here");
    res = 'Error: Type not found';
  }
  console.log('returning res. res is: ', res);
  return res;
};

// var testCases = [
//   // null,
//   // true,
//   // false,
//   // 1,
//   // 2,
//   // 'asdf', [],
//   // [true, false, 'abc', '1, 2, 3'],
//   // [true, false, [1, 2, 3, '[1,2,3]']],
//   // {},
//   // {a: 3, c: 'd,', e: 'f'},
//   { a: 'b', c: {d: '0', '1': {'2': {'3': '4'}}}, e: 'f', g: 'h'},
//   {a: 'b', c: {d: 'e', 0: {1: '2', 3: {4: 5}, 6: {7: 8, 9: {10: 11}} }}, f: 'g'},
//   [true, false, [1, 2, 3, '[1,2,3]', ['a', [[], []]]], 'b'],
//   { 1: [{ 2: '3', 4: 5 }] },
//   { 1: [{ 2: '3', 4: 5, 6: [{}, {}, {1: {}, 2: [1, 2, 3, {}, 4, [], 'q']}] }] }
// ];

// var advType = function(item) {
//   if (Array.isArray(item)) {
//     return 'array';
//   } else {
//     return typeof item;
//   }
// };

// var test = function(value) {
//   var output = parseJSON(JSON.stringify(value));

//   if (JSON.stringify(output) === JSON.stringify(value)) { //it will do for now...
//     console.log('*********'); // + 'Input array length was:', value.length);
//     console.log('Input type was:', advType(value) + '. Input was: ');
//     console.log(value);
//     //console.log('Output array length was:', output.length);
//     console.log('Output type was:', advType(output) + '. Output was: ');
//     console.log(output);
//     return 'SUCCESS';
//   } else {
//     console.log('*********'); // + 'Input array length was:', value.length);
//     console.log('Input type was:', advType(value) + '. Input was: ');
//     console.log(value);
//     //console.log('Output array length was:', output.length);
//     console.log('Output type was:', advType(output) + '. Output was: ');
//     console.log(output);
//     return 'FAILURE';
//   }
// };

// for (var i = 0; i < testCases.length; i++) {
//   console.log(test(testCases[i]));
// }
