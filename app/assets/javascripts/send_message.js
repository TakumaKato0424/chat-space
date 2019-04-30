$(function() {
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
});
