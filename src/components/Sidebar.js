import { useState, useEffect, Fragment } from 'react'
//import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Dialog, Transition } from '@headlessui/react'
import { Shapes, CaretRight, X } from '@phosphor-icons/react'

const navigation = [
	{ name: 'Dashboard', href: '/dashboard', icon: Shapes, current: false }
]

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

function SidebarComponent({ user, current }) {
	return (
		<div className="flex grow flex-col gap-y-5 overflow-y-auto bg-black px-6 py-4">
			<div className="flex flex-row gap-x-2 h-24 shrink-0 items-center">
				<img className="h-16 w-16 rounded-full" src="/viewify_logo.png" />
                <div className="flex flex-col">
                    <p className="text-2xl font-bold leading-9 tracking-tight text-gray-50">
                        Viewify
                    </p>
                    <p className="text-md font-medium text-gray-400">
                        Spot the trends
                    </p>
                </div>
			</div>
			<nav className="flex flex-1 flex-col">
				<ul role="list" className="flex flex-1 flex-col gap-y-7">
					<li>
						<ul role="list" className="-mx-2 space-y-1">
							{navigation.map((item) => (
								<li key={item.name}>
									<a href={item.href}
										className={classNames(
											item.name === current
												? 'border-2 border-teal-300'
												: 'hover:border-2 hover:border-teal-300',
											'group flex gap-x-3 items-center rounded-xl py-3 px-3.5 text-md text-neutral-50 leading-6 font-normal'
										)}
									>
										<item.icon className="h-6 w-6 shrink-0 text-neutral-50" aria-hidden="true" />
										<span className="flex grow">{item.name}</span>
                                        <CaretRight className="h-5 w-5 text-teal-300" />
									</a>
								</li>
							))}
						</ul>
					</li>
				</ul>
			</nav>
		</div>
	)
}

export default function Sidebar({ sidebarOpen, setSidebarOpen, current }) {
	//const supabase = createClientComponentClient()
	const [user, setUser] = useState()

	const getUser = async () => {
		//const { data: { user } } = await supabase.auth.getUser()
		//setUser(user)
	}

	useEffect(() => {
		getUser()
	}, [])

	return (
		<div>
			<Transition.Root show={sidebarOpen} as={Fragment}>
				<Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
					<Transition.Child
						as={Fragment}
						enter="transition-opacity ease-linear duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="transition-opacity ease-linear duration-300"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-neutral-900/80" />
					</Transition.Child>

					<div className="fixed inset-0 flex">
						<Transition.Child
							as={Fragment}
							enter="transition ease-in-out duration-300 transform"
							enterFrom="-translate-x-full"
							enterTo="translate-x-0"
							leave="transition ease-in-out duration-300 transform"
							leaveFrom="translate-x-0"
							leaveTo="-translate-x-full"
						>
							<Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
								<Transition.Child
									as={Fragment}
									enter="ease-in-out duration-300"
									enterFrom="opacity-0"
									enterTo="opacity-100"
									leave="ease-in-out duration-300"
									leaveFrom="opacity-100"
									leaveTo="opacity-0"
								>
									<div className="absolute left-full top-0 flex w-16 justify-center pt-5">
										<button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
											<span className="sr-only">Close sidebar</span>
											<X className="h-6 w-6 text-neutral-100" aria-hidden="true" />
										</button>
									</div>
								</Transition.Child>

								{/* Sidebar component */}
								<SidebarComponent user={user} current={current} />
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition.Root>

			{/* Static sidebar for desktop */}
			<div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
				{/* Sidebar component */}
				<SidebarComponent user={user} current={current} />
			</div>
		</div>
	)
}