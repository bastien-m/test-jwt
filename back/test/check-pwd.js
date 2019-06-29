const bcrypt = require('bcrypt')

if (process.argv.length !== 3) {
    return console.log('usage node check-pwd <password>')
}

const pwd = process.argv[2]

console.log(bcrypt.compareSync(pwd, '$2b$10$8iZJwS5deu0jGbuMrBpqdODHa.f.x75fFkpErrEmI3j5LarXQH6i.'))


