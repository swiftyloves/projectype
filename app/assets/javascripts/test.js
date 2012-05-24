$(function(){
	var date = new Date();		
	var d = date.getDate();
	var m = date.getMonth();
	var y = date.getFullYear();

	var worker = 0;
	var load = 1;
	
	var done = false;

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
		          doBlockingEnd();
		        },	            	            
	            success: function(doc) {
	            	console.log('success!')
	               	// console.log(doc['s'])
	               	if(load == 1){
		               	$.each(doc['c'],function(){
		               		// console.log(this.img)	               		
			                $('#workers').append(
								'<div class="worker" uid="'+ this.id +'" style="background:url(' + this.img +  ') center no-repeat; background-size: 100%;"> </div>'
							)    		
		               	});
		            }else{
		            	console.log('change style')
						console.log(worker)		            	            	
		            	$('.sel').removeClass('sel')		            	
		            	$('.worker[uid='+worker+']').addClass('sel')		            			            
		            }
		            
	                var events = [];
	               	$.each(doc['s'],function(){
	               		console.log(this)
	               		events.push({
	               			title:this.name,start:this.sday,end:this.dday
	               		})
	               	});
	               	if (load == 1) {
		               	$('.worker').click(function(){
		               		console.log('.click!')
		               		console.log(worker)
							worker = $(this).attr('uid');
		               		// console.log(worker)
		               		$('#calendar').fullCalendar('removeEvents')
							$('#calendar').fullCalendar('refetchEvents');
							load = 0;
						});
	                }
	                callback(events); 
	            }
	        });
		}
	});
});
	
	// $('#calendar').fullCalendar('removeEvents')
	// $('#calendar').fullCalendar('refetchEvents')

