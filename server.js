const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const signin = require('./controller/Signin');
const register = require('./controller/Register');
const profile = require('./controller/Profile');
const image = require('./controller/Image');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = knex({
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		user: 'chuey',
		password: '123',
		database: 'smart-brain'
	}
});

app.get('/', (req, res) => {
	res.send(database.users);
});
app.post('/signin', signin.handleSignin(db, bcrypt));
// Due to the fact that we have the "app.get('/') function already"
// It knows that we're calling functions that has (req, res), therefore:
// SAME METHIOD CAN ALSO BE WRITTEN AS BELOW
// THE MAIN CHANGE IS IN THE SIGNIN FILE WHERE IT TAKES A FUNCTION THAT
// RETURNS A FUNCTION
app.post('/register', (req, res) => {
	register.handleRegister(req, res, db, bcrypt);
});
app.get('/profile/:id', (req, res) => {
	profile.handleProfile(req, res, db);
});
app.put('/image', (req, res) => {
	image.handleImageCounter(req, res, db);
});
app.post('/imageurl', (req, res) => {
	image.handleApiCall(req, res);
});
app.listen(3000, () => {
	console.log('app is running on port 3000');
});