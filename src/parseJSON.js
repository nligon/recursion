// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;
//strategy: recursive function 
//  it has a terminating criteria where if you hit a primitive, you just do something (don't recurse)
// when it's an Array or Object, you recurse, for each element, run the function, return JSON object or primitive
// but you're not, so you'll write it from scratch:
function testNumber(str){
  if (str.charAt(0) === 0 || 1 || 2 || 3 || 4 || 5 || 6 || 7 || 8 || 9) {
    console.log("Number found!");
  }
}

var parseJSON = function(json) {
  var res;
  // your code goes here

  // if object

  // if array

  // else, return primitive (base case)
  // if string
  if (json.charAt(0) === '"') {
    console.log('String detected!');
    res = json.slice(1, json.length - 1);
  } else if (json.charAt(0)) {

  }
  
  return res;
};

// console.log(parseJSON('"test"'));
console.log(testNumber('5'))