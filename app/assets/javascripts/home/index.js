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
    $.get("/home/logout")
    $("#content").empty();
    $("#projectName span").empty();
  };

  // init

  resetMainHeight();
  window.onresize = function(event) {
    resetMainHeight();
  };
  $("#helpContent").dialog({
    autoOpen: false,
    show: 'fold',
    hide: 'fold',
    modal: true,
    resizable: false,
    dialogClass: 'helpDialog',
    width: 500,
    height: 500,
  });

  //$("#content").jScrollPane();
  
  // fix ajax clear session  
  $.ajaxSetup({
    beforeSend: function(xhr) {
      xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));
    }
  });

 
  // buttons

  $("#userButton").click(function(event) {
    if (currentState != $(this)) {
      currentState = $(this);
      resetToggle();
      $(this).addClass("toggling");
      $("#triangle").addClass("pointUser").removeClass("hide");
      $.ajax({
        //type: 'POST',
        url: '/user',
        //data: {"name": name},
        error: function(response) {
          console.log("err");
        },
        success: function(response) {
          handleResponse(response);
        }
      });
    }
  });

  $("#taskButton").click(function(event, name) {
    if (currentState != $(this)) {
      currentState = $(this);
      resetToggle();
      $(this).addClass("toggling");
      $("#triangle").addClass("pointTask").removeClass("hide");
      if (!name && $("#projectName span").html().length != 0) {
        name = $("#projectName span").html();
      }
      if (name) {
        console.log("recieve:" + name);
        $.ajax({
          type: 'POST',
          url: '/task',
          //data: {"name": name},
          error: function(response) {
            console.log("err");
          },
          success: function(response) {
            handleResponse(response);
            $("#projectName span").empty().append(name);
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
    $("#helpContent").dialog("open");
  });

  $("#fbButton").click(function(event) {
    console.log($(this));
    FB.login(function(res) {
      if (res.authResponse) {
        console.log('success');
        handleFblogin();
        resetToggle();
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    }, { scope: 'user_photos' });
  });

  $("#gButton").click(function(event) {
    console.log($(this));
    window.location = "/home/gplogin"; 
  });

  $("#homeButton").click(function(event) {
    console.log($(this));
  });

  $("#inviteButton").click(function(event) {
    console.log($(this));
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
    $("#projectName").removeClass("editingName");
    $("#projectName").addClass("noeditingName");
    var ctx = $("#projectName input").attr("value");
    $("#projectName span").empty().append(ctx);
  });
});
