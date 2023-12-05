import Datepicker from 'tailwind-datepicker-react'

export default function DatePicker({ value, onChange, show, setShow }) {
    const options = {
        autoHide: true,
        todayBtn: false,
        clearBtn: false,
        theme: {
            background: 'bg-black',
            icons: 'text-neutral-400 font-bold bg-transparent hover:bg-neutral-800 hover:text-neutral-400',
            text: 'font-medium text-neutral-400 hover:bg-neutral-800',
            input: 'bg-black border-0 font-medium text-neutral-400 rounded-xl py-3 focus:outline-none',
            inputIcon: 'text-neutral-400 h-4',
            selected: 'bg-teal-300 text-neutral-800',
        },
        datepickerClassNames: 'top-10 right-0',
        language: 'en',
        weekDays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        inputNameProp: 'date',
        inputIdProp: 'date',
        inputPlaceholderProp: 'Select Date',
        inputDateFormatProp: {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }
    }

    return (
        <Datepicker value={value} options={options} onChange={onChange} show={show} setShow={setShow} />
    )
}