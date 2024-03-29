
const e = require('express')
const {User} = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignUser (user) {
    const ONE_WEEK = 60*60*24*7
    return jwt.sign(user, config.authentication.jwtSecret, {
        expiresIn: ONE_WEEK
    })
}

module.exports = {
     async  register(req,res) {   
        try {
            // const user = await User.create(req.body)
            // const userJson = user.toJSON()
            // res.send({
            //   user: userJson,
            //   token: jwtSignUser(userJson)
            // })
            const { email, password, username } = req.body;
            console.log('register...', req.body)
            console.log('dd')
            const salt = bcrypt.genSaltSync(10);
            console.log('salt', salt)
            const hashedPassword = bcrypt.hashSync(password, salt);
            console.log('email', req.body)
            const sql = `INSERT INTO users (email, password, name) VALUES (email, password, username )`;
            const values = [email, hashedPassword, username];
            connection.query(sql, values, (err, result) => {
              if (err) {
                  console.error('Error registering user: ', err);
                  res.status(500).send('Error registering user.');
                  return;
              }
              console.log('User registered.');
              res.send('User registered.');
          });
          } catch (err) {
            res.status(400).send({
              error: 'This email account is already in use.'
            })
          }
        },
        async login (req, res) {
            try {
              const {email, password} = req.body
              const user = await User.findOne({
                where: {
                  email: email
                }
              })
        
              if (!user) {
                return res.status(403).send({
                  error: 'The login information was incorrect'
                })
              }
              console.log("password", password)
              console.log("user.password", user.password)

            const isPasswordValid = user.comparePassword(password)
            // const isPasswordValid = password === user.password
              console.log("isPasswordValid", isPasswordValid)

            if(!isPasswordValid) {
                console.log("invalid password")
                return res.status(403).send({
                    error: 'the login information is incorrect',
                    hola: 'hola'
                })
            }

            const userJson = user.toJSON()
            res.send({
                user: userJson,
                token: jwtSignUser(userJson),
                hola: 'hola'
            })
        } catch(err) {
            res.status(500).send({
                error: 'An error ocurred trying to login'
            })
        }    
    }
}