const {
    Book
} = require('../models')

module.exports = {
    async index(req, res) {
        try {
            let books = null
            const search = req.query.search
            console.log('---->search = ' + search)

            if (search) {
                books = await Book.findAll({
                    where: {
                        $or: ['title', 'content', 'category'].map(key => ({
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
                books = await Book.findAll({
                    order: [
                        ['createdAt', 'DESC']
                    ]
                })
            }
            res.send(books)

        } catch (err) {
            res.status(500).send({
                err: 'The users infomation was incorrect'
            })
            console.log(err)
        }
    },

    async create(req, res) {
        try {
            const books = await Book.create(req.body)
            res.send(books.toJSON())
        } catch (err) {
            res.status(500).send({
                err: 'User already in system'
            })
        }
    },

    async put(req, res) {
        try {
            await Book.update(req.body, {
                where: {
                    id: req.params.bookId
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
            const book = await Book.findOne({
                where: {
                    id: req.params.userId
                }
            })

            if (!book) {
                return res.status(403).send({
                    err: 'the user infomation incorrect'
                })
            }

            await book.destroy()
            res.send(user)
        } catch (err) {
            res.status(500).send({
                err: 'the user infomation incorrect'
            })
        }
    },

    async show(req, res) {
        try {
            const book = await Book.findByPk(req.params.bookId)
            res.send(book)
        } catch (error) {
            res.status(500).send({
                error: 'the user show incorrect'
            })
        }
    },

    async getFront(req, res) {
        try {
            let books = null
            const search = req.query.search
            console.log('---->search = ' + search)

            if (search) {
                books = await Book.findAll({
                    where: {
                        $or: ['title', 'content', 'category'].map(key => ({
                            [key]: {
                                $like: `%${search}%`
                            }
                        })),
                        $and: [{
                            status: {
                                $eq: 'published'
                            }
                        }]
                    },
                    order: [
                        ['createdAt', 'DESC']
                    ]
                })
            } else {
                books = await Book.findAll({
                    where: {
                        status: 'published'
                    },
                    order: [
                        ['createdAt', 'DESC']
                    ]
                })
            }
            res.send(books)

        } catch (err) {
            res.status(500).send({
                err: 'The users infomation was incorrect'
            })
            console.log(err)
        }
    },


}