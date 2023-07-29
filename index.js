const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const jwtStrategy = require('./config/jwt');

passport.use(jwtStrategy);

app.use(express.urlencoded({ extended:true }));
app.use(express.json());

app.get('/', (req, res)=>{
  res.send('hello express server');
});

app.get('/login', (req, res)=>{
  console.log('login Route Accessed');
  const { email, password } = req.body;
  console.log(email, password);
  if(email === "paul@site.com")
    if(password === "pass"){
      const opts = {
        expiresIn: 120,
      };
      console.log('Passed Login');
      const secret = 'secret_key';
      const token = jwt.sign({ email }, secret, opts);
      return res.status(200).json({message:'Auth Passed',token});
    }

  return res.status(401).json({message:'Auth Failed'});
});

app.get('/protected',
  (req,res, next)=>{
    console.log('Protected Route Accessing');
    next();
  },
  passport.authenticate('jwt',{ session: false }),
  (req,res, next)=>{
    console.log('Passport Auth passed');
    next();
  },
  (req, res)=>{
    console.log('Authenticated');
    console.log(req.header('Autherization'));
    res.status(200).send('Protected Path accessed');
  }
);

app.listen(3000,()=>console.log('App listening on Port 3000'));
