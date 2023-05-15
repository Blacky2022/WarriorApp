import { WarriorRecord } from '../records/warrior.record'

export const fight = (
	warrior1: WarriorRecord,
	warrior2: WarriorRecord
): {
	log: string[]
	winner: WarriorRecord
} => {
	const log: string[] = []

	const warrior1TmpStats = {
		hp: warrior1.durability * 10,
		dp: warrior1.defence,
		warrior: warrior1,
	}
	const warrior2TmpStats = {
		hp: warrior2.durability * 10,
		dp: warrior2.defence,
		warrior: warrior2,
	}

	let attacker = warrior1TmpStats
	let defender = warrior2TmpStats
	log.push(`FIGHT HAS STARTED BETWEEN ${attacker.warrior.name} and ${defender.warrior.name}`)

	do {
		const attackStrength = attacker.warrior.power
		log.push(`${attacker.warrior.name} IS ATTACKING`)
		if (defender.warrior.agility + defender.dp > attackStrength) {
			defender.dp -= attackStrength

			if (defender.dp < 0) {
				defender.hp -= -defender.dp
				log.push(
					`${defender.warrior.name} SHIELD DESTROYED AND HE GOT HIT BY ${-defender.dp} HEALTH POINTS (HP:${
						defender.hp
					}, DP:${defender.dp}) `
				)
			} else {
				log.push(
					`${defender.warrior.name} MENAGED TO DEFEND BUT HE LOSS ${attackStrength} SHIELD POINTS (HP:${defender.hp}, DP:${defender.dp}) `
				)
			}
		} else {
			defender.hp -= attackStrength
			log.push(
				`${defender.warrior.name} TAKE CLEAR HIT AND HE LOSS ${attackStrength} HP (HP:${defender.hp}, DP:${defender.dp})`
			)
		}

		;[defender, attacker] = [attacker, defender]
	} while (defender.hp > 0)

	const winner = defender.warrior
	log.push(`${defender.warrior.name} KILLED  ${attacker.warrior.name} AND WON A BATTLE`)
	return {
		log,
		winner,
	}
}
