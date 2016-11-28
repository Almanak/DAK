// http://rayhightower.com/blog/2016/01/04/how-to-make-lunrjs-jekyll-work-together/
// http://katydecorah.com/code/lunr-and-jekyll/

jQuery(function() {
  // Initialize lunr with the fields to be searched, plus the boost.
  idx = lunr(function () {
    this.field('url');
    this.field('prefLabel');
    
    this.pipeline.remove(lunr.trimmer)
    this.pipeline.remove(lunr.stopWordStemmer)
    this.pipeline.remove(lunr.stemmer)
  });
  // Get the generated json-file so lunr.js can search it locally.
  subjects = $.getJSON('https://almanak.github.io/dak/subjects.json');

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

          // Build a snippet of HTML for this result
          var appendString = '<li><a href="' + item.url + '">' + item.prefLabel + '</a></li><li>' + 'content...' + '</li>';

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
