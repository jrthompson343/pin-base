var fs = require('fs');
var util = require('util');
var EventEmitter = require('events').EventEmitter;

function PinStore(store, template, searchables){
  var path = store;
  var count = 0;
  var indexes = searchables;
  var self = this;

  function generateKey(){
    count = count + 1;
    return count;
  }

  function pinify(key, entity)
  {
    var pin = {"k":key,"d":entity};
    console.log("pin: " + pin);
    return JSON.stringify(pin);
  }

  function parsePin(data){
    return JSON.parse(data).d;
  }

  function read(filepath, callback){
    fs.readFile(filepath, function(err,data){
      if(err){
        self.emit('error', error);
      }else{
        callback(data);
      }
    });
  }

  this.write = function(entity){
      try{
        var key = generateKey();
        var pin = pinify(key, entity);

        fs.appendFile(path, pin, function(err){
          if(err){
            self.emit('error', err);
          } else {
            self.emit('written', key);
          }
        });
      }catch(error){
        self.emit('error', error);
      }
  }

  this.readPin = function(searchCriteria) {
    var index = searchables[searchCriteria.key];
    if(index !== 'undefined'){
      read(index, function(data){
        self.emit('read',parsePin(data));
      });
    }else{
      self.emit('error',{"message": "This PinStore is not setup to search by key: " + searchCriteria.key});
    }
  }

}
util.inherits(PinStore, EventEmitter);
module.exports.PinStore = PinStore;
