const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', ()=>{
    beforeEach(async ()=> {
       await connection.migrate.rollback(); //zera antes de comecar o test
       await connection.migrate.latest();
    })
    afterAll(async () => {
        await connection.destroy();
    })
    it('shold be table to crate a new ONG', async ()=> {
        const response = await request(app)
            .post('/ongs')
            .set('Authorization','c6fbfb14') //id de uma ong
            .send({
                name: "APAD3",
                email: "contato@gmail.com",
                whatsapp: "54780000000",
                city: "Sao Paulo",
                uf: "SP"
            });
            expect(response.body).toHaveProperty('id');
            expect(response.body.id).toHaveLength(8);

    })
})