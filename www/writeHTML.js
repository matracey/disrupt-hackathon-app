var WriteHTML = {
	
	populateRouteChoice: function(possibleRoutes) {
		_.each(possibleRoutes, function(r, i) {
			console.log(r, i);
			var divId = "route"+i;
			
			var $newDiv = $("<div id='" + divId + "' />");
			$('#routes').append($newDiv);
			
			_.each(r.directions, function(d) {
				var $directionsDiv = $("<div class='direction'/>");
				$newDiv.append($directionsDiv);
				
				$directionsDiv.append("From: <div class='from'> " + d.from + " </div>");
				$directionsDiv.append("To: <div class='to'> " + d.to + " </div>");
				$directionsDiv.append("Line: <div class='line'> " + d.line + " </div>");
			});
			
			$newDiv.append("Duration: <div class='duration'> " + r.duration + " </div>");
			
			$newDiv.append("<a onclick='App.selectRoute(" + i + ")'>Select this route</a><br/><br/><br/>");
		});
	}
}