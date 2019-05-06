$(document).on('turbolinks:load',function(){
  function buildHTML(message) {
    image = ( message.image ) ? `<img src="${message.image}">` : "";
    var html = `<div class="message">
                  <div class="upper-info clearfix">
                    <p class="upper-info__user">
                      ${message.name}
                    </p>
                    <p class="upper-info__date">
                      ${message.created_at}
                    </p>
                  </div>
                  <p class="message__text">${message.content}</p>
                  ${image}
                </div>`;
    return html;
  }

  function resetSendBTN(){
    $('#new-message')[0].reset();
    $('.new-message__submit-btn').attr('disabled',false);
  }

  $('#new-message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(data) {
      var html = buildHTML(data);
      $('.messages').append(html);
      var position = $('.messages')[0].scrollHeight;
      $('.messages').animate({scrollTop:position}, 500, 'swing');
    })

    .fail(function() {
      alert('メッセージを入力してください。');
    })

    .always(function(){
      resetSendBTN();
    });
  });

  var reloadMessages = function() {
    if(window.location.href.match(/\/groups\/\d+\/messages/)) {
      group_id = window.location.href.match(/groups\/(\d)/)[1];
      //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
      last_message_id = $('.message:last').data('id');
      $.ajax({
        //ルーティングで設定した通りのURLを指定
        url: `/groups/${group_id}/api/messages`,
        //ルーティングで設定した通りhttpメソッドをgetに指定
        type: 'get',
        dataType: 'json',
        //dataオプションでリクエストに値を含める
        data: { id: last_message_id }
      })

  };

});
