
$(function(){	
    $($('.fbicon')[0]).click(function(){	  
      $('#fbButton').trigger("click");
    });
    $($('.gicon')[0]).click(function(){
  		$('#gButton').trigger("click");
    });
    $($('.first')[0]).click(function(){
  		$('#helpButton').trigger("click");
    });
    $($('.s')[0]).click(function(){
      if (getCookie("startFirstWarning")) {
        $('#taskButton').trigger("click");
      } else {
        $("#startFirstWarning").dialog("open");
      }
    });

    $("#startFirstWarning").dialog({
      autoOpen: false,
      resizable: false,
      dialogClass: "warningDialog",
      close: function(event) {
        if ($("#startFirstWarning input").attr("checked")) {
          setCookie("startFirstWarning", 0, 365);
        }
        $('#taskButton').trigger("click");
      },
    });

    $("#startFirstWarning button").click(function(event) {
      $("#startFirstWarning").dialog("close");
    });

    function setCookie(c_name,value,exdays) {
      var exdate=new Date();
      exdate.setDate(exdate.getDate() + exdays);
      var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
      document.cookie=c_name + "=" + c_value;
    };
 
    function getCookie(c_name) {
      var i,x,y,ARRcookies=document.cookie.split(";");
      for (i=0;i<ARRcookies.length;i++) {
        x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
        y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
        x=x.replace(/^\s+|\s+$/g,"");
        if (x==c_name) {
          return unescape(y);
        }
      }
    };
});

// .fbicon{}
// $("#fbButton").trigger("click")
