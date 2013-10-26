//user data structure, to send to server
var User = {
	
};

var App = {
	startup: function() {
		$("#chooseroute-page").hide();
		$("#choosecommute-page").hide();
		$("#whotoalert-page").hide();
		$("#confirmation-page").hide();
		
		$("#login-button").on("click", function(e){
			$("#login-page").hide();
			$("#choosecommute-page").show();
		});
		
		$("#choosecommute-next-button").on("click", function(e){
			$("#choosecommute-page").hide();
			$("#chooseroute-page").show();
		});
		
		$("#chooseroute-next-button").on("click", function(e){
			$("#chooseroute-page").hide();
			$("#whotoalert-page").show();
		});
		
		$("#whotoalert-next-button").on("click", function(e){
			$("#whotoalert-page").hide();
			$("#confirmation-page").show();
		});
	}	
	
}

$(document).ready(function() {
	App.startup();
});