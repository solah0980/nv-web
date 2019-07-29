const {
    Blog
} = require('../models')

module.exports = {
    async index(req, res) {
        try {
            let blogs = null
            const search = req.query.search
            console.log('---->search = ' + search)

            if (search) {
                blogs = await Blog.findAll({
                    where: {
                        $or: [
                            'title', 'content', 'category'
                        ].map(key => ({
                            [key]: {
                                $like: `%${search}%`,
                            }
                        })),
                    },
                    order: [
                        ['createdAt', 'DESC']
                    ]
                })
            } else {
                blogs = await Blog.findAll({
                    order: [
                        ['createdAt', 'DESC']
                    ]
                })
            }
            res.send(blogs)
        } catch (err) {
            res.status(500).send({
                error: 'an error has occured trying to fetch the blogs'
            })
        }
    },

    async create(req, res) {
        try {
            let blog = await Blog.create(req.body)
            res.send(blog.toJSON())
        } catch (error) {
            res.status(500).send({
                error: 'The Blog create was incorret'
            })
        }
    },

    async Put(req, res) {
        try {
            await Blog.update(req.body, {
                where: {
                    id: req.params.blogId
                }
            })
            res.send(req.body)
        } catch (error) {
            res.status(500).send({
                error: 'The update blog was incorret'
            })
        }
    },
    async remove(req, res) {
        try {
            let blog = await Blog.findOne({
                where: {
                    id: req.params.blogId
                }
            })
            if (!blog) {
                return res.status(403).send({
                    error: 'The blog infomation was incorret'
                })
            }
            await blog.destroy()
            res.send(blog)
        } catch (error) {
            res.status(500).send({
                error: 'The blog infomation was icorrect'
            })
        }
    },
    async Show(req, res) {
        try {
            let blog = await Blog.findByPk(req.params.blogId)
            res.send(blog)
        } catch (error) {
            res.status(500).send({
                error: 'The infomation was incorrect'
            })
        }
    },

    async frontIndex(req, res) {
        try {
            let blogs = null
            const search = req.query.search
            console.log('----------> search key: ' + search)

            if (search) {
                blogs = await Blog.findAll({
                    where: {
                        $or: [
                            'title', 'content', 'category'
                        ].map(key => ({
                            [key]: {
                                $like: `%${search}%`,
                            }
                        })),
                        $and: [{
                            status: {
                                $eq: "published"
                            }
                        }, ]
                    },
                    order: [
                        ['createdAt', 'DESC']
                    ]
                })
            } else {
                blogs = await Blog.findAll({
                    where: {
                        'status': 'published'
                    },
                    order: [
                        ['createdAt', 'DESC']
                    ]
                })
            }
            res.send(blogs)
        } catch (err) {
            res.status(500).send({
                error: 'an error has occured trying to fetch the blogs'
            })
        }
    },


}