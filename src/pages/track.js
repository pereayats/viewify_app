import { useState } from "react"
import PasswordProtected from "@/components/PasswordProtected"

export default function Track() {
    const [authenticated, setAuthenticated] = useState(false)
    const [videoURL, setVideoURL] = useState()

    function isValidUrl(string) {
        try {
            new URL(string)
            return true
        }
        catch (err) {
            return false
        }
    }

    const trackStats = (e) => {
        e.preventDefault()

        if (!videoURL) alert("No video URL was provided")
        else if (!isValidUrl(videoURL)) alert("Video URL is not valid")
        else {
            const options = {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({ videoURL })
            }

            fetch('/api/track_stats', options)
                .then(response => {
                    if (response.ok) return response.json()
                    else throw Error('Something went wrong')
                })
                .then(data => {
                    if (data && data.message == 'success') alert("Channel and videos added correctly")
                    else if (data.error) alert(data.error)
                    else alert("Something went wrong")
                })
                .catch(error => alert(error))
        }
    }

    return (
        <>
            {authenticated ? (
                <main className="min-h-screen bg-stone-200 p-48">
                    <form onSubmit={trackStats}>
                        <label for="searchbox" className="mb-2 text-sm font-medium text-gray-900 sr-only">Track</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input type="url" id="searchbox" onChange={(e) => setVideoURL(e.target.value)} className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 outline-none focus:ring-red-500 focus:border-red-500 focus:ring-2" placeholder="Track Youtube Video" />
                            <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2">Track</button>
                        </div>
                    </form>
                </main>
            ) : (
                <PasswordProtected onAuthentication={setAuthenticated} />
            )}
        </>
    )
}
