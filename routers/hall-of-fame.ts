import { Router } from 'express'
import { WarriorRecord } from '../records/warrior.record'

export const HallOfFameRouter = Router()

HallOfFameRouter.get('/', async (req, res) => {
	const bestWarriors = (await WarriorRecord.listTop(10)).map((warrior, index) => {
		return {
			place: index + 1,
			warrior,
		}
	})

	res.render('hall-of-fame/list', {
		bestWarriors,
	})
})
