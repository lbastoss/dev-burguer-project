import { Router } from 'express'
import { v4 } from 'uuid'
const routes = new Router()
import User from './app/models/User'

routes.get('/', async (req, res) => {
	const user = await User.create({
		id: v4(),
		name: 'Lucas',
		email: 'lucass@email.com',
		password_hash: 'dhuasdhasudas',
	})

	return res.status(201).json(user)
})

export default routes
