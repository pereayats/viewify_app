require('dotenv').config()

const mysql2 = require('mysql2')
const moment = require('moment')

const pool = mysql2.createPool({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    port: 25060,
    connectionLimit: 100
})

function getAllChannelsFromDB(callback) {
    pool.getConnection((error, connection) => {
        if (error) callback(error)
        else {
            let query = `SELECT * FROM viewify.channels;`

            connection.query(query, (error, result) => {
                pool.releaseConnection(connection)
                if (error) callback(error)
                else callback(null, result)
            })
        }
    })
}

function getChannelFromDB(channelId, callback) {
    pool.getConnection((error, connection) => {
        if (error) callback(error)
        else {
            let query = `SELECT * FROM viewify.channels WHERE id = '${channelId}';`

            connection.query(query, (error, result) => {
                pool.releaseConnection(connection)
                if (error) callback(error)
                else callback(null, result && result.length > 0 ? result[0] : null)
            })
        }
    })
}

function insertChannels(channels, callback) {
    pool.getConnection((error, connection) => {
        if (error) callback(error)
        else {
            let query = `INSERT INTO viewify.channels(id, title, description, customUrl, publishedAt, thumbnail, country, uploadsPlaylistId) VALUES ?
                ON DUPLICATE KEY UPDATE title=VALUES(title), description=VALUES(description), customUrl=VALUES(customUrl), thumbnail=VALUES(thumbnail), country=VALUES(country);`
            
            let values = []
            channels.forEach(c => {
                values.push([c.id, c.title, c.description, c.customUrl, moment(c.publishedAt).utc().format('YYYY-MM-DD HH:mm:SS'), c.thumbnail, c.country, c.uploadsPlaylistId])
            })

            connection.query(query, [values], (error) => {
                pool.releaseConnection(connection)
                if (error) callback(error)
                else callback()
            })
        }
    })
}

function insertVideos(videos, callback) {
    pool.getConnection((error, connection) => {
        if (error) callback(error)
        else {
            let query = `INSERT INTO viewify.videos(id, channelId, title, description, publishedAt, thumbnail, duration, views, likes, comments) VALUES ?
                ON DUPLICATE KEY UPDATE title=VALUES(title), description=VALUES(description), thumbnail=VALUES(thumbnail), views=VALUES(views), likes=VALUES(likes), comments=VALUES(comments);`
            
            let values = []
            videos.forEach(c => {
                values.push([c.id, c.channelId, c.title, c.description, moment(c.publishedAt).utc().format('YYYY-MM-DD HH:mm:SS'), c.thumbnail, c.duration, c.views, c.likes, c.comments])
            })

            connection.query(query, [values], (error) => {
                pool.releaseConnection(connection)
                if (error) callback(error)
                else callback()
            })
        }
    })
}

function insertVideoStats(videos, callback) {
    pool.getConnection((error, connection) => {
        if (error) callback(error)
        else {
            let query = `INSERT INTO viewify.video_stats(id, channelId, title, description, publishedAt, thumbnail, duration, views, likes, comments, currentTime) VALUES ?
                ON DUPLICATE KEY UPDATE title=VALUES(title), description=VALUES(description), thumbnail=VALUES(thumbnail), views=VALUES(views), likes=VALUES(likes), comments=VALUES(comments);`
            
            let values = []
            videos.forEach(c => {
                values.push([c.id, c.channelId, c.title, c.description, moment(c.publishedAt).utc().format('YYYY-MM-DD HH:mm:SS'), c.thumbnail, c.duration, c.views, c.likes, c.comments, moment().utc().format('YYYY-MM-DD HH:00:00')])
            })

            connection.query(query, [values], (error) => {
                pool.releaseConnection(connection)
                if (error) callback(error)
                else callback()
            })
        }
    })
}

function deleteVideosByChannelId(channelId, callback) {
    pool.getConnection((error, connection) => {
        if (error) callback(error)
        else {
            let query = `DELETE FROM viewify.videos WHERE channelId = '${channelId}';`

            connection.query(query, (error) => {
                pool.releaseConnection(connection)
                if (error) callback(error)
                else callback()
            })
        }
    })
}

function cleanUpOldVideoStats(channelId, videoIds, callback) {
    pool.getConnection((error, connection) => {
        if (error) callback(error)
        else {
            let query = `DELETE FROM viewify.video_stats WHERE channelId = '${channelId}'
                AND id NOT IN ('${videoIds.join("','")}');`

            connection.query(query, (error) => {
                pool.releaseConnection(connection)
                if (error) callback(error)
                else callback()
            })
        }
    })
}

function addEmailToWaitlist(email, callback) {
    pool.getConnection((error, connection) => {
        if (error) callback(error)
        else {
            let query = `INSERT INTO viewify.waitlist(email) VALUES ?
                ON DUPLICATE KEY UPDATE updatedAt=CURRENT_TIMESTAMP;`

            connection.query(query, [[[email]]], (error) => {
                pool.releaseConnection(connection)
                if (error) callback(error)
                else callback()
            })
        }
    })
}

module.exports = {
    getAllChannelsFromDB, getChannelFromDB, insertChannels, insertVideos, insertVideoStats, deleteVideosByChannelId, cleanUpOldVideoStats, addEmailToWaitlist
}