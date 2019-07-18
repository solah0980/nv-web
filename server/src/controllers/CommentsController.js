const {
    Comment
} = require('../models')

module.exports = {
    async blog(req, res) {
        try {
            console.log(req.params.blogId)
            const comment = await Comment.findAll({
                where: {
                    blogId: req.params.blogId
                },
                order: [['updatedAt','DESC']]
            })
            console.log(comment)
            res.send(comment)
        } catch (error) {
            res.status(500).send({
                error: 'The Comment infomation was incorrect'
            })
        }
    },

    async user(req, res) {
        try {
            const comment = await Comment.findAll({
                where: {
                    userId: req.params.userId
                },
                order: [
                    ['updatedAt'],
                    ['DESC']
                ]
            })

            res.send(comment)
        } catch (error) {
            res.status(500).send({
                error: 'The Comment infomation was incorrect'
            })
        }
    },

    async index(req, res) {
        try {
            const comment = await Comment.findAll()
            res.send(comment)
        } catch (error) {
            res.status(500).send({
                error: 'an error has occured trying to fetch the comments'
            })
        }
    },

    async create(req, res) {
        try {
            const comment = await Comment.create(req.body)
            res.send(comment.toJSON())
        } catch (error) {
            res.status(500).send({
                error: 'Create comment error'
            })
        }
    },

    async put(req, res) {
        try {
            await Comment.update(req.body, {
                where: {
                    id: req.params.commentId
                }
            })
            res.send(req.body)
        } catch (error) {
            res.status(500).send({
                error: 'Update Comment Error'
            })
        }
    },

    async show(req, res) {
        try {
            const comment = await Comment.findByPk(req.params.commentId)
            res.send(comment)
        } catch (error) {
            res.status(500).send({
                error: 'Show Comment Error'
            })
        }
    },

    async delete(req, res) {
        try {
            const comment = await Comment.findOne({
                where: {
                    id: req.params.commentId
                }
            })

            await comment.destroy()
            res.send(comment)
        } catch (error) {
            res.sttus(500).send({
                error: 'delete comment error'
            })
        }
    }
}