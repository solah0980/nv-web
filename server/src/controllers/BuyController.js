const {
    Buy
} = require('../models')

module.exports = {
    async index(req, res) {
        try {
            let buys = await Buy.findAll({
                order: [
                    ['createdAt', 'DESC']
                ]
            })
            res.send(buys)

        } catch (err) {
            res.status(500).send({
                err: 'The users infomation was incorrect'
            })
            console.log(err)
        }
    },

    async user(req, res) {
        try {
            let buyId = req.params.buyId

            let buys = await Buy.findAll({
                where: {
                    userid: buyId
                },
                order: [
                    ['createdAt', 'DESC']
                ]
            })
            res.send(buys)
        } catch (error) {
            res.status(500).send({
                error: 'get buy error'
            })
            console.log(error)
        }

    },

    async create(req, res) {
        try {
            console.log(req.body)
            const buy = await Buy.create(req.body)
            res.send(buy.toJSON())
        } catch (err) {
            res.status(500).send({
                error: 'Create buy incorrect'
            })
            console.log(err)
        }
    },

    async put(req, res) {
        try {
            await Buy.update(req.body, {
                where: {
                    id: req.params.buyId
                }
            })
            res.send(req.body)
        } catch (err) {
            res.status(500).send({
                err: 'update user incorrect'
            })
        }
    },


}