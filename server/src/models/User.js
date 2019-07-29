const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))


module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        password: DataTypes.STRING,
        name: DataTypes.STRING,
        lastname: DataTypes.STRING,
        status: DataTypes.STRING,
        type: DataTypes.STRING
    }, {

    })

    User.prototype.comparePassword = function (password) {
        return bcrypt.compareSync(password, this.password)
    }
    User.associate = function (models) {}

    return User
}