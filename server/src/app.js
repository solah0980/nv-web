let express = require('express')
let app = express()
let bodyParser = require('body-parser')
const {
    sequelize
} = require('./models')
let cors = require('cors')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(cors())

require('./userPassport')
require('./routes')(app)

let port = 8081

sequelize.sync({
    force: false
}).then(() => {
    app.listen(port, () => console.log('server on ' + port))
})