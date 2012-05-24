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
	            url: '/user/cal',
	            type: 'POST',
	            data: {
	            	w: worker
	            },
		        error: function(err) {
		          alert('Err');
		          console.log(err);
		        },	            	            
	            success: function(doc) {
	            	console.log('success!')
	                var events = [{title:'la',start:'2012-05-31',textColor:'red'}];
	                callback(events); 
	               	console.log(doc['c'])
	               	$.each(doc['c'],function(){

		                $('#workers').append(
							'<div class="worker" style="background:url('#{this['img']}') center no-repeat; background-size: 100%;"> </div>'
						)	               		
	               	});
	            }
	        });
		}
	});

});
	
	// $('#calendar').fullCalendar('removeEvents')
	// $('#calendar').fullCalendar('refetchEvents')

function addw(){
	$('#workers').append(
		'<div class="worker"> </div>'
	)
}
