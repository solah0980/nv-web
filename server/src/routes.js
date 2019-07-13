const userController = require('./controllers/UserControllers')
const UserAuthen = require('./controllers/UserAuthenController')
const blogController = require('./controllers/BlogController')
const Authen = require('./authen/isAuthenController')


module.exports = (app) => {
    app.get('/users', Authen, userController.index)
    app.get('/user/:userId', userController.show)
    app.post('/user', userController.create)
    app.put('/user/:userId', userController.put)
    app.delete('/user/:userId', userController.delete)

    app.post('/blog', blogController.create)
    app.get('/blog/:blogId', blogController.Show)
    app.get('/blogs', blogController.index)
    app.put('/blog/:blogId', blogController.Put)
    app.delete('/blog/:blogId', blogController.remove)


    app.post('/login', UserAuthen.login)
}