import { Router } from 'express'
import { WarriorRecord } from '../records/warrior.record'
import { ValidationError } from '../utils/error'

export const registerRouter = Router()

registerRouter
	.get('/add-form', (req, res) => {
		res.render('register/add-form')
	})
	.post('/', async (req, res) => {
		if (await WarriorRecord.isNameTaken(req.body.name)) {
			throw new ValidationError(
				`Name ${req.body.name} is allready taken! You need to find more unique name for your warrior`
			)
		}

		const warrior = new WarriorRecord({
			...req.body,
			power: Number(req.body.power),
			defence: Number(req.body.defence),
			durability: Number(req.body.durability),
			agility: Number(req.body.agility),
		})
		await warrior.insert()
		res.render('register/warrior-added', {
			warrior,
		})
	})
