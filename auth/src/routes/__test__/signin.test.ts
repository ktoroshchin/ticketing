import request from 'supertest'
import { app } from '../../app'

it('fails when email that does not exist is supplied', async () => {
    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: 'testtest'
        })
        .expect(400)
})

it('fails when incorrect password is supplied', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'testtest'
        })
        .expect(201)

    return request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: 'testtes'
        })
        .expect(400)
})

it('responds with a cookie when given valid credentials', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'testtest'
        })
        .expect(201)

    const response = await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: 'testtest'
        })
        .expect(200)
    expect(response.get('Set-Cookie')).toBeDefined()
})