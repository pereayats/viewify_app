import { getAllChannelsFromDB } from "@/adapters/sql"

export default function handler(req, res) {
	if (req.method == 'GET') {
        getAllChannelsFromDB((error, channels) => {
            if (error) res.status(400).json({ error: 'Could not get channels' })
            else res.status(200).json({ channels: channels })
        })
	}
	else res.status(405).json({ error: 'Method Not Allowed' })
}