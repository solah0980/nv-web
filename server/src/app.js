let express = require('express')
let app = express()
let bodyParser = require('body-parser')
const {
    sequelize
} = require('./models')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

require('./routes')(app)

let port = 8081

sequelize.sync({
    force: false
}).then(() => {
    app.listen(port, () => console.log('server on ' + port))
})