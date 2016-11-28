// http://rayhightower.com/blog/2016/01/04/how-to-make-lunrjs-jekyll-work-together/
// http://katydecorah.com/code/lunr-and-jekyll/

jQuery(function() {
  // Initialize lunr with the fields to be searched, plus the boost.
  var idx = lunr(function () {
    this.field('url');
    this.field('prefLabel');
    
    this.pipeline.remove(lunr.trimmer);
    this.pipeline.remove(lunr.stopWordStemmer);
    this.pipeline.remove(lunr.stemmer);
  });

  // url-stuff
  host = window.location.host;
  github_url = "https://almanak.github.io/dak";

  // Get the generated json-file so lunr.js can search it locally.
  var subjects;
  if (host == "almanak.github.io") {
    subjects = $.getJSON(github_url + '/subjects.json');
  } else {
    subjects = $.getJSON('/subjects.json');
  }

  // Wait for the data to load and add it to lunr
  subjects.then(function(loaded_data){
    console.log("loaded subjects: " + $.now());
    $.each(loaded_data, function(index, value){
      idx.add(
        $.extend({ "id": index }, value)
      );
    });
    console.log("created index: " + $.now());
  });

  $('#search_box').on('keyup', function () {
    var query = $(this).val();
    var results = idx.search(query); // Get lunr to perform a search
    display_search_results(results); // Hand the results off to be displayed
  });


  // Event when the form is submitted
  $("#site_search_inactive").submit(function(event){
      event.preventDefault();
      var query = $("#search_box").val(); // Get the value for the text field
      var results = idx.search(query); // Get lunr to perform a search
      display_search_results(results); // Hand the results off to be displayed
  });

  function display_search_results(results) {
    var $search_results = $("#search_results");

    // Wait for data to load
    subjects.then(function(loaded_data) {
      $search_results.empty(); // Clear any old results
      // Are there any results?
      if (results.length) {

        // Iterate over the results
        results.forEach(function(result) {
          var item = loaded_data[result.ref];

          var url;
          if (host == "almanak.github.io") {
            url = github_url + item.url;
          } else {
            url = item.url;
          }
          // Build a snippet of HTML for this result
          var appendString = '<li><a href="' + url + '">' + item.prefLabel + '</a></li><li>' + 'content...' + '</li>';

          // Add the snippet to the collection of results.
          $search_results.append(appendString);
        });
      } else {
        // If there are no results, let the user know.
        $search_results.html('<li>Ingen resultater fundet. Tjek din stavning eller søg efter relaterede ord.</li>');
      }
    });
  }
});
