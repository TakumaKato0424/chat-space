$(document).on('turbolinks:load',function(){
  $(function() {

    $('#user-search-field').on('keyup', function(e) {
      var input = $('#user-search-field').val();

      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType: 'json'
      })
    });
  });
});
