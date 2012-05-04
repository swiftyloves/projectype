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


  }

  function resetToggle() {
    $(".pointUser").removeClass("pointUser");
    $(".pointTask").removeClass("pointTask");
    $("#triangle").addClass("hide");

    $(".showTag").removeClass("showTag");
    $("#functionTag").addClass("hide");

    $(".toggling").removeClass("toggling");
  }

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
  });
  $("#gButton").click(function(event) {
    console.log($(this));
  });
  $("#homeButton").click(function(event) {
    console.log($(this));
  });
  $("#inviteButton").click(function(event) {
    console.log($(this));
  });



});
