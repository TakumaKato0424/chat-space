$(document).on('turbolinks:load',function(){

  function appendUser(user) {
   var html =  `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`;
    $('#user-search-result').append(html);
  }

  function noMatchUser(message) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">"一致するユーザーはありません"</p>
                </div>`
    $('#user-search-result').append(html);
  }

  function addChatMember(name, id) {
    var html =  `<div class='chat-group-user clearfix' id='chat-group-user-${id}'>
                  <input name='group[user_ids][]' type='hidden' value='${id}'>
                  <p class='chat-group-user__name'>${name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn' id='chat-group-user-${id}'data-user-id="${id}">削除</div>
                  </div>
                </div>`;
    $('.chat-group-users').append(html);
  }

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
        noMatchUser();
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました。');
    });
  });

  $('#user-search-result').on('click', '.user-search-add', function(){
    var id = $(this).data('user-id');
    var name = $(this).data('user-name');
    addChatMember(name, id);
    $(this).parent('.chat-group-user').remove();
  });

  $('.chat-group-users').on('click', '.user-search-remove',function(){
    $(this).parent().remove();
  });
});
