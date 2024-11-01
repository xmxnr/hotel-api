require('../models')
const request = require('supertest')
const app = require('../app')

let user
let TOKEN
let hotel
let hotelId
let booking
let bookingId
let cityId

const BASE_URL = '/api/v1/bookings'

beforeAll(async () => {
  user = await request(app).post('/api/v1/users').send({
        firstName: 'Eduardo',
        lastName: 'Manrique',
        email: 'eduardo@gmail.com',
        password: 'hola1234',
        gender: 'male',
    })

  const credentials = {
        email: "eduardo@gmail.com",
        password:  'hola1234'
  }

  const resToken = await request(app)
    .post('/api/v1/users/login')
    .send(credentials)

  TOKEN = resToken.body.token

  const resCity= await request(app).post('/api/v1/cities').send({ 
    name : "México City",
    country: "México",
    countryId: "MX"
    }).set('Authorization', `Bearer ${TOKEN}`)

    cityId = resCity.body.id

  hotel = await request(app)
    .post('/api/v1/hotels')
    .send({
      name: "The Grand Palace Hotel",
      description: "A luxurious 5-star hotel located in the heart of the city, offering exceptional amenities and stunning city views.",
      price: "250.0",
      rating: "4.8",
      address: "123 Main Street, Cityville",
      lat: "40.7128",
      lon: "-74.0060",
      cityId
    })
    .set('Authorization', `Bearer ${TOKEN}`)

    hotelId = hotel.body.id

    booking = {
        checkIn: "2024-10-19",
        checkOut: "2024-10-24",
        hotelId: hotel.body.id
    }

})

afterAll(async () => {
    await request(app).delete(`/api/v1/users/${user.body.id}`).set('Authorization', `Bearer ${TOKEN}`)
    
    await request(app).delete(`/api/v1/cities/${cityId}`).set('Authorization', `Bearer ${TOKEN}`)
  
    await request(app).delete(`/api/v1/hotels/${hotelId}`).set('Authorization', `Bearer ${TOKEN}`)

})

test("POST -> 'BASE_URL', should return status code 201, and res.body.name === city.name", async () => {

  const res = await request(app).post(BASE_URL).send(booking)
   
  bookingId = res.body.id

  expect(res.status).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.checkIn).toBe(booking.checkIn)
})

test("GETALL -> 'BASE_URL', should return status code 200, res.body have to be defined, res.body.checkIn === booking.checkIn", async () => {
    const res = await request(app).get(BASE_URL)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body[0].checkIn).toBe(booking.checkIn)
})

test("GETONE -> 'BASE_URL/:id' should return status code 200, res.body have to be defined, res.body.id === bookingId", async () => {
    const res = await request(app).get(`${BASE_URL}/${bookingId}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.id).toBe(bookingId)
})

test("UPDATE -> 'BASE_URL/:id' should return status code 200, res.body have to be defined, res.body.id === bookingId and res.body.checkIn === bookingUpdate.checkIn", async () => {
    const bookingUpdate = {
        checkIn: "2024-10-20"
    } 

    const res = await request(app).put(`${BASE_URL}/${bookingId}`).send(bookingUpdate)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.checkIn).toBe(bookingUpdate.checkIn)
})


test("REMOVE -> 'BASE_URL/:id' should return status 204",async () => {
 
const res=await request(app).delete(`${BASE_URL}/${bookingId}`)

expect(res.status).toBe(204)   
}
)

