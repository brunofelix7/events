const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user');
const ApiResponse = require('../models/api-response');
require('../../config/database');

function verifyToken(req, res, next) {
	if(!req.headers.authorization) {
		return res.status(401).json('Unauthorized request');
	}
	let token = req.headers.authorization.split(' ')[1];
	if(token === 'null') {
		return res.status(401).json('Unauthorized request');
	}
	let payload = jwt.verify(token, 'secretKey');
	if(!payload) {
		return res.status(401).json('Unauthorized request');
	}
	req.userId = payload.subject;
	next();
}

/** Home resource */
router.get('/', (req, res) => {
	let welcome = {
		'message': 'Welcome to events API'
	};
	res.json(welcome);
});

/** Register resource */
router.post('/register', (req, res) => {
	let data = req.body;
	let user = new User(data);
	user.save((error, registeredUser) => {
		if (error) {
			console.error(error);
			return;
		}
		let payload = { subject: registeredUser._id };
		let token = jwt.sign(payload, 'secretKey');
		res.status(201).json({ token });
	});
});

/** Login resource */
router.post('/login', (req, res) => {
	let data = req.body;
	User.findOne({ email: data.email }, (error, user) => {
		if (error) {
			console.error(error);
			return;
		}
		if (!user) {
			res.status(401).json(new ApiResponse('Unauthorized', 'Invalid email'));
			return;
		}
		if (user.password !== data.password) {
			res.status(401).json(new ApiResponse('Unauthorized', 'Invalid password'));
			return;
		}
		let payload = { subject: user._id };
		let token = jwt.sign(payload, 'secretKey');
		res.status(200).json({ token });
	});
});

/** Event resource */
router.get('/events', verifyToken, (req, res) => {
	let events = [
		{
			"_id": "1",
			"name": "Auto Expo",
			"description": "lorem ipsum",
			"date": "2012-04-23T18:25:43.511Z"
		},
		{
			"_id": "2",
			"name": "Auto Expo",
			"description": "lorem ipsum",
			"date": "2012-04-23T18:25:43.511Z"
		},
		{
			"_id": "3",
			"name": "Auto Expo",
			"description": "lorem ipsum",
			"date": "2012-04-23T18:25:43.511Z"
		},
		{
			"_id": "4",
			"name": "Auto Expo",
			"description": "lorem ipsum",
			"date": "2012-04-23T18:25:43.511Z"
		},
		{
			"_id": "5",
			"name": "Auto Expo",
			"description": "lorem ipsum",
			"date": "2012-04-23T18:25:43.511Z"
		},
		{
			"_id": "6",
			"name": "Auto Expo",
			"description": "lorem ipsum",
			"date": "2012-04-23T18:25:43.511Z"
		}
	]
	res.json(events);
});

/** Special resource */
router.get('/special', verifyToken, (req, res) => {
	let specialEvents = [
		{
			"_id": "1",
			"name": "Auto Expo Special",
			"description": "lorem ipsum",
			"date": "2012-04-23T18:25:43.511Z"
		},
		{
			"_id": "2",
			"name": "Auto Expo Special",
			"description": "lorem ipsum",
			"date": "2012-04-23T18:25:43.511Z"
		},
		{
			"_id": "3",
			"name": "Auto Expo Special",
			"description": "lorem ipsum",
			"date": "2012-04-23T18:25:43.511Z"
		},
		{
			"_id": "4",
			"name": "Auto Expo Special",
			"description": "lorem ipsum",
			"date": "2012-04-23T18:25:43.511Z"
		},
		{
			"_id": "5",
			"name": "Auto Expo Special",
			"description": "lorem ipsum",
			"date": "2012-04-23T18:25:43.511Z"
		},
		{
			"_id": "6",
			"name": "Auto Expo Special",
			"description": "lorem ipsum",
			"date": "2012-04-23T18:25:43.511Z"
		}
	]
	res.json(specialEvents);
});

module.exports = router;