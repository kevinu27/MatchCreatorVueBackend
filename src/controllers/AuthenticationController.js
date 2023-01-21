
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
        try{
            const user = await User.create(req.body)
            res.send(user.toJSON())
        } catch(err) {
            res.status(400).send({
                error: 'this email account is already in use'
            })
        }    
    },
    async login (req, res) {
        try{
            const {email, password} = req.body
            console.log("email", email)
            console.log("password", password)
            const user = await User.findOne({
                where: {
                    email: email
                }}
            )
            if (!user)  {
                return res.status(403).send({
                    error: 'the login information is incorrect'
                })
            }

            const isPasswordValid = await user.comparePassword(password)
            // const isPasswordValid = password === user.password
            
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