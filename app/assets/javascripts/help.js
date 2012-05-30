$(function(){
	jQuery('#helpage').accordion({ 
    	autoHeight: false
    	// clearStyle:true
	});
        $("#login").click(function(event) {
          $("#helpContent").dialog("close");
          $("#logButton").trigger("click");
        }); 
});
