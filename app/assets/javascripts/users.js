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
        console.log('エラー');
      });
  });
});