//user data structure, to send to server
var User = {
};

var App = {
	startup: function() {
		$("#chooseroute-page").hide();
		$("#choosecommute-page").hide();
		$("#whotoalert-page").hide();
		$("#confirmation-page").hide();
		
		//next buttons
		$("#login-button").on("click", function(e){
			App.loginClicked();
		});
		
		$("#choosecommute-next-button").on("click", function(e){
			App.chooseCommuteNextClicked();
		});
		
		$("#chooseroute-next-button").on("click", function(e){
			App.chooseRouteNextClicked();
		});
		
		$("#whotoalert-next-button").on("click", function(e){
			App.whotoalertNextClicked();
		});
		
		
	},
	
	loginClicked: function() {
		$("#login-page").hide();
		
		User.id = "demouser" + new Date();
		
		$("#choosecommute-page").show();
	},
	
	chooseCommuteNextClicked: function() {
		$("#choosecommute-page").hide();
		this.calcRoute();
	},
	
	directionsService: new google.maps.DirectionsService(),
	calcRoute: function() {
	  var start = $("#choosecommute input[name=start-postcode]").val() + "UK";
	  var end = $("#choosecommute input[name=end-postcode]").val() + "UK";
	  var time = $("#choosecommute input[name=form-time]").val() + "UK";
	  var hhmm = time.split(':');
	  
	  User.timeAtWork = new Date(2013, 9, 28, parseInt(hhmm[0]), parseInt(hhmm[1]), 0, 0);
	  
	  console.log(parseInt(hhmm[0]),parseInt(hhmm[1]));
	  
	  var request = {
	      origin:start,
	      destination:end,
	      travelMode: google.maps.DirectionsTravelMode.TRANSIT,
	      provideRouteAlternatives: true,
	      transitOptions: {
			  arrivalTime: User.timeAtWork
		  }
	  };

	  this.directionsService.route(request, function(response, status) {
	    console.log(response, status);
	    if (status == google.maps.DirectionsStatus.OK) {
	      App.directionCalculated(response);
	      //directionsDisplay.setDirections(response);
	    }
	  });
	},
	
	directionCalculated: function(response) {
		console.log(response.routes);
		
		var possibleRoutes = [];
		_.each(response.routes, function(route) {
			
			var trip = route.legs[0];
			
			var option = {
				duration: trip.duration.text,
				directions: []
			};

			_.each(trip.steps, function(step){
				if (step.travel_mode == "TRANSIT" && (step.instructions.indexOf("Subway") != -1 || step.instructions.indexOf("Light rail") != -1)) { //something about getting if it's a tube && .indexOf()
					var obj = {
						from: step.transit.departure_stop.name,
						to: step.transit.arrival_stop.name,
						line: step.transit.line.name
					};
					
					option.directions.push(obj);
				}
			});
			
			possibleRoutes.push(option);
		});
		
		if (possibleRoutes.length > 3) {
			possibleRoutes.length = 3;
		}
		
		console.log(possibleRoutes);
		
		this.possibleRoutes = possibleRoutes;
		
		$("#chooseroute-page").show();
		WriteHTML.populateRouteChoice(possibleRoutes);
	},
	
	selectRoute: function(i) {
		console.log(i, App.possibleRoutes[i]);
		
		User.transport = App.possibleRoutes[i];
	},
	
	chooseRouteNextClicked: function() {
		$("#chooseroute-page").hide();
		$("#whotoalert-page").show();
		
		User.email = [];
		User.sms = [];
		
		$("#add-email-button").on('click', function() {
			var email = $("#add-email-form input[name=add-email]").val();
			WriteHTML.writeOneNewEmail(email);
			User.email.push(email);
			var email = $("#add-email-form input[name=add-email]").val('');
		});
		
		$("#add-number-button").on('click', function() {
			var number = $("#add-number-form input[name=add-number]").val();
			WriteHTML.writeOneNewNumber(number);
			User.sms.push(number);
			$("#add-number-form input[name=add-number]").val('');
		});
	},
	
	whotoalertNextClicked: function() {
		$("#whotoalert-page").hide();
		
		$.post( "ajax/test.html", JSON.stringify(User), function(response) {
			$("#confirmation-page").show();
		});
	}
	
}

$(document).ready(function() {
	App.startup();
});

_.uniqObjects = function( arr ){
	return _.uniq( _.collect( arr, function( x ){
		return JSON.stringify( x );
	}));
};