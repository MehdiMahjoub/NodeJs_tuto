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


// routes
app.get('/', (req, res) => {
    if (req.session.error) {
        res.locals.error = req.session.error
        req.session.error = undefined
    } else if (req.session.success) {
        res.locals.success = req.session.success
        req.session.success = undefined
    }
    res.render('pages/index')
})

app.post('/', (req, res) => {
    if (req.body.message === undefined || req.body.message === '') {
        req.session.error = "il y a une erreur le formulaire est vide :("
        res.redirect('/')
    } else {
        req.session.success = "Merci :)"
        res.redirect('/')
    }
})

// Server PORT listen
app.listen(PORT, () => {
    console.log(`Server is runing in port ${PORT}, http://localhost:${PORT}`)
})