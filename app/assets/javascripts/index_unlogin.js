
(function(){
	console.log('in the function')


}());


$('.fbicon').click(function(){
	console.log('fb.click')
	$('#fbButton').trigger("click");
});

$('.g+icon').click(function(){
	console.log('g+.click')
	$('#g+Button').trigger("click");
});

$('.helpButton').click(function(){
	console.log('helpButton.click')
	$('#helpButton').trigger("click");
});

// .fbicon{}
// $("#fbButton").trigger("click")