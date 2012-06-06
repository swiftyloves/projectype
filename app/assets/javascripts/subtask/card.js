var addComment;
var addMem;
var addUserList;
var prepareEnd;


$(function() {
  var disableEnter = false;
  var maxLine = 3;

  prepareEnd = function () {
    $('#card').dialog({
      //autoOpen: false,
      resizable: false,
      height: 500,
      width: 405,
      modal: true,
      dialogClass: "smallCard",
      open: function(event) {
        console.log(event);
        $("#sddaysArea input").datepicker({
          dateFormat: "yy-mm-dd",
          onSelect: function(dateText, inst) {
            var d;
            if ($(this).attr("id") == "sday") {
              d = {"id": $("#card").attr("subid"),
                  "sday": dateText};
            } else {
              d = {"id": $("#card").attr("subid"),
                  "dday": dateText};
            }
            $("#card").attr("dirty", 1);
            $.ajax({
              type: 'PUT',
              url: '/subtask/edit',
              data: d,
              error: function(response) {
                console.log(response);
                alert("err");
              },
              success: function(response) {
              }
            });
          },
        });
        $(".ui-widget-overlay").click(function(event, ui) {
          $("#card").dialog("close");
        });
        $("#card").click(function(event, ui) {
          $("#userList").hide();
        });
      },
    });

    $('#sday').trigger("blur");

  };

  addComment = function(comment, id, img) {
    img = "url(" + img + ")";
    var com = $('<div class="comment">' +
                      '<div class="mem" uid=' + id + '></div>' +
                      '<div class="container">' +
                      '<pre>' + comment + '</pre>' +
                      '</div>' +
                    '</div>');
    com.children(".mem").css("background-image", img); 
    $("#comments").prepend(com);
  };
 
  addMem = function(id, img) {
    img = "url(" + img + ")";

    var tmp = $("<div class='mem' uid='"+id+"'>" +
                "<div class='deleteMem'><div></div></div>" +
                "</div>");
    tmp.css("background-image", img); 
    tmp.children(".deleteMem").click(function(event, ui) {
      deleteMem(event, $(this));
    });
    $("#mems").append(tmp);
  };

  addUserList = function(id, img) {
    img = "url(" + img + ")";

    var tmp = $("<div class='mem' uid='"+id+"'></div>");
    tmp.css("background-image", img);
    tmp.click(function(event, ui) {
      addUserToMem(event, $(this));
    });
    $("#userList").append(tmp);
  };
 
  function deleteMem(event, ui) {
    // ajax
    $("#card").attr("dirty", 1);
    $.ajax({
      type: 'PUT',
      url: '/subtask/edit',
      data: {"id": $("#card").attr("subid"), "duid": ui.parent().attr("uid")},
      error: function(response) {
        console.log(response);
        alert("err");
      },
      success: function(response) {
      }
    });
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
    $("#card").attr("dirty", 1);
    $.ajax({
      type: 'PUT',
      url: '/subtask/edit',
      data: {"id": $("#card").attr("subid"), "uid": id},
      error: function(response) {
        console.log(response);
        alert("err");
      },
      success: function(response) {
      }
    });

    var img = ui.css("background-image");
    img = img.substr(4, img.length - 5);
    addMem(id, img);
  };

  // init
  $("#userList").hide();
  
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
    //$("#card").attr("dirty", 1);
    $.ajax({
      type: 'POST',
      url: '/subtask/comment',
      data: {"id": $("#card").attr("subid"), "text": $(this).val()},
      error: function(response) {
        console.log(response);
        alert("err");
      },
      success: function(response) {
      }
    });

    var img = $("#headImg").css("background-image");
    img = img.substr(4, img.length - 5);
    addComment(tmp, $("#headImg").attr("uid"), img);
    $(this).val("");
  });

  $("#discription textarea").blur(function(event) {
    // ajax
    //$("#card").attr("dirty", 1);
    $.ajax({
      type: 'PUT',
      url: '/subtask/edit',
      data: {"id": $("#card").attr("subid"), "desc": $(this).val()},
      error: function(response) {
        console.log(response);
        alert("err");
      },
      success: function(response) {
      }
    });

  });


  $(".deleteMem").click(function(event, ui) {
    deleteMem(event, $(this));
  });

  $("#addMemButton").click(function(event) {
    if ($("#userList").is(":visible")) {
      $("#userList").hide();
    } else {
      $("#userList").fadeIn('1s');
    }
    event.stopPropagation();
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

  //test();
  
  //style input
  $('#commentArea textarea').focus(function() {
      $(this).addClass('focus')
  });
  $('#commentArea textarea').focusout(function() {
      $(this).removeClass('focus')
  });
  $('#discription textarea').focus(function() {
      $(this).addClass('focus')
  });
  $('#discription textarea').focusout(function() {
      $(this).removeClass('focus')
  });

});

