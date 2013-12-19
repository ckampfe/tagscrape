/* extensions/helpers/private are defined at the bottom of their scope */

/* INIT */
function parseResults(tags, results) {
  var matches    = (function() {
                     var matches = {};
                     tags.forEach(function(tag) {
                       matches[tag] = [];
                     });

                     return matches;
                   })();

  var parentNode = "body";

  return findMatches(tags, matches, results.body, parentNode);
}

/* MAIN */
function findMatches(tags, matches, node, parentNode) {
  var interests = ["class", "id", "content", "href", "span"];

  // if object && not array
  if (typeof node === 'object' && !node.isArray) {
    var children = Object.keys(node); // children

    // then, if parent is something we want
    if (tags.include(parentNode)) {
      collectMatches(matches);
    }

    // descend
    children.forEach(function(key) {
      if (hasChildren(key)) {
        return findMatches(tags, matches, node[key], key);
      }
    });

  } else if (node.isArray) {
    console.log("is array");
  } else { // otherwise
    console.log("something fucked up");
  }

  return matches;


  /* PRIVATE / HELPERS */

  // adding actual matches to matches obj
  function collectMatches(matches) {
    var temp = {};
    children.forEach(function(key) {
      if (interests.include(key)) { // if there's a match
        temp[key] = node[key];
      }
    });

    if (Object.keys(temp).length > 0) { // if any matches
      matches[parentNode].push(temp);
    }
  }

  // checking if a given key has children
  function hasChildren(key) {
    if (node[key] !== null) {
      if (node[key].length > 1) {
        // console.log("array");
        for (var i = 0; i < node[key].length; i++) {
          return findMatches(tags, matches, node[i], parentNode);
        }
      } else if (typeof node[key] === 'string') {
        console.log("string");
      } else if (Object.keys(node[key]).length) {
        console.log( node[key] + " has children");
        return true;
      } else {
        console.log("else");
      }
    }
  }
}

// like Ruby's Array#include?
Array.prototype.include = function(thing) {
  var lengthTarget = this.filter(function(arrayItem) {
    return arrayItem === thing;
  });

  return ( lengthTarget.length ? true : false );
}
