const express = require('express')
const bodyParser = require('body-parser')
const {mongoose} = require('./db/mongoose')
const {User} = require('./models/user')
const {todo} = require('./models/todo')

const app = express()

const port = process.env.PORT || 3000
app.use(bodyParser.json())

app.post('/todo', (req, res) => {
    let doSomething = new todo({
        text: req.body.text,
        completed: req.body.completed,
        completedAt: req.body.completedAt
    })
    doSomething.save().then((doc) => {
        res.send(doc)
    }).catch((e) => {
        res.status(400).send(e)
    })

})

app.listen(port, () => {
    console.log('server 3000')
})