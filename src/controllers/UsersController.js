
const e = require('express')
const {User} = require('../models')
const config = require('../config/config')

module.exports = {
     async  getAllUsers(req,res) {   
      console.log("aqui viene por la getAllUsers")
        try {
          const users = await User.findAll({
            // limit: 10
          })
          res.send(users)
          } catch (err) {
            console.log("errors", err)
          }
        }
}