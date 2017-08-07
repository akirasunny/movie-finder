//Creates a place in firebase storage to store compatObject.
var objectStorage = database.ref("/"+localStorage.userkey);

//just used for testing can be deleted or commented out.
//var testArray = ["Action, Romance, Adventure, Action Movie", "James Cameron", "Geoffrey Rush, Johnny Depp", "Sci-Fi", "pg-13", "8.5"];
//test code written to test functionality, can be deleted or commented out.
//var format = format(testArray);
//addToObject(format);

objectStorage.on("child_added", function(snap) 
{
	compatKey = snap.key;
	console.log("should be child: " + snap.key);
	//This is to be sure we get the right key, otherwise the name or zipcode can be saved in compatKey.
	if(snap.key !== "name" && snap.key !== "zipcode")	
	{
		localStorage.compatKey = compatKey;
	}
	console.log(compatKey);
});

//upload() can be used to upload any new objectStorage that might be created for any user.
function upload()
{
	objectStorage.push(compatObject);
}

//updateObject() simply updates the object's properties with any new values.
function updateObject()
{
	//ensures compatObject is located in proper spot. 
	var compatLocation = database.ref("/"+localStorage.userkey+"/"+localStorage.compatKey);
	compatLocation.update(compatObject);
}

//more test code
//upload();
//compatObject.action = -10;
//compatObject.james_cameron = -50;
//compatObject.action_movie = 10;
//updateObject();