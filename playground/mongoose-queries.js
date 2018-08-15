const {mongoose} = require('../server/db/mongoose')
const {todo} = require('../server/models/todo')
const {User} = require('../server/models/user')

var id = '5b71a5e589fe9206e1004c4c'

// todo.find({
//     _id: id
// }).then((res) => {
//     console.log('todos', res)
// })

// todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('todo', todo)
// })

// todo.findById(id).then(todo => {
//     console.log('findId', todo)
// })

User.findById(id).then((user) => {
    console.log('find id', user )
}).catch((e) => {
    console.log(e)
})