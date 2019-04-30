$(function() {
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

  $('#new-message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var message_create_url = $(this).attr('action')
    $.ajax({
      url: message_create_url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(data) {
      var html = buildHTML(data);
      $('.messages').append(html);
    })
});
