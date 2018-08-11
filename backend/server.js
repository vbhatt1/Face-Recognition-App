const express = require('express');

const bodyParser = require('body-parser');

const cors = require('cors');

const app = express();

app.use(bodyParser.json());

app.use(cors());

const database = {
	users:[
		{
			id: '123',
			name: 'John',
			email: 'john@gmail.com',
			password: 'cookies',
			entries: 0,
			joined: new Date() 
		},
		{
			id: '124',
			name: 'Sally',
			email: 'sally@gmail.com',
			password: 'bananas',
			entries: 0,
			joined: new Date() 
		}
	]
};

app.get('/',(req,res) => {
	res.json(database.users);
})

app.post('/signin',(req,res) => {
	if (req.body.email === database.users[0].email && 
		req.body.password === database.users[0].password) {
		res.json(database.users[0]);
	} else {
		res.status(404).json("email and/or password invalid");
	}
})

app.post('/register',(req,res) => {
	const {email, name, password} = req.body;
	database.users.push({
		id: '125',
		name: name,
		email: email,
		entries: 0,
		joined: new Date()
	})
	res.json(database.users[database.users.length - 1]);
})

app.get('/profile/:id',(req,res) => {
	const {id} = req.params;
	let found = false;
	database.users.forEach((user) => {
		if (user.id === id) {
			found = true;
			return res.json(user);
		}
	})
	if(!found) {
		res.status(404).json("user not found");
	}
})

app.put('/image',(req,res) => {
	const {id} = req.body;
	let found = false;
	database.users.forEach((user) => {
		if (user.id === id) {
			found = true;
			user.entries++;
			return res.json(user.entries);
		}
	})
	if(!found) {
		res.status(404).json("user not found");
	}
})

app.listen(3000,() => {
	console.log("server listening on port 3000");
})