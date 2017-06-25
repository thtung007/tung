module.exports=function(io){
	var usernames=[];
	io.sockets.on("connection",function(socket){
		console.log("1 user moi da ket noi");
	
		socket.on("adduser",function(username){

			socket.username=username;
			usernames.push(username);

			var data = {

				sender:"SERVER",
				message: "CHUC MUNG! Ban da tham gia vao phong Chat"
			};

			socket.emit("update_message",data);

			var data = {

				sender:"SERVER",
				message: username + " Da tham gia vao phong Chat"
			};

			socket.broadcast.emit("update_message",data);
		});


		socket.on("send_message",function(message){

			var data={

				sender:"Ban",
				message: message
			};

			socket.emit("update_message",data);

			var data={

				sender:socket.username,
				message: message
			};

			socket.broadcast.emit("update_message",data);

		});


		socket.on("disconnect",function(){

			for(var i=0; i<usernames.length;i++){

				if(usernames[i]==socket.username){

					usernames.splice(i,1);
				}
			}

			var data={

				sender: "SERVER",
				message: socket.username + " Da thoat khoi phong Chat"
			};
			socket.broadcast.emit("update_message",data);
			
		});
	});

		

}