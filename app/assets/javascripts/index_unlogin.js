
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
  		$('#taskButton').trigger("click");
    });    
});

// .fbicon{}
// $("#fbButton").trigger("click")
