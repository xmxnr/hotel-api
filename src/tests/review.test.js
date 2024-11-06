require('../models')
const app = require('../app')
const request = require('supertest')

let TOKEN
let hotelId
let review
let reviewId
let userId
let cityId
const BASE_URL = '/api/v1/reviews'

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
        password: 'hola1234',
    }

    const resToken = await request(app).post('/api/v1/users/login').send(credentials)

    TOKEN = resToken.body.token
    const city = await request(app).post('/api/v1/cities').send({
        name : "México City",
        country: "México",
        countryId: "MX"
    }).set('Authorization', `Bearer ${TOKEN}`)

    cityId = city.body.id

    const hotel = await request(app).post('/api/v1/hotels').send( {name: "The Grand Palace Hotel",
        description: "A luxurious 5-star hotel located in the heart of the city, offering exceptional amenities and stunning city views.",
        price: "250.0",
        rating: "4.8",
        address: "123 Main Street, Cityville",
        lat: "40.7128",
        lon: "-74.0060",
        cityId}).set('Authorization', `Bearer ${TOKEN}`)

    hotelId = hotel.body.id

    review = {
        rating: 4.5,
        comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dapibus, massa posuere condimentum maximus, lorem eros finibus nisi, vel maximus.",
        hotelId
    }
})

afterAll(async () => {
    await request(app).delete(`/api/v1/users/${userId}`).set('Authorization', `Bearer ${TOKEN}`)
    
    await request(app).delete(`/api/v1/hotels/${hotelId}`).set('Authorization', `Bearer ${TOKEN}`)

    await request(app).delete(`/api/v1/cities/${cityId}`).set('Authorization', `Bearer ${TOKEN}`)
})

test("POST -> 'BASE_URL' should return status 201 and res.body.comment === review.comment", async () => {
    const res = await request(app).post(BASE_URL).send(review)

    reviewId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.comment).toBe(review.comment)
})

test("GETALL -> 'BASE_URL' should return status 200, res.body has to be defined and it's length has to be 1", async () => {
    const res = await request(app).get(BASE_URL)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

test("GETONE -> 'BASE_URL/:id' should return status 200, res.body has to be defined and res.body.id === reviewId", async () => {
    const res = await request(app).get(`${BASE_URL}/${reviewId}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.id).toBe(reviewId)
})

test("UPDATE -> 'BASE_URL/:id' should return status 200, res.body has to be defined and, res.body.comment === updateReview.comment", async () => {
    const updateComment = {
        comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    }
        
    const res = await request(app).put(`${BASE_URL}/${reviewId}`).send(updateComment)
    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.comment).toBe(updateComment.comment)
})