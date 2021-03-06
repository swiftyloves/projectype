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
/*
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
*/
  function commonLogoutAction() {
    $(".inProjectTag").removeClass("inProjectTag").addClass("unloginTag");
    $(".login").removeClass("login").addClass("unlogin");
    $(".loginTag").removeClass("loginTag").addClass("unloginTag");
    $.get("/home/logout")
    $("#content").empty();
    $("#projectName span").empty();
    resetToggle();
    doBlockingStart();
    $("#userButton, #taskButton").hide();
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

  function closeTag(event) {
    resetToggle();
    $("#main, .outer").off("click", closeTag);
  };

  // init

  resetMainHeight();
  window.onresize = function(event) {
    resetMainHeight();
  };
  
  $("#userButton, #taskButton").hide();
 
  // fix ajax clear session  
  $.ajaxSetup({
    beforeSend: function(xhr) {
      xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));
    }
  });
/*
  $("#main").click(function(event) {
    $(".showTag").removeClass("showTag").addClass("hide");
  }); 
*/

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
      } else if ($("#logButton").hasClass("unlogin")) {
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
            console.log(response);
            $("#projectName span").empty();
            $("#projectName span").attr("pid", "");
            doBlockingEnd();
          },
          success: function(response) {
            handleResponse(response);
            if ($("#logButton").hasClass("unlogin")) {
              resetToggle();
            } else {
              $("#userButton, #taskButton").show();
              $(".loginTag").removeClass("loginTag").addClass("inProjectTag");
            }
            doBlockingEnd();
            if (($("#projectName span").html() == "大中天")) {
              alert("大中天 你是不是你媽媽把你取名叫大中天心有不滿 所以才把project也取名叫大中天!?");
            }
          }
        });
      }
    }
  });

  $("#logButton").click(function(event) {
    if (currentState != $(this)) {
      currentState = $(this);
      if ($(this).hasClass("toggling")) {
        resetToggle();
        $("#main, .outer").off("click", closeTag);
      } else {
        resetToggle();
        $(this).addClass("toggling");
        $("#functionTag").addClass("showTag").removeClass("hide");
        $("#main, .outer").bind("click", closeTag);
        event.stopPropagation();
      }
    } else {
      currentState = null;
      resetToggle();
      $("#main, .outer").off("click", closeTag);
    }
  });

  $("#contactButton").click(function(event) {
    console.log($(this));
  });

  $("#helpButton").click(function(event) {
    console.log($(this));
    $("#helpContent").dialog("open");
  });

  $("#helpContent").dialog({
    autoOpen: false,
    position: 'top',
    height: 700,
    width: 800,
    modal: true,
    resizable: false,
    dialogClass: "helpDialog",
    open: function(event) {
      $(".ui-widget-overlay").click(function(event) {
        $("#helpContent").dialog("close");
      });
    },
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
      doBlockingStart();
    $.ajax({
      url: "/invite",
      error: function(err) {
        console.log(err);
        doBlockingEnd();
      },
      success: function(response) {
        $(".inviteCard").remove();        
        $("#inviteC").empty().append(response);
        $(".inviteCard").dialog("open");
        doBlockingEnd();
      },
      });
      
    }
  });

  $("#logoutButton").click(function(event) {
    console.log($(this));
    commonLogoutAction();
/*
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
*/
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
    if ($("#projectName span").attr("pid") == -1) {
      return;
    }
    // ajax
    //doBlockingStart();
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
        //doBlockingEnd();
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
        //doBlockingEnd();
      }
    });
  });

  $("#projectName input").keydown(function(event) {
    if (event.which == 13) {
      $(this).trigger("blur");
    }
  });
  
  // for help
  
  $("#login").click(function(event) {
    $("#helpContent").dialog("close");
    $("#logButton").trigger("click");
  });

  $(".ui-widget-overlay").click(function(event) {
    console.log($(this));
    $("#helpContent").dialog("close");
  });

});
