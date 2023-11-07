//const fs = require('fs')
//const path = require('path')
import { addEmailToWaitlist } from '@/adapters/sql'

export default function handler(req, res) {
	if (req.method == 'POST') {
		if (req.body && req.body.email) {
			const email = req.body.email.trim()
			addEmailToWaitlist(email, (error) => {
				if (error) res.status(400).json({ error: 'Email could not be added' })
				else res.status(200).json({ message: 'success' })
			})
			/*const file_path = path.join(process.cwd(), 'public') + '/waitlist.json'
			fs.readFile(file_path, (error, data) => {
				if (error) res.status(400).json({ error: 'JSON file could not be read' })
				else {
					let json_file = JSON.parse(data)
					if (!json_file.includes(email)) json_file.push(email)
					fs.writeFile(file_path, JSON.stringify(json_file), (error) => {
						if (error) res.status(400).json({ error: 'JSON file could not be written' })
						else res.status(200).json({ message: 'success' })
					})
				}
			})*/
		}
		else res.status(400).json({ error: 'Missing Parameters' })
	}
	else res.status(405).json({ error: 'Method Not Allowed' })
}
