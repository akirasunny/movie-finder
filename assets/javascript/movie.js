// firebase

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

// globals
function signin() {
	var name = $("#username").val().trim();
	var location = $("#location").val().trim();
	database.ref().push({
		name: name,
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
			});
		}
	console.log(array);
	console.log(poster);
	return array, poster;
	})
}

//main
$("#user-keyword-btn").click(keyword);
	database.ref().on("value", function(snap) {
		userkey = snap.key;
})

$(document).ready(function() {

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