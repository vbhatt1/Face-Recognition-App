const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');

const db = knex({
	client: 'pg',
	connection: {
		host: 'localhost',
		user: 'postgres',
		password: 'viharbhatt',
		database: 'face-recognition'	
	}
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res) => {
	res.json(database.users);
})

app.post('/signin',(req,res) => {
	db.select('email','hash').from('login')
		.where('email','=',req.body.email)
		.then(data => {
			const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
			if(isValid) {
				return db.select('*').from('users')
					.where('email','=',req.body.email)
					.then(user => {
						res.json(user[0])
					})
					.catch(err => res.status(400).json('Login failed!'))
			} else {
				status(400).json('Invalid email and/or password.')
			}
		})
		.catch(err => res.status(400).json('Invalid email and/or password.'))
})

app.post('/register',(req,res) => {
	const {email, name, password} = req.body;
	const hash = bcrypt.hashSync(password);
	db.transaction(trx => {
		trx.insert({
			hash: hash,
			email: email
		})
		.into('login')
		.returning('email')
		.then(loginEmail => {
			return trx('users')
			.returning('*')
			.insert({
			email: loginEmail[0],
			name: name,
			joined: new Date()
			}).then(user => res.json(user[0]))
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	.catch(err => res.status(400).json('Registration failed!'))
}	)

app.get('/profile/:id',(req,res) => {
	const {id} = req.params;
	db.select('*').from('users').where({
		id: id
	})
	.then(user => {
		if (user.length) {
			res.json(user[0])
		} else {
			res.status(404).json('Sorry! User not found.')
		}
	})
	.catch(err => res.status(404).json('Error getting the user.'))
})

app.put('/image',(req,res) => {
	const {id} = req.body;
	db('users').where('id','=',id)
	.increment('entries',1)
	.returning('entries')
	.then(entries => res.json(entries[0]))
	.catch(err => res.status(400).json('Unable to get the data.'))
})

app.listen(3000,() => {
	console.log("server listening on port 3000");
})