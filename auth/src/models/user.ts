import mongoose from 'mongoose'
import { Password } from '../services/password' 

/**
 * Interface describes properties required for a new user
 */
interface UserAttrs {
    email: string
    password: string
}

/**
 * Interface describes the properties that a User Model has
 */
interface UserModel extends mongoose.Model<UserDoc> {
    build: (attrs: UserAttrs) => UserDoc 
}

/**
 * Interface describes the properties that a User Document has(single user)
 */
interface UserDoc extends mongoose.Document {
    email: string,
    password: string,
}

const userSchema = new mongoose.Schema({
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    },
    {
        //method that will remove _id, __v properties when object is returned
         toJSON: {
            transform(doc, ret, options) {
                ret.id = ret._id
                delete ret._id
                delete ret.__v
            }
        }
    }  
)

// Method will execute before mongoose saves data
userSchema.pre('save', async function(done) {
    if(this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'))
        this.set('password', hashed)
    }
    done()
})

// Adding build method to the user model
userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs)
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema)

export { User }