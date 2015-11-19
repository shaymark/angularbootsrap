var utility = require('../modules/utility.js');
var path = require('path');
var fs = require('fs');

var PELEPHON_FILE = path.join(__dirname, 'pelephonList.json');

exports.getPhones = function(req, res) {
  fs.readFile(PELEPHON_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
};

exports.addPhone = function(req, res) {
  fs.readFile(PELEPHON_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var pelephons = JSON.parse(data);
    // NOTE: In a real implementation, we would likely rely on a database or
    // some other approach (e.g. UUIDs) to ensure a globally unique id. We'll
    // treat Date.now() as unique-enough for our purposes.
    var newPelephon = {
      id: utility.getUdid(),
      name: req.body.name,
      price: req.body.price,
	  image: req.body.image
    };
    pelephons.push(newPelephon);
    fs.writeFile(PELEPHON_FILE, JSON.stringify(pelephons, null, 4), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.setHeader('Cache-Control', 'no-cache');
      res.json(pelephons);
    });
  });
};

exports.editPhone= function(req, res) {
  fs.readFile(PELEPHON_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
	
    var pelephons = JSON.parse(data);
    // NOTE: In a real implementation, we would likely rely on a database or
    // some other approach (e.g. UUIDs) to ensure a globally unique id. We'll
    // treat Date.now() as unique-enough for our purposes.
    
	var id = req.params.id;
	
	var existingPelephon= pelephons.filter(function(value){
		return value.id==id;
	});
	
	if(existingPelephon.length==0){
		 res.status(404).send({ error: 'id not found' });
		 return;
	}
	
	existingPelephon = existingPelephon[0];
	
	var name = req.body.name;
	if(name){existingPelephon.name = name};
	var price = req.body.price;
	if(price) {existingPelephon.price = price}; 
	var image = req.body.image;
	if(image) { existingPelephon.image = image};
	
   // pelephons.push(newPelephon);
    fs.writeFile(PELEPHON_FILE, JSON.stringify(pelephons, null, 4), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.setHeader('Cache-Control', 'no-cache');
      res.json(pelephons);
    });
  });
};

exports.deletePhone= function(req, res) {
	fs.readFile(PELEPHON_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
	
	var pelephons = JSON.parse(data);
    // NOTE: In a real implementation, we would likely rely on a database or
    // some other approach (e.g. UUIDs) to ensure a globally unique id. We'll
    // treat Date.now() as unique-enough for our purposes.
    
	var id = req.params.id;
	
	var existingPelephon= pelephons.filter(function(value){
		return value.id==id;
	});
	
	if(existingPelephon.length==0){
		 res.status(404).send({ error: 'id not found' });
		 return;
	}
	
	existingPelephon = existingPelephon[0];
	
	pelephons.splice(pelephons.indexOf(existingPelephon), 1); //remove the item
	
	 fs.writeFile(PELEPHON_FILE, JSON.stringify(pelephons, null, 4), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.setHeader('Cache-Control', 'no-cache');
      res.json(pelephons);
    });
  });
	
}