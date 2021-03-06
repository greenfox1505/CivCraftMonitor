const dgram = require('dgram');

module.exports = function(PORT){
	data = {data : {}};
	//data.data = []; //todo, global object data should be named listener
	data.server = dgram.createSocket('udp4');
	
	//on error function
	data.server.on('error', (err) => {console.error(err);})

	//on message function
	data.server.on('message', (msg, rinfo) => {
		if(/\</.test(msg)){console.log("shitty input!");}
		else{
			//maybe I should stringify this thing instead...
			var newMSG = msg.toString().split(";")
			var packet = {
				name:newMSG[1],
				tag:newMSG[2],
				timeZone:newMSG[3],
				IP:newMSG[4],
				currentPlayers:newMSG[5],
				maxPlayers:newMSG[6],
				version:newMSG[7],
				lastSeen:Date.now()
			}; //todo data validation
			if(packet.IP == "127.0.0.1"){
				packet.IP= rinfo.address; 
				packet.WARNING = "overwrite IP, real is 127.0.0.1";
			}
			else if(packet.IP == ""){
				packet.IP= rinfo.address; 
				packet.WARNING = "overwrite IP, real is empty";
			}
			data.data[newMSG[0]] = packet;
		}
		console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
	});

	data.sorted = function(){
		console.log("sorting");
		var output = []
		var now = Date.now();
		for(i in data.data){
			if((now - data.data[i].lastSeen) > (1000 * 60 * 5)){
				console.log("killing", i , " age ", data.data[i].lastSeen)
				delete data.data[i];
			}
			else{
				output.push(data.data[i]);
			}
		}
		output.sort(function(a,b){
			return b.currentPlayers - a.currentPlayers;
		});
		return output
	}
	
	data.server.bind(PORT);
	
	return data;
}

