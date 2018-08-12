const {MongoClient, ObjectID} = require('mongodb')
let obj = new ObjectID()

MongoClient.connect('mongodb://localhost:27017/TodoApp', (e, client) => {
    if(e) console.log('Unable to connect DB server')
    else console.log("Connect to DB")
    client.db('TodoApp').collection('Users').insertOne({
        name: "Agita",
        age: 27
    }, (err, res) => {
        if(err) console.log(err)
        else console.log(res.ops[0]._id.getTimestamp())
    })
    client.close()
}) 