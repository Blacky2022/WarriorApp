import { ValidationError } from '../utils/error'
import { v4 as uuid } from 'uuid'
import { pool } from '../utils/db'
import { FieldPacket } from 'mysql2'

type WarriorRecordResults = [WarriorRecord[], FieldPacket[]]
export class WarriorRecord {
	public id?: string
	public readonly name: string
	public readonly power: number
	public readonly defence: number
	public readonly durability: number
	public readonly agility: number
	public wins?: number

	constructor(obj: WarriorRecord) {
		const { id, durability, defence, name, power, agility, wins } = obj

		const sum = [durability, defence, power, agility].reduce((prev, curr) => prev + curr, 0)
		if (sum !== 10) {
			throw new ValidationError(`Overall sum of statistic have to be 10! Right now, u spend ${sum} points).`)
		}
		if (name.length < 3 && name.length > 50) {
			throw new ValidationError(`Warrior name must have from 3 to 50 characters for now it is ${name.length}.`)
		}
		this.id = id
		this.name = name
		this.power = power
		this.defence = defence
		this.durability = durability
		this.wins = wins
	}
	async insert(): Promise<string> {
		if (!this.id) {
			this.id = uuid()
		}

		await pool.execute(
			'INSERT INTO `warrior`(`id`, `name`,`power`,`defence`,`durability`,`agility`,`wins`) VALUES(:id, :name, :power, :defence, :durability, :agility, :wins)',
			{
				id: this.id,
				name: this.name,
				power: this.power,
				defence: this.defence,
				durability: this.durability,
				agility: this.agility,
				wins: this.wins,
			}
		)

		return this.id
	}

	static async listAll(): Promise<WarriorRecord[]> {
		const [results] = (await pool.execute('SELECT * FROM `warrior` ORDER BY `name` ASC')) as [
			WarriorRecord[],
			FieldPacket[]
		]
		return results.map(obj => new WarriorRecord(obj))
	}

	static async getOne(id: string): Promise<null | WarriorRecord> {
		const [results] = (await pool.execute('SELECT * FROM `warrior` WHERE `id` = :id', {
			id,
		})) as WarriorRecordResults
		return results.length === 0 ? null : new WarriorRecord(results[0])
	}

	async update(): Promise<void> {
		await pool.execute('UPDATE `warrior` SET `wins` = :wins WHERE `id` = :id', {
			id: this.id,
			wins: this.wins,
		})
	}
	static async listTop(topCount: number) {
       // await pool.execute('SELECT name, wins FROM `warrior` ORDER BY wins DESC LIMIT ?')
    }
}
