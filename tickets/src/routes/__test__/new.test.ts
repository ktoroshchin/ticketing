import request from 'supertest'
import { app } from '../../app'
import { Ticket } from '../../models/ticket'

it('has a route handler listening to /api/tickets for post request', async () => {
    const response = await request(app).post('/api/tickets').send({})
    expect(response.status).not.toEqual(404)
})

it('can only be accessed if user is signed in', async () => {
    const response = await request(app).post('/api/tickets').send({})
    expect(response.status).toEqual(401)
})

it('returns status other than 401 if user is signed in', async () => {
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signup())
        .send({})
    expect(response.status).not.toEqual(401)
})

it('returns error if invalid title is provided', async () => {
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signup())
        .send({
            title: '',
            price: 10
        })
        .expect(400)
    
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signup())
        .send({
            price: 10
        })
        .expect(400)
})

it('returns error if invalid price is provided', async () => {
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signup())
        .send({
            title: 'hjkh',
            price: -10
        })
        .expect(400)
    
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signup())
        .send({
            title: 'sdf'
        })
        .expect(400)
})

it('creates ticket with valid inputs', async () => {
    let ticket = await Ticket.find({})
    expect(ticket.length).toEqual(0)

    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signup())
        .send({
            title: 'dsfsdf',
            price: 20
        })
        .expect(201)
    
    ticket = await Ticket.find({})
    expect(ticket.length).toEqual(1)
    expect(ticket[0].price).toEqual(20)
})