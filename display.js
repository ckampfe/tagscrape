function display(matches) {
  var tags = Object.keys(matches);

  tags.forEach(function(tag) {
    var container      = document.createElement('ul'),
        sectionHeading = document.createTextNode(tag);
        container.appendChild(sectionHeading);
        container.id   = tag;


    var displayDiv = document.getElementById('display');
        displayDiv.appendChild(container);

    insertItems(container, matches[tag], 'li');
  });
}

// generic
function insertItems(parentElement, matchedItems, tagType) {
  matchedItems.forEach(function(matchedItem) {
    var newEl         = document.createElement(tagType),        // make element
        contentString = stringifyItemConents(matchedItem),      // stringify contents
        itemContents  = document.createTextNode(contentString); // make content

    newEl.appendChild(itemContents);  // add content to element
    parentElement.appendChild(newEl); // add element to DOM
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
