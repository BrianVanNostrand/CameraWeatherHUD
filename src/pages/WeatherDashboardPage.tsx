import { Flex, Stack } from '@mantine/core'
import CurrentWeatherCard from '../components/CurrentWeatherCard'
import RadarPanel from '../components/RadarPanel'
import HourlyTimeline from '../components/HourlyTimeline'
import DailyForecast from '../components/DailyForecast'
import TideTable from '../components/TideTable'

export default function WeatherPage() {
  return (
    <Flex
      
      h="100vh"
      bg="#111"
      p="md"
      gap="md"
      style={{
        background: '#0f0f0f',
        padding: 20
      }}
    >

      <div
        id = "columns"
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 18,
        }}
      >
        <div id="rightcolumn"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
            minWidth: 800,
            margin: '0 auto'
          }}
        >
          <CurrentWeatherCard />
          <HourlyTimeline />
          <DailyForecast />
          <TideTable/>
        </div>
        <Stack id="leftcolumn">
          <div
            id = "topRow"
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 18,
            }}
          >
            <RadarPanel url="https://radar.weather.gov/ridge/standard/KATX_loop.gif" name='Washington'/>
            <RadarPanel url="https://radar.weather.gov/ridge/standard/KBMX_loop.gif" name='Washington'/>
            <RadarPanel url="https://radar.weather.gov/ridge/standard/KTBW_loop.gif" name='Washington'/>
          </div>
          <div
            id = "bottomRow"
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 18,
            }}
          >
            <RadarPanel url="https://radar.weather.gov/ridge/standard/PACNORTHWEST_loop.gif" name='Washington'/>
            <RadarPanel url="https://radar.weather.gov/ridge/standard/SOUTHEAST_loop.gif" name='Washington'/>
          </div>
        </Stack >

      </div>

    </Flex>
  )
}