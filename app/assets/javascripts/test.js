$(function(){
	var date = new Date();		
	var d = date.getDate();
	var m = date.getMonth();
	var y = date.getFullYear();

	var worker = 0;
	
	var calendar = $('#calendar').fullCalendar({			
		header: {
			left: 'title',
			center: 'prev,next',
			// right:cd  'month,agendaWeek,agendaDay'
			right:''
		},
		events: function(start,end,callback){
	        $.ajax({
	            url: '/getEvent',
	            type: 'POST',
	            data: {
	            	w: worker
	            },
		        error: function(err) {
		          alert('Err');
		          console.log(err);
		        },	            	            
	            success: function(doc) {
	                var events = [{title:'la',start:'2012-05-31',textColor:'red'}];
	                callback(events);
	            }
	        });
		}
	});

});
	
	// $('#calendar').fullCalendar('removeEvents')
	// $('#calendar').fullCalendar('refetchEvents')

function addw(){
	$('#workers').append(		
	)
}
