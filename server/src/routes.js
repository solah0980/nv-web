const userController = require('./controllers/UserControllers')
const UserAuthen = require('./controllers/UserAuthenController')
const blogController = require('./controllers/BlogController')
const CommentController = require('./controllers/CommentsController')
const Authen = require('./authen/isAuthenController')



module.exports = (app) => {
    let multer = require('multer')

    //Api controller User
    app.get('/users', userController.index)
    app.get('/user/:userId', userController.show)
    app.post('/user', userController.create)
    app.put('/user/:userId', userController.put)
    app.delete('/user/:userId', userController.delete)
    //Api get userFront
    app.get('/user/front', userController.getFront)

    //Api controller Blog
    app.post('/blog', blogController.create)
    app.get('/blog/:blogId', blogController.Show)
    app.get('/blogs', blogController.index)
    app.put('/blog/:blogId', blogController.Put)
    app.delete('/blog/:blogId', blogController.remove)
    //Api controller Authen
    app.post('/login', UserAuthen.login)
    app.post('/front/login', UserAuthen.clientLogin)

    //Api controller comment
    app.get('/comments', CommentController.index)
    app.post('/comment', CommentController.create)
    app.put('/comment/edit/:commentId', CommentController.put)
    app.get('/comment/:commentId', CommentController.show)
    app.delete('/comment/:commentId', CommentController.delete)
    //get comment by id
    app.get('/comment/blog/:blogId', CommentController.blog)
    //get comment by id
    app.get('/comment/user/:userId', CommentController.user)

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