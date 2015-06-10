//receive the port message from main.js
self.port.on("newResponse", function(response) {
	$('body').empty();
	var nodes = $.parseHTML(response);
	$('body').append( nodes );
});