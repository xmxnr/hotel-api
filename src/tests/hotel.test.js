require('../models')
const app = require('../app')
const request = require('supertest')

const BASE_URL = '/api/v1/hotels'

const updateHotel = {
    name: "The Grand Palace"
}

let TOKEN
let cityId
let userId
let hotel
let hotelId

beforeAll(async () => {
    const user = await request(app).post('/api/v1/users').send({ 
        firstName: 'Eduardo',
        lastName: 'Manrique',
        email: 'eduardo@gmail.com',
        password: 'hola1234',
        gender: 'male'
    })

    userId = user.body.id
    
    const credentials = {
        email: 'eduardo@gmail.com',
        password: 'hola1234'
    }
    
    
    const resToken = await request(app).post('/api/v1/users/login').send(credentials)

    
    TOKEN = resToken.body.token
    
    const resCity= await request(app).post('/api/v1/cities').send({ 
        name : "México City",
        country: "México",
        countryId: "MX"
    }).set('Authorization', `Bearer ${TOKEN}`)
    
    cityId = resCity.body.id
    
    hotel = {
        name: "The Grand Palace Hotel",
        description: "A luxurious 5-star hotel located in the heart of the city, offering exceptional amenities and stunning city views.",
        price: "250.0",
        rating: "4.8",
        address: "123 Main Street, Cityville",
        lat: "40.7128",
        lon: "-74.0060",
        cityId
    }
})

afterAll(async () => {
    await request(app).delete(`/api/v1/users/${userId}`).set('Authorization', `Bearer ${TOKEN}`);
    
    await request(app).delete(`/api/v1/cities/${cityId}`).set('Authorization', `Bearer ${TOKEN}`);
})

test("POST -> 'BASE_URL', should return status 201, res.body.name === hotel.name and res.body should be defined", async () => {
    const res = await request(app).post(BASE_URL).send(hotel).set('Authorization', `Bearer ${TOKEN}`)

    hotelId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(hotel.name)
})

test("GETALL -> 'BASE_URL' should return status 200, res.body should be defined and it's length === 1", async () => {
    const res = await request(app).get(BASE_URL).set('Authorization', `Bearer ${TOKEN}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
} )

test("GET ONE -> 'BASE_URL/:id' should return status 200, res.body should be defined and res.Id === hotelId", async () => {
    const res = await request(app).get(`${BASE_URL}/${hotelId}`).set('Authorization', `Bearer ${TOKEN}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.id).toBe(hotelId)
    expect(res.body.name).toBe(hotel.name) 
})

test("UPDATE -> 'BASE_URL/:id' should return status 200, res.body should be defined and res.body.name === updateHotel.name", async () => {
    const res = await request(app).put(`${BASE_URL}/${hotelId}`).send(updateHotel).set('Authorization', `Bearer ${TOKEN}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.id).toBe(hotelId)
    expect(res.body.name).toBe(updateHotel.name) 
})

test("DELETE -> 'BASE_URL/:id' should return status 204", async () => {
    const res = await request(app).delete(`${BASE_URL}/${hotelId}`).set('Authorization', `Bearer ${TOKEN}`)

    expect(res.status).toBe(204)
})