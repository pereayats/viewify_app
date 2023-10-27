require('dotenv').config()

const async = require('async')
const moment = require('moment')
const _ = require('lodash')
const sql = require('../adapters/sql')
const youtube = require('../adapters/youtube')

async.waterfall([
    // Getting channels to update
    (callback) => {
        sql.getAllChannelsFromDB((error, channels) => {
            if (error) callback('Could not get channels from DB')
            else callback(null, channels.map(c => c.id))
        })
    },
    // Getting channels latest info
    (channelIds, callback) => {
        youtube.getChannelsInfo(channelIds, (error, channels) => {
            if (error) callback('Could not get channels from Youtube API')
            else callback(null, channels)
        })
    },
    // Updating channels latest info
    (channels, callback) => {
        sql.insertChannels(channels, (error) => {
            if (error) callback('Could not update channels latest info')
            else callback(null, channels.map(c => c.uploadsPlaylistId))
        })
    },
    // Getting latest videos for each channel
    (playlistIds, callback) => {
        let videoIds = []
        // We get the newest videos of the uploads playlist for each channel
        async.eachLimit(playlistIds, 25, (playlistId, callback) => {
            youtube.getVideosByPlaylistId(playlistId, (error, ids) => {
                if (ids &&  ids.length > 0) videoIds.push(... ids)
                callback()
            })
        }, (error) => {
            if (error) callback('Could not get latest videos for each channel')
            else callback(null, videoIds)
        })
    },
    // Getting video stats
    (videoIds, callback) => {
        let videos = []
        // We do requests of 100 video ids to get their stats
        let chunks = _.chunk(videoIds, 50)
        async.eachLimit(chunks, 25, (ids, callback) => {
            youtube.getVideosStats(ids, (error, v) => {
                if (v && v.length > 0) videos.push(... v)
                callback()
            })
        }, (error) => {
            if (error) callback('Could not get video stats')
            else {
                // For each channel we get the 10 most recent videos
                let videosByChannel = _.groupBy(videos, 'channelId')
                Object.keys(videosByChannel).forEach(channel => {
                    videosByChannel[channel] = videosByChannel[channel].slice(0, 10)
                })

                callback(null, videosByChannel)
            }
        })
    },
    // Clean up videos
    (videosByChannel, callback) => {
        async.eachLimit(Object.keys(videosByChannel), 25, (channelId, callback) => {
            sql.deleteVideosByChannelId(channelId, (error) => {
                callback()
            })
        }, (error) => {
            if (error) callback('Could not clean up videos')
            else callback(null, videosByChannel)
        })
    },
    // Insert new videos
    (videosByChannel, callback) => {
        async.eachLimit(Object.keys(videosByChannel), 25, (channelId, callback) => {
            sql.insertVideos(videosByChannel[channelId], (error) => {
                callback()
            })
        }, (error) => {
            if (error) callback('Could not insert new videos')
            else callback(null, videosByChannel)
        })
    },
    // Deleting video stats that are not in the most recent for each channel
    (videosByChannel, callback) => {
        async.eachLimit(Object.keys(videosByChannel), 25, (channelId, callback) => {
            sql.cleanUpOldVideoStats(channelId, videosByChannel[channelId].map(v => v.id), (error) => {
                callback()
            })
        }, (error) => {
            if (error) callback('Could not delete old video stats')
            else callback(null, videosByChannel)
        })
    },
    // Insert current video stats
    (videosByChannel, callback) => {
        async.eachLimit(Object.keys(videosByChannel), 25, (channelId, callback) => {
            sql.insertVideoStats(videosByChannel[channelId], (error) => {
                callback()
            })
        }, (error) => {
            if (error) callback('Could not insert current video stats')
            else callback(null, videosByChannel)
        })
    },
], (error) => {
    if (error) throw Error(error)
    else console.log(`${moment().utc().toISOString()} - Video metrics updated`)
})