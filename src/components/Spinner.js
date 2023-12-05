import { Hourglass } from "@phosphor-icons/react"

export default function Spinner() {
    return (
        <div className="grid h-full">
            <Hourglass size={60} className="text-teal-300 animate-bounce mx-auto place-self-center" weight='regular' />
        </div>
    )
}