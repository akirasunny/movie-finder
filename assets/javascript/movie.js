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
var userkey;
var username;
var localkeywords;


// functions
function capitalize(a) {
	var temp = a.split(" ");
	var temp1 = "";
	for (i = 0; i < temp.length; i++) {
		temp1 += temp[i].substring(0, 1).toUpperCase() + temp[i].substring(1, ) + " ";
	}
	var final = temp1.trim();
	return final;
}

function signin() {
	username = capitalize($("#username").val().trim());
	console.log(username);
	var location = capitalize($("#location").val().trim());
	database.ref().push({
		name: username,
		location: location
	})
	$("#signInModal").modal("hide");
	database.ref().on("child_added", function(snap, prekey) {
		userkey = snap.key;
	})
	console.log(userkey);
}

function keyword() {
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
					displayPosters(poster);
				}
			});
		}

	console.log(array);
	console.log(poster);
	var result = [array, poster];

	return result;
	})
}

// display posters on main page
function displayPosters(posterArray) { 

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

    	moviePoster.append($("<div id=\"poster"+i+"\" class=\"col-lg-2\"><img class=\"img-responsive\" src="+posterArray[i]+"><i class=\"fa fa-thumbs-o-up fa-lg goodMovie\" aria-hidden=\"true\"></i><i class=\"fa fa-thumbs-o-down fa-lg badMovie\" aria-hidden=\"true\"></i></div>"));
    	moviePoster.append($("<div>").attr("class", "col-lg-1"));
    	$("#poster").append(moviePoster);

	}
}

//main 

// this will determine if this is a first time or returning user
$("#user-keyword-btn").click(keyword);
	database.ref().on("value", function(snap) {
		userkey = snap.key;
})

$(document).ready(function() {

	//instructions and submit button
	$("#instructions").hide();
	$("#submitPreferences").hide();

	// show modal on page load
	if (userkey === undefined) {
		$("#signInModal").modal('show');
	}
});

// submit button for user keywords
$("#user-keyword-btn").on("click", function(event){
	// prevent page from reloading when clicking on submit button
	event.preventDefault();
});

$("#signin").click(signin);
database.ref().on("child_added", function(child, preChildKey) {
	var child = child.val();
	if (child.name === username) {
		console.log("I'm working!");
	}
})