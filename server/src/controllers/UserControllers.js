const {
    User
} = require('../models')
const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))
module.exports = {
    async index(req, res) {
        try {
            let users = null
            const search = req.query.search
            console.log('---->search = ' + search)

            if (search) {
                users = await User.findAll({
                    where: {
                        $or: ['name', 'lastname', 'email'].map(key => ({
                            [key]: {
                                $like: `%${search}%`
                            }
                        }))
                    },
                    order: [
                        ['createdAt', 'DESC']
                    ]
                })
            } else {
                users = await User.findAll({
                    order: [
                        ['createdAt', 'DESC']
                    ]
                })
            }
            res.send(users)

        } catch (err) {
            res.status(500).send({
                err: 'The users infomation was incorrect'
            })
            console.log(err)
        }
    },

    async create(req, res) {
        try {
            if (req.body.password) {
                req.body.password = bcrypt.hashSync(req.body.password)
            }
            const user = await User.create(req.body)
            res.send(user.toJSON())
        } catch (err) {
            res.status(500).send({
                err: 'User already in system'
            })
        }
    },

    async put(req, res) {
        try {
            if (req.body.password) {
                req.body.password = bcrypt.hashSync(req.body.password)
            }

            await User.update(req.body, {
                where: {
                    id: req.params.userId
                }
            })
            res.send(req.body)
        } catch (err) {
            res.status(500).send({
                err: 'update user incorrect'
            })
            console.log(err)
        }
    },

    async delete(req, res) {
        try {
            const user = await User.findOne({
                where: {
                    id: req.params.userId
                }
            })

            if (!user) {
                return res.status(403).send({
                    err: 'the user infomation incorrect'
                })
            }

            await user.destroy()
            res.send(user)
        } catch (err) {
            res.status(500).send({
                err: 'the user infomation incorrect'
            })
        }
    },

    async show(req, res) {
        try {
            const user = await User.findByPk(req.params.userId)
            res.send(user)
        } catch (error) {
            res.status(500).send({
                error: 'the user show incorrect'
            })
        }
    },

    async getFront(req, res) {
        try {
            console.log('hello')
            const users = await User.findAll()
            let listNames = []

            users.forEach(user => {
                let name = {
                    "id": user.id,
                    "name": `${user.name} ${user.lastname}`
                }
                listNames.push(name)
            })
            res.send(listNames)
        } catch (error) {
            res.status(500).send({
                error: 'The users infomation was incorrect'
            })
        }
    },


}