//Creates a place in firebase storage to store compatObject.
var objectStorage = database.ref("/compatObject");

//just used for testing can be deleted or commented out.
//var testArray = ["Action, Romance, Adventure, Action Movie", "James Cameron", "Geoffrey Rush, Johnny Depp", "Sci-Fi", "pg-13", "8.5"];
//test code written to test functionality, can be deleted or commented out.
//var format = format(testArray);
//addToObject(format);

//upload() can be used to upload any new objectStorage that might be created for any user.
function upload()
{
	objectStorage.set(compatObject);
}

//updateObject() simply updates the object's properties with any new values.
function updateObject()
{
	objectStorage.update(compatObject);
}

//more test code
//upload();
//compatObject.action = -10;
//compatObject.james_cameron = -20;
//updateObject();