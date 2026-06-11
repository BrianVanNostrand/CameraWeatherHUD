import { useEffect, useMemo, useState } from 'react'
import Chart from 'react-apexcharts'

const WEATHER_URL =
  'https://api.open-meteo.com/v1/forecast?latitude=47.04&longitude=-122.90&hourly=temperature_2m,precipitation_probability&timezone=auto&temperature_unit=fahrenheit'

type WeatherData = {
  hourly: {
    time: string[]
    temperature_2m: number[]
    precipitation_probability: number[]
  }
}

type ChartPoint = {
  x: number
  temp: number
  rain: number
}

export default function HourlyTimeline() {
  const [data, setData] = useState<WeatherData | null>(null)

  useEffect(() => {
    const load = async () => {
      const res = await fetch(WEATHER_URL)
      const json = await res.json()
      setData(json)
    }

    load()
    const id = setInterval(load, 15 * 60 * 1000)
    return () => clearInterval(id)
  }, [])

  const seriesData = useMemo<ChartPoint[]>(() => {
    if (!data?.hourly) return []

    return data.hourly.time.slice(0, 24).map((t, i) => ({
      x: new Date(t).getTime(),
      temp: Math.round(data.hourly.temperature_2m[i]),
      rain: data.hourly.precipitation_probability[i]
    }))
  }, [data])

  if (!seriesData.length) {
    return (
      <div
        style={{
          background: '#1a1a1a',
          borderRadius: 12,
          padding: 16,
          height: 260,
          color: '#aaa'
        }}
      >
        Loading hourly forecast...
      </div>
    )
  }
  const tempMaxPoint = seriesData.reduce((best, d) =>
  d.temp > best.temp ? d : best,
  seriesData[0]
)

const tempMinPoint = seriesData.reduce((best, d) =>
  d.temp < best.temp ? d : best,
  seriesData[0]
)

const rainMaxPoint = seriesData.reduce((best, d) =>
  d.rain > best.rain ? d : best,
  seriesData[0]
)

const rainMinPoint = seriesData.reduce((best, d) =>
  d.rain < best.rain ? d : best,
  seriesData[0]
)
  const HOUR = 60 * 60 * 1000

  const floorToHour = (t: number) => Math.floor(t / HOUR) * HOUR
  const ceilToHour = (t: number) => Math.ceil(t / HOUR) * HOUR

  const minTime = floorToHour(seriesData[0].x)
  const maxTime = ceilToHour(seriesData[seriesData.length - 1].x)

  const hourCount = (maxTime - minTime) / HOUR
  const now = Date.now()

const clampedNow = Math.min(
  Math.max(now, minTime),
  maxTime
)
  const minTemp = Math.min(...seriesData.map(d => d.temp))
  const maxTemp = Math.max(...seriesData.map(d => d.temp))
  const roundDown = (n: number, step: number) =>
  Math.floor(n / step) * step

  const roundUp = (n: number, step: number) =>
    Math.ceil(n / step) * step

  const tempStep = 5

  const tempMin = roundDown(Math.min(...seriesData.map(d => d.temp)) - 5, tempStep)
  const tempMax = roundUp(Math.max(...seriesData.map(d => d.temp)) + 5, tempStep)
  return (
    <div style={{ background: '#1a1a1a', borderRadius: 12, padding: 24 }}>
      <Chart
        type="line"
        height={260}
        series={[
          {
            name: 'Temperature',
            data: seriesData.map(d => ({ x: d.x, y: d.temp }))
          },
          {
            name: 'Rain %',
            data: seriesData.map(d => ({ x: d.x, y: d.rain }))
          }
        ]}
        options={{
          chart: {
            background: 'transparent',
            toolbar: { show: false },
            animations: {
              enabled: true,
              speed: 600
            }
          },

          stroke: {
            curve: 'smooth',
            width: [3, 2]
          },

          colors: ['#ff9800', '#4fc3f7'],

          xaxis: {
            type: 'datetime',

            min: minTime,
            max: maxTime,

            tickAmount: hourCount, // 👈 forces 1 tick per hour
            tickPlacement: 'on',

            labels: {
              rotate: 0,

              formatter: (value: number) => {
                const hour = new Date(value).getHours()
                return (hour % 12 || 12).toString()
              }
            }
          },

          yaxis: [
            {
              title: { text: 'Temp' },
            
              min: tempMin,
              max: tempMax,
            
              tickAmount: 5,
            
              forceNiceScale: false,
            
              labels: {
                style: { colors: '#888',fontSize: "15px" },
                formatter: (val: number) => Math.round(val).toString()
              }
            },
            {
              opposite: true,
              title: { text: 'Rain' },
          
              min: 0,
              max: 100,
          
              tickAmount: 5, // gives 0, 20, 40, 60, 80, 100-ish spacing
          
              labels: {
                style: { colors: '#888',fontSize: "15px"  },
                formatter: (val: number) => Math.round(val).toString() // 👈 kills decimals
              }
            }
          ],

          grid: {
            borderColor: '#333',
            xaxis: {
              lines: {
                show: true
              }
            }
          },

          tooltip: {
            x: {
              formatter: (value: number) => {
                const h = new Date(value).getHours()
                const ampm = h < 12 ? 'AM' : 'PM'
                const display = h % 12 || 12
                return `${display} ${ampm}`
              }
            }
          },

          dataLabels: {
            enabled: false
          },

          legend: {
            show: false
          },
          annotations: {
            xaxis: [
              {
                x: Date.now(),
                borderColor: '#00e676',
                strokeDashArray: 0,
                borderWidth: 2,
                label: {
                  text: 'NOW',
                  style: {
                    color: '#000',
                    background: '#00e676'
                  }
                }
              }
            ],
          
            points: [
              // 🌡️ TEMP HIGH
              {
                x: tempMaxPoint.x,
                y: tempMaxPoint.temp,
                marker: {
                  size: 6,
                  fillColor: '#ff9800',
                  strokeColor: '#fff'
                },
                label: {
                  text: `${tempMaxPoint.temp}°`,
                  borderColor: 'transparent',
                  style: {
                    fontSize:"15px",
                    fontWeight:"bolder",
                    background:'transparent',
                    color: '#ff9800'
                  }
                }
              },
          
              // 🌡️ TEMP LOW
              {
                x: tempMinPoint.x,
                y: tempMinPoint.temp,
                marker: {
                  size: 6,
                  fillColor: '#ff9800',
                  strokeColor: '#fff'
                },
                label: {
                  text: `${tempMinPoint.temp}°`,
                  borderColor: 'transparent',
                  style: {
                    fontSize:"15px",
                    fontWeight:"bolder",
                    background:'transparent',
                    color: '#ff9800'
                  }
                }
              },
          
              // 🌧️ RAIN HIGH
              {
                x: rainMaxPoint.x,
                y: rainMaxPoint.rain,
                marker: {
                  size: 6,
                  fillColor: '#4fc3f7',
                  strokeColor: '#fff'
                },
                label: {
                  text: `H ${rainMaxPoint.rain}%`,
                  borderColor: 'transparent',
                  style: {
                    fontSize:"15px",
                    fontWeight:"bolder",
                    background:'transparent',
                    color: '#4fc3f7'
                  }
                }
              },
          
              // 🌧️ RAIN LOW
              {
                x: rainMinPoint.x,
                y: rainMinPoint.rain,
                marker: {
                  size: 6,
                  fillColor: '#4fc3f7',
                  strokeColor: '#fff'
                },
                label: {
                  text: `L ${rainMinPoint.rain}%`,
                  borderColor: 'transparent',
                  style: {
                    fontSize:"15px",
                    fontWeight:"bolder",
                    background:'transparent',
                    color: '#4fc3f7'
                  }
                }
              }
            ]
          }

        }}
      />
    </div>
  )
}