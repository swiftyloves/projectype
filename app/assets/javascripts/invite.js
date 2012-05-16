$(function() {
	$(".inviteCard").dialog({
		autoOpen: false,
		modal: true,
		width: 535,
		dialogClass: "inviteCard",
		title: "Invite Member",
		resizable: false,		
		show: { effect: 'drop', direction: "up" },
		draggable: false
	});	
	$('.invite').click(function(){
		$(".inviteCard").dialog("close");
		console.log('lalala')
		var url = $(".inviteCard input").val()
		console.log(url)
		$.ajax({
          type: 'POST',
          url: '/sendmail',
          data: {"mail": url},
          error: function(response) {
            console.log(response);
            //doBlockingEnd();
          },
          success: function(response) {
            //handleResponse(response);
            //$("#projectName span").empty().append(name);
            //doBlockingEnd();
          }
        });

	});
});

