require('dotenv').config()

const moment = require('moment')

const BASE_API_URL = 'https://youtube.googleapis.com/youtube/v3'

function getChannelByVideoId(videoId, callback) {
    console.log(process.env.YOUTUBE_API_KEY)
    fetch(`${BASE_API_URL}/videos?id=${videoId}&part=snippet&key=${process.env.YOUTUBE_API_KEY}`)
    .then(response => {
        if (response.ok) return response.json()
        else throw new Error('Could not complete request')
    })
    .then(data => {
        if (data && data.items && data.items.length > 0) {
            callback(null, data.items[0].snippet.channelId)
        }
        else callback('Video not found')
    })
    .catch(error => {
        callback(error)
    }) 
}

function getChannelById(channelId, callback) {
    fetch(`${BASE_API_URL}/channels?id=${channelId}&part=snippet,contentDetails&key=${process.env.YOUTUBE_API_KEY}`)
    .then(response => {
        if (response.ok) return response.json()
        else throw new Error('Could not complete request')
    })
    .then(data => {
        if (data && data.items && data.items.length > 0) {
            const channel = {
                id: data?.items[0]?.id,
                title: data?.items[0]?.snippet?.title,
                description: data?.items[0]?.snippet?.description,
                customUrl: data?.items[0]?.snippet?.customUrl,
                publishedAt: data?.items[0]?.snippet?.publishedAt,
                thumbnail: data?.items[0]?.snippet?.thumbnails?.default?.url,
                country: data?.items[0]?.snippet?.country,
                uploadsPlaylistId: data?.items[0]?.contentDetails?.relatedPlaylists?.uploads,
            }

            callback(null, channel)
        }
        else callback('Channel not found')
    })
    .catch(error => {
        callback(error)
    }) 
}

function getVideosByPlaylistId(playlistId, callback) {
    fetch(`${BASE_API_URL}/playlistItems?playlistId=${playlistId}&part=contentDetails&key=${process.env.YOUTUBE_API_KEY}&maxResults=50`)
    .then(response => {
        if (response.ok) return response.json()
        else throw new Error('Could not complete request')
    })
    .then(data => {
        if (data && data.items && data.items.length > 0) {
            callback(null, data.items.map(v => v?.contentDetails?.videoId))
        }
        else callback('Playlist not found')
    })
    .catch(error => {
        callback(error)
    }) 
}

function getChannelsInfo(channelIds, callback) {
    let url = `${BASE_API_URL}/channels?part=snippet,contentDetails&key=${process.env.YOUTUBE_API_KEY}`

    channelIds.forEach((id, i) => {
        if (i == 0) url += `&id=${id}`
        else url += `,${id}`
    })

    fetch(url)
    .then(response => {
        if (response.ok) return response.json()
        else throw new Error('Could not complete request')
    })
    .then(data => {
        if (data && data.items && data.items.length > 0) {
            const channels = []

            data.items.forEach(channel => {
                channels.push({
                    id: channel?.id,
                    title: channel?.snippet?.title,
                    description: channel?.snippet?.description,
                    customUrl: channel?.snippet?.customUrl,
                    publishedAt: channel?.snippet?.publishedAt,
                    thumbnail: channel?.snippet?.thumbnails?.default?.url,
                    country: channel?.snippet?.country,
                    uploadsPlaylistId: channel?.contentDetails?.relatedPlaylists?.uploads,
                })
            })

            callback(null, channels)
        }
        else callback('Channels not found')
    })
    .catch(error => {
        callback(error)
    }) 
}

function getVideosStats(videoIds, callback) {
    let url = `${BASE_API_URL}/videos?part=contentDetails,id,liveStreamingDetails,snippet,statistics,status,topicDetails&key=${process.env.YOUTUBE_API_KEY}`

    videoIds.forEach((id, i) => {
        if (i == 0) url += `&id=${id}`
        else url += `,${id}`
    })

    fetch(url)
    .then(response => {
        if (response.ok) return response.json()
        else throw new Error('Could not complete request')
    })
    .then(data => {
        if (data && data.items && data.items.length > 0) {
            const videos = []

            data.items.forEach(video => {
                if (video && !video.liveStreamingDetails) {
                    const duration = moment.duration(video?.contentDetails?.duration)

                    if (duration.asMilliseconds() > 60 * 1000) {
                        videos.push({
                            id: video?.id,
                            channelId: video?.snippet?.channelId,
                            title: video?.snippet?.title,
                            description: video?.snippet?.description,
                            publishedAt: video?.snippet?.publishedAt,
                            thumbnail: video?.snippet?.thumbnails?.default?.url,
                            duration: duration / 1000,
                            views: Number(video?.statistics?.viewCount) || 0,
                            likes: Number(video?.statistics?.likeCount) || 0,
                            comments: Number(video?.statistics?.commentCount) || 0
                        })
                    }
                }
            })

            callback(null, videos)
        }
        else callback('Videos not found')
    })
    .catch(error => {
        callback(error)
    }) 
}

module.exports = {
    getChannelByVideoId, getChannelById, getVideosByPlaylistId, getChannelsInfo, getVideosStats
}