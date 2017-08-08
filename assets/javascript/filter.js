//var compatObject stores each unique keyword as a new property
//inside of the property is a number that is updated if the user liked or disliked. 
//this is intended to be stored in firebase and referenced when users like or dislike movie. 
//Need to still write one more function that actually changes score, but right now I don't have access to the database. 
var compatObject = 
{
};

//this is a test array modeled after the real arrays we will be receiving from ajax...
var array = ["Action, Romance, Adventure, Action Movie", "James Cameron, Johnny Depp", "Sci-Fi", "pg-13", "8.5"];



//this function will format any array into the proper format.
//if it is a list like ["action, romance, adventure"] it will become 
//["action", "romance", "adventure"]
//if an element has a space in the name it will add an underscore
//[James Cameron] => [James_Cameron].
//this is necessary to seperate individual keywords.
//I added a new for loop that make formattedArray all lower case for consistency. 
function format(newArray)
{
	formattedArray = [];
	for (var i = 0; i < newArray.length; i++) 
	{
		var space = new RegExp(" ");
		var dash = new RegExp("-");
		var period = new RegExp(".");
		slicedArray = newArray.slice(i,i+1);
		var newString = slicedArray[0];
		var wordArray = newString.split(", ");
		for (var j = 0; j < wordArray.length; j++) 
		{
			if(space.test(wordArray[j]))
			{
				var underScore = wordArray[j].replace(/ /g, "_");
				formattedArray = formattedArray.concat(underScore);
			}
			else if(dash.test(wordArray[j]))
			{
				var noDash = wordArray[j].replace(/-/g, "_");
				formattedArray = formattedArray.concat(noDash);
			}
			else if(period.test(wordArray[j]))
			{
				var noPeriod = wordArray[j].replace(/\./g, "_");
				formattedArray = formattedArray.concat(noPeriod);
			}
			else
			{
				formattedArray = formattedArray.concat(wordArray[j]);
			}
		}
	}
	for (var i = 0; i < formattedArray.length; i++) 
	{
		formattedArray[i] = formattedArray[i].toLowerCase();
	}
	return formattedArray;
}	

//This function is designed to look through each new movie array.
//If it finds new words that have not been added to compatObject,
//then it will add them with the default score of 0. 
//those scores are intended to change as the user likes and dislikes movies. 
function addToObject(newArray) 
{
	//this block of code will add any new keywords to the object with an initial score of zero. 
	for (var i = 0; i < newArray.length; i++) 
	{
		var counter = 0;
		var x;
		for (x in compatObject)
		{
			if(x === newArray[i])
			{
				counter++;
			}
		}
		if(counter === 0)
		{
			compatObject[newArray[i]] = 0;
		}
	}
}


//makeScore adds up the score for a given movie array, based on the compatObject
//This score will be used in the filter to keep track of movies that should and should not be recommended.
function makeScore(newArray)
{
	var totalScore = 0;
	//block of code that goes through movie array and adds up all values according to compatObject.
	for (var i = 0; i < newArray.length; i++)
	{
		if(compatObject[newArray[i]] !== undefined)
		{
			totalScore += parseInt(compatObject[newArray[i]]);
		}
	}	
	return totalScore;
}

//filter takes an array of poster images and movie info. 
//it makes a score out of the movie info and uses that score
//to filter out various poster images.
//it returns a filtered array of posters. 
function filter(poster, info)
{
	//makes copy of array poster.
	var newPosterArray = poster.slice(0);

	var i = poster.length
	while(i--)
	{
		formattedMovieInfo = format(info[i]);
		newScore = makeScore(formattedMovieInfo);
		if(newScore < 0)
		{
			newPosterArray.splice(i,1);
		}
	}
	return newPosterArray
}

//TO DO 

//function that can change scores of movies and update database
//upvote / downvote
function changeScores(movieArray, vote)
{
	if (vote === "good")
	{
		addToObject(movieArray);

		// go through compatObject and if keyword is found as a key, add 1 to the value
		$.each(compatObject, function(key, value) {

			for(var i = 0; i < movieArray.length; i++){
				if(key === movieArray[i])
				{ 
					value++;
					compatObject[movieArray[i]] = value;
		  		}
		  	}
		  //console.log(compatObject);
		});
	}
	if (vote === "bad")
	{
		addToObject(movieArray);

		// go through compatObject and if keyword is found as a key, minus 1 from the value
		$.each(compatObject, function(key, value) {

			for(var i = 0; i < movieArray.length; i++){
				if(key === movieArray[i])
				{ 
					value--;
					compatObject[movieArray[i]] = value;
		  		}
		  	}
		  //console.log(compatObject);
		});
	}

}



//incorporate filter into the rest of code. s