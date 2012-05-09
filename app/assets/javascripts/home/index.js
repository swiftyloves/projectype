$(function() {
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

  resetMainHeight();
  window.onresize = function(event) {
    resetMainHeight();
  };

  $("#userButton").click(function(event) {
    if (currentState != $(this)) {
      currentState = $(this);
      resetToggle();
      $(this).addClass("toggling");
      $("#triangle").addClass("pointUser").removeClass("hide");
    }
  });
  $("#taskButton").click(function(event) {
    if (currentState != $(this)) {
      currentState = $(this);
      resetToggle();
      $(this).addClass("toggling");
      $("#triangle").addClass("pointTask").removeClass("hide");
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
        resetToggle();
      }
    });
  });
});
