import async from 'async'
import { getChannelByVideoId, getChannelById, getVideosByPlaylistId, getVideosStats } from "@/adapters/youtube"
import { getChannelFromDB, insertChannels, insertVideos } from '@/adapters/sql'

function formatURL(string) {
  try {
    const url = new URL(string)
    return url
  }
  catch (err) {
    return null
  }
}

export default function handler(req, res) {
  if (req.method == 'POST') {
    if (req.body && req.body.videoURL) {
      const url = formatURL(req.body.videoURL)

      if (url && url.searchParams && url.searchParams.get('v')) {
        // Turning url into video ID
        const videoId = url.searchParams.get('v')

        async.waterfall([
          (callback) => {
            // Getting channel from video ID
            getChannelByVideoId(videoId, (error, channelId) => {
              if (error) callback('Video not found')
              else callback(null, channelId)
            })
          },
          (channelId, callback) => {
            // Getting channel information and uploads playlist ID
            getChannelFromDB(channelId, (error, channel) => {
              if (error) callback('Channel not found')
              else if (channel) callback(null, channel)
              else {
                getChannelById(channelId, (error, channel) => {
                  if (error) callback('Channel not found')
                  else {
                    insertChannels([channel], (error) => {
                      if (error) callback('Channel could not be inserted')
                      else callback(null, channel)
                    })
                  }
                })
              }
            })
          },
          (channel, callback) => {
            // Getting latest video IDs
            getVideosByPlaylistId(channel.uploadsPlaylistId, (error, videoIds) => {
              if (error) callback('Playlist not found')
              else callback(null, channel, videoIds)
            })
          },
          (channel, videoIds, callback) => {
            // Getting stats/info for videos
            getVideosStats(videoIds, (error, videos) => {
              if (error) callback('Videos not found')
              else if (videos.length > 0) {
                insertVideos(videos.slice(0, 10), (error) => {
                  if (error) callback('Videos could not be inserted')
                  else callback()
                })
              }
              else callback()
            })
          },
        ], (error, result) => {
          if (error) res.status(400).json({ error })
          else res.status(200).json({ message: 'success' })
        })
      }
      else res.status(400).json({ error: 'URL is not well formatted' })
    }
    else res.status(400).json({ error: 'Missing Parameters' })
  }
  else res.status(405).json({ error: 'Method Not Allowed' })
}
