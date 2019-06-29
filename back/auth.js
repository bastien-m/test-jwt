const  { Strategy, ExtractJwt } = require('passport-jwt')

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'my-private-access-key',
    issuer: 'localhost',
    audience: "localhost"
}

const db = require('./db')

module.exports = (passport) => {

    passport.use(new Strategy(opts,
        (jwtPayload, done) => {
            const user = db.get('users')
                .find(u => u.id === jwtPayload._id)
            if (user) {
                return done(null, user)
            }
            return done(null, false)
        }))

    return passport

}




