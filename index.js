var $searchInput = $('#search-input');
var $searchButton = $('#search-button');
var $randomButton = $('#random-button');
var $searchResults = $('#search-results');

function generateURL(input) {
  return 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&callback=?&gsrsearch=' + input;
};

function generateResult(result) {
  var $row = $('<li class="row result-row" />');

  var $text = $('<div class="col-sm-10" />');
  var $title = $('<h1 />', {text: result.title});
  var $extract = $('<p />', {text: result.extract});
  $text.append($title);
  $text.append($extract);
  $row.append($text);

  var $thumbnail = $('<div class="col-sm-2" />');
  var $img = $('<img />', {
    class: 'result-thumbnail',
    src: result.thumbnail.source
  });
  $thumbnail.append($img);
  $row.append($thumbnail);

  return $row;
}

function getData(input) {
  $searchResults.empty();

  $.getJSON(generateURL(input)).then(function(data) {
    var pages = data.query.pages;
    Object.keys(pages).forEach(function(key) {
      $searchResults.append(generateResult(pages[key]));
    });
  });
}

$searchButton.on('click', function() {
  var input = $searchInput.val();

  getData(input);
});

$randomButton.on('click', function() {
  var choices = ['Seattle', 'London', 'Madrid'];
  var index = Math.floor(Math.random() * choices.length);
  var randomInput = choices[index];

  getData(randomInput);
});
