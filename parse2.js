/* init */
function parseResults(tags, queryResults) {

  var targetAttrs   = ['content', 'href', 'class', 'id'],
      searchResults = {};

  tags.forEach(function(el) {
    searchResults[el] = [];
  });

  return search(
                queryResults.body, // the current search object
                'body',            // a string representing the parent
                tags,              // array of target tags
                targetAttrs,       // array of target attributes
                searchResults      // { div: [ {...}, {...} ] }
               );
}

function search(current, parentNode, tags, targetAttributes, searchResults) {
  var children = Object.keys(current);

  /* action */
  if (tags.include(parentNode)) {
    matchObj = {};

    children.forEach(function(child) {
      if (targetAttributes.include(child)) {
        matchObj[child] = current[child];
      }
    });

    searchResults[parentNode].push(matchObj);
  }

  /* crawl */
  children.forEach(function(child) {
    var currentChild = current[child];

    if (typeof currentChild !== 'string' && currentChild.length > 0) {
      for (var i = 0; i < currentChild.length; i++) {
        if (currentChild[i] != null) { // needed, some </br> silliness
          search(currentChild[i], child, tags, targetAttributes, searchResults);
        }
      }

    } else if (typeof currentChild !== 'string' && Object.keys(currentChild).length > 0) {
          return search(currentChild, child, tags, targetAttributes, searchResults);

    } else {
      console.log("ignore, not array or object");
    }
  });

 return searchResults;
}

// like Ruby's Array#include?
Array.prototype.include = function(challengeEl) {
  var lengthTarget = this.filter(function(residentEl) {
    return residentEl === challengeEl;
  });

  return ( lengthTarget.length ? true : false );
}
