/* 
    store => cadastrar/ adicionar
    index => listar varios
    show => listar apenas um 
    update => atualizar
    delete => deletar 
*/
import { v4 } from 'uuid'
import User from '../models/User'
import * as Yup from 'yup'

class UserController {
	async store(req, res) {
		const schema = Yup.object({
			name: Yup.string()
				.strict(true)
				.required()
				.matches(/^[a-zA-Z\s]+$/, 'Name can only contain letters'),
			email: Yup.string().email('Invalid email').required('Email is required'),
			password_hash: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
			admin: Yup.boolean(),
		})

		try {
			schema.validateSync(req.body, { abortEarly: false })
		} catch (err) {
			return res.status(400).json({ error: err.errors })
		}

		const { name, email, password_hash, admin } = req.body

		const userExists = await User.findOne({
			where: {
				email,
			},
		})

		if (userExists) {
			return res.status(400).json({ error: 'User already exists' })
		}

		const user = await User.create({
			id: v4(),
			name,
			email,
			password_hash,
			admin,
		})

		return res.status(201).json({
			id: user.id,
			name,
			email,
			admin,
		})
	}
}

export default new UserController()
