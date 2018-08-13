const {MongoClient, ObjectID} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err) {return console.log}
    client.db('TodoApp').collection('Users').deleteMany({name: "Agita"}).then(res => {
        console.log(res)
    })
    // client.db('TodoApp').collection('Todos').deleteOne({todo: "Eat Lunch"}).then(res => {
    //     console.log('res', res)
    // })

    // client.db('TodoApp').collection('Todos').findOneAndDelete({completed: false}).then(res => {
    //     console.log(res)
    // })
})