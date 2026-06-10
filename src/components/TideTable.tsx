import { useEffect, useMemo, useState } from 'react'
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts'

function formatNOAA(date) {
    const pad = n => String(n).padStart(2, '0')
  
    return (
      date.getFullYear() +
      pad(date.getMonth() + 1) +
      pad(date.getDate()) +
      ' ' +
      pad(date.getHours()) +
      ':' +
      pad(date.getMinutes())
    )
  }
  
  const now = new Date()
  const end = new Date(Date.now() + 24 * 60 * 60 * 1000)
  
  const TIDE_URL =
    `https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?` +
    `product=predictions` +
    `&application=chatgpt-demo` +
    `&station=9446807` +
    `&datum=MLLW` +
    `&interval=h` +
    `&units=english` +
    `&time_zone=lst_ldt` +
    `&format=json` +
    `&begin_date=${encodeURIComponent(formatNOAA(now))}` +
    `&end_date=${encodeURIComponent(formatNOAA(end))}`

function formatHour(t) {
  return new Date(t).toLocaleTimeString([], { hour: 'numeric' })
}

function formatLabel(point) {
  const time = new Date(point.time).toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit'
  })

  return `${time} · ${Number(point.height).toFixed(1)} ft`
}

export default function TideChart24h() {
  const [data, setData] = useState(null)

  useEffect(() => {
    const load = async () => {
      const res = await fetch(TIDE_URL)
      const json = await res.json()
      setData(json)
    }

    load()
    const id = setInterval(load, 60 * 60 * 1000)
    return () => clearInterval(id)
  }, [])

  const chartData = useMemo(() => {
    if (!data?.predictions) return []

    const now = Date.now()
    const cutoff = now + 24 * 60 * 60 * 1000

    return data.predictions
      .map(p => ({
        time: new Date(p.t).getTime(),
        label: formatHour(p.t),
        height: Number(p.v)
      }))
      .filter(d => d.time >= now && d.time <= cutoff)
  }, [data])

  const highLow = useMemo(() => {
    const result = []

    for (let i = 1; i < chartData.length - 1; i++) {
      const prev = chartData[i - 1].height
      const curr = chartData[i].height
      const next = chartData[i + 1].height

      const isHigh = curr > prev && curr > next
      const isLow = curr < prev && curr < next

      if (isHigh || isLow) {
        result.push({
          ...chartData[i],
          type: isHigh ? 'high' : 'low',
          index: i
        })
      }
    }

    return result
  }, [chartData])

  if (!chartData.length) {
    return (
      <div style={{ background: '#1a1a1a', padding: 16, borderRadius: 12 }}>
        Loading tide data...
      </div>
    )
  }

  return (
    <div
      style={{
        background: '#1a1a1a',
        borderRadius: 12,
        padding: 16,
        height: 260
      }}
    >
      <div style={{ fontSize: 12, opacity: 0.6, marginBottom: 10 }}>
        Tide Table
      </div>

      <ResponsiveContainer width="100%" height="90%">
        <ComposedChart data={chartData}>
          <CartesianGrid stroke="#333" strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="height"
            stroke="#4fc3f7"
            strokeWidth={2}
            dot={false}
          />

          {/* CUSTOM HIGH/LOW DOTS + LABELS */}
          <Line
            dataKey="height"
            stroke="transparent"
            dot={({ cx, cy, index }) => {
              const point = highLow.find(p => p.index === index)
              if (!point) return null

              const isHigh = point.type === 'high'

              return (
                <g>
                  {/* dot */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={4}
                    fill={isHigh ? '#4fc3f7' : '#ff9800'}
                  />

                  {/* label */}
                  <text
                    x={cx}
                    y={isHigh ? cy + 28 : cy - 18}
                    textAnchor="middle"
                    fontSize={11}
                    fill="#fff"
                    opacity={0.9}
                  >
                    {formatLabel(point)}
                  </text>
                </g>
              )
            }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}