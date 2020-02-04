const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const session = require('express-session')


// PORT init
const PORT = process.env.PORT || 3000

// Embedded JavaScript templates
app.set('view engine', 'ejs')


// Middleware

// parse application/x-www-from-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
app.use(bodyParser.json())

app.use('/assets', express.static('public'))


// routes
app.get('/', (req, res) => {
    res.render('pages/index')
})

// Server PORT listen
app.listen(PORT, () => {
    console.log(`Server is runing in port ${PORT}, http://localhost:${PORT}`)
})