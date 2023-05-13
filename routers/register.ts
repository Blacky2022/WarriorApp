import { Router } from 'express'

export const registerRouter = Router()

registerRouter
    .get('/add-form', (req, res) => {
	res.render('register/add-form')
})
    .post('/', (req,res) => {
        res.render('register/warrior-added')
    })
