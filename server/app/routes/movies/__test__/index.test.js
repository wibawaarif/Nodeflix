import request from 'supertest'
const app = require('./app/app')
describe('Movies Test', function () {

    test('Should return all of movies', () => {
 
        request(app)
            .get('/api/v1/movies')
            .send()
            .expect(200)
            expect(response.body.length).toEqual(1);
    });
});