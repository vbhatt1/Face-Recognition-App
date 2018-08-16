const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

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

app.get('/',(req,res) => {res.json(database.users)})
app.post('/signin',(req,res) => {signin.handleSignin(req,res,db,bcrypt)})
app.post('/register',(req,res) => {register.handleRegister(req,res,db,bcrypt)})
app.get('/profile/:id',(req,res) => {profile.handleProfile(req,res,db)})
app.put('/image',(req,res) => {image.handleImage(req,res,db)})
app.post('/imageurl',(req,res) => {image.handleApiCall(req,res)})

app.listen(process.env.PORT || 3000,() => {
	console.log(`Server listening on ${process.env.PORT}`);
})