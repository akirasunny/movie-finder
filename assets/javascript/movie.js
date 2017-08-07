// firebase & globals

var config = {
	apiKey: "AIzaSyAuUd9yt7ACd_Joi716u_UxYNLtf9oJMbc",
	authDomain: "movie-finder-adc1a.firebaseapp.com",
	databaseURL: "https://movie-finder-adc1a.firebaseio.com",
	projectId: "movie-finder-adc1a",
	storageBucket: "",
	messagingSenderId: "599211651039"
};
	firebase.initializeApp(config);

var database = firebase.database();

var isexist = false;
var zipcode;
var username;
var userkey;

// functions

// format input
function capitalize(a) {
	var temp = a.split(" ");
	var temp1 = "";
	for (i = 0; i < temp.length; i++) {
		temp1 += temp[i].substring(0, 1).toUpperCase() + temp[i].substring(1, ) + " ";
	}
	var final = temp1.trim();
	return final;
}


// database related
function signin() {
	var username = capitalize($("#username").val().trim());
	console.log(username);
	var zipcode = $("#zip-code").val().trim();
	localStorage.zipcode = zipcode;
	localStorage.username = username;

	database.ref().once("value", function(snap) {
		var snappy = snap.val();
		var keys = Object.keys(snappy);
		var counter = 0;
		for (i = 0; i < keys.length; i++) {
			console.log(snappy[keys[i]]);
			console.log(keys[i]);
			if (snappy[keys[i]].name === username) {
				localStorage.userkey = keys[i];
				userkey = keys[i];
				isexist = true;
				counter++;
				$("#signInModal").modal("hide");
				break;
			}
		}

		if (counter === 0 && isexist === false) {
			database.ref().push({
				name: username,
				zipcode: zipcode
			})
			database.ref().once("child_added", function(snap) {
				if (username === snap.val().name) {
					localStorage.userkey = snap.key;
					userkey = snap.key;
				}
			})
			isexist = true;
			$("#signInModal").modal("hide");
		}
	})
}

function logout() {
	localStorage.removeItem("userkey", "username", "zipcode");
	location.reload();
}

function keyword(event) {
	event.preventDefault();
	var keyword = $("#user-keyword-input").val().trim();
	console.log(keyword);
	var queryURL = "http://www.omdbapi.com/?s=" + keyword + "&y=&plot=short&apikey=40e9cece";

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {
		var movies = response.Search; 
		var array = [];
		for (var i = 0; i < movies.length; i++) {
			var poster = [];
			//secondary ajax search uses titles from first search to get more info about each movie. 
			$.ajax({
				url: "http://www.omdbapi.com/?t=" + movies[i].Title + "&y=&plot=short&apikey=40e9cece",
				method: "GET"
			}).done(function(response) {
				var subarray = [];
				subarray.push(response.Genre, response.Director, response.Rated, response.imdbRating);
				poster.push(response.Poster);
				array.push(subarray);

				if (movies.length === poster.length){
					displayPosters(poster, array);
				}
			});
		}

	console.log(array);
	console.log(poster);
	var result = [array, poster];

	return result;
	})
}

// grab movies around 5 miles of user's zipcode
function zip() {
	var apikey = "ac9ryrxhdhyueujdqgayzn4f";
	var baseUrl = "http://data.tmsapi.com/v1.1";
	var showtimesUrl = baseUrl + '/movies/showings';
	var zipCode = zipcode;
	var d = new Date();
	var today = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate();
	$.ajax({
		url: showtimesUrl,
		data: { startDate: today,
		zip: zipCode,
		jsonp: "dataHandler",
		api_key: apikey
		},
		dataType: "jsonp",
	}).done()
}

