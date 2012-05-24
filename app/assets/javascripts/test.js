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
	               	console.log(doc['s'])
	               	$.each(doc['c'],function(){
	               		console.log(this.img)	               		
		                $('#workers').append(
							'<div class="worker" uid="'+ this.id +'" style="background:url(' + this.img +  ') center no-repeat; background-size: 100%;"> </div>'
						)    		
	               	});
	                var events = [{title:'la',start:'2012-05-22',end:'2012-05-23',textColor:'red'}];
	               	$.each(doc['s'],function(){
	               		console.log(this)
	               		events.push({
	               			title:this.name,start:this.sday,end:this.dday
	               		})
	               	});
	                callback(events); 
	            }
	        });
		}
	});

});
	
	// $('#calendar').fullCalendar('removeEvents')
	// $('#calendar').fullCalendar('refetchEvents')

$('.worker').click(function(){
	// puts $(this).attr('uid')
	// worker = $(this).attr('uid');
	console.log(worker);
});
