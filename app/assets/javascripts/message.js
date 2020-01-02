$(function () {

  function buildHTML(message) {
    // 名前と日付
    let html = `<div class="message-box__top-items">
                  <div class="message-box__top-items__name">
                    ${message.user_name}
                  </div>
                  <div class="message-box__top-items__date">
                    ${message.date}
                  </div>
                </div>`

    // 画像あり
    if (message.image) {
      // 画像あり文章あり
      if (message.content) {
        html += `<p class="message-box__message">${message.content}</p >`;
        html += `<img class="message-box__image" src="${message.image}" alt="Hirune soto boy">`
      }
      // 画像あり文章なし
      else {
        html += `<img class="message-box__image" src="${message.image}" alt="Hirune soto boy">`
      }
    }
    // 画像なし
    else {
      html += `<p class="message-box__message">${message.content}</p >`;
    }
    return html
  }

  $('#new_message').on('submit', function (e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
      .done(function (data) {
        var html = buildHTML(data);
        $('.message-boxes').append(html);
        $('form')[0].reset();
        $('.bottom-items__send-btn').prop('disabled', false);

        $('.chat-main__message-list').animate({ scrollTop: $('.message-boxes')[0].scrollHeight });
      })
      .fail(function () {
        alert('メッセージの送信に失敗しました');
      })
  })
});