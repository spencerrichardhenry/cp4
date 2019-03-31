let stockJSON = function(url) {
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      let results = "";
      results += "<li class=\"stocks\">" + json.symbol;
      if (json.changePercent >= 0) {
        results += "<span class=\"percent\" maxlength=\"5\" style=\"color: green\"> " + (json.changePercent * 100);
      } else {
        results += "<span class=\"percent\" style=\"color: red\"> " + (json.changePercent * 100);
      }
      results += "%</span>"
      document.getElementById("stocks").innerHTML += results;
    })
}

function stockInfo() {
  stockJSON('https://api.iextrading.com/1.0/stock/voo/quote');
  (stockJSON('https://api.iextrading.com/1.0/stock/ndaq/quote'));
  (stockJSON('https://api.iextrading.com/1.0/stock/dia/quote'));
  (stockJSON('https://api.iextrading.com/1.0/stock/aapl/quote'));
  (stockJSON('https://api.iextrading.com/1.0/stock/fb/quote'));
}