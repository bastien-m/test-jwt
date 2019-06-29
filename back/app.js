const express = require('express')
const app = express()
const { json } = require('body-parser')
const salt = '$2b$10$8iZJwS5deu0jGbuMrBpqdO'
const bcrypt = require('bcrypt')
let passport = require('passport')


const db = require('./db')

passport = require('./auth')(passport)

app.use(json())
app.get('/health', (req, res) => res.json({data: {message: 'ok'}}))

app.use((req, res, next) => {
    const bearer = req.header('authorization')
    const jwt = require('jsonwebtoken')
    if (bearer) {
        console.log(jwt.decode(bearer.split('Bearer ')[1]))
    }
    next()
})

app.use(passport.initialize())

require('./routes')(app, passport)


app.listen(3000, () => console.log('app listening on port 3000'))
