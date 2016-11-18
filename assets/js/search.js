// http://rayhightower.com/blog/2016/01/04/how-to-make-lunrjs-jekyll-work-together/
// http://katydecorah.com/code/lunr-and-jekyll/

jQuery(function() {
  // Initialize lunr with the fields to be searched, plus the boost.
  window.idx = lunr(function () {
    this.field('url');
    this.field('prefLabel');
  });
  console.log('created idx');
  // Get the generated json-file so lunr.js can search it locally.
  window.data = $.getJSON('https://almanak.github.io/dak/subjects.json');
  if (window.data.length) {
      console.log('requested json');
  }
  // Wait for the data to load and add it to lunr
  window.data.then(function(loaded_data){
    console.log("loaded json");
    $.each(loaded_data, function(index, value){
      window.idx.add(
        $.extend({ "id": index }, value)
      );
    });
    console.log("created index");
  });
  console.log('outside index-creation - what happened?');
  $('#search_box').on('keyup', function () {
    var query = $(this).val();
    var results = window.idx.search(query); // Get lunr to perform a search
    display_search_results(results); // Hand the results off to be displayed
  });


  // Event when the form is submitted
  $("#site_search").submit(function(event){
      event.preventDefault();
      var query = $("#search_box").val(); // Get the value for the text field
      var results = window.idx.search(query); // Get lunr to perform a search
      display_search_results(results); // Hand the results off to be displayed
  });

  function display_search_results(results) {
    var $search_results = $("#search_results");

    // Wait for data to load
    window.data.then(function(loaded_data) {
      console.log('window.data.then is fulfilled inside display-results');
      // Are there any results?
      if (results.length) {
        $search_results.empty(); // Clear any old results

        // Iterate over the results
        results.forEach(function(result) {
          var item = loaded_data[result.ref];

          // Build a snippet of HTML for this result
          var appendString = '<li><a href="' + item.url + '">' + item.prefLabel + '</a></li><li>' + 'placeholder' + '</li>';

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
