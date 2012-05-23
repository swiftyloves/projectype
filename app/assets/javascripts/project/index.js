$(function() {
  $("#projectData span").click(function (event, ui) {
    console.log($(this));
    requestTask($(this));
  });

  $("#addButton").click(function (event) {
    if ($("#projectData input").size()) {
      return;
    }
    var obj = $("<input type='text' maxlength='22'></input>");
    $(this).before(obj);
    obj.hide().slideDown('normal', function() {
      $(this).trigger('focus');
    }).keydown(function (event) {
      if (event.which == 13) {
        event.preventDefault();
        $(this).trigger('blur');
      }
    }).blur(function (event, ui) {
      if ($(this).attr("value") == "") {
        $(this).slideUp('normal', function() {
          $(this).remove();
        });
        return;
      }
      // ajax callback
      $.ajax({
        type: 'POST',
        url: '/project/add',
        data: {"name": $(this).val()},
        error: function(response) {
          console.log(response);
          alert("err");
        },
        success: function(response) {
          console.log(response);
          if (!response["id"]) {
            alert("err");
            $("#projectData input").trigger('focus');
            return;
          }
          var obj2 = $("<span pid='"+response["id"]+"'>" + 
                     $("#projectData input").attr("value") + "</span>");
          $("#projectData input").before(obj2).remove();
          obj2.click(function (event, ui) {
            console.log($(this));
            requestTask($(this));
          });
        }
      });
    });
  });
});
