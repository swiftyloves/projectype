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
			console.log('eventClickhahaha')
			var tmp = this
	    doBlockingStart();	
            $.ajax({
              type: 'POST',
              url: '/subtask/card',
              data: {"id": event.id},
              error: function(response) {
                console.log(response);
                doBlockingEnd();	
                alert("err");
              },
              success: function(response) {
            	$(tmp).addClass('eventClickdown')			
              	$(".smallCard").remove();
              	$("#card").remove();
                    $(".ui-datepicker").remove();
                    $("#userCardPlace").empty().hide().append(response);
            	$("#card").bind("dialogclose",function(){            		
            		if($("#card").attr('dirty')==1)
            			$('#userButton').trigger("click")
            		$(tmp).removeClass('eventClickdown')
            	});
        	doBlockingEnd();	

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
	               	if(load == 1 && tmp!= worker){
		               	$.each(doc['c'],function(){		               		
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
	               	for(var i=0 ; i< map.length ; i++){
	               		if (!map[i])
	               			continue;	               		
	               		c = colors[count%6]
	               		t = textColors[count%6] 	               		
	               		$.each(map[i],function(){	               			
		               		events.push({
		               			title:this.name,start:this.sday,end:this.dday,id:this.id,color:c,textColor:t
		               		})
	               		});
	               		count+=1
	               	}
	               	if (load == 1) {
		               	$('.worker').click(function(){		               		
							worker = $(this).attr('uid');		               		
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
	
