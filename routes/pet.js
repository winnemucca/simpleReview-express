var r = require('request').defaults({
	json: true
});
var async = require('async');
var redis = require('redis');

var client = redis.createClient(6379,'127.0.0.1');

module.exports = function(app) {

	app.get('/pets', function(req, res) {
		async.parallel({
			cat: function(callback) {

				r({url: 'http://localhost:3000/cat'}), function(error, response, body) {
						if(error) {
							callback({service: 'cat', error: error});
							return;
						} 
						if(!error && response.statusCode ===200) {
							console.log(callback.body);
							callback(null, body);
						} else {
							callback(response.statusCode);
						}
				};
			},

			dog: function(callback) {

				client.get('http://localhost:3001/dog', function(error, cat) {
						if(error) {
							throw error;
						} 
						if(dog) {
							res.json(JSON.parse(cat));
						} else {
							r({url: 'http://localhost:3001/dog'}), function(error, response, body) {
								if(error) {
									throw error; return
								} 
								if(!error && response.statusCode ===200) {
									res.json(body);
									client.set(req.params.id, JSON.stringify(body), function(error) {
										if (error) {throw error;};
									});
								} 
								else {
									res.send(response.statusCode);
								}
							};
						}
				})
				
			}
		},
		function (error, results) {
			res.json({
				error: error,
				results: results
			});
		});	

	});
}