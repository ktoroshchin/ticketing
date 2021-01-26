import request from 'supertest'
import { app } from '../../app'

it('returns 201 on success signup', () => {
    request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password:  'password'
        })
        .expect(201)
})

it('returns a 400 with an invalid email', () => {
    request(app)
        .post('/api/users/signup')
        .send({
            email: 'testtest.com',
            password: 'password'
        })
        .expect(400)
})

it('returns a 400 with an invalid password', () => {
    request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'y'
        })
        .expect(400)
})

it('returns a 400 with missing email and password', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: ''
        })
        .expect(400)
    
    await request(app)
        .post('/api/users/signup')
        .send({
            password: ''
        })
        .expect(400)
})

it('return 400 if email already registered', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'testtest'
        })
        expect(201)
        

    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'testtest'
        })
        .expect(400)
})

it('sets cookies after successful signup', async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'testtest'
        })
        .expect(201)

    expect(response.get('Set-Cookie')).toBeDefined()
 })
