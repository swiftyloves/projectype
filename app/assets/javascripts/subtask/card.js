$(function() {
  var disableEnter = false;
  var maxLine = 3;

  function addComment(comment, id, img) {
    var com = $('<div class="comment">' +
                      '<div class="mem" uid=' + id + '></div>' +
                      '<pre>' + comment + '</pre>' +
                    '</div>');
    com.children("div").attr("background-image", img); 
    $("#comments").prepend(com);
  };
 
  function addMem(id, img) {
    var tmp = $("<div class='mem' uid='"+id+"'>" +
                "<div class='deleteMem'><div></div></div>" +
                "</div>");
    tmp.attr("background-image", img); 
    tmp.children(".deleteMem").click(function(event, ui) {
      deleteMem(event, $(this));
    });
    $("#mems").append(tmp);
  };

  function addUserList(id, img) {
    var tmp = $("<div class='mem' uid='"+id+"'></div>");
    tmp.attr("background-image", img);
    tmp.click(function(event, ui) {
      addUserToMem(event, $(this));
    });
    $("#userList").append(tmp);
  };
 
  function deleteMem(event, ui) {
    ui.parent().remove();
  };

  function addUserToMem(event, ui) {
    $("#userList").hide();
    var list = $("#mems").children();
    var exist = false;
    var id = ui.attr("uid");
    for (var i = 0; i < list.length; ++i) {
      if ($(list[i]).attr("uid") == id) {
        exist = true;
        break;
      }
    }
    if (exist) {
      console.log("exist!");
      return;
    }
    // ajax
    addMem(id, ui.attr("background-image"));
  };

  // init
  $("#userList").hide();

  $("#sddaysArea input").datepicker({dateFormat: "yy-mm-dd"});

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

  $("#commentArea textarea").keydown(function(event) {
    if (event.which == 13 && disableEnter) {
      var line = $(this).val().split("\n").length;
      if (line >= maxLine) {
        return false;
      }
    }
  }).blur(function(event) {
    var tmp = $(this).val();
    if (tmp == "") {
      return;
    }
    // ajax
    addComment(tmp, $("#headImg").attr("uid"), $("#headImg").attr("background-image"));
    $(this).val("");
  });

  $("#discription textarea").blur(function(event) {
    // ajax
  });


  $(".deleteMem").click(function(event, ui) {
    // ajax
    deleteMem(event, $(this));
  });

  $("#addMemButton").click(function(event) {
    if ($("#userList").is(":visible")) {
      $("#userList").hide();
    } else {
      $("#userList").show();
    }
  });

  $("#userList .mem").click(function(event, ui) {
    addUserToMem(event, $(this));
  });

  function test() {
    addUserList(1, "");
    addUserList(2, "");
    addMem(1, "");
    addComment("test", 1, "");

    $("#discription textarea").val("haha");
    $("#sday").datepicker("setDate", "2012-04-01");
    $("#dday").datepicker("setDate", "2012-04-10");
    
  };

  test();

});
