
const e = require('express')
const {User} = require('../models')
const config = require('../config/config')
const sqlite3 = require('sqlite3').verbose()
let sql

module.exports = {
     async  getAllUsers(req,res) {   
      console.log("aqui viene por la getAllUsers")
        try {
          // const users = await User.findAll({
          //   // limit: 10
          // })
          const db = new sqlite3.Database("/Users/admin/Desktop/projects/matchMakerBackend/MatchCreatorVueBackend/tabtracker.sqlite", sqlite3.OPEN_READWRITE, (err) => {
            if (err) return console.error(err.message)
          })
          sql = `SELECT * FROM Users`
          db.all(sql, [], (err, users) => {
            if (err) return console.error(err.message)
              res.send(users)
       

          })
          
          } catch (err) {
            console.log("errors", err)
          }
        }
}