const {genSalt, hash} = require('bcrypt')

var password = 'abc123'

genSalt(10, (err, salt) => {
    hash(password, salt, (err, hash) => {
        console.log('hash', hash)
    })
})