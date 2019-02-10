const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user');
const Event = require('../models/event');
const Special = require('../models/special');
const ApiResponse = require('../models/api-response');

require('../../config/database');

/**Valida se as requisições estão vindo com o token */
function verifyToken(req, res, next) {
	if(!req.headers.authorization) {
		return res.status(401).json(new ApiResponse('Unauthorized request'));
	}
	let token = req.headers.authorization.split(' ')[1];
	if(token === 'null') {
		return res.status(401).json(new ApiResponse('Unauthorized request'));
	}
	let payload = jwt.verify(token, 'secretKey');
	if(!payload) {
		return res.status(401).json(new ApiResponse('Unauthorized request'));
	}
	req.userId = payload.subject;
	next();
}

/** Home resource */
router.get('/', (req, res) => {
	res.json(new ApiResponse('Welcome to events API'));
});

/** Register resource */
router.post('/register', (req, res) => {
	let data = req.body;
	let obj = new User(data);
	obj.save((error, user) => {
		if (error) {
			console.error(error);
			return;
		}
		let payload = { subject: user._id };
		let token = jwt.sign(payload, 'secretKey');
		res.status(201).json({ token });
	});
});

/** Auth post resource */
router.post('/auth', (req, res) => {
	let data = req.body;
	User.findOne({ email: data.email }, (error, user) => {
		if (error) {
			console.error(error);
			return;
		}
		if (!user) {
			res.status(401).json(new ApiResponse('Invalid email'));
			return;
		}
		if (user.password !== data.password) {
			res.status(401).json(new ApiResponse('Invalid password'));
			return;
		}
		let payload = { subject: user._id };
		let token = jwt.sign(payload, 'secretKey');
		res.status(200).json({ token });
	});
});

/** Auth get resource */
router.get('/auth', verifyToken, (req, res) => {
	User.findOne({ _id: req.userId }, (error, user) => {
		if (error) {
			console.error(error);
			return;
		}
		res.status(200).json(user);
	}).select('-password');
});

/** event POST resource */
router.post('/events', verifyToken, (req, res) => {
	let data = req.body;
	let obj = new Event(data);
	obj.save((error, event) => {
		if (error) {
			console.error(error);
			return;
		}
		res.status(201).json({ event });
	});
});

/** event GET resource */
router.get('/events', verifyToken, (req, res) => {
	Event.find((error, events) => {
		if(error) {
			console.log(error);
			return;
		}
		res.status(200).json(events);
	});
});

/** special POST resource */
router.post('/special', verifyToken, (req, res) => {
	let data = req.body;
	let obj = new Special(data);
	obj.save((error, special) => {
		if(error) {
			console.error(error);
			return;
		}
		res.status(200).json(special);
	});
});

/** special GET resource */
router.get('/special', verifyToken, (req, res) => {
	Special.find((error, special) => {
		if(error) {
			console.log(error);
			return;
		}
		res.status(200).json(special);
	});
});

module.exports = router;