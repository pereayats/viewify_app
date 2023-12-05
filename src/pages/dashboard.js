import { useState, useEffect } from 'react'
import Head from 'next/head'
import { Files, Sidebar as SidebarIcon } from '@phosphor-icons/react'
import Sidebar from '@/components/Sidebar'
import ErrorDialog from '@/components/ErrorDialog'
import SearchChannel from '@/components/SearchChannel'
import DatePicker from '@/components/DatePicker'
import Select from '@/components/Select'
import ProfileDropdown from '@/components/ProfileDropdown'
import Spinner from '@/components/Spinner'
import CustomAreaChart from '@/components/AreaChart'
import CustomBarChart from '@/components/BarChart'
import { metricsFormatter, percentageFormatter, datetimeFormatter, dateFormatter, hourFormatter } from '../../utils'
import lodash from 'lodash'
import moment from 'moment'
import { CSVLink } from 'react-csv'

const sortOptions = [
    { label: 'Most recent', value: 'publishedAt' },
    { label: 'Most viewed', value: 'views' }
]

export default function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const [search, setSearch] = useState("")
    const [searchOptions, setSearchOptions] = useState([])

    const [showFrom, setShowFrom] = useState(false)
    const [showTo, setShowTo] = useState(false)
    const [from, setFrom] = useState()
    const [to, setTo] = useState()

    const [sort, setSort] = useState(sortOptions[0])

    const [channel, setChannel] = useState()
    const [channelVideos, setChannelVideos] = useState([])
    const [selectedVideo, setSelectedVideo] = useState()

    const [analytics, setAnalytics] = useState([])

    const [viewsPerHour, setViewsPerHour] = useState([])
    const [totalViews, setTotalViews] = useState()
    const [totalLikes, setTotalLikes] = useState()
    const [totalComments, setTotalComments] = useState()
    const [averageViews, setAverageViews] = useState()
    const [averageEngagement, setAverageEngagement] = useState()

    const [error, setError] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getChannels((_, channels) => {
            if (channels && channels.length > 0) {
                setChannel(channels[0])
                setSearchOptions(channels)
            }
            else setError('Channels could not be fetched')
        })
    }, [])

    useEffect(() => {
        if (channel) {
            setError()

            getVideos(channel.id, (_, videos) => {
                if (videos && videos.length > 0) {
                    let column = sort?.value ? sort?.value : 'publishedAt'
                    let sorted = lodash.orderBy([...videos], [column], ['desc'])
                    setChannelVideos(sorted)
                    setSelectedVideo(sorted[0])
                    setLoading(false)
                }
                else setError('Videos could not be fetched')
            })
        }
    }, [channel])

    useEffect(() => {
        if (selectedVideo) {
            setError()
            setFrom(moment(selectedVideo?.publishedAt).utc())
            setTo(moment().utc())

            let now = moment().utc().format('YYYY-MM-DD HH:mm:ss')
            let twoDaysAgo = moment().utc().subtract(50, 'hours').format('YYYY-MM-DD HH:mm:ss')
            getAnalytics(selectedVideo.id, twoDaysAgo, now, (_, analytics) => {
                if (analytics && analytics.length > 0) {
                    analytics.sort((a, b) => a.currentTime - b.currentTime)
                    let differences = computeDifferences(analytics)
                    let views = lodash.sumBy(differences, 'views')
                    let likes = lodash.sumBy(differences, 'likes')
                    let comments = lodash.sumBy(differences, 'comments')
                    let engagement = (likes + comments) / views

                    setViewsPerHour(differences)
                    setTotalViews(views || 0)
                    setTotalLikes(likes || 0)
                    setTotalComments(comments || 0)
                    setAverageViews(lodash.meanBy(differences, 'views'))
                    setAverageEngagement(engagement || 0)
                }
                else {
                    setError('Analytics could not be fetched')
                    setViewsPerHour([])
                    setTotalViews()
                    setTotalLikes()
                    setTotalComments()
                    setAverageViews()
                    setAverageEngagement()
                }
            })
        }
    }, [selectedVideo])

    useEffect(() => {
        if (selectedVideo && from && to) {
            setError()

            getAnalytics(selectedVideo.id, moment(from).format('YYYY-MM-DD HH:mm:ss'), moment(to).format('YYYY-MM-DD HH:mm:ss'), (_, analytics) => {
                if (analytics && analytics.length > 0) {
                    analytics.sort((a, b) => a.currentTime - b.currentTime)
                    setAnalytics(analytics)
                }
                else {
                    setError('Analytics could not be fetched')
                    setAnalytics([])
                }
            })
        }
    }, [from, to])

    useEffect(() => {
        if (sort && channelVideos && channelVideos.length > 0) {
            let column = sort?.value ? sort?.value : 'publishedAt'
            setChannelVideos(prev => lodash.orderBy([...prev], [column], ['desc']))
        }
    }, [sort])

    const getChannels = (callback) => {
        fetch('/api/channels').then(res => {
            if (res.ok) return res.json()
        }).then(data => {
            if (data?.channels) callback(null, data?.channels)
            else callback('Channels not found')
        }).catch(error => {
            callback(error)
        })
    }

    const getVideos = (channelId, callback) => {
        fetch(`/api/channels/${channelId}/videos`).then(res => {
            if (res.ok) return res.json()
            else callback('Videos not found')
        }).then(data => {
            if (data?.videos) callback(null, data?.videos)
            else callback('Videos not found')
        }).catch(error => {
            callback(error)
        })
    }

    const getAnalytics = (videoId, from, to, callback) => {
        fetch(`/api/videos/${videoId}/analytics?from=${from}&to=${to}`).then(res => {
            if (res.ok) return res.json()
            else callback('Analytics not found')
        }).then(data => {
            if (data?.analytics) callback(null, data?.analytics)
            else callback('Analytics not found')
        }).catch(error => {
            callback(error)
        })
    }

    const computeDifferences = (analytics) => {
        let difference = []
        for (var i = 1; i < analytics.length; ++i) {
            difference.push({
                currentTime: analytics[i].currentTime,
                views: (analytics[i]?.views - analytics[i - 1]?.views + 1) || 0,
                likes: (analytics[i]?.likes - analytics[i - 1]?.likes + 1) || 0,
                comments: (analytics[i]?.comments - analytics[i - 1]?.comments + 1) || 0,
            })
        }

        return difference
    }

    return (
        <>
            <Head>
                <title>Viewify | Spot the trends</title>
                <link rel="shortcut icon" href="/viewify_logo_background.webp" />
            </Head>

            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} current='Dashboard' />
            <ErrorDialog error={error} hideDialog={() => setError()} />

            <div className="lg:pl-72">
                <div className="sticky top-0 z-40 flex h-28 shrink-0 items-center gap-x-4 bg-black px-6 sm:px-8 lg:px-10">
                    <button type="button" className="-m-2.5 py-2.5 pl-2.5 pr-5 text-neutral-50 lg:hidden" onClick={() => setSidebarOpen(true)}>
                        <span className="sr-only">Open sidebar</span>
                        <SidebarIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    <div className="flex flex-1 gap-x-4 self-stretch items-center lg:gap-x-6">
                        {/* Search bar */}
                        <div className="relative flex flex-1 items-center">
                            <SearchChannel query={search} setQuery={setSearch} selected={channel} setSelected={setChannel} options={searchOptions} placeholder="Search here..." />
                        </div>

                        {/* Export data */}
                        <CSVLink data={analytics} filename='viewify_export.csv'>
                            <button className="hidden md:flex items-center gap-x-1.5 w-fit h-fit border-0 py-4 px-5 bg-zinc-900 rounded-xl focus:outline-none focus:ring-0">
                                <Files
                                    className="h-6 w-6 text-neutral-500"
                                    aria-hidden="true"
                                />
                                <span className="text-md text-neutral-500 font-medium">
                                    Export data
                                </span>
                            </button>
                        </CSVLink>

                        <div className="flex items-center relative">
                            <ProfileDropdown />
                        </div>
                    </div>
                </div>

                <main className="py-10 bg-black min-h-screen">
                    {loading ? (
                        <div className="h-72">
                            <Spinner />
                        </div>
                    ) : (
                        <div className="flex flex-col gap-y-6 px-4 sm:px-6 lg:px-8">
                            {/* Video analytics */}
                            <div className="flex flex-col gap-y-4 bg-zinc-900 rounded-xl py-8 px-10">
                                <div className="flex flex-col gap-y-3 md:flex-row md:items-center md:gap-x-2">
                                    <span className="flex grow text-xl text-neutral-50 font-medium">Video analytics</span>
                                    <div className="flex shrink relative">
                                        <DatePicker value={from} onChange={(selectedDate) => setFrom(selectedDate)} show={showFrom} setShow={setShowFrom} />
                                    </div>
                                    <div className="flex shrink relative">
                                        <DatePicker value={to} onChange={(selectedDate) => setTo(selectedDate)} show={showTo} setShow={setShowTo} />
                                    </div>
                                </div>
                                <div className="w-100 h-80">
                                    {analytics?.length > 0 ? (
                                        <CustomAreaChart data={analytics} x='currentTime' y='views' stroke='#61E9D5' color='#61E9D5' metricsFormatter={metricsFormatter} datetimeFormatter={datetimeFormatter} dateFormatter={dateFormatter} />
                                    ) : (
                                        <div className="text-lg text-neutral-400 text-center italic font-medium grid h-full mx-auto">
                                            <div className="place-self-center">
                                                No analytics found
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col gap-y-6 md:flex-row md:items-start md:gap-x-6">
                                {/* Last updated videos */}
                                <div className="flex flex-1 flex-col gap-y-10 bg-zinc-900 rounded-xl py-8 px-10">
                                    <div className="flex flex-col gap-y-4 md:flex-row md:items-center md:gap-x-2">
                                        <span className="flex grow text-xl text-neutral-50 font-medium">Last updated videos</span>
                                        <div className="flex flex-1 relative">
                                            <Select selected={sort} setSelected={setSort} options={sortOptions} textClass="text-neutral-400" backgroundClass="bg-black" accentClass="bg-neutral-800" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-y-8">
                                        {channelVideos?.length > 0 ? channelVideos?.map((v, i) => (
                                            <div onClick={() => setSelectedVideo(v)} className="flex flex-row items-center gap-x-6 cursor-pointer">
                                                <div className="border border-neutral-400 rounded-full p-0.5">
                                                    <div className={"h-4 w-4 rounded-full " + (v.id == selectedVideo?.id ? "bg-neutral-50" : "")} />
                                                </div>
                                                <span className="text-base text-neutral-50 font-medium">{i < 9 ? <span className="text-zinc-900">0</span> : ''}{i + 1}</span>
                                                <img src={v.thumbnail} className="h-12 rounded-lg" />
                                                <div className="flex flex-1 min-w-0">
                                                    <div className="text-base text-neutral-200 font-medium truncate whitespace-nowrap overflow-hidden">{v.title}</div>
                                                </div>
                                                <span className="flex-shrink-0 ml-3 text-base text-neutral-100 font-bold">{v.views.toLocaleString()}</span>
                                            </div>
                                        )) : (
                                            <div className="text-lg text-neutral-400 italic font-medium my-24 mx-auto">
                                                No videos found
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Last 48 hours */}
                                <div className="flex flex-1 flex-col gap-y-8 bg-zinc-900 rounded-xl py-8 px-10">
                                    {selectedVideo && (
                                        <div className="relative w-full overflow-hidden rounded-lg">
                                            <img src={selectedVideo?.thumbnailHD ? selectedVideo?.thumbnailHD : '/placeholder.jpeg'} className="w-full opacity-75" />
                                            <div class="absolute right-0 left-0 bottom-0 flex items-center bg-gradient-to-t from-zinc-900">
                                                <span class="text-lg text-neutral-50 font-medium pt-16 pb-5 px-8">
                                                    {selectedVideo?.title}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                    <span className="flex grow text-xl text-neutral-50 font-medium">Last 48 hours</span>
                                    <div className="grid grid-cols-2 gap-y-6 md:grid-cols-5 gap-x-2">
                                        <div className="flex flex-col gap-y-2">
                                            <span className="text-sm text-neutral-400 font-medium">Views</span>
                                            <span className="text-2xl text-neutral-50 font-bold">{totalViews ? metricsFormatter(totalViews) : '-'}</span>
                                        </div>
                                        <div className="flex flex-col gap-y-2">
                                            <span className="text-sm text-neutral-400 font-medium">Likes</span>
                                            <span className="text-2xl text-neutral-50 font-bold">{totalLikes ? metricsFormatter(totalLikes) : '-'}</span>
                                        </div>
                                        <div className="flex flex-col gap-y-2">
                                            <span className="text-sm text-neutral-400 font-medium">Comments</span>
                                            <span className="text-2xl text-neutral-50 font-bold">{totalComments ? metricsFormatter(totalComments) : '-'}</span>
                                        </div>
                                        <div className="flex flex-col gap-y-2">
                                            <span className="text-sm text-neutral-400 font-medium">Avg. Views</span>
                                            <span className="text-2xl text-neutral-50 font-bold">{averageViews ? metricsFormatter(averageViews) : '-'}</span>
                                        </div>
                                        <div className="flex flex-col gap-y-2">
                                            <span className="text-sm text-neutral-400 font-medium">Engagement</span>
                                            <span className="text-2xl text-neutral-50 font-bold">{averageEngagement ? percentageFormatter(averageEngagement) : '-'}</span>
                                        </div>
                                    </div>
                                    <div className="w-100 h-80 -ml-2">
                                        {viewsPerHour?.length > 0 ? (
                                            <CustomBarChart data={viewsPerHour} x='currentTime' y='views' stroke='#61E9D5' color='#61E9D5' metricsFormatter={metricsFormatter} datetimeFormatter={datetimeFormatter} hourFormatter={hourFormatter} />
                                        ) : (
                                            <div className="text-lg text-neutral-400 text-center italic font-medium grid h-full mx-auto">
                                                <div className="place-self-center">
                                                    No analytics found
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </>

    )
}
