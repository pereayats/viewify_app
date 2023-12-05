import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CaretDown } from '@phosphor-icons/react'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Select({ selected, setSelected, options, textClass, backgroundClass, borderClass, accentClass, maxWidth }) {

    return (
        <Listbox value={selected} onChange={setSelected}>
            {({ open }) => (
                <>
                    <Listbox.Button className={"relative w-full text-left cursor-default pr-10 py-2.5 pl-4 text-sm font-medium rounded-xl focus:outline-none " + `${textClass} ${backgroundClass} ${borderClass}`}>
                        <span className="block truncate">{selected.label}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-4">
                            <CaretDown className={"h-4 w-4 " + textClass} aria-hidden="true" />
                        </span>
                    </Listbox.Button>

                    <Transition
                        show={open}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className={"absolute z-10 mt-1 max-h-56 w-full overflow-auto text-sm rounded-xl py-1 focus:outline-none " + `${backgroundClass} ${borderClass} ${maxWidth ? maxWidth : 'max-w-md'}`}>
                            {options.map((o) => (
                                <Listbox.Option key={o.value} value={o}
                                    className={({ active }) =>
                                        classNames(
                                            active ? accentClass : '',
                                            `relative cursor-default select-none py-2 pl-3 pr-9 ${textClass}`
                                        )
                                    }
                                >
                                    <span className="font-medium ml-3 block truncate">
                                        {o.label}
                                    </span>
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </>
            )}
        </Listbox>
    )
}