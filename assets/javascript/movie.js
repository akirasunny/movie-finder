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

// globals
function signin() {
	var name = $("#username").val().trim();
	var location = $("#location").val().trim();
	database.ref().push({
		name: name,
		location: location
	})
	$("#signInModal").modal("hide");
}


//main
$(document).ready(function() {

	// show modal on page load
	$("#signInModal").modal('show');

});


// submit button for user keywords
$("#user-keyword-btn").on("click", function(event){

	// prevent page from reloading when clicking on submit button
	event.preventDefault();

});

$("#signin").click(signin);
