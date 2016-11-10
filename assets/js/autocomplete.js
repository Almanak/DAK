// Autocomplete
var localSubjects = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('displayname'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    // This relative link probably has to be updated
    prefetch: 'https://almanak.github.io/dao/assets/js/collection_tags_v3.json'
});

$(document).ready(function(){
    $('.typeahead').typeahead({
        hint: false,
        highlight: false,
        minLength: 2
    },
    {
        name: 'localSubjects',
        display: 'displayname',
        source: localSubjects,
        templates: {
            header: '<p class="tt-header">Originale emner</p>',
            suggestion: function(data) {
                return '<div><p>' + data.displayname + '</p></div>';
            }
        }
    })
    .on("typeahead:select", function(e, datum) {
        var $form = $(this).closest('form');
        var $input = $form.find("input[name='q']");
        $input.attr('name', 'collection_tags').val(datum.displayname);
        $form.submit();
    });

    $('form').on('submit', function() {
        // if ( $("input[name='q']").length == 1 ) {
        //     if ( $('.tt-suggestion').length > 0 ) {
        //         $('.search_help--js-choose-item').show().siblings().hide();
        //         $('.search_help').fadeIn(220);
        //     } else if ( $('.tt-input').val().length < 2 ) {
        //         $('.search_help--js-no-input').show().siblings().hide();
        //         $('.search_help').fadeIn(220);
        //     } else {
        //         $('.search_help--js-no-items').show().siblings().hide();
        //     }
        //     return false;
        // } else {
        //     return true;
        // }
    });

});
