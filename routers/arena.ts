import { Router } from 'express'

export const arenaRouter = Router()

arenaRouter
	.get('/matchmaking', (req, res) => {
		res.render('arena/matchmaking')
	})
	.post('/fight', (req, res) => {
		res.render('arena/fight')
	})
