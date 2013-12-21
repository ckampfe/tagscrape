function display(matches) {
  var tags = Object.keys(matches);

  // make a container for each query tag
  tags.forEach(function(tag) {
    // make container
    var container      = document.createElement('ul'),
        sectionHeading = document.createTextNode(tag);
        container.appendChild(sectionHeading);
        container.id   = tag;

    // append container to DOM
    var displayDiv = document.getElementById('display');
        displayDiv.appendChild(container);

    // insert query tag children into container
    insertItems(container, matches[tag], 'li');
  });
}

// generic
function insertItems(parentElement, matchedItems, tagType) {
  matchedItems.forEach(function(matchedItem) {
    var newEl         = document.createElement(tagType),
        contentString = stringifyItemConents(matchedItem),
        itemContents  = document.createTextNode(contentString);

    newEl.appendChild(itemContents);
    parentElement.appendChild(newEl);
  });
}


function stringifyItemConents(example) {
  var stringifiedContents = "";
  var keys = Object.keys(example);
  keys.forEach(function(key) {
    stringifiedContents += key + ": " + example[key] + "\n";
  });

  return stringifiedContents;
}
