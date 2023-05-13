import { Router } from 'express'

export const arenaRouter = Router()

arenaRouter
	.get('/matchmaking', (req, res) => {
		res.send('Here u gonan be able to choose 2 worriors and force them to fight each other')
	})
	.post('/fight', (req, res) => {
		res.send('Fight log')
	})
