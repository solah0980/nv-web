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
app.use('/assets', express.static('public'))

require('./userPassport')
require('./routes')(app)

let port = Process.env.PORT || 8081

sequelize.sync({
    force: false
}).then(() => {
    app.listen(port, () => console.log('server on ' + port))
})