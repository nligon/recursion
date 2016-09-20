var getElementsByClassName = function(className) {
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
