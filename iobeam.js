const iobeam = require('iobeam-client');

const clients = new Map();
const datastores = new Map();

// Constants initialization
PROJECT_ID = ;  //project id  int
PROJECT_TOKEN = ""; //project token string

function iterateID() {
  const request = require ('superagent');
  request
  .get('https://511ny.org/api/getmainlinelinkstatuses?key={}&format={json}') //key left out for privacy
  .end(function(err, res) {
  	const statArray = JSON.parse(res.text);
    for (var i = 0; i < statArray.length; i++)
  	{
        var dev_id = statArray[i].ID

        var client = null;
        var conditions = null;

  		  console.log(dev_id);
      if (clients.has(dev_id)) {
          client = clients.get(dev_id);
          conditions = datastores.get(dev_id);
      } else {
        console.log("reg");
          client = iobeam.Builder(PROJECT_ID, PROJECT_TOKEN)
                      .registerOrSetId(dev_id)
                      .setBackend("https://api-dev.iobeam.com/v1")
                      .build();
          conditions = client.createDataStore(["SpeedMetersPerHour"]);
          clients.set(dev_id, client);
          datastores.set(dev_id, conditions);
      }

      var vals = {SpeedMetersPerHour: statArray[i].SpeedMetersPerHour}

      conditions.addNow(vals)
      client.send(function(error, datastore) {
        console.log("sent " + JSON.stringify(datastore.rows()));
          if (error) {
              console.warn("err " + error);
          }
      });
    }
  })
}
iterateID();
