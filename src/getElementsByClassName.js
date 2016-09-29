// First implementation, sub-routine:
var getElementsByClassNameSubRoutine = function(className) {
  var res = [];

  var filterNode = function(node) {
    if (node.classList !== undefined) {
      for (var i = 0; i < node.classList.length; i++) {
        if (node.classList[i] === className) {
          res.push(node);
        }
      }
    }
    if (node.childNodes !== undefined) {
      _.each(node.childNodes, filterNode);
    }
  };

  filterNode(document.body);

  return res;
};

// Second implementation:
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
