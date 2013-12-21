/* globals */
var RESULTS,
    TAGS,
    MATCHES;

/* JSONP callback */
function yahooHandler(response) {
  RESULTS = response.query.results; // returns { body: {...} }
  console.log(RESULTS);
  // console.log(TAGS);
  MATCHES = parseResults(TAGS, RESULTS); // returns { p: [{},{}] }, etc
  console.log("MATCHES!");
  console.log(MATCHES);
}

// driver: called on button click
function clickHandler(targetUrl, tags, event){
  event.preventDefault();
  TAGS = tags.split(' ');
  insertScriptTag(makeUrl(targetUrl));
}

/* URL maker helper */
function makeUrl(targetUrl) {
  var baseURI          = "http://query.yahooapis.com/v1/public/yql?q=",
      encodedTargetUrl = encodeURIComponent('http://') + targetUrl,
      encodedQuery     = encodeURI("select * from html where url")
                         + encodeURIComponent("='") + encodedTargetUrl + "\'",
      suffix           = "&format=json&diagnostics=true&callback=yahooHandler";

  return baseURI + encodedQuery + suffix;
}

/* insert URL into doc to start JSONP */
function insertScriptTag(url) {
  var scriptEl  = document.createElement("script");
  scriptEl.type = "text/javascript";
  scriptEl.src  = url;
  document.body.appendChild(scriptEl);
}
