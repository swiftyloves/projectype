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
	$('#inviteb').click(function(){
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
            $.blockUI({
              message: "Success!!",
              fadeIn: 700,
              fadeOut: 700,
              timeout: 2000,
              showOverlay: false,
              centerU: false,
              css: {
                width: '130px',
                height: '45px',
                top: '67px',
                left: '', 
                right: '100px',
                border: 'none',
                padding: '27px 0px 0px 0px',
                backgroundColor: '#000',
                'border-radius': '35px',
                opacity: .5,
                color: '#fff',
              }   
            }); 
          }
        });

	});
});

