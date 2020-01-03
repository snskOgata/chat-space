$(function () {

  function appendSearchedUserlist(users) {
    html = ""
    if (users.length) {
      $.each(users, function (i, user) {
        html += `<div class="chat-group-user clearfix">
              <p class="chat-group-user__name">${user.name}</p>
              <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
              </div>`
      });
    }
    else {
      html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">ユーザーが見つかりません</p>
               </div>`
    }
    $("#user-search-result").append(html);
  }

  function appendClickedUserlist(name, id) {
    var html = `<div class='chat-group-user'>
            <input name='group[user_ids][]' type='hidden' value='${id}'>
            <p class='chat-group-user__name'>${name}</p>
            <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
          </div>`
    $("#chat-group-users").append(html)
  }

  $("#user-search-field").on("keyup", function () {
    var input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
      .done(function (users) {
        $("#user-search-result").empty();
        appendSearchedUserlist(users);
      })
      .fail(function () {
        console.log('通信エラーです。ユーザが表示できません。');
      });
  });

  $(document).on("click", ".chat-group-user__btn--add", function () {
    $(this).parent().remove();
    appendClickedUserlist($(this).attr("data-user-name"), $(this).attr("data-user-id"))
  });
});