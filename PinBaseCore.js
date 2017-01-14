var PinStore = require('./PinBaseIO');

var searchable = {"id":"C:/temp2/test.pinb"}
var pinStore = new PinStore.PinStore('C:/temp2/test.pinb','',searchable);

pinStore.on('written', function(id){
  console.log("Record Written: " + id);
});

pinStore.on('read', function(data){
  console.log("Record Retrieved: " + JSON.stringify(data));
});

pinStore.on('error', function(e){
  console.log("An error occurred: " + e);
});

var testData = {"id":0,"fname":"jonathan","lname":"thompson"};
//pinStore.write(testData);

var criteria = {"key":"id","value":1};
pinStore.readPin(criteria);
