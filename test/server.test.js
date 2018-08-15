const expect = require('expect')
const request = require('supertest')
const {app} = require('../server/server')
const {todo} = require('../server/models/todo')
const {User} = require('../server/models/user')

beforeEach((done) =>{
    todo.remove({}).then(() =>{
        done()
    })
})

describe("POST TODOD", () => {
    it("Should create", (done) => {
        var text = "Test String"
        request(app).post('/todo').send({text}).expect(200).expect((res) => {
            expect(res.body.text).toBe(text)
        }).end((err, res) => {
            if(err) {
                return done(err)
            }
            todo.find().then((todos) => {
                expect(todos.length).toBe(1)
                expect(todos[0].text).toBe(text)
                done()
            })
        })
    })
    it("should be 400", (done) => {
        var text = {}
        request(app).post('/todo').send(text).expect(400).end((err, res) => {
            if(err) {
                return done()
            }
            todo.find().then((todos) => {
                expect(todos.length).toBe(0)
                done()
            })

        })
    })
})