const app = require('../../app');
const request = require('supertest');
const upsertTestUser = require('../../helpers/createTestUser');

describe('GET api/v1/user', ()=>{
    
    test('should not be allow to get any info from API User without authentication', async() =>{
        const response = await request(app).get('/api/v1/users').send()
        //expect not have access to resources from protected routes without a jwt
        expect(response.statusCode).toBe(401);
        //didnt send  a valid token so  it should return access denied
        expect(response.body).toEqual({ message: 'access denied - no JWT in header' });
    })


})

describe('GET api/v1/users', () => {
    beforeAll(async () => {
        //create the test api user for test
        await upsertTestUser();
    });

    test('should respond with 200 OK with valid JWT', async () => {
        //log in whit test api user and get a jwt
        const loginResponse = await request(app)
            .post('/login')
            .send({
                email: process.env.TEST_USER_EMAIL,
                password: process.env.TEST_USER_PASSWORD
            });

        const token = loginResponse.body.token;

        //make the request using the previus jwt and expect to be ok with at least one user
        const response = await request(app)
            .get('/api/v1/users')
            .set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
        // at least the previus created user should exists
        expect(response.body.length).toBeGreaterThan(0);
        // every object in the response should have name and email properties
        response.body.forEach(user => {
            expect(user).toHaveProperty('name');
            expect(user).toHaveProperty('email');
        });
    });
});