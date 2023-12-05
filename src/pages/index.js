import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Head from 'next/head'
import { Dialog } from '@headlessui/react'
import { List, X, Check, ChartBar, MagnifyingGlass, ChatsCircle, CaretRight } from '@phosphor-icons/react'

const navigation = [
    { name: 'Overview', href: '#overview' },
    { name: 'Pricing', href: '#pricing' },
]

const overview = [
    {
        id: 1,
        title: 'Video analytics',
        href: '#',
        description:
            'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        icon: ChartBar,
    },
    {
        id: 2,
        title: 'Views ranking',
        href: '#',
        description:
            'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        icon: MagnifyingGlass,
    },
    {
        id: 3,
        title: 'Impression analysis',
        href: '#',
        description:
            'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
        icon: ChatsCircle,
    },
]

const testimonials = [
    {
        id: 1,
        href: '#',
        description:
            'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
        imageUrl:
            '/influencer_1.jpeg',
        author: {
            name: 'Ava Smith',
            imageUrl:
                'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
    },
    {
        id: 2,
        href: '#',
        description:
            'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
        imageUrl:
            '/influencer_2.jpeg',
        author: {
            name: 'Michael Foster',
            imageUrl:
                'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
    },
]

const tiers = [
    {
        name: 'Basic',
        id: 'tier-basic',
        href: '#',
        priceMonthly: '$9.99',
        description: 'The essentials to provide your best work for clients.',
        features: ['5 products', 'Up to 1,000 subscribers', 'Basic analytics', '48-hour support response time'],
        mostPopular: false,
    },
    {
        name: 'Premium',
        id: 'tier-premium',
        href: '#',
        priceMonthly: '$9.99',
        description: 'A plan that scales with your rapidly growing business.',
        features: [
            '25 products',
            'Up to 10,000 subscribers',
            'Advanced analytics',
            '24-hour support response time',
            'Marketing automations',
        ],
        mostPopular: true,
    },
    {
        name: 'Enterprise',
        id: 'tier-enterprise',
        href: '#',
        priceMonthly: '$9.99',
        description: 'Dedicated support and infrastructure for your company.',
        features: [
            'Unlimited products',
            'Unlimited subscribers',
            'Advanced analytics',
            '1-hour, dedicated support response time',
            'Marketing automations',
        ],
        mostPopular: false,
    },
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

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Landing() {
    const router = useRouter()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <>
            <Head>
                <title>Viewify | Spot the trends</title>
                <link rel="shortcut icon" href="/viewify_logo_background.webp" />
            </Head>

            {/* HERO AREA */}
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
                                            href="/signup"
                                            className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-neutral-50 hover:bg-neutral-900"
                                        >
                                            Start for free
                                        </a>
                                        <a
                                            href="/login"
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

                {/* HERO AREA */}
                <div className="relative isolate pt-24">
                    <div
                        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                        aria-hidden="true"
                    >
                        <div
                            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#42EAE2] to-[#5EEAD4] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                            style={{
                                clipPath:
                                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                            }}
                        />
                    </div>
                    <div className="py-24 sm:py-32 lg:pb-40">
                        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                            <div className="mx-auto max-w-xl text-center">
                                <h1 className="text-4xl font-extrabold tracking-tight text-neutral-50 sm:text-6xl">
                                    Spot the <span className="underline underline-offset-8 decoration-teal-300">trends</span> before anyone else
                                </h1>
                                <p className="mt-8 text-2xl font-normal leading-8 text-neutral-500">
                                    We're not just another tool; we're the answer to your need, especially in tracking, ranking, and monitoring in real-time, all in one place.
                                </p>
                                <div className="mt-10 w-fit mx-auto border-clip-small-white">
                                    <button onClick={() => router.replace('/signup')} className="flex justify-center rounded-md bg-white py-3 px-8 text-md font-semibold leading-6 text-black clip-corner-small-white border-2 border-white">
                                        Start for free
                                    </button>
                                </div>
                            </div>
                            <div className="mt-16 flow-root sm:mt-24">
                                <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                                    <img
                                        src="/screenshot.png"
                                        alt="App screenshot"
                                        width={2432}
                                        height={1442}
                                        className="rounded-md shadow-2xl ring-2 ring-teal-300/90"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                        aria-hidden="true"
                    >
                        <div
                            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#42EAE2] to-[#5EEAD4] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                            style={{
                                clipPath:
                                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* OVERVIEW */}
            <div id="overview" className="bg-black py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-neutral-50 sm:text-5xl">Get mind blowing results by viewify services</h2>
                    </div>
                    <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                        {overview.map((o) => (
                            <div className="border-clip">
                                <div className="bg-black flex flex-col gap-y-4 rounded-3xl border-2 border-teal-300 clip-corner px-8 py-10">
                                    <h4 className="text-2xl font-medium tracking-tight text-neutral-50">{o.title}</h4>
                                    <p className="text-lg font-normal leading-6 text-neutral-500">
                                        {o.description}
                                    </p>
                                    <div className="flex flex-row items-center mt-16">
                                        <div className="flex grow">
                                            <o.icon className="h-12 w-12 p-2 rounded-md bg-teal-300 text-black" />
                                        </div>
                                        <a href={o.href} className="flex flex-row items-center gap-x-2 text-base font-normal text-neutral-400">
                                            Learn more
                                            <CaretRight />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* TESTIMONIALS */}
            <div className="overflow-hidden bg-black py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                        <div className="lg:pr-8 lg:pt-4">
                            <div className="lg:max-w-lg">
                                <h2 className="text-3xl font-bold tracking-tight text-neutral-50 sm:text-5xl">Unlock the power of views and impression</h2>
                                <p className="mt-8 text-xl font-normal leading-8 text-neutral-500">
                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                </p>
                                <div className="mt-10 w-fit border-clip-small-white">
                                    <button onClick={() => router.replace('/signup')} className="flex justify-center rounded-md bg-white py-3 px-8 text-md font-semibold leading-6 text-black clip-corner-small-white border-2 border-white">
                                        Start for free
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="mx-auto grid w-full auto-rows-fr grid-cols-1 gap-6 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                            {testimonials.map((t) => (
                                <div
                                    key={t.id}
                                    className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-black px-8 pb-8 pt-80 sm:pt-48 lg:pt-80"
                                >
                                    <img src={t.imageUrl} className="absolute inset-0 -z-10 h-full w-full object-cover" />
                                    <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
                                    <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

                                    <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-base leading-6 text-neutral-50">
                                        <div className="flex items-center gap-x-2.5">
                                            <img src={t.author.imageUrl} className="h-10 w-10 flex-none rounded-full bg-white/10" />
                                            <div className="flex flex-col gap-y-1">
                                                {t.author.name}
                                                <span className="text-xs text-neutral-300 font-normal whitespace-nowrap">{t.description}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* PRICING */}
            <div className="bg-black py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-4xl text-center">
                        <h2 className="text-base font-semibold leading-7 text-neutral-400">Get started with Viewify</h2>
                        <p className="mt-6 text-3xl font-bold tracking-tight text-neutral-50 sm:text-5xl">
                            Pay us and relax
                        </p>
                    </div>
                    <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                        {tiers.map((tier, tierIdx) => (
                            <div
                                key={tier.id}
                                className={classNames(
                                    tier.mostPopular ? 'lg:z-10 lg:rounded-b-none border-2 border-teal-300' : 'lg:mt-8',
                                    tierIdx === 0 ? 'lg:rounded-r-none' : '',
                                    tierIdx === tiers.length - 1 ? 'lg:rounded-l-none' : '',
                                    'flex flex-col justify-between rounded-3xl bg-black p-8 ring-1 ring-teal-300/50 xl:p-10'
                                )}
                            >
                                <div>
                                    <h3
                                        id={tier.id}
                                        className="text-3xl text-neutral-50 font-extrabold leading-8"
                                    >
                                        {tier.name}
                                    </h3>
                                    <p className="mt-4 text-lg font-normal leading-8 text-neutral-400">{tier.description}</p>
                                    <p className="mt-6 mb-8 flex items-start gap-x-2">
                                        <span className="text-6xl font-extrabold tracking-tight text-neutral-50">{tier.priceMonthly}</span>
                                        <span className="text-base font-normal leading-6 text-neutral-300 mt-2">Monthly</span>
                                    </p>
                                    <a
                                        href={tier.href}
                                        aria-describedby={tier.id}
                                        className={classNames(
                                            tier.mostPopular
                                                ? 'border-clip-small'
                                                : 'border-clip-small-white',
                                            'text-md font-semibold leading-6'
                                        )}
                                    >
                                        <span className={classNames(
                                            tier.mostPopular
                                                ? 'bg-black text-neutral-50 clip-corner-small border-teal-300'
                                                : 'bg-white text-black clip-corner-small-white border-white',
                                            'flex w-full justify-center rounded-md py-3 px-7 border-2'
                                        )}>
                                            Get started
                                        </span>
                                    </a>
                                    <ul role="list" className="mt-8 space-y-3 text-base leading-6 text-neutral-400">
                                        {tier.features.map((feature) => (
                                            <li key={feature} className="flex gap-x-3">
                                                <Check className="h-6 w-5 flex-none text-teal-300" aria-hidden="true" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* BENEFITS */}
            <div className="overflow-hidden bg-black py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto grid place-items-center max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                        <div className="lg:ml-auto lg:pl-4 lg:pt-4">
                            <div className="lg:max-w-lg">
                                <h2 className="text-3xl font-bold tracking-tight text-neutral-50 sm:text-5xl">Get a boost on your channel with viewify</h2>
                                <p className="mt-8 text-xl font-normal leading-8 text-neutral-500">
                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                </p>
                                <div className="mt-10 w-fit border-clip-small-white">
                                    <button onClick={() => router.replace('/signup')} className="flex justify-center rounded-md bg-white py-3 px-8 text-md font-semibold leading-6 text-black clip-corner-small-white border-2 border-white">
                                        Start for free
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-end justify-end lg:order-first">
                            <img
                                src="/benefits.png"
                                alt="Benefits"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Call To Action */}
            <div className="bg-black bg-gradient-to-t from-teal-300 via-black">
                <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-4xl font-extrabold tracking-tight text-neutral-50 sm:text-6xl">Get started for free</h2>
                        <p className="mt-8 text-xl font-normal leading-8 text-neutral-500">
                            We're not just another tool; we're the answer to your need, especially in tracking, ranking, and monitoring in real-time, all in one place.
                        </p>
                        <div className="mt-10 w-fit border-clip-small-white mx-auto">
                            <button onClick={() => router.replace('/signup')} className="flex justify-center rounded-md bg-white py-3 px-8 text-md font-semibold leading-6 text-black clip-corner-small-white border-2 border-white">
                                Start for free
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="bg-teal-300">
                <footer className="bg-black rounded-t-3xl">
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
            </div>
        </>
    )
}
