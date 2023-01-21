const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))


function hashPassword (user, options) {
    const SALT_FACTOR = 8
    console.log("haspassword")
    if(!user.change('password')){
        return
    }

    return bcrypt
    .genSaltAsync(SALT_FACTOR)
    .then(salt => bcrypt.hashAsync(user.password, salt, null))
    .then(hash =>{
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
    // name: DataTypes.STRING, 
}
// ,
// {
//     hook:{
//         beforeCreate: hashPassword,
//         beforeUpdate: hashPassword,
//         beforeSave: hashPassword
//     }
// }
)
// User.prototype.comparePassword = function (password) {
//     return bcrypt.compareAsync(password, this.password)
// }

return User
}