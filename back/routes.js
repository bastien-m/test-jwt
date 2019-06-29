const lowdb = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const moment = require('moment')

const db = require('./db')

module.exports = (app, passport) => {
 
    app.post('/users/login', async (req, res) => {
        const loginInfo = req.body
        const user = db.get('users').find(u => u.email === loginInfo.email).value()

        if (!user) {
            return res.status(400).json({error: 'Wrong email'});
        }

        try {
            console.log(user)
            console.log(loginInfo.password)
            await bcrypt.compare(user.password, loginInfo.password)
            const payload = {
                _id: user._id,
                iss: 'localhost',
                aud: 'localhost'
            }
            const access_token = jwt.sign(payload, 'my-private-access-key', { expiresIn: 10 })
            const refresh_token = jwt.sign(payload, 'my-private-refresh-key', { expiresIn: '1d' })
            db.get('refresh_token')
                .push({
                    _id: refresh_token,
                    user_id: user._id,
                    row_created: moment().format()
                }).write()
            user.tokens = {
                access_token, refresh_token
            }
            res.json(user)
        } catch (e) {
            console.log(e)
            res.status(400).json({error: 'Wrong password'})
        }
    })

    app.delete('/token/:id', (req, res) => {
        db.get('refresh_token')
            .remove(record => record._id === req.params.id)
            .write()
        res.json({})
    })

    app.get('/token/all', (req, res) => {
        const tokens = db.get('refresh_token').value()
        res.json(tokens)
    })

    app.post('/token/refresh', async (req, res) => {
        const access_token = req.header('Authorization').split("Bearer ")[1]
        const refresh_token = req.body.token
        try {
            await jwt.verify(refresh_token, 'my-private-refresh-key', {
                issuer: 'localhost',
                audience: 'localhost'
            })
        } catch (e) {
            return res.status(401).json({error:'No valid token 0'})
        }

        if(!db.get('refresh_token').find({_id: refresh_token}).value()) {
            return res.status(401).json({
                error: 'You have been kicked out'
            })
        }
        let payload = null
        try {
            payload = await jwt.verify(access_token, 'my-private-access-key', { 
                issuer: 'localhost',
                audience: 'localhost',
                ignoreExpiration: true })
        } catch (e) {
            return res.status(500).json({
                error: 'Bad access key'
            })
        }
        
        const user = db.get('users').find(u => u._id === payload._id).value()
        if (!user) {
            return res.status(401).json({error: 'No user found for this token, weird'})
        }
        const new_access_token_payload = {
            _id: user._id,
            iss: 'localhost',
            aud: 'localhost'
        }
        const new_access_token = jwt.sign(new_access_token_payload, 'my-private-access-key', { expiresIn: 20 })
        return res.json(new_access_token)

    })

    app.get('/users/all', passport.authenticate('jwt', { session: false}), (req, res) => {
        const users = db.get('users').value()
        res.json(users)
    })

}
