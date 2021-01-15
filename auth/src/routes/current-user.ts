import express from 'express'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.get('/api/users/currentuser', (req, res) => {
    if(!req.session?.jwt) {
        res.send({ currentUser: null })
    }

    try {
        // will throw error if token is invalid
        const payload = jwt.verify(req.session?.jwt, process.env.jwt_key!)
        res.send({ currentUser: payload})

    } catch (err) {
        res.send({ currentUser: null })
    }

})

export { router as currentUserRouter }