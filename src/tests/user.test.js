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

test("LOGIN -> 'BASE_URL/login, should return status 200 and res.body should be defined", async () => {
	const res = await request(app).post(`${BASE_URL}/login`).send(credentials);

	TOKEN = res.body.token;

	expect(res.status).toBe(200);
	expect(res.body).toBeDefined();
});

test("GETALL -> 'BASE_URL' should return status 200, res.body should be defined and res.body length has to been 1", async () => {
	const res = await request(app)
		.get(BASE_URL)
		.set('Authorization', `Bearer ${TOKEN}`);

	expect(res.status).toBe(200);
	expect(res.body).toBeDefined();
	expect(res.body).toHaveLength(1);
});

test("GETONE -> 'BASE_URL/:id' should return status 200, res.body should be defined and res.body.firstName === user.firstName", async () => {
	const res = await request(app)
		.get(`${BASE_URL}/${userId}`)
		.set('Authorization', `Bearer ${TOKEN}`);

	expect(res.status).toBe(200);
	expect(res.body).toBeDefined();
	expect(res.body.id).toBe(userId);
});

test("UPDATE -> 'BASE_URL/:id' should return status 200, res.body has to be defined and userUpdate.firstName == res.body.firstName", async () => {
	const userUpdate = {
		firstName: 'Edward',
	};

	const res = await request(app)
		.put(`${BASE_URL}/${userId}`)
		.send(userUpdate)
		.set('Authorization', `Bearer ${TOKEN}`);

	expect(res.status).toBe(200);
	expect(res.body).toBeDefined();
	expect(res.body.firstName).toBe(userUpdate.firstName);
});

test("LOGGED -> 'BASE_URL/me' should return status 200, res.body has to be defined and res.body.firstName === user.firstName", async () => {
	const res = await request(app)
		.get(`${BASE_URL}/me`)
		.set('Authorization', `Bearer ${TOKEN}`);

	expect(res.status).toBe(200);
	expect(res.body).toBeDefined();
	expect(res.body.id).toBe(userId);
});

test("REMOVE -> 'BASE_URL/:id' should return status 204", async () => {
	const res = await request(app)
		.delete(`${BASE_URL}/${userId}`)
		.set('Authorization', `Bearer ${TOKEN}`);

	expect(res.status).toBe(204);
});
