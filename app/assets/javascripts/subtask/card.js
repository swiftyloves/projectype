$(function() {
  $("#sddaysArea input").datepicker();
  var disableEnter = false;
  $("#card").on("keydown", "textarea", function(event) {
    if (event.which == 16) {
      disableEnter = true;
    }
    if (event.which == 13 && !disableEnter) {
      $(this).trigger("blur");
    }
  }).on("keyup", "textarea", function(event) {
    if (event.which == 16) {
      disableEnter = false;
    }
  }).on("blur", "textarea", function(event) {
    disableEnter = false;
  });

  var maxLine = 3;

  $("#commentArea textarea").keydown(function(event) {
    if (event.which == 13 && disableEnter) {
      var line = $(this).val().split("\n").length;
      if (line >= maxLine) {
        return false;
      }
    }
  });

 
  $("#commentArea textarea").blur(function(event) {
    var tmp = $(this).attr("value");
    if (tmp == "") {
      return;
    }
    $(this).attr("value", "");
    var comment = $('<div class="comment">' +
                      '<div class="mem"></div>' +
                      '<pre>' + tmp + '</pre>' +
                    '</div>');
    // TODO: should send to server, then change depend response
    comment.children("div").attr("background-image", $("#headImg").attr("background-image"));
    
    $("#comments").append(comment);
  });
});