function dataHandler(data) {
	var movies = data.hits;
	var title = [];
	var rating = [];
	var genre = [];
	var description = [];
	var director = [];
	var topcast = [];

	$.each(data, function(index, movie) {
		title.push(movie.title);

		if (movie.ratings) {
			rating.push(movie.ratings[0].code);
		}
		else if (!movie.ratings) {
			rating.push("N/A");
		}

		var temp1 = "";
		if (movie.genres !== undefined) {
			for (i = 0; i < movie.genres.length; i++) {
				temp1 += movie.genres[i] + ", ";
				if (i === movie.genres.length - 1) {
					temp1 += movie.genres[i];
				}
			}
			genre.push(temp1);
			// genre = genre.substring(0, genre.length - 2);
		}
		else {
			genre.push("undefined");
			}
		

		description.push(movie.shortDescription);

		if (movie.directors !== undefined) {
			director.push(movie.directors[0]);
		}
		else {
			director.push("undefined");
		}

		var temp2 = "";
		if (movie.topCast !== undefined) {
			for (j = 0; j < movie.topCast.length; j++) {
				temp2 += movie.topCast[j] + ", ";
				if (j === movie.topCast.length - 1) {
					temp2 += movie.topCast[j];
				}
			}
			topcast.push(temp2);
			// topcast = topcast.substring(0, genre.length - 2);
		}
		else {
			topcast.push("undefined");
		}

	});
	var array = [title, rating, genre, description, director, topcast];
	if (title.length === 25) {
		displayRecPosters(array);
	}
}

function displayRecPosters(array) {
	console.log(array);
}

// display posters on main page
// send voteup/votedown information to ??? function
function displayPosters(posterArray, movieInfo) { 

	// move search bar up
	$("#initial-page").css("margin-top", "25px");

	//instructions and submit button
	$("#instructions").show();
	$("#submitPreferences").show();

	$("#poster").empty();

	var rows = 0;

	// loop through and dynamically place posters
	for (var i = 0; i < posterArray.length; i++) {


		// every 4 posters are placed in one row
		if (rows === i){ 

			var moviePoster = $("<div>").attr("class", "row poster-row");
			//moviePoster.prepend($("<div>").attr("class", "row"));
			rows += 4;	
		}

    	moviePoster.append($("<div id=\"poster"+i+"\" class=\"col-lg-2\" value="+i+"><img class=\"img-responsive\" src="+posterArray[i]+"><i class=\"fa fa-thumbs-o-up fa-lg goodMovie\" aria-hidden=\"true\" value="+i+"></i><i class=\"fa fa-thumbs-o-down fa-lg badMovie\" aria-hidden=\"true\" value="+i+"></i></div>"));
    	moviePoster.append($("<div>").attr("class", "col-lg-1"));
    	$("#poster").append(moviePoster);

	}
	//$("#user-keyword-btn").click(keyword);
	$(".goodMovie").on("click", function() {

		// get position in the array of poster clicked
		var poster_array_value = $(this).attr("value");

		//console.log("clicked on", $(this).attr("value"));
		//console.log(movieInfo[poster_array_value]);
		var good_movie_formatted = format(movieInfo[poster_array_value]);
		//console.log("good movie ", good_movie_formatted);
		changeScores(good_movie_formatted, "good");

	});
	$(".badMovie").on("click", function() {

		// get position in the array of poster clicked
		var poster_array_value = $(this).attr("value");
		console.log(poster_array_value);

		console.log("clicked on", $(this).attr("value"));
		console.log(movieInfo[poster_array_value]);
		var bad_movie_formatted = format(movieInfo[poster_array_value]);
		//console.log("bad movie ", good_movie_formatted);
		changeScores(bad_movie_formatted, "bad");

	});
}

//main 
// this will determine if this is a first time or returning user
$(document).ready(function() {
	database.ref().on("value", function(snap) {
		var checker = snap.val();
		userkey = localStorage.userkey;
		if (checker === null) {
			isexist = false;
			$("#signInModal").modal('show');
		}
		else if (checker !== null) {
			if (userkey !== undefined) {
				database.ref("/" + localStorage.userkey).once("value", function(snap) {
					var name = snap.val().name;
					console.log(name);
					if (name === localStorage.username) {
						isexist = true;
						zipcode = snap.val().zipcode;
						username = snap.val().name;
						$("#signInModal").modal('hide');
					}
					else {
						isexist = false;
						$("#signInModal").modal('show');
					}
				})
			}
			else {
				$("#signInModal").modal('show');
			}
		}
	})
	//instructions and submit button
	$("#instructions").hide();
	$("#submitPreferences").hide();
})

$("#signin").click(signin);

$("#user-keyword-btn").click(keyword);