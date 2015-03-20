var http = require("http");
 
var cluster    = require('cluster');
var numCPUs = require('os').cpus().length;
if (cluster.isMaster) {
	var workers = [];
	restart = true;
	for(var i=0; i<numCPUs; i++) {
		var child = cluster.fork();
		child.on('exit', function (worker, code, signal) {
			console.log(child.process.pid + ' died');
			//logging details about what happend
			if (restart) {
				child = cluster.fork();
				workers.push(child);
			}
		});
		workers.push(child);
	}
	Object.keys(cluster.workers).forEach(function(id) {
		console.log("I am running with ID : "+cluster.workers[id].process.pid);
	});
	process.on('SIGINT', function(){
		restart = false;
		console.log("exiting "+process.pid);
		for(var i=0; i<workers.length; i++) {
		   console.log("destroying "+workers[i].process.pid);
		   workers[i].destroy();
		}
	});
} else {
	console.log("Child process "+process.pid+" being created and listening to port 1337");
	http.createServer(function(req, res){
		console.log(process.pid + ' got a request');
		res.end("Hello World " + process.pid);
	}).listen(1337);
}