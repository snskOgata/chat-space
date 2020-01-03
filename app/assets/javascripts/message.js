$(function () {

  function buildHTML(message) {
    // 名前と日付
    let html = `<div class="message-box" data-message-id="${message.id}">
                  <div class="message-box__top-items">
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
        html += `<img class="message-box__image" src="${message.image}" alt="Hirune soto boy"></div>`
      }
      // 画像あり文章なし
      else {
        html += `<img class="message-box__image" src="${message.image}" alt="Hirune soto boy"></div>`
      }
    }
    // 画像なし
    else {
      html += `<p class="message-box__message">${message.content}</p ></div>`;
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
        $('form')[0].reset();
        $('.bottom-items__send-btn').prop('disabled', false);
      })
  })

  function reloadMessages() {
    last_message_id = $('.message-box:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: { id: last_message_id }
    })
      .done(function (messages) {
        if (messages.length !== 0) {
          var insertHTML = '';

          $.each(messages, function (i, message) {
            insertHTML += buildHTML(message)
          });

          $('.message-boxes').append(insertHTML);
          $('.chat-main__message-list').animate({ scrollTop: $('.message-boxes')[0].scrollHeight });
        }
      })
      .fail(function () {
        alert('メッセージの受信に失敗しました');
      })
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});