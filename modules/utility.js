var crypto = require('crypto');

exports.getUdid = function getuuid(){
//shay: this somthing that i found in the internet you shoud be using uuid-node mode for this!
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) { 
	var r = crypto.randomBytes(1)[0]%16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
})};