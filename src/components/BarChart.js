import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { capitalize } from '../../utils'

export default function CustomBarChart({ data, x, y, color, metricsFormatter, datetimeFormatter, hourFormatter }) {
    return (
        <ResponsiveContainer className="w-100 h-100">
            <BarChart data={data}>
                <defs>
                    <linearGradient id='barGradient' x1='0' y1='0' x2='0' y2='1'>
                        <stop offset='10%' stopColor={color} stopOpacity={0.7} />
                        <stop offset='90%' stopColor={color} stopOpacity={0.05} />
                    </linearGradient>
                </defs>
                <XAxis dataKey={x} scale='point' tickLine={false} tickMargin={10} minTickGap={50} tickFormatter={hourFormatter} padding={{ left: 10, right: 10 }} />
                <YAxis axisLine={false} tickLine={false} tickMargin={10} tickFormatter={metricsFormatter} />
                <CartesianGrid vertical={false} stroke='#666666' strokeOpacity={0.5} />
                <Tooltip
                    wrapperClassName="rounded-xl"
                    contentStyle={{ backgroundColor: '#171717', border: 0, padding: '15px' }}
                    labelClassName='text-neutral-100'
                    itemStyle={{ color: 'white' }}
                    separator=': '
                    formatter={(value, name) => [value.toLocaleString(), capitalize(name?.toUpperCase())]}
                    labelFormatter={(label) => `When: ${datetimeFormatter(label)}`}
                />
                <Bar type='monotone' barSize={8} dataKey={y} fill='url(#barGradient)' />
            </BarChart>
        </ResponsiveContainer>
    )
}