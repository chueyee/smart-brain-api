const Clarifai = require('clarifai');

const app = new Clarifai.App({
	apiKey: '04dfa25bdceb499a9ab5c5a072cd6002'
});

const handleApiCall = (req, res) => {
	app.models
		.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
		.then(data => {
			res.json(data);
		})
		.catch(err => res.status(400).json('unable to work with json'));
};

const handleImageCounter = (req, res, db) => {
	const { id } = req.body;
	db('users')
		.where('id', '=', id)
		.increment('entries', 1)
		.returning('entries')
		.then(entries => {
			res.json(entries[0]);
		})
		.catch(err => res.status(400).json('unable to get entries'));
};

module.exports = {
	handleImageCounter: handleImageCounter,
	handleApiCall: handleApiCall
};
