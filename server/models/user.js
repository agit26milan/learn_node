const _ = require('lodash')
const {sign, verify} = require('jsonwebtoken')
const {mongoose} = require('../db/mongoose')
const {isEmail} = require('validator')
const {hash, genSalt, compare} = require('bcrypt')


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim:true,
        minlength: 1,
        unique: true,
        validate: {
            validator: isEmail,
            message: "{VALUE} is not valid"
        }
    },
    password: {
        required: true,
        minlength: 6,
        type: String,
    },
    tokens: [{
        access: {
            type: String,
            required: true 
        },
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.methods.toJSON = function(){
    var user = this;
    var userObject = user.toObject()
    return _.pick(userObject, ['_id', 'email'])
}

userSchema.methods.generateAuthToken = function(){
    var user = this;
    var access = 'auth'
    var token = sign({_id: user._id.toHexString()}, 'abc123').toString()
    user.tokens.push({access, token})
    return user.save().then(() => {
        return token
    })
}

userSchema.statics.findByToken = function(token){
    var User = this
    var decoded;
    try {
        decoded = verify(token, 'abc123')
        console.log('decodes',decoded)
    }catch (e) {
        return Promise.reject()
    }
    return User.findOne({
         '_id': decoded._id,
         'tokens.token': token,
         'tokens.access': 'auth'
    })
}

userSchema.statics.findByCredential = function(email, password){
    // console.log('ola', email, password)
    let User = this;
    return User.findOne({email}).then((user) => {
        if(!user) {
            return Promise.reject()
        }

        return new Promise((resolve, reject) => {
            compare(password, user.password, (err, res) => {
                if(res) {
                    resolve(user)
                } else {
                    reject()
                }
            })
        })
    })
}

userSchema.pre('save', function(next) {
    let User = this;
    if(User.isModified('password')){
        genSalt(10, (err, salt) => {
            hash(User.password, salt, (err, hash) => {
                User.password = hash
                next()
            })
        })
    } else {
        next()
    }
})



const User = mongoose.model('Users', userSchema)

module.exports = {
    User
}