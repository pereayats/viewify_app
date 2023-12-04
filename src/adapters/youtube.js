require('dotenv').config()

const moment = require('moment')
const axios = require('axios');

const BASE_API_URL = 'https://youtube.googleapis.com/youtube/v3'

function getChannelByVideoId(videoId, callback) {
    axios.get(`${BASE_API_URL}/videos`, {
        params: {
            id: videoId,
            part: 'snippet',
            key: process.env.YOUTUBE_API_KEY,
        },
    })
        .then(response => {
            if (response.data && response.data.items && response.data.items.length > 0) {
                callback(null, response.data.items[0].snippet.channelId);
            } else {
                callback('Video not found');
            }
        })
        .catch(error => {
            callback(error);
        });
}

function getChannelById(channelId, callback) {
    axios.get(`${BASE_API_URL}/channels`, {
        params: {
            id: channelId,
            part: 'snippet,contentDetails,statistics',
            key: process.env.YOUTUBE_API_KEY,
        },
    })
        .then(response => {
            if (response.data && response.data.items && response.data.items.length > 0) {
                const channelData = response.data.items[0].snippet;
                const contentDetails = response.data.items[0].contentDetails;
                const statistics = response.data.items[0]?.statistics;
                const channel = {
                    id: channelId,
                    title: channelData.title,
                    description: channelData.description,
                    customUrl: channelData.customUrl,
                    publishedAt: channelData.publishedAt,
                    thumbnail: channelData.thumbnails.default.url,
                    country: channelData.country,
                    uploadsPlaylistId: contentDetails.relatedPlaylists.uploads,
                    views: statistics?.viewCount,
                    subscribers: statistics?.subscriberCount,
                    videos: statistics?.videoCount
                };

                callback(null, channel);
            } else {
                callback('Channel not found');
            }
        })
        .catch(error => {
            callback(error);
        });
}

function getVideosByPlaylistId(playlistId, callback) {
    axios.get(`${BASE_API_URL}/playlistItems`, {
        params: {
            playlistId: playlistId,
            part: 'contentDetails',
            key: process.env.YOUTUBE_API_KEY,
            maxResults: 50,
        },
    })
        .then(response => {
            if (response.data && response.data.items && response.data.items.length > 0) {
                const videoIds = response.data.items.map(item => item?.contentDetails?.videoId);
                callback(null, videoIds);
            } else {
                callback('Playlist not found');
            }
        })
        .catch(error => {
            callback(error);
        });
}

function getChannelsInfo(channelIds, callback) {
    let url = `${BASE_API_URL}/channels`;
    const params = {
        part: 'snippet,contentDetails,statistics',
        key: process.env.YOUTUBE_API_KEY,
        id: channelIds.join(','),
    };

    axios.get(url, { params })
        .then(response => {
            if (response.data && response.data.items && response.data.items.length > 0) {
                const channels = response.data.items.map(channel => ({
                    id: channel.id,
                    title: channel.snippet.title,
                    description: channel.snippet.description,
                    customUrl: channel.snippet.customUrl,
                    publishedAt: channel.snippet.publishedAt,
                    thumbnail: channel.snippet.thumbnails.default.url,
                    country: channel.snippet.country,
                    uploadsPlaylistId: channel.contentDetails.relatedPlaylists.uploads,
                    views: channel.statistics?.viewCount,
                    subscribers: channel.statistics?.subscriberCount,
                    videos: channel.statistics?.videoCount
                }));

                callback(null, channels);
            } else {
                callback('Channels not found');
            }
        })
        .catch(error => {
            callback(error);
        });
}

function getVideosStats(videoIds, callback) {
    let url = `${BASE_API_URL}/videos`;
    const params = {
        part: 'contentDetails,id,liveStreamingDetails,snippet,statistics,status,topicDetails',
        key: process.env.YOUTUBE_API_KEY,
        id: videoIds.join(','),
    };

    axios.get(url, { params })
        .then(response => {
            if (response.data && response.data.items && response.data.items.length > 0) {
                const videos = response.data.items
                    .filter(video => !video.liveStreamingDetails)
                    .map(video => {
                        const duration = moment.duration(video.contentDetails.duration);
                        const thumbnailHD = video.snippet.thumbnails.maxres.url
                        const thumbnailStandard = video.snippet.thumbnails.standard.url
                        const thumbnailHigh = video.snippet.thumbnails.high.url
                        const thumbnailMedium = video.snippet.thumbnails.medium.url

                        if (duration.asMilliseconds() > 60 * 1000) {
                            return {
                                id: video.id,
                                channelId: video.snippet.channelId,
                                title: video.snippet.title,
                                description: video.snippet.description,
                                publishedAt: video.snippet.publishedAt,
                                thumbnail: video.snippet.thumbnails.default.url,
                                thumbnailHD: (thumbnailHD ? thumbnailHD : (thumbnailStandard ? thumbnailStandard: (thumbnailHigh ? thumbnailHigh : (thumbnailMedium ? thumbnailMedium : video.snippet.thumbnails.default.url)))),
                                duration: duration.as('seconds'),
                                views: Number(video.statistics.viewCount) || 0,
                                likes: Number(video.statistics.likeCount) || 0,
                                comments: Number(video.statistics.commentCount) || 0,
                            };
                        }

                        return null;
                    }).filter(Boolean);

                callback(null, videos);
            } else {
                callback('Videos not found');
            }
        })
        .catch(error => {
            callback(error);
        });
}

module.exports = {
    getChannelByVideoId, getChannelById, getVideosByPlaylistId, getChannelsInfo, getVideosStats
}