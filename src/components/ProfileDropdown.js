import { Fragment } from 'react'
import { useRouter } from 'next/navigation'
import { Menu, Transition } from '@headlessui/react'
import { UserCircle } from '@phosphor-icons/react'

export default function ProfileDropdown() {
	const router = useRouter()

	return (
		<Menu>
			<div>
				<Menu.Button className="inline-flex items-center w-full text-neutral-100 hover:text-teal-300 focus:outline-none">
					<UserCircle className="h-9 w-9" aria-hidden="true" />
				</Menu.Button>
			</div>
			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items className="absolute right-2 mt-28 w-48 origin-top-right rounded-md bg-neutral-800 focus:outline-none">
					<div className="px-1.5 py-1.5">
						<Menu.Item>
							{({ active }) => (
								<button
									onClick={() => router.replace('/api/auth/signout')}
									className="group flex w-full items-center rounded-md px-2 py-2 text-neutral-400 text-md"
								>
									Log out
								</button>
							)}
						</Menu.Item>
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	)
}