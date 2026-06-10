import { Box, Flex, SimpleGrid } from '@mantine/core'
import LiveClock from '../components/LiveClock'
import CameraTile from '../components/CameraTile'
import { locations } from '../config/cameras'

export default function CamerasPage() {
  return (
    <Flex
      direction="column"
      h="100vh"
      bg="#111"
      p="md"
      gap="md"
      style={{ overflow: 'hidden' }}
    >
      {/* GRID AREA */}
      <Box style={{ flex: 1, minHeight: 0 }}>
        <SimpleGrid
          cols={4}
          spacing="sm"
          style={{
            height: '100%',
            overflow: 'hidden'
          }}
        >
          {locations.map(location => (
            <CameraTile
              key={location.id}
              name={location.name}
              cameras={location.cameras}
            />
          ))}
        </SimpleGrid>
      </Box>

      {/* CLOCK */}
      <Box
        style={{
          display: 'flex',
          justifyContent: 'center',
          paddingBottom: 4
        }}
      >
        <LiveClock />
      </Box>
    </Flex>
  )
}