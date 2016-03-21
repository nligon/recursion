// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className, obj) {
    var results = [];
    if (obj === undefined) {
        obj = document;
    };
    for (var i = 0; i < obj.children.length; i++) {
        if (obj.children[i].classList.contains(className)) {
            results.push(obj.children[i]);
        }
        results = results.concat(getElementsByClassName(className, obj.children[i]));
    }
    return results;
};