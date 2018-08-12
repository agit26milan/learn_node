const {MongoClient, ObjectID} = require('mongodb')

MongoClient.connect("mongodb://localhost:27017/TodoApp", (e, client) => {
    if(e) {return console.log(e)}
    console.log("Connect to server")
    // client.db('TodoApp').collection('Todos').find({_id: new ObjectID("5b6f80e517a7d674258d7e2e")}).toArray().then((data) => {
    //     console.log(data)
    // }).catch((e) => console.log(e))
    client.db('TodoApp').collection('Todos').find().count().then((count) => {
        console.log(count)
    }).catch((e) => console.log(e))
    // client.close()
})