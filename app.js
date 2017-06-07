var express = require("express");
var config = require("config");
var bodyParser=require("body-parser");
var session=require("express-session");

var soketio=require("socket.io");

var app = express();

app.use(bodyParser.json());

app.set("views",__dirname+"/apps/views");
app.set("view engine","ejs");

app.use("/static", express.static(__dirname + "/public"));

var controllers = require(__dirname + "/apps/controllers");


app.use(controllers);
var host=config.get("server.host");
var port=config.get("server.port");

var server=app.listen(port,host, function(){

	console.log("Server dang chay tren port : ",port);
});


var io=soketio(server);

var socketcontrol=require("./apps/common/socketcontrol")(io);