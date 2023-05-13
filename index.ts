import express, { static as eStatic, urlencoded } from 'express'
import { engine } from 'express-handlebars'
import methodOverride from 'method-override'
import 'express-async-errors'
import { homeRouter } from './routers/home'
import { HallOfFameRouter } from './routers/hall-of-fame'
import { registerRouter } from './routers/register'
import { arenaRouter } from './routers/arena'

const app = express()

app.use(methodOverride('_method'))

app.use(
	urlencoded({
		extended: true,
	})
)
app.use(eStatic('public'))
app.engine(
	'.hbs ',
	engine({
		extname: '.hbs',
		// helpers:
	})
)
app.set('view engine', '.hbs')

app.get('/', (req, res) => {
	res.send('Helloass!')
})

app.use('/', homeRouter)
app.use('/register', registerRouter)
app.use('/arena', arenaRouter)
app.use('/hall-Of-Fame', HallOfFameRouter)

//app.use (handleError)

app.listen(3000, '0.0.0.0', (): void => {
	console.log('Listening on http://localhost:3000')
})

// function Static(arg0: string): any {
// 	throw new Error('Function not implemented.')
// }
