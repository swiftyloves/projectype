
$(function(){
	console.log('in the function')
        $($('.fbicon')[0]).click(function(){
	  console.log('fb.click')
          $('#fbButton').trigger("click");
        });
        $($('.gicon')[0]).click(function(){
	  console.log('g.click')
	  $('#gButton').trigger("click");
        });

        $($('.helpButton')[0]).click(function(){
	  console.log('helpButton.click')
      	  $('#helpButton').trigger("click");
        });
});

// .fbicon{}
// $("#fbButton").trigger("click")
