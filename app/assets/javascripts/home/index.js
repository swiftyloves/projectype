$(function() {
  //unlogin
  
  // functions

  var currentState = 0;
  function resetMainHeight() {
    if (window.innerHeight <= 780) {
      $("#main").attr("style", "");
      $("#bottomMask").css("height", 80)
    } else {
      $("#main").attr("style", "height:" + window.innerHeight + ";");
      $("#bottomMask").css("height", window.innerHeight - 700);
    }
    $(".outer").css("width", Math.max(window.outerWidth, $("#main").width(), 1080));
  };

  function resetToggle() {
    $(".pointUser").removeClass("pointUser");
    $(".pointTask").removeClass("pointTask");
    $("#triangle").addClass("hide");

    $(".showTag").removeClass("showTag");
    $("#functionTag").addClass("hide");

    $(".toggling").removeClass("toggling");
  };

  function handleFblogin() {
    FB.api("/me/picture", function(response) {
      if (!response || response.error) {
          console.log('picture err', response);
          return;
      }
      $("#headImg").css("background", "url(" + response + ")"); 
    });
    $.get("/home/fblogin", function(data) {
      commonLoginAction();
    });
  };

  function commonLogoutAction() {
    $(".login").removeClass("login").addClass("unlogin");
    $(".loginTag").removeClass("loginTag").addClass("unloginTag");
    $.get("/home/logout")
    $("#content").empty();
    $("#projectName span").empty();
    doBlockingStart();
    $.ajax({
      //type: 'POST',
      url: '/welcome',
      error: function(response) {
        console.log("err");
        doBlockingEnd();
      },
      success: function(response) {
        handleResponse(response);
        doBlockingEnd();
      }
    });
  };

  // init

  resetMainHeight();
  window.onresize = function(event) {
    resetMainHeight();
  };
  
  //$("#content").jScrollPane();
  
  // fix ajax clear session  
  $.ajaxSetup({
    beforeSend: function(xhr) {
      xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));
    }
  });

 
  // buttons

  $("#userButton").click(function(event) {
    if ($("#projectName span").html().length == 0) {
      return;
    }

    if (currentState != $(this)) {
      currentState = $(this);
      resetToggle();
      $(this).addClass("toggling");
      $("#triangle").addClass("pointUser").removeClass("hide");
      doBlockingStart();
      $.ajax({
        //type: 'POST',
        url: '/user',
        //data: {"name": name},
        error: function(response) {
          console.log("err");
          doBlockingEnd();
        },
        success: function(response) {
          handleResponse(response);
          doBlockingEnd();
        }
      });
    }
  });

  $("#taskButton").click(function(event, ui) {
    if (currentState != $(this)) {
      currentState = $(this);
      resetToggle();
      $(this).addClass("toggling");
      $("#triangle").addClass("pointTask").removeClass("hide");
      var name;
      var id;
      if (ui) {
        name = $(ui).html();
        id = $(ui).attr("pid");
      } else if ($("#projectName span").html().length != 0) {
        name = $("#projectName span").html();
        id = $("#projectName span").attr("pid");
      } else {
        name = "Project1";
        id = -1;
      }
      if (name) {
        console.log("recieve:" + name);
        $("#projectName span").empty().append(name);
        $("#projectName span").attr("pid", id);
        doBlockingStart();
        $.ajax({
          type: 'POST',
          url: '/task',
          data: {"id": id},
          error: function(response) {
            console.log("err");
            $("#projectName span").empty();
            $("#projectName span").attr("pid", "");
            doBlockingEnd();
          },
          success: function(response) {
            handleResponse(response);
            doBlockingEnd();
          }
        });
      }
    }
  });

  $("#logButton").click(function(event) {
    if (currentState != $(this)) {
      currentState = $(this);
      resetToggle();
      $(this).addClass("toggling");
      $("#functionTag").addClass("showTag").removeClass("hide");
    }
  });

  $("#contactButton").click(function(event) {
    console.log($(this));
  });

  $("#helpButton").click(function(event) {
    console.log($(this));
    $.blockUI( {message: $("#helpContent"),
                css: { 
                  background: "rgba(0, 0, 0, 0)",
                  border: "none",
                  top: "0px",
                  //left: "auto",
                  cursor: "help",
                },
               });
  });

  $("#helpContent").click(function(event) {
    $.unblockUI();
  });

  $("#fbButton").click(function(event) {
    console.log($(this));
    /*
    FB.login(function(res) {
      if (res.authResponse) {
        console.log('success');
        handleFblogin();
        resetToggle();
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    }, { scope: 'user_photos' });
    */
    window.location = "/home/fblogin"; 
  });

  $("#gButton").click(function(event) {
    console.log($(this));
    window.location = "/home/gplogin"; 
  });

  $("#homeButton").click(function(event) {
    console.log($(this));
    resetToggle();
    $("#projectName span").empty();
    commonLoginAction();
  });

  $("#inviteButton").click(function(event) {
    console.log($(this));
    if ($("#projectName span").html() != "") {
      $(".inviteCard").dialog("open");
    }
  });

  $("#logoutButton").click(function(event) {
    console.log($(this));
    FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        FB.logout(function() {
          commonLogoutAction();
          resetToggle();
        });
      } else {
        commonLogoutAction();
        window.setTimeout(resetToggle, 10);
      }
    });
  });

  $("#projectName").click(function() {
    if ($("#projectName span").contents().length != 0 &&
        $(this).hasClass("noeditingName")) {
      $(this).removeClass("noeditingName");
      $(this).addClass("editingName");
      var ctx = $("#projectName span").html();
      $("#projectName input").attr("value", ctx).trigger("focus");
    }
  });

  $("#projectName input").blur(function() {
    // ajax
    doBlockingStart();
    $.ajax({
      type: 'PUT',
      url: '/project/edit',
      data: {"name": $(this).val(), 
             "id": $("#projectName span").attr("pid")
            },
      error: function(response) {
        console.log(response);
        $("#projectName").removeClass("editingName");
        $("#projectName").addClass("noeditingName");
        doBlockingEnd();
        alert("err");
      },
      success: function(response) {
        console.log(response);
        if (response["state"] != "succ") {
          alert("err");
          return;
        }
        $("#projectName span").empty().append($("#projectName input").val());
        $("#projectName").removeClass("editingName");
        $("#projectName").addClass("noeditingName");
        doBlockingEnd();
      }
    });
  });

  $("#projectName input").keydown(function(event) {
    if (event.which == 13) {
      $(this).trigger("blur");
    }
  });

});
