const {ObjectID} = require('mongodb')
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

app.get('/todo',(req, res) => {
    todo.find().then((todos) =>{ 
        res.send({todos})
    }).catch(e => {
        res.status(400).send(e)
    })
})

app.get('/todo/:id', (req, res) => {
    const id = req.params.id
    if(!ObjectID.isValid(id)) {
        return res.status(404).send()
    }
    todo.findById(id).then((todos) => {
        if(!todos) {
            return res.status(404).send()
        }
        res.send(todos)
    }).catch((e) => {
        res.status(400).send({})
    })
})

app.listen(port, () => {
    console.log(`running server: ${port}`)
})

module.exports = {app}