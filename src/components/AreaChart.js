import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { capitalize } from '../../utils'

export default function CustomAreaChart({ data, x, y, color, stroke, metricsFormatter, datetimeFormatter, dateFormatter }) {
    return (
        <ResponsiveContainer className="w-100 h-100">
            <AreaChart data={data}>
                <defs>
                    <linearGradient id='gradient' x1='0' y1='0' x2='0' y2='1'>
                        <stop offset='2%' stopColor={color} stopOpacity={0.4} />
                        <stop offset='98%' stopColor={color} stopOpacity={0} />
                    </linearGradient>
                </defs>
                <XAxis dataKey={x} scale='point' tickLine={false} tickMargin={10} padding={{ left: 10, right: 10 }} minTickGap={180} tickFormatter={datetimeFormatter} />
                <YAxis axisLine={false} tickLine={false} tickMargin={10} tickFormatter={metricsFormatter} />
                <Tooltip
                    wrapperClassName="rounded-xl"
                    contentStyle={{ backgroundColor: '#171717', border: 0, padding: '15px' }}
                    labelClassName='text-neutral-100'
                    itemStyle={{ color: 'white' }}
                    separator=': '
                    formatter={(value, name) => [value.toLocaleString(), capitalize(name?.toUpperCase())]}
                    labelFormatter={(label) => `When: ${datetimeFormatter(label)}`}
                />
                <Area type='monotone' dataKey={y} stroke={stroke} strokeWidth={4} fill='url(#gradient)' fillOpacity={0.7} />
            </AreaChart>
        </ResponsiveContainer>
    )
}