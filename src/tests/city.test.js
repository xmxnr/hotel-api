require('../models')
const app = require('../app')
const request = require('supertest')

const BASE_URL ='/api/v1/cities'

const city = {
    name : "México City",
    country: "México",
    countryId: "MX"
}


let cityId
let user
let TOKEN

beforeAll(async () => {
    user = await request(app).post('/api/v1/users').send({
        firstName: 'Eduardo',
        lastName: 'Manrique',
        email: 'eduardo@gmail.com',
        password: 'hola1234',
        gender: 'male',
    })
    
    const credentials = {
        email: "lalom0412@gmail.com",
        password:  'hola1234'
    }

    const resToken = await request(app).post('/api/v1/users/login').send(credentials)
   

    TOKEN = resToken.body.token
})

afterAll(async () => {
    await request(app).delete(`/api/v1/users/${user.body.id}`)
})

test("POST -> 'BASE_URL', should return status 201 and res.body.name === city.name should be defined", async() => {
    const res = await request(app).post(BASE_URL).send(city).set('Authorization', `Bearer ${TOKEN}`)

    cityId=res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(city.name)
})

test("GETALL -> 'BASE_URL' should return status 200, res.body should be defined and res.body length has to been  1", async () => {
    const res = await request(app).get(BASE_URL).set('Authorization', `Bearer ${TOKEN}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

test("GETONE -> 'BASE_URL/:id' should return status 200, res.body.name should be equal to city.name", async() => {
    const res = await request(app).get(`${BASE_URL}/${cityId}`).set('Authorization', `Bearer ${TOKEN}`)

    expect(res.status).toBe(200)
    expect(res.status).toBeDefined()
    expect(res.body.name).toBe(city.name)
})

test("UPDATE -> 'BASE_URL/:id' should return status 200, res.body.name === cityUpdate.name", async () => {
    const cityUpdate = {
        name: 'State of México'
    }

    const res = await request(app).put(`${BASE_URL}/${cityId}`).send(cityUpdate).set('Authorization', `Bearer ${TOKEN}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(cityUpdate.name)
    expect(res.body.country).toBe(city.country)

})

test("REMOVE -> 'BASE_URL/:id' should return status 204",
async () => {
    const res = await request(app).delete(`${BASE_URL}/${cityId}`).set('Authorization', `Bearer ${TOKEN}`)

    expect(res.status).toBe(204)
}
)




