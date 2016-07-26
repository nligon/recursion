// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;
//strategy: recursive function 
//  it has a terminating criteria where if you hit a primitive, you just do something (don't recurse)
// when it's an Array or Object, you recurse, for each element, run the function, return JSON object or primitive
// but you're not, so you'll write it from scratch:
var stringTest = function(value) {
  // console.log('JSON.Stringify turns ' + value + ' into:');
  // console.log(JSON.stringify(value));
  return JSON.stringify(value);
};


var testNumber = function(str) {
  for (var i = 0; i < 10; i++) {
    if (str.charAt(0) === i.toString()) {
      // console.log("Number found!");
      return true;
    }
  }
  return false;
};

var parseJSON = function(json) {
  console.log('parseJSON running on value:', json);
  if (json === undefined) {
    return 'Error: parseJSON does not accept undefined as a valid input';
  }

  var res;
  // your code goes here
  // if (json === undefined) {
  //   json = 'undefined';
  // }
  // if object

  // if array
  if (json.charAt(0) === '[') {
    console.log('Array detected!');
    res = json.slice(1, json.length - 1); // ""
    // if array is empty
    if (res.length === 0) {
      res = [];
      // if array not empty
    } else {
      var temp = res.split(',');
      res = [];
      console.log('temp', temp);
      for (var i = 0; i < temp.length; i++) {
        res.push(parseJSON(temp[i]));
      }
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
    res = 'Error: Type not found';
  }
  return res;
};

var testCases = [
  null,
  true,
  false,
  1,
  2,
  'asdf', [],
  ['1, 2, 3']
];

var advType = function(item) {
  if (Array.isArray(item)) {
    return 'array';
  } else {
    return typeof item;
  }
};

var test = function(value) {
  var output = parseJSON(JSON.stringify(value));

  if (JSON.stringify(output) === JSON.stringify(value)) { //it will do for now...
    console.log('*********\n' + 'Input type was:', advType(value) + '. Input was: ');
    console.log(value);
    console.log('Output type was:', advType(output) + '. Output was: ');
    console.log(output);
    return 'SUCCESS';
  }

  console.log('*********\n' + 'Input type was:', advType(value) + '. Input was: ');
  console.log(value);
  console.log('Output type was:', advType(output) + '. Output was: ');
  console.log(output);
  return 'FAILURE';
};

for (var i = 0; i < testCases.length; i++) {
  console.log(test(testCases[i]));
}
