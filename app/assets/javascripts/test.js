$(function(){
	var date = new Date();		
	var d = date.getDate();
	var m = date.getMonth();
	var y = date.getFullYear();

	var worker = 0;
	var tmp = -1;
	var load = 1;
	
	var done = false;

	var calendar = $('#calendar').fullCalendar({			
		header: {
			left: 'title',
			center: 'prev,next',
			// right:cd  'month,agendaWeek,agendaDay'
			right:''
		},
		eventClick: function(event) {
			console.log('eventClick!!!')
			console.log(this)
			console.log('event: ')
			console.log(event)
                        $.ajax({
                          type: 'POST',
                          url: '/subtask/card',
                          data: {"id": event.id},
                          error: function(response) {
                            console.log(response);
                            alert("err");
                          },
                          success: function(response) {
                          	$(".smallCard").remove();
                            $("#userCardPlace").empty().hide().append(response);
                          }
                        });

                        
	        // alert('Event: ' + calEvent.title);
	        // alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
	        // alert('View: ' + view.name);

	        // // change the border color just for fun
	        $(this).css('border-color', 'red');
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
	               	if(load == 1 && tmp!= worker){
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
	               		// console.log(this)
	               		events.push({
	               			title:this.name,start:this.sday,end:this.dday,id:this.id
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
						tmp = worker;
	                }
	                callback(events); 
					// eventClick: function(event, element) {
					// 	console.log('eventClick')
					// }
	            }
	        });
		},
	});
});
	
// function( event, jsEvent, view ) {
// 	console.log('eventMouseover');
// 	console.log(event);
// }


// $('#calendar').fullCalendar({
//     eventClick: function(calEvent, jsEvent, view) {

//         alert('Event: ' + calEvent.title);
//         alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
//         alert('View: ' + view.name);

//         // change the border color just for fun
//         $(this).css('border-color', 'red');

//     }
// });
