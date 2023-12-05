import { getChannelVideos } from "@/adapters/sql"

export default function handler(req, res) {
	if (req.method == 'GET') {
        if (req.query && req.query.id) {
			getChannelVideos(req.query.id, (error, videos) => {
                if (error) res.status(400).json({ error: 'Could not get videos' })
                else res.status(200).json({ videos: videos })
            })
		}
		else res.status(400).json({ error: 'Missing Parameters' })
	}
	else res.status(405).json({ error: 'Method Not Allowed' })
}