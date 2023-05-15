import { Router } from 'express'
import { WarriorRecord } from '../records/warrior.record'
import { ValidationError } from '../utils/error'
import { fight } from '../utils/fight'

export const arenaRouter = Router()

arenaRouter
	.get('/matchmaking', async (req, res) => {
		const allWarriors = await WarriorRecord.listAll()
		res.render('arena/matchmaking', {
			allWarriors,
		})
	})
	.post('/fight', async (req, res) => {
		const { warrior1Id, warrior2Id } = req.body
		if (warrior1Id === warrior2Id) {
			throw new ValidationError(`Choose two different fighters!`)
		}
		const warrior1 = await WarriorRecord.getOne(warrior1Id)
		const warrior2 = await WarriorRecord.getOne(warrior2Id)
		if (!warrior1 || !warrior2) {
			throw new ValidationError(`Warrior dont exist, try reloading the page to check available warriors`)
		}
		const { log, winner } = fight(warrior1, warrior2)

		winner.wins++
		await winner.update()
		res.render('arena/fight', {
			log,
		})
	})
