const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))
// const bcrypt = require('bcrypt')

function hashPassword (user, options) {
  const SALT_FACTOR = 8

  if (!user.changed('password')) {
    return
  }

  return bcrypt
    .genSaltAsync(SALT_FACTOR)
    .then(salt => bcrypt.hashAsync(user.password, salt, null))
    .then(hash => {
      user.setDataValue('password', hash)
    })
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
    name: DataTypes.STRING

  }, {
    hooks: {
      beforeCreate: hashPassword,
      beforeUpdate: hashPassword,
      beforeSave: hashPassword
    }
  })
console.log("justo antes de la duncion que parece que no se llama")
  User.prototype.comparePassword = function (password) {
    console.log("this.password!!!", this.password)
    console.log("password", password)
    console.log("el return dice", !bcrypt.compareSync(password, this.password))
    return !bcrypt.compareSync(password, this.password)
  }


  return User
}