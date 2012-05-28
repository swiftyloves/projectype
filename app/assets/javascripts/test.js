$(function(){
	var date = new Date();		
	var d = date.getDate();
	var m = date.getMonth();
	var y = date.getFullYear();

	var colors = ['#ABD4FF','#FEBDC1','#FFFECB','#9FFF97',
 				  '#EEB1E6','#FFD697',]
	var textColors = ['#284B4B','#653416','#B77C0A','#274025',
					  '#801F68','#B76D00']
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
		eventMouseover: function(event,jsEvent,view){
			$(this).addClass('eventHover')
		},
		eventMouseout: function(event,jsEvent,view){
			$(this).removeClass('eventHover')
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
                          	$("#card").remove();
                            $("#userCardPlace").empty().hide().append(response);
                        	$("#card").bind("dialogclose",function(){
                        		console.log('dialogclose')
                        		if($("#card").attr('dirty')==1)
                        			$('#userButton').trigger("click")
                        	});
                          }
                        });
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
		            	$('.sel').removeClass('sel')		            	
		            	$('.worker[uid='+worker+']').addClass('sel')		            			            
		            }
		            var map = []


		            $.each(doc['s'],function(){
		            	if (!map[this.task_id])
		            		map[this.task_id] = []
		            	map[this.task_id].push(this)
		            });
	                var events = [];
	                var count = 0;
	                console.log('la')
	               	for(var i=0 ; i< map.length ; i++){
	               		if (!map[i])
	               			continue;
	               		console.log('each map')
	               		console.log(map[i])
	               		console.log('end')
	               		c = colors[count%6]
	               		t = textColors[count%6] 
	               		console.log(c)
	               		$.each(map[i],function(){
	               			console.log(this)
		               		events.push({
		               			title:this.name,start:this.sday,end:this.dday,id:this.id,color:c,textColor:t
		               		})
	               		});
	               		count+=1
	               	}
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
