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

app.use(session({
    secret: 'test',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

app.use('/assets', express.static('public'))

app.use(require('./middlewares/flash'))

// routes
app.get('/', (req, res) => {
    // get All messages
    const Message = require('./models/message')
    Message.all ((messages) => {
        res.render('pages/index', {messages: messages})
    })
    // res.render('pages/index')
})

app.post('/', (req, res) => {
    if (req.body.message === undefined || req.body.message === '') {
        req.flash('error', "Vous n'avez pas posté de message :(")
        res.redirect('/')
    } else {
        // add message to db
        const Message = require('./models/message')
        Message.create(req.body.message, () => {
            req.flash('success', "Merci :)")
            res.redirect('/')
        })
    }
})

// Server PORT listen
app.listen(PORT, () => {
    console.log(`Server is runing in port ${PORT}, http://localhost:${PORT}`)
})