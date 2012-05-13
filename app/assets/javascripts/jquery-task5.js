$(function() {		
		$("#line1").sortable({
			connectWith: ".connectedlist", tolerance: 'pointer'			
		}).disableSelection();
		//$( "#line1" ).sortable();
		/*$( "#line1" ).disableSelection();*/
	
        var subtaskul;	
		var first = 1;
		var tmp;// = $('<li><input type="text" value="New Task"> </li>'); 
		var button;	
		var bigbutton;
		var div; 
		var ul;
		var first = 1;
		var second = 1;
		$("#addButton").click(function() {	
		    bigbutton = $('<button>Add Task</button>');
		    button = $('<button>Add subtask</button>');
			ul = $('<ul class="connectedlist main"></ul>'); // 
            tmp = $('<li><input type="text" value="New Task"></li>'); 		// 
			div = $('<div></div>');			
		    tmp.addClass('editing').appendTo('#line1'); //display inline
            //div.appendTo('#line1');			
			//console.log(tmp);
            tmp.children("input").blur(function() {  //?
			    console.log(tmp);
                //tmp.removeClass('editing');
				//console.log(tmp);
				tmp.removeClass('editing').prepend('<span>' + tmp.children("input").attr('value') + "</span>");//val()拿字	
				tmp.children("input").remove();
				//console.log(tmp);
            });        
            button.appendTo(div);
            div.appendTo(tmp);	
            div.hide();
            $(this).appendTo($(this).parent("ul"));
			if(first==1){
              ul.appendTo("#placeholder");
              bigbutton.appendTo(ul);
			  first = 0; 
			  //$("#line1").sortable("destroy");
              $("#line1, ul").sortable({
			     connectWith: ".connectedlist", tolerance: 'pointer'			
		      }).disableSelection();			  
              //$(ul).sortable();	
            }			
	    });	
		$("#placeholder").on("click", "ul button", function(){ 
		    bigbutton = $('<button>Add Task</button>');
		    button = $('<button>Add subtask</button>');
			ul = $('<ul class="connectedlist main"></ul>'); // 
            tmp = $('<li><input type="text" value="New Task"></li>'); 		// 
			div = $('<div></div>');			
		    tmp.addClass('editing').appendTo($(this).parent("ul")); //display inline
            //div.appendTo('#line1');			
			//console.log(tmp);
            tmp.children("input").blur(function() {  //?
			    console.log(tmp);
                //tmp.removeClass('editing');
				//console.log(tmp);
				tmp.removeClass('editing').prepend('<span>' + tmp.children("input").attr('value') + "</span>");//val()拿字	
				tmp.children("input").remove();
				//console.log(tmp);
            });        
            button.appendTo(div);
            div.appendTo(tmp);	
            div.hide();
            $(this).appendTo($(this).parent("ul"));
			console.log($(this).parent("ul").children("li").length);
			if($(this).parent("ul").children("li").length==1){			
			  console.log($(this).parent("ul").has("li").length);
              ul.appendTo("#placeholder");
              bigbutton.appendTo(ul);
              $("#line1, ul").sortable({
			     connectWith: ".connectedlist", tolerance: 'pointer'			
		      }).disableSelection();	 			  
            }                		
	    });	
        var subtask ;			
		$("#placeholder").on("click", "ul li span", function(){ //done editing            
			var temp = $(this).parent("li").children("div");
			console.log(temp);
			if(!temp.hasClass('showing')){
               temp.addClass('showing');
			   temp.slideDown('normal');	
               //$(this).parent("li").addClass('showing');	
               //$(this).addClass('showing');			   
            }			   
			else if(temp.hasClass('showing')){
			   temp.removeClass('showing');
			   temp.slideUp('normal');	 
			   //$(this).parent("li").removeClass('showing');	
               //$(this).removeClass('showing');				   
			}			
		});
		$("#placeholder ul").on("click","div button", function(event){
		    console.log($(this));
			subtask = $('<li><input type="text" value="New Subtask"></li>')						
			subtask.addClass('editing').appendTo($(this).parent("div"));//append to subtaskul .children("ul")
			subtask.children("input").blur(function() {  
				subtask.removeClass('editing').prepend('<span>' + subtask.children("input").attr('value') + "</span>");	        
                subtask.children("input").remove();				
			});
			$(this).appendTo($(this).parent("div"));
			console.log(event);
			event.stopPropagation();
		});	
		$("#placeholder").on("click","ul div button", function(event){
		    console.log($(this));
			subtask = $('<li><input type="text" value="New Subtask"></li>')						
			subtask.addClass('editing').appendTo($(this).parent("div"));//append to subtaskul .children("ul")
			subtask.children("input").blur(function() {  
				subtask.removeClass('editing').prepend('<span>' + subtask.children("input").attr('value') + "</span>");	        
                subtask.children("input").remove();				
			});
			$(this).appendTo($(this).parent("div"));
			console.log(event);
			event.stopPropagation();
		});	
		
});

