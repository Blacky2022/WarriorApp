import { Router } from 'express'

export const HallOfFameRouter = Router()

HallOfFameRouter.get('/', (req, res) => {
	res.send('10 strongest warriors')
})
