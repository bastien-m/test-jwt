const bcrypt = require('bcrypt')
const args = process.argv

if (args.length !== 3) {
    return 'usage "node generate-pwd <your-password>"'
}

async function generate(password) {
    const salt = await bcrypt.genSalt(10)
    console.log(salt)
    const hashedPwd = await bcrypt.hash(password, salt)
    return hashedPwd
}

const pwd = args[2]

generate(pwd)
    .then(hashed => {
        console.log(hashed)
    })

