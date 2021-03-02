import request from 'supertest'
import { app } from '../../app'
import mongoose from 'mongoose'

it('returns 404 if the ticket is not found', async () => {
    const id = mongoose.Types.ObjectId().toHexString()
    
    await request(app)
        .get(`/api/tickets/${id}`)
        .expect(404)
})

it('returns the ticket if the ticket is found', async () => {
    const title = 'concert'
    const price = 30

    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signup())
        .send({
            title,
            price
        })
        .expect(201)

    const ticketResponse = await request(app)
        .get(`/api/tickets/${response.body.id}`)
        .send()
        .expect(200)

    expect(ticketResponse.body.title).toEqual(title)
    expect(ticketResponse.body.price).toEqual(price)
})


