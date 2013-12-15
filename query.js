/* QUERY YQL */
var results = "";

// callback
function yahooHandler(data) {
}


/* ON CLICK */
function clickHandler(url, tags){
  console.log("query()");

  var baseURI          = "http://query.yahooapis.com/v1/public/yql?q=",
      encodedTargetUrl = encodeURIComponent('http://') + url,
      encodedQuery     = encodeURI("select * from html where url")
                     + encodeURIComponent("='") + encodedTargetUrl + "\'",
      suffix           = "&format=json&diagnostics=true&callback=yahooHandler";


  var complete = baseURI + encodedQuery + suffix;
  console.log(complete);
}


// actual
// http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D'http%3A%2F%2Fzeroclarkthirty.com'&format=json&diagnostics=true&callback=yahooHandler
// http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D'http%3A%2F%2Fzeroclarkthirty.com'&format=json&diagnostics=true&callback=yahooHandler
// http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D'http%3A%2F%2Fzeroclarkthirty.com'&format=json&diagnostics=true&callback=yahooHandler







