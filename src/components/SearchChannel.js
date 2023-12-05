import { Fragment } from 'react'
import { Transition, Combobox } from '@headlessui/react'
import { MagnifyingGlass } from '@phosphor-icons/react'
import { metricsFormatter } from '../../utils'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function SearchChannel({ query, setQuery, selected, setSelected, options, placeholder }) {

    const filtered = query === '' ? options : options.filter((o) => {
        return (o.title.toLowerCase().includes(query.toLowerCase()) || o.customUrl.toLowerCase().includes(query.toLowerCase()))
    })

    return (
        <Combobox value={selected} onChange={setSelected} className="relative">
            {({ open }) => (
                <>
                    <Combobox.Input onChange={(e) => setQuery(e.target.value)} placeholder={placeholder} className="text-md font-medium rounded-xl bg-zinc-900 text-gray-500 placeholder:text-gray-500 w-full py-4 pl-6 pr-10 border-0 focus:outline-none focus:ring-0" />
                    <Combobox.Button className="absolute top-12.5 right-5">
                        <MagnifyingGlass className="h-5 w-5 text-teal-300" aria-hidden="true" />
                    </Combobox.Button>
                    <Transition
                        show={open && filtered?.length > 0}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Combobox.Options className="absolute top-16 z-10 max-h-64 w-full overflow-auto text-md font-medium rounded-xl bg-zinc-900 py-1 focus:outline-none">
                            {filtered.map((o) => (
                                <Combobox.Option key={o.id} value={o}
                                    className={({ active }) =>
                                        classNames(
                                            active ? '' : '',
                                            'relative cursor-pointer select-none py-4 px-6 text-neutral-50'
                                        )
                                    }
                                >
                                    <div className="flex flex-row items-center gap-x-3">
                                        <img src={o.thumbnail} className="h-10 w-10 rounded-full" />
                                        <div className="flex flex-col gap-y-0.5">
                                            <span className="font-medium block truncate">
                                                {o.title}
                                            </span>
                                            {o.subscribers && (
                                                <span className="font-medium text-neutral-400 text-sm">
                                                    {metricsFormatter(o.subscribers)} subscribers
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </Combobox.Option>
                            ))}
                        </Combobox.Options>
                    </Transition>
                </>
            )}
        </Combobox>
    )
}