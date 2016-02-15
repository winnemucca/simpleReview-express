var _ = require('lodash');

var Dog = require('../models/dog_model.js')

module.exports = function(app) {

	app.post('/dog', function(req, res) {

		var newDog = new Dog(req.body);
		newDog.save(function(err) {
			if (err) {
				res.json({info: 'error during Dog create', error:err })
			};
			res.json({info: 'Dog created succesfully'});
			
		});
		
		res.json({info: 'Dog created succesfully'});
	});

	// read
	app.get('/dog', function(req, res) {
		Dog.find(function(err, Dogs) {

			if (err) {
				res.json({info: 'error during find Dogs', error:err});	
			}
			res.json({info: 'Dogs found succesfully', data: Dogs});

		})
	})

	app.get('/dog/:id', function(req, res) {
		Dog.find(function(err, Dogs) {
			if (err) {
				res.json({info: 'error during Dogs', error: err});
			};

			res.json({info:'Dogs found succesfully', data: Dogs});
		})
	});

	// updates
	app.put('/dog/:id',function(req, res) {
		Dog.findById(req.params.id, function(err, Dog) {
			if (err) {
				res.json({info: 'error during Dogs', error: err})
			}
			if (Dog) {
				_.merge(Dog, req.body);
				Dog.save(function(err) {
					if (err) {
						res.json({info: 'error during find Dog', error: err});
					}
					res.json({info: 'Dog updated succesfully'});
				});
			}
			else {
				res.json({info: 'Dog not found'});
			}

		})
	});

	// delete
	
	app.delete('/Dog/:id', function( req, res) {
		Dog.findByIdAndRemove(req.params.id,function(err) {
			if (err) {
				res.json({info: 'error during Dog update', error: err});
			};
			res.json({info: 'Dog not found'});
		});
	});
}