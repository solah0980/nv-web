const userController = require('./controllers/UserControllers')
const UserAuthen = require('./controllers/UserAuthenController')
const blogController = require('./controllers/BlogController')
const CommentController = require('./controllers/CommentsController')
const bookController = require('./controllers/BooksController')
const buyController = require('./controllers/BuyController')
const Authen = require('./authen/isAuthenController')



module.exports = (app) => {
    let multer = require('multer')

    //Api controller User
    app.get('/users', userController.index)
    app.get('/user/:userId', userController.show)
    app.post('/user', userController.create)
    app.put('/user/:userId', userController.put)
    app.delete('/user/:userId', Authen, userController.delete)
    //Api get userFront
    app.get('/users/front', Authen, userController.getFront)

    //Api controller Blog
    app.post('/blog', blogController.create)
    app.get('/blog/:blogId', blogController.Show)
    app.get('/blogs', Authen, blogController.index)
    app.get('/blogs/front', blogController.frontIndex)
    app.put('/blog/:blogId', Authen, blogController.Put)
    app.delete('/blog/:blogId', Authen, blogController.remove)

    //Api controller Authen
    app.post('/login', UserAuthen.login)
    app.post('/front/login', UserAuthen.clientLogin)

    //Api controller comment
    app.get('/comments', CommentController.index)
    app.post('/comment', CommentController.create)
    app.put('/comment/:commentId', CommentController.put)
    app.get('/comment/:commentId', CommentController.show)
    app.delete('/comment/:commentId', CommentController.delete)
    //get comment by id
    app.get('/comment/blog/:blogId', CommentController.blog)
    //get comment by id
    app.get('/comment/user/:userId', CommentController.user)

    // Api controller book
    app.get('/books', bookController.index)
    app.get('/books/front', bookController.getFront)
    app.post('/book', bookController.create)
    app.put('/book/:bookId', bookController.put)
    app.get('/book/:bookId', bookController.show)
    app.delete('/book/:bookId', bookController.delete)

    //Api get cartlist user


    //Api controller buy
    app.get('/buys', buyController.index)
    app.get('/buy/:buyId', buyController.user)
    app.put('/buy/:buyId', buyController.put)
    app.post('/buy', buyController.create)

    //Api upload photo
    app.post('/upload', Authen, function (req, res) {
        upload(req, res, function (err) {
            if (err) {
                return res.send('Error uploading file.')
            }
            res.send('file is uploaded')
        })
    })

    //Api Delete file photo
    app.post('/upload/delete',
        async function (req, res) {
            try {
                const fs = require('fs');

                console.log(req.body.filename)
                fs.unlink(process.cwd() + '/public/uploads/' + req.body.filename, (err) => {
                    if (err) throw err;
                    res.send("Delete sucessful")
                    // console.log('successfully deleted material file');
                });
            } catch (err) {
                res.status(500).send({
                    error: 'An error has occured trying to delete file the material'
                })
            }
        }
    )

    //upload section
    let storage = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, "./public/uploads")
        },
        filename: function (req, file, callback) {
            console.log(file)
            callback(null, file.originalname)
        }
    })
    let upload = multer({
        storage: storage
    }).array("userPhoto", 10)
}