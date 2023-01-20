const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
// const { db } = require('../config/config')
const config = require('../config/config')
const db = {}

const sequelize = new Sequelize(
    config.db.database,
    config.db.user,
    config.db.password,
    config.db.options
)
//esta funcion hace que nos traiga los model sin tener que hacer import require por cada uno ellos, es como un script  de automatizacion
fs
.readdirSync(__dirname)
.filter((file) => file !== 'index.js')
.forEach((file) => { 
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
    db[model.name] = model
    // console.log("file", file)
    // console.log("model", model)
})

db.sequelize = sequelize
db.Sequelize = Sequelize
module.exports = db