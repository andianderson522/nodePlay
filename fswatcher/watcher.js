var fs = require('fs');
var path = require('path');
var S = require('string');
var Stopwatch = require("node-stopwatch").Stopwatch;

var filter = function(file, lookbackTimestamp, stat) {
	if (stat === undefined) {
		console.log("unifined");
		return false;
	}
	console.log("good");
	console.log(stat.mtime.getTime());
	console.log('+++++++++++');
	if (lookbackTimestamp < stat.mtime.getTime()) {
		console.log('young enough');
	} else {
		console.log('to old');
		return false;
	}
	if (S(file).contains('.in.')) {
		return false;
	}
	lowercaseFileName = S(file.toLowerCase());
	if (lowercaseFileName.endsWith('.jpg')) {
		return true;
	}
	if (lowercaseFileName.endsWith('.gif')) {
		return true;
	}
	if (lowercaseFileName.endsWith('.png')) {
		return true;
	}
	if (lowercaseFileName.endsWith('.jpeg')) {
		return true;
	}
	return false;

};

var walk = function(dir, done) {
	stopwatch = Stopwatch.create();
	console.log('starting an iteration');
	stopwatch.start();
	var results = [];
	fifteenMinutes = 1000 * 60 * 15;
	lookbackTimestamp = new Date().getTime() - fifteenMinutes;
	try {
		fs.readdir(dir, function(err, list) {
			if (err) {
				return done(err);
			}
			var pending = list.length;
			if (!pending) {
				return done(null, results);
			}
			list.forEach(function(file) {
				file = path.resolve(dir, file);
				fs.stat(file, function(err, stat) {
					if (stat && stat.isDirectory()) {
						walk(file, function(err, res) {
							results = results.concat(res);
							if (!--pending) {
								done(null, results);
							}
						});
					} else {
						//console.log(JSON.stringify(stat));
						//console.log(JSON.stringify(file));
						if (filter(file,lookbackTimestamp, stat)) {
							results.push(file);
						}
						if (!--pending) {
							done(null, results);
						}
					}
				});
			});
		});
	} catch (err) {
		console.log(err);
	}	finally {
		stopwatch.stop();
		console.log('done');
		console.log('traversal took: ' + stopwatch.elapsed.minutes + ':' + stopwatch.elapsed.seconds + ':' + stopwatch.elapsedMilliseconds);
		console.log('total ticks: ' + stopwatch.elapsedTicks);
	}
};


done = walk('/Users/aanders3/Desktop', function(err, results) {
	if (err) {
		console.log(err);
	}
	console.log(results);
	now = new Date().getTime();
	console.log(now.valueOf());
	console.log(now);
	ago = now - (1000 * 60 * 15);
	console.log(ago);
	console.log(1000 * 60 * 15);
	console.log(ago < now);
});