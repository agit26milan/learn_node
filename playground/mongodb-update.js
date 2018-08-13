const {MongoClient, ObjectID} = require('mongodb')


MongoClient.connect('mongodb://localhost:27017/TodoApp', (e, client) => {
    if(e) {
        return console.log(e)
    }
    console.log("Connected")
    // client.db('TodoApp').collection('Todos').findOneAndUpdate({_id: new ObjectID('5b6f810317a7d674258d7e3b')}, {
    //     $set: {
    //         completed: false
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((res) => {
    //     console.log(res)
    // })
    client.db('TodoApp').collection('Users').findOneAndUpdate({_id: new ObjectID('5b7176f618744fb55f7ce38f')}, {
        $set: {
            name: "Boruto"
        },
        $inc: {
            age: 1
        }
    }, {
        returnOriginal: false
    }).then((res) => {
        console.log(res)
    })
} )