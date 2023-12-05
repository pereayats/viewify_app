import { getVideoAnalytics } from "@/adapters/sql"

export default function handler(req, res) {
	if (req.method == 'GET') {
        if (req.query && req.query.id && req.query.from && req.query.to) {
			getVideoAnalytics(req.query.id, req.query.from, req.query.to, (error, analytics) => {
                if (error) res.status(400).json({ error: 'Could not get analytics' })
                else res.status(200).json({ analytics: analytics })
            })
		}
		else res.status(400).json({ error: 'Missing Parameters' })
	}
	else res.status(405).json({ error: 'Method Not Allowed' })
}