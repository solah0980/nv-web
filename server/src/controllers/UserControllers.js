const {
    User
} = require('../models')

module.exports = {
    async index(req, res) {
        try {
            const users = await User.findAll()
            res.send(users)
        } catch (err) {
            res.status(500).send({
                err: 'The users infomation was incorrect'
            })
        }
    },

    async create(req, res) {
        try {
            const user = await User.create(req.body)
            res.send(user.toJSON())
        } catch (err) {
            res.status(500).send({
                err: 'Create user incorrect'
            })
        }
    },

    async put(req, res) {
        try {
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
    }

}