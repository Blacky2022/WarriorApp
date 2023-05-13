import { Router } from 'express'

export const registerRouter = Router()

registerRouter
    .get('/add-form', (req, res) => {
	res.send('Form of Warrior')
})
    .post('/', (req,res) => {
        res.send('add warrior')
    })
