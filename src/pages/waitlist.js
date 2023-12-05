import { useState } from 'react'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import { isEmailValid } from '@/utils'

export default function Waitlist() {
	const [email, setEmail] = useState()

	const [error, setError] = useState()
	const [loading, setLoading] = useState(false)
	const [success, setSuccess] = useState(false)

	const saveEmail = (e) => {
		e.preventDefault()

		if (!email || !isEmailValid(email)) setError('Provide a valid email.')
		else if (!success) {
			setLoading(true)

			const options = {
				method: 'POST',
				headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
				body: JSON.stringify({ email })
			}
			fetch('/api/save_email', options)
				.then(response => response.json())
				.then(data => {
					if (data && data.message == 'success') {
						setLoading(false)
						setSuccess(true)
					}
					else {
						setLoading(false)
						setError('Something went wrong. Try again later.')
					}
				})
				.catch(error => {
					setLoading(false)
					setError('Something went wrong. Try again later.')
				})
		}
	}

	return (
		<div className="min-h-screen bg-black">
			<div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
				<div className="mx-auto w-full max-w-md">
					<img className="mx-auto h-28 w-auto" src="/viewify_logo.png" />
				</div>

				<div className="mt-24 mx-auto w-full max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-2xl">
					<div className="border-clip">
						<form onSubmit={saveEmail} className="bg-black rounded-3xl border-2 border-teal-300 clip-corner px-6 py-24 sm:px-12 space-y-20">
							<h1 className="text-center text-3xl font-bold leading-9 tracking-tight text-gray-50">
								Join Viewify Waitlist
							</h1>

							{success ? (
								<p className="text-lg font-semibold text-center text-gray-300"><span className="underline font-extrabold">{email}</span> was added to the waitlist</p>
							) : <>
								<input id="email" name="email" type="email" onChange={(e) => setEmail(e.target.value)} autoComplete="email" placeholder="Enter your email address" required className="bg-transparent text-md font-normal text-neutral-500 rounded-lg w-full py-3.5 px-4 border-2 border-teal-300/[0.15] placeholder:text-neutral-500 focus:outline-none" />
								{error ? <p className="text-sm font-normal text-red-400 text-center mt-2">{error}</p> : ""}
							</>
							}

							<div className="border-clip-small">
								<button type="submit" className="flex w-full justify-center rounded-md bg-black py-3.5 px-4 text-md font-semibold leading-6 text-gray-50 clip-corner-small border-2 border-teal-300">
									{loading ? (
										<svg aria-hidden="true" role="status" className="inline w-5 h-5 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
											<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
										</svg>
									) : success ? (
										<CheckCircleIcon className="h-8 w-8 text-teal-300" />
									) : "Join Waitlist"}
								</button>
							</div>

						</form>
					</div>
				</div>
			</div>
		</div>
	)
}
