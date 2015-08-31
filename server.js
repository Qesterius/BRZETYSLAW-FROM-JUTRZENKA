
var http = require('http');
var server = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(1337);
console.log('Server running at http://127.0.0.1:1337/');



	function	PREJER(x,  y){
					this.pos = { x: x, y: y };
					this.vel = { x: 0, y: 0 };
					this.sp = 20;
					this.head = 0;
					this.torso = 0;
					this.legs = 0;
					this.accesor = 0;
					this.walk = 0;
					this.walking = 0;
					//this.p1p2t = TORSOS;
					//this.p1p2l = LEGZ;
				}

var ludziki = [];

setInterval(function(){
		for(var i=0; i<ludziki.length; i++){
			if(ludziki[i]){
			ludziki[i].pos.x += ludziki[i].vel.x;
			ludziki[i].pos.y += ludziki[i].vel.y;
			}
		}	
	}, 25);

var io = require('./node_modules/socket.io/lib/socket.io');
var socket = io.listen(server);
socket.on('connection', function(client){
//-------------------------------------------------------------------
	client.ajdi = -1;
	client.send("OMG fuk u nigga");
	client.on("message", function(mess){
		console.log(mess);
	});
	client.once("init", function(data){
		var id = ludziki.push(data)-1;
		client.ajdi = id;
		client.emit("id", id);
		//console.log(data);
	});
	client.on("pos", function(data){
		if(ludziki[data.id]!=undefined){
		var x = 0;
		var y = 0;
		if(data.x>0) x = ludziki[data.id].sp;
		else if(data.x<0) x = -ludziki[data.id].sp;
		if(data.y>0) y = ludziki[data.id].sp;
		else if(data.y<0) y = -ludziki[data.id].sp;
		if(data.x != "niet") ludziki[data.id].vel.x = x;
		if(data.y != "niet") ludziki[data.id].vel.y = y;
		client.emit("playerupdate", ludziki[data.id]);
		}
	});
	client.on("request", function(){
		var lud = [];
		for(var i=0; i<ludziki.length; i++){
			if(ludziki[i]){
			lud[i] = new PREJER(0, 0);
			lud[i].pos = ludziki[i].pos;
			}else lud[i] = false;
		}
		client.emit("update", lud);
	});
	client.on("disconnect", function(){
		if(client.ajdi != -1 && ludziki[client.ajdi] != undefined) ludziki[client.ajdi] = false;
	});
//-------------------------------------------------------------------
});