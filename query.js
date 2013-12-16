var results; // global space for future access

function clickHandler(targetUrl, tags, event){
  event.preventDefault();
  makeQuery(makeUrl(targetUrl, tags));
}

function makeUrl(targetUrl, tags) {
  var baseURI          = "http://query.yahooapis.com/v1/public/yql?q=",
      encodedTargetUrl = encodeURIComponent('http://') + targetUrl,
      encodedQuery     = encodeURI("select * from html where url")
                         + encodeURIComponent("='") + encodedTargetUrl + "\'",
      suffix           = "&format=json&diagnostics=true&callback=yahooHandler";

  return baseURI + encodedQuery + suffix;
}

function makeQuery(url) {
  // make script element
  var scriptEl  = document.createElement("script");
  scriptEl.type = "text/javascript";
  scriptEl.src  = url;

  // insert script element
  document.body.appendChild(scriptEl);
}

// JSONP callback
function yahooHandler(response) {
  results = response.query.results;
}
