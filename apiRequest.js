var request = require ('superagent');

request
.get('https://511ny.org/api/getmainlinelinkstatuses?key={4eccda9d4fcb43e5acc8437f3a11ddfb}&format={json}')
.end(function(err, res)
{
	var statArray = JSON.parse(res.text);

	for (var i = 0; i < statArray.length; i++)
	{
		var speed = statArray[i].SpeedMetersPerHour;
		console.log(speed);
	}

  for (var i = 0; i < statArray.length; i++)
	{
		var devID = statArray[i].ID;
		console.log(devID);
	}
});
