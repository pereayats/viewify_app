import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Head from 'next/head'
import { Dialog } from '@headlessui/react'
import { List, X } from '@phosphor-icons/react'

const navigation = [
    { name: 'Overview', href: '#overview' },
    { name: 'Pricing', href: '#pricing' },
]

const footer = {
    solutions: [
        { name: 'Marketing', href: '#' },
        { name: 'Analytics', href: '#' },
        { name: 'Commerce', href: '#' },
        { name: 'Insights', href: '#' },
    ],
    support: [
        { name: 'Pricing', href: '#' },
        { name: 'Documentation', href: '#' },
        { name: 'Guides', href: '#' },
        { name: 'API Status', href: '#' },
    ],
    company: [
        { name: 'About', href: '#' },
        { name: 'Blog', href: '#' },
        { name: 'Jobs', href: '#' },
        { name: 'Press', href: '#' },
        { name: 'Partners', href: '#' },
    ],
    legal: [
        { name: 'Claim', href: '#' },
        { name: 'Privacy', href: '#' },
        { name: 'Terms', href: '#' },
    ],
    social: [
        {
            name: 'Facebook',
            href: '#',
            icon: (props) => (
                <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                    <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                    />
                </svg>
            ),
        },
        {
            name: 'Instagram',
            href: '#',
            icon: (props) => (
                <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                    <path
                        fillRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clipRule="evenodd"
                    />
                </svg>
            ),
        },
        {
            name: 'Twitter',
            href: '#',
            icon: (props) => (
                <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
            ),
        },
        {
            name: 'GitHub',
            href: '#',
            icon: (props) => (
                <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                    <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                    />
                </svg>
            ),
        },
        {
            name: 'YouTube',
            href: '#',
            icon: (props) => (
                <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                    <path
                        fillRule="evenodd"
                        d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                        clipRule="evenodd"
                    />
                </svg>
            ),
        },
    ],
}

