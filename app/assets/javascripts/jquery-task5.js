﻿$(function() {		
		$("#line1").sortable({
			connectWith: ".connectedlist", tolerance: 'pointer'			
		}).disableSelection();		
		var bigbutton; 
	    /*$(".connectedlist" ).bind( "sortstop", function(event, ui) {           
            $("ul").children("button").remove();
			console.log($("ul"));
			bigbutton = $('<button>Add Task</button>'); 
            bigbutton.appendTo("ul");            
		});*/
        var subtaskul;	
		var first = 1;
		var tmp;// = $('<li><input type="text" value="New Task"> </li>'); 
		var input;
		var button;	
		
		var div; 
		var ul;
		var first = 1;
		var second = 1;
		$("#addButton").click(function() {	
		    console.log($(this));
		    if($(this).parent("ul").parent("div").children("ul").children("li").hasClass('editing')){
			    console.log($(this));
			    tmp.removeClass('editing').prepend('<span>New Task</span>');//val()拿字	
				tmp.children("input").remove();   
			}	
		    bigbutton = $('<button>Add Task</button>');
		    button = $('<button>Add subtask</button>');
			ul = $('<ul class="connectedlist main"></ul>'); // 
            tmp = $('<li><input type="text" maxlength=11 value="New Task"></li>'); 		// 
			div = $('<div></div>');			
		    tmp.addClass('editing').appendTo('#line1'); //display inline
            //div.appendTo('#line1');			
			//console.log(tmp);
            tmp.children("input").trigger('focus').keydown(function (event) {
               if (event.which == 13) {
                 event.preventDefault();
                 tmp.children("input").trigger('blur');
               }
            }).blur(function() {  //?
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
            }			
	    });	
		document.oncontextmenu=new Function("return false"); 
		$("#placeholder").on("mousedown", "ul>li>span", function(event){
		    console.log($(this));
			event.preventDefault();
			
			var input2 = $(this).parents("#placeholder").children("ul").children("li").children("input");
			input2.parent("li").removeClass("editing").prepend('<span>'+input2.attr('value')+'</span>');
			input2.remove();	

            var input3 = $(this).parents("#placeholder").find("div").children("li").children("input");
			//input.parent("li").removeClass("altering").prepend('<span>New Subtask</span>');
			input3.parent("li").removeClass("altering").prepend('<span>'+input3.attr('value')+'</span>');
			input3.remove();			
				
			if(event.button==2){
			   console.log($(this));
			   parentli = $(this).parent("li");
			   input = $('<input type="text" maxlength=11 value="' + $(this).html()+'">'); 	
			   input.prependTo(parentli).addClass('editing'); 	
               $(this).remove();   
			   parentli.children("input").trigger('focus').keydown(function (event) {
                 if (event.which == 13) {
                 event.preventDefault();
                 parentli.children("input").trigger('blur');
                 }
               }).blur(function() {  //?
			     //console.log(tmp);               
			     parentli.removeClass('editing').prepend('<span>' + parentli.children("input").attr('value') + "</span>");//val()拿字	
			     parentli.children("input").remove();				
               });             	 
            }            					
		});		
		$("#placeholder").on("mousedown", "ul div li span", function(event){
		    console.log($(this));			
			event.preventDefault();
			//if($(this).parents("#placeholder").find("div").children("li").children("input")){
			//    console.log($(this).parents("#placeholder").find("div").children("li"));
				var input3 = $(this).parents("#placeholder").find("div").children("li").children("input");
				//input.parent("li").removeClass("altering").prepend('<span>New Subtask</span>');
				input3.parent("li").removeClass("altering").prepend('<span>'+input3.attr('value')+'</span>');
				input3.remove();				
			//}	
			
			var input2 = $(this).parents("#placeholder").children("ul").children("li").children("input");
			input2.parent("li").removeClass("editing").prepend('<span>'+input2.attr('value')+'</span>');
			input2.remove();								
			
			if(event.button==2){
			   console.log($(this));
			   parentli = $(this).parent("li");
			   input = $('<input type="text" maxlength=20 value="' + $(this).html()+'">'); 	
			   parentli.addClass('altering'); 
			   input.appendTo(parentli);	
               $(this).remove();   
			   parentli.children("input").trigger('focus').keydown(function (event) {                 
				 if (event.which == 13) {
                 event.preventDefault();
                 parentli.children("input").trigger('blur');
                 }
               }).blur(function() {  //?
			     //console.log(tmp);               
			     parentli.removeClass('altering').prepend('<span>' + parentli.children("input").attr('value') + "</span>");//val()拿字	
			     parentli.children("input").remove();				
               });            	 
            }	
            event.stopPropagation();			
		});
		$("#placeholder").on("click", "ul button", function(){ 
		    console.log($(this));
		    if($(this).parent("ul").parent("div").children("ul").children("li").hasClass('editing')){
			    tmp.removeClass('editing').prepend('<span>New Task</span>');//val()拿字	
				tmp.children("input").remove();   
			}	
		    bigbutton = $('<button>Add Task</button>');
		    button = $('<button>Add subtask</button>');
			ul = $('<ul class="connectedlist main"></ul>'); // 
            tmp = $('<li><input type="text" maxlength=11 value="New Task"></li>'); 		// 
			div = $('<div></div>');			
		    tmp.addClass('editing').appendTo($(this).parent("ul")); //display inline
            //div.appendTo('#line1');			
			//console.log(tmp);
            tmp.children("input").trigger('focus').keydown(function (event) {
               if (event.which == 13) {
                 event.preventDefault();
                 tmp.children("input").trigger('blur');
               }
            }).blur(function() {  //?
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
              $(".connectedlist" ).bind( "sortstop", function(event, ui) {           
                 $("ul").children("button").remove();
			     console.log($("ul"));
			     bigbutton = $('<button>Add Task</button>'); 
                 bigbutton.appendTo("ul");            
		      });			  
            }                		
	    });	
        var subtask ;			
		$("#placeholder").on("click", "ul>li>span", function(){             
			var temp = $(this).parent("li").children("div");
			console.log(temp);
			if(!temp.hasClass('showing')){
			   $(this).addClass('showing');
               temp.addClass('showing');
			   temp.slideDown('normal');	
               $(this).parent("li").addClass('presenting');	
               //$(this).addClass('showing');			   
            }			   
			else if(temp.hasClass('showing')){
			   $(this).removeClass('showing');
			   temp.removeClass('showing');
			   temp.slideUp('normal');	 
			   $(this).parent("li").removeClass('presenting');	
               //$(this).removeClass('showing');				   
			}			
		});
		$("#placeholder ul").on("click","div button", function(event){
		    /*console.log("par: placeholder -> div");
		    console.log($(this).parents("#placeholder").find("div"));
			console.log("par: placeholder -> div -> li");*/
			//var why = $(this).parents("#placeholder").find("div");
		    console.log($(this).parents("#placeholder").find("div").children("li"));
		    if($(this).parents("#placeholder").find("div").children("li").hasClass('altering')){
			    console.log($(this).parents("#placeholder").find("div").children("li"));
			    subtask.removeClass('altering').prepend('<span>New Subtask</span>');//val()拿字	
				subtask.children("input").remove();   
			}
		    console.log($(this));
			subtask = $('<li><input type="text" maxlength=20 value="New Subtask"></li>')						
			subtask.addClass('altering').appendTo($(this).parent("div"));//append to subtaskul .children("ul")
			subtask.children("input").trigger('focus').keydown(function (event) {
               if (event.which == 13) {
                  event.preventDefault();
                  subtask.children("input").trigger('blur');
               }
            }).blur(function() {  
				subtask.removeClass('altering').prepend('<span>' + subtask.children("input").attr('value') + "</span>");	        
                subtask.children("input").remove();				
			});
			$(this).appendTo($(this).parent("div"));
			console.log(event);
			event.stopPropagation();
		});	
		$("#placeholder").on("click","ul div button", function(event){
		    /*console.log($(this));
			console.log($(this).parents("#placeholder").find("div").children("li"));
			console.log($(this).parents("#placeholder").find("div").children("li").hasClass('altering'));*/
		    if($(this).parents("#placeholder").find("div").children("li").hasClass('altering')){
			    console.log($(this).parents("#placeholder").find("div").children("li"));
			    subtask.removeClass('altering').prepend('<span>New Subtask</span>');//val()拿字	
				subtask.children("input").remove();   
			}	
			subtask = $('<li><input type="text" maxlength=20 value="New Subtask"></li>')						
			subtask.addClass('altering').appendTo($(this).parent("div"));//append to subtaskul .children("ul")
			subtask.children("input").trigger('focus').keydown(function (event) {
               if (event.which == 13) {
                 event.preventDefault();
                 subtask.children("input").trigger('blur');
               }
            }).blur(function() {  
				subtask.removeClass('altering').prepend('<span>' + subtask.children("input").attr('value') + "</span>");	        
                subtask.children("input").remove();				
			});
			$(this).appendTo($(this).parent("div"));
			console.log(event);
			event.stopPropagation();
		});	
		
});

