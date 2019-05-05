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
      .done(function(users) {
        $('#user-search-result').empty();
        if (users.length !== 0 && input.length) {
          users.forEach(function(user){
            appendUser(user);
          })
        }
        else {
          noMatchUser("一致するユーザーはありません");
        }
      })
      .fail(function() {
        alert('ユーザー検索に失敗しました。');
      });
    });

    });
  });
});
