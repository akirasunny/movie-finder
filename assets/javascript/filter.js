//given two arrays [good] [bad]. I want to compare a new array of keywords [new] to both.
//if number of keywords that match with good are larger than keywords that match with bad.
//then the movie can be displayed to user.
//also filters out movies with no results....
var numBad = 0;
var numGood = 0;



function filter(newArray, goodArray, badArray)
{
	for (var i = 0; i < newArray.length; i++)
	{
		
		for(var j = 0; j < goodArray.length; j++)
		{
			if(newArray[i] === goodArray[j])
			{
				numGood++;
			}
		}	
		for(var k = 0; k < badArray.length, k++)
		{
			if(newArray[i] === badArray[k])
			{
				numBad++;
			}
		}
	}
}