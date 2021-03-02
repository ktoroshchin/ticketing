import mongoose from 'mongoose'

/**
 * Interface describes properties required for a new ticket
 */
interface TicketAttrs {
    title: string
    price: number
    userId: string
}

/**
 * Interface describes the properties that a Ticket Model has
 */
interface TicketModel extends mongoose.Model<TicketDoc> {
    build: (attrs: TicketAttrs) => TicketDoc
}

/**
 * Interface describes the properties that a Ticket Document has(single ticket)
 */
interface TicketDoc extends mongoose.Document {
    title: string,
    price: number,
    userId: string
}

const ticketSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        userId: {
            type: String,
            required: true
        }
}, {
    toJSON: {
        transform(doc, ret, options) {
            ret.id = ret._id,
            delete ret._id
            delete ret.__v
        }
    }
})

ticketSchema.statics.build = (attrs: TicketAttrs) => new Ticket(attrs)

const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema)

export { Ticket }