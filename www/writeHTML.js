var WriteHTML = {
	
	populateRouteChoice: function(possibleRoutes) {
		_.each(possibleRoutes, function(r, i) {
			console.log(r, i);
			var divId = "route"+i;
			
			var $newDiv = $("<button onclick='App.selectRoute(" + i + ")' type='button' class='directions btn btn-default' id='" + divId + "' />");
			$('#routes').append($newDiv);
			
			_.each(r.directions, function(d) {
				var $directionsDiv = $("<div class='direction'/>");
				$newDiv.append($directionsDiv);
				
				$directionsDiv.append("<div class='from'><span class='glyphicon glyphicon-random'></span> From: " + d.from + " </div>");
				$directionsDiv.append("<div class='to'><span class='glyphicon glyphicon-random'></span> To: " + d.to + " </div>");
				$directionsDiv.append("<div class='line'>Line:  " + d.line + " </div>");
			});
			
			$newDiv.append("<div class='duration'>Duration: " + r.duration + " </div></button>");
		});
	},
	
	writeOneNewEmail: function(email) {
		var $newDiv = $("<div class='emailAddress'>" + email + "</div>");
		
		$("#email-addresses-div").append($newDiv);
	},
	
	writeOneNewNumber: function(number) {
		var $newDiv = $("<div class='phoneNumber'>" + number + "</div>");
		
		$("#phone-numbers-div").append($newDiv);
	},
	
	populationConfirmationPage: function(user) {
		console.log(user, "has been sent to server");
		
		var $newDiv = $("<div id='confirmation-message'/>");
		$("#confirmation-page").prepend($newDiv);
		
		$newDiv.append("<br><div class='alert alert-success'><strong>Alright sweets, you're covered by Disrupt!</strong></div> If we think that on any working day you won't be at ");
		$newDiv.append(user.transport.directions[user.transport.directions.length-1].to);
		$newDiv.append(" by ");
		var twodigitsminutes = (User.timeAtWork.getMinutes() < 10) ? '0' + User.timeAtWork.getMinutes() : User.timeAtWork.getMinutes();
		$newDiv.append(User.timeAtWork.getHours() + ":" + twodigitsminutes);
		
		$newDiv.append(" then we'll send email warnings to: ");
		var $emailsDiv = $("<div id='confirmation-emails'></div>");
		$newDiv.append($emailsDiv);
		
		_.each(user.email, function(e) {
			var $emailDiv = $("<div class='confirmation-email'>" + e + "</div>");
			
			$emailsDiv.append($emailDiv);
		});
		
		$newDiv.append("and text messages warning to: ");
		var $numbersDiv = $("<div id='confirmation-numbers'></div>");
		$newDiv.append($numbersDiv);
		
		_.each(user.sms, function(s) {
			var $numberDiv = $("<div class='confirmation-number'>" + s + "</div>");
			
			$numbersDiv.append($numberDiv);
		});
	}
}