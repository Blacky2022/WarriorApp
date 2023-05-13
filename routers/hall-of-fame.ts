import { Router } from 'express'

export const HallOfFameRouter = Router()

HallOfFameRouter.get('/', (req, res) => {
	res.render('hall-of-fame/list')
})
