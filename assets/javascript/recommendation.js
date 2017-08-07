
function recommendation(event) {

	// event.preventDefault();

	// hide previous screen
	$("#keyword-field").hide();
	$("#instructions").hide();
	$("#poster-load").hide();
	$("#submitPreferences").hide();

	// show recommendations screen
	$("#recommendation").show();
	$("#searchAgain").show();

	// construct the url with parameter values
	var apikey = "9rw3ap54cffmybytzfa5hv94";
	var baseUrl = "http://data.tmsapi.com/v1.1";
	var showtimesUrl = baseUrl + '/movies/showings';
	var zipCode = "91301";
	var d = new Date();
	var today = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate();


	$(document).ready(function() {

		// send off the query
		$.ajax({
			url: showtimesUrl,
			data: { startDate: today,
			zip: zipCode,
			jsonp: "dataHandler2",
			api_key: apikey
		},          
			dataType: "jsonp",
		});
	});


	// callback to handle the results
	function dataHandler2(data) {

		$(document.body).append('<p>Found ' + data.length + ' movies showing within 5 miles of ' + zipCode+':</p>');
		var movies = data.hits;

		$.each(data, function(index, movie) { console.log("in dataHandler2");

			var movieData = '<div class="tile"><img src="http://developer.tmsimg.com/' + movie.preferredImage.uri + '?api_key='+apikey+'"><br/>';
			movieData += movie.title;
			if (movie.ratings) { movieData += ' (' + movie.ratings[0].code + ') </div>' };
			$(document.body).append(movieData);
		
		});
	}

}
// show movie recommendation and showtime results 
$("#submitPreferences").click(recommendation);