export default function NewPassword() {
    const supabase = createClientComponentClient()
    const router = useRouter()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const [password, setPassword] = useState()
    const [repeat, setRepeat] = useState()

    const [error, setError] = useState()
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)

    const newPassword = async (e) => {
        e.preventDefault()
		setError()

		if (!password || !repeat) setError('Provide a password')
        else if (password !== repeat) setError('Passwords do not match')
		else {
			setLoading(true)
			const { data, error } = await supabase.auth.updateUser({ password })

			setLoading(false)
			if (error && error.message) setError(error.message)
			else if (error) setError('Something went wrong')
            else setSuccess(true)
		}
    }

    return (
        <>
            <Head>
                <title>Viewify | Spot the trends</title>
                <link rel="shortcut icon" href="/viewify_logo_background.webp" />
            </Head>

            <div className="bg-black">
                {/* NAV BAR */}
                <header className="absolute inset-x-0 top-0 z-50">
                    <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                        <div className="flex lg:flex-1">
                            <a href="/" className="-m-1.5 p-1.5">
                                <span className="sr-only">Viewify</span>
                                <img className="h-16 w-auto" src="/viewify_logo.png" />
                            </a>
                        </div>
                        <div className="flex lg:hidden">
                            <button
                                type="button"
                                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-teal-300"
                                onClick={() => setMobileMenuOpen(true)}
                            >
                                <span className="sr-only">Open main menu</span>
                                <List className="h-8 w-8" weight='bold' aria-hidden="true" />
                            </button>
                        </div>
                        <div className="hidden lg:flex lg:gap-x-12">
                            {navigation.map((item) => (
                                <a key={item.name} href={item.href} className="text-md font-semibold leading-6 text-neutral-50">
                                    {item.name}
                                </a>
                            ))}
                        </div>
                        <div className="hidden lg:flex lg:flex-row lg:gap-x-12 lg:items-center lg:flex-1 lg:justify-end">
                            <a href="/login" className="text-md font-semibold leading-6 text-neutral-50">
                                Log in
                            </a>
                            <div className="border-clip-small">
                                <button onClick={() => router.replace('/signup')} className="flex w-full justify-center rounded-md bg-black py-3 px-7 text-md font-semibold leading-6 text-neutral-50 clip-corner-small border-2 border-teal-300">
                                    Start for free
                                </button>
                            </div>
                        </div>
                    </nav>

                    <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                        <div className="fixed inset-0 z-50" />
                        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                            <div className="flex items-center justify-between">
                                <a href="/" className="-m-1.5 p-1.5">
                                    <span className="sr-only">Viewify</span>
                                    <img className="h-16 w-auto" src="/viewify_logo.png" />
                                </a>
                                <button type="button" className="-m-2.5 rounded-md p-2.5 text-neutral-50" onClick={() => setMobileMenuOpen(false)}>
                                    <span className="sr-only">Close menu</span>
                                    <X className="h-8 w-8" aria-hidden="true" />
                                </button>
                            </div>
                            <div className="mt-6 flow-root">
                                <div className="-my-6 divide-y divide-neutral-500/10">
                                    <div className="space-y-2 py-6">
                                        {navigation.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-neutral-50 hover:bg-neutral-900"
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                    <div className="py-2">
                                        <a
                                            href="#"
                                            className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-neutral-50 hover:bg-neutral-900"
                                        >
                                            Start for free
                                        </a>
                                        <a
                                            href="#"
                                            className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-neutral-50 hover:bg-neutral-900"
                                        >
                                            Log in
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </Dialog.Panel>
                    </Dialog>
                </header>
            </div>

            {/* NEW PASSWORD */}
            <div className="min-h-screen bg-black py-32">
                <div className="py-12 sm:px-6 lg:px-8">

                    <div className="mx-auto w-full max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-2xl">
                        <div className="border-clip">
                            <form onSubmit={newPassword} className="bg-black rounded-3xl border-2 border-teal-300 clip-corner px-6 py-24 sm:px-12 space-y-12">
                                {success ? (
                                    <>
                                        <h1 className="text-center text-3xl font-bold leading-9 tracking-tight text-neutral-50">Password Reset</h1>
                                        <h2 className="text-center text-md font-normal text-neutral-300">Your password has been successfully changed.</h2>
                                        <div className="text-center">
                                        <a href="/dashboard" className="text-md font-normal text-teal-300 underline underline-offset-2 decoration-teal-600">Back to dashboard</a>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <h1 className="text-center text-3xl font-bold leading-9 tracking-tight text-neutral-50">
                                            Set New Password
                                        </h1>

                                        <div className="flex flex-col gap-y-6">
                                            <input id="password" name="password" type="password" onChange={(e) => setPassword(e.target.value)} autoComplete="password" placeholder="Enter password" required className="bg-transparent text-md font-normal text-neutral-500 rounded-lg w-full py-3.5 px-4 border-2 border-teal-300/[0.15] placeholder:text-neutral-500 focus:outline-none" />
                                            <input id="repeat" name="repeat" type="password" onChange={(e) => setRepeat(e.target.value)} autoComplete="password" placeholder="Repeat password" required className="bg-transparent text-md font-normal text-neutral-500 rounded-lg w-full py-3.5 px-4 border-2 border-teal-300/[0.15] placeholder:text-neutral-500 focus:outline-none" />
                                            {error ? <p className="text-sm font-normal text-red-400 text-center mt-2">{error}</p> : ""}
                                        </div>

                                        <div className="flex flex-row items-center gap-x-8 justify-center">
                                            <div className="border-clip-small">
                                                <button type="submit" className="flex w-full justify-center rounded-md bg-black py-3.5 px-10 text-md font-semibold leading-6 text-gray-50 clip-corner-small border-2 border-teal-300">
                                                    {loading ? (
                                                        <svg aria-hidden="true" role="status" className="inline w-5 h-5 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                                        </svg>
                                                    ) : "Reset Password"}
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* FOOTER */}
            <footer className="bg-black">
                <h2 id="footer-heading" className="sr-only">
                    Footer
                </h2>
                <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
                    <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                        <div className="space-y-8">
                            <img
                                className="h-16"
                                src="/viewify_logo.png"
                                alt="Viewify"
                            />
                            <p className="text-base font-normal leading-6 text-neutral-500">
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            </p>
                            <div className="flex space-x-6">
                                {footer.social.map((item) => (
                                    <a key={item.name} href={item.href} className="text-neutral-500 hover:text-neutral-500">
                                        <span className="sr-only">{item.name}</span>
                                        <item.icon className="h-6 w-6" aria-hidden="true" />
                                    </a>
                                ))}
                            </div>
                        </div>
                        <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                            <div className="md:grid md:grid-cols-2 md:gap-8">
                                <div>
                                    <h3 className="text-base font-bold leading-6 text-neutral-50">Solutions</h3>
                                    <ul role="list" className="mt-6 space-y-4">
                                        {footer.solutions.map((item) => (
                                            <li key={item.name}>
                                                <a href={item.href} className="text-sm leading-6 text-neutral-100 hover:text-neutral-200">
                                                    {item.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="mt-10 md:mt-0">
                                    <h3 className="text-base font-bold leading-6 text-neutral-50">Support</h3>
                                    <ul role="list" className="mt-6 space-y-4">
                                        {footer.support.map((item) => (
                                            <li key={item.name}>
                                                <a href={item.href} className="text-sm leading-6 text-neutral-100 hover:text-neutral-200">
                                                    {item.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="md:grid md:grid-cols-2 md:gap-8">
                                <div>
                                    <h3 className="text-base font-bold leading-6 text-neutral-50">Company</h3>
                                    <ul role="list" className="mt-6 space-y-4">
                                        {footer.company.map((item) => (
                                            <li key={item.name}>
                                                <a href={item.href} className="text-sm leading-6 text-neutral-100 hover:text-neutral-200">
                                                    {item.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="mt-10 md:mt-0">
                                    <h3 className="text-base font-bold leading-6 text-neutral-50">Legal</h3>
                                    <ul role="list" className="mt-6 space-y-4">
                                        {footer.legal.map((item) => (
                                            <li key={item.name}>
                                                <a href={item.href} className="text-sm leading-6 text-neutral-100 hover:text-neutral-200">
                                                    {item.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-16 border-t border-neutral-900/10 pt-8 sm:mt-20 lg:mt-24">
                        <p className="text-xs leading-5 text-neutral-300">&copy; 2023 Viewify. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </>
    )
}
