require('../models');
const app = require('../app');
const request = require('supertest');

const BASE_URL = '/api/v1/users';

const user = {
	firstName: 'Eduardo',
	lastName: 'Manrique',
	email: 'eduardo@gmail.com',
	password: 'hola1234',
	gender: 'male',
};

const credentials = {
	email: 'eduardo@gmail.com',
	password: 'hola1234',
};

let TOKEN;
let userId;

test("POST -> 'BASE_URL', should return status 201 and res.body.firstName === user.firstName", async () => {
	const res = await request(app).post(BASE_URL).send(user);

	userId = res.body.id;

	expect(res.status).toBe(201);
	expect(res.body).toBeDefined();
	expect(res.body.firstName).toBe(user.firstName);
});
