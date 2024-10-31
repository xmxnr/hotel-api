require('../models')
const app = require('../app')
const request = require('supertest')

const BASE_URL = '/api/v1/images'

let userId
let hotelId
let image
let imageId

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
    
    const hotel = await request(app).post('/api/v1/hotels').send({
        name: "The Grand Palace Hotel",
        description: "A luxurious 5-star hotel located in the heart of the city, offering exceptional amenities and stunning city views.",
        price: "250.0",
        rating: "4.8",
        address: "123 Main Street, Cityville",
        lat: "40.7128",
        lon: "-74.0060",
        cityId
    }).set('Authorization', `Bearer ${TOKEN}`)

    hotelId = hotel.body.id

    image = {
        url: "https://example.com/image.jpg",
        hotelId
    }
})

afterAll(async () => {
    await request(app).delete(`/api/v1/users/${userId}`).set('Authorization', `Bearer ${TOKEN}`);
    
    await request(app).delete(`/api/v1/cities/${cityId}`).set('Authorization', `Bearer ${TOKEN}`);

    await request(app).delete(`/api/v1/hotels/${hotelId}`).set('Authorization', `Bearer ${TOKEN}`);
})

test("POST -> 'BASE_URL', should return status 201, res.body.url === image.url", async () => {
    const res = await request(app).post(BASE_URL).send(image)

    imageId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
})

test("GETALL -> 'BASE_URL', should return status 200 and res.body.id === imageId.id", async () => {
    const res = await request(app).get(BASE_URL)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.id).toBe(imageId.id)
})

test("GETONE -> 'BASE_URL/:id', should return status 200 and res.body.id === imageId", async () => {
    const res = await request(app).get(`${BASE_URL}/${imageId}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.id).toBe(imageId)
})

test("PUT -> 'BASE_URL/:id', should return status 200, res.body.url === updateImage.url and res.body have to be defined", async () => {
    const imageUpdate = {
        url: "https://example1.com/image.jpg",
    }

    const res = await request(app).put(`${BASE_URL}/${imageId}`).send(imageUpdate)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.url).toBe(imageUpdate.url)
})

test("DELETE -> 'BASE_URL/:id', should return status 204",
    async () => {
     const res = await request(app).delete(`${BASE_URL}/${imageId}`)

     expect(res.status).toBe(204)
    }
)