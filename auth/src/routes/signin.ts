import express from 'express'

const router = express.Router()

router.post('/api/users/signin', (req, res) => {
    res.send('hi sign route')
})

export { router as signinRouter }