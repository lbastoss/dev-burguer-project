class SessionController {
	async store(req, res) {
		return res.json({ message: 'session' })
	}
}

export default new SessionController()
