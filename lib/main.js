var { ActionButton } = require('sdk/ui/button/action');
var self = require("sdk/self");
var tabs = require("sdk/tabs");
var Request = require("sdk/request").Request;


var button = ActionButton({
  id: "Paywall-Pass",
  label: "Paywall-Pass",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onClick: refreshWithNewReferer
});


function refreshWithNewReferer(state) {
	//make a new request with the url
	var anotherRequest = Request({
	  //get the current url
	  url: tabs.activeTab.url,
	  //set referer for new request to a search engine
	  headers: {referer: "http://www.bing.com"},
	  onComplete: function(response){
		//store the response
		newResponse = response.text;
		//add response-helper and jquery to the active tab
		var worker = tabs.activeTab.attach({
		  contentScriptFile: [self.data.url("jquery-1.11.2.min.js"), self.data.url("response-helper.js")]
		});
		//send the response data to response-helper
		worker.port.emit("newResponse", newResponse);
	  }
	});
	//execute the request
	anotherRequest.get();
}
