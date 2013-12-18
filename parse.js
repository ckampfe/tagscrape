/*** all extensions/helpers are defined at the bottom of their scope ***/

// parse results, add to matches
function parseResults(tags, results) {
  var matches    = makeMatchesObj(tags),
      parentNode = "body";
  return findMatches(tags, matches, results.body, parentNode);
}

function findMatches(tags, matches, node, parentNode) {
  var interests = ["class", "id", "content", "href", "span"];

  // if object not array
  if (typeof node === 'object' && !node.isArray) {
    var keys = Object.keys(node); // children

    if (tags.include(parentNode)) { // if parent is of interest, make ready!
      var temp = {};
      keys.forEach(function(key) {
        if (interests.include(key)) { // if there's a match
          temp[key] = node[key];
        }
      });

      if (Object.keys(temp).length > 0) { // if any matches
        matches[parentNode].push(temp);
      }
    }

    // descend if children have children
    keys.forEach(function(key) {
      if (hasChildren(key)) {
        return findMatches(tags, matches, node[key], key);
      }
    });

   } else if (parentNode.isArray) {
     console.log("is array");
  } else { // error
    console.log("something fucked up");
  }

  function hasChildren(key) {
    if (node[key] !== null) {
      if (node.isArray) {
        iterateArray(node[key], key);
      } else if (typeof node[key] === 'string') {
        // eat it
      } else if (Object.keys(node[key]).length) {
        // console.log( node[key] + " has children");
        return true;
      } else {
        // eat it
      }
    }
  }

  return matches;
}

/***
 * HELPERS
 ***/

function iterateArray(arrayNode, parentNode) {
  for (var i = 0; i < arrayNode.length; i++) {
    return findMatches(tags, matches, node[i], parentNode);
  }
}

/* matches creator helper */
function makeMatchesObj(tags) {
  var matches = {};
  tags.forEach(function(tag) {
    matches[tag] = [];
  });

  return matches;
}

/* return true if Array includes
 * a given arg, else false
 **/
Array.prototype.include = function(thing) {
  var lengthTarget = this.filter(function(arrayItem) {
    return arrayItem === thing;
  });

  return ( lengthTarget.length ? true : false );
}
