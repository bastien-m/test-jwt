const jwt = require('jsonwebtoken')

const payload = {
    _id: 1,
    iss: 'localhost',
    aud: 'localhost'
}

console.log(jwt.sign(payload, 'my-private-key', { expiresIn: 20 }))
