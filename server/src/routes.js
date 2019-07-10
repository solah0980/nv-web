const userController = require('./controllers/UserControllers')

module.exports = (app) => {
    app.get('/users', userController.index)

    app.get('/user/:userId', userController.show)

    app.post('/user', userController.create)

    app.put('/user/:userId', userController.put)

    app.delete('/user/:userId', userController.delete)





}