

//upload() can be used to upload any new objectStorage that might be created for any user.
function upload() {
	objectStorage = database.ref("/"+localStorage.userkey);
    objectStorage.on("child_added", function(snap) 
    {
        compatKey = snap.key;
       	console.log(compatKey);
        console.log("should be child: " + snap.key);
        //This is to be sure we get the right key, otherwise the name or zipcode can be saved in compatKey.
        if (snap.key !== "name" && snap.key !== "zipcode") 
        {
        	console.log(snap.key);

            localStorage.compatKey = compatKey;
        }
        console.log(compatKey);
    });
    console.log("im trying");
	objectStorage.push(compatObject);

}

//updateObject() simply updates the object's properties with any new values.
function updateObject() 
{
    //ensures compatObject is located in proper spot. 
    var compatLocation = database.ref("/" + localStorage.userkey + "/" + localStorage.compatKey);
    compatLocation.update(compatObject);
}

function retrieveObject() 
{
	var compatLocation = database.ref("/" + localStorage.userkey + "/" + localStorage.compatKey);
	compatLocation.on("value", function(snap)
	{
		compatObject = snap.val();
		console.log(snap.val());
	});

}
