import { useEffect, useMemo, useState } from 'react'
import { Badge, Box, Text } from '@mantine/core'
import type { CameraInfo } from '../config/cameras'

interface CameraTileProps {
  name: string
  cameras: CameraInfo[]
}

const ROTATION_MS = 8000

function buildImageUrl(
  camera: CameraInfo,
  refreshToken: number
) {
  let url = camera.url

  if (camera.proxy) {
    url =
      `https://wsrv.nl/?url=${encodeURIComponent(url)}` +
      '&w=900&q=80'
  }

  if (camera.cacheBust !== false) {
    const separator = url.includes('?') ? '&' : '?'
    url += `${separator}t=${refreshToken}`
  }

  return url
}

export default function CameraTile({
  name,
  cameras
}: CameraTileProps) {
  const [index, setIndex] = useState(0)
  const [online, setOnline] = useState(true)

  // One refresh token per camera
  const [refreshTokens, setRefreshTokens] = useState(
    () => cameras.map(() => Date.now())
  )

  // Rotate cameras
  useEffect(() => {
    if (cameras.length < 2) return

    const id = setInterval(() => {
      setIndex(i => (i + 1) % cameras.length)
    }, ROTATION_MS)

    return () => clearInterval(id)
  }, [cameras.length])

  // Refresh every camera independently
  useEffect(() => {
    const timers = cameras.map((camera, cameraIndex) => {
      const refreshMs =
        camera.refreshInterval ?? 5 * 60 * 1000

      return setInterval(() => {
        setRefreshTokens(tokens => {
          const next = [...tokens]
          next[cameraIndex] = Date.now()
          return next
        })
      }, refreshMs)
    })

    return () => {
      timers.forEach(clearInterval)
    }
  }, [cameras])

  const current = cameras[index]

  const imageUrl = useMemo(
    () =>
      buildImageUrl(
        current,
        refreshTokens[index]
      ),
    [current, refreshTokens, index]
  )

  return (
    <Box
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '16 / 9',
        borderRadius: 8,
        overflow: 'hidden',
        background: '#111'
      }}
    >
      <img
        src={imageUrl}
        onLoad={() => setOnline(true)}
        onError={() => setOnline(false)}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'contain'
        }}
      />

      {/* LOCATION */}
      <Text
        size="sm"
        fw={700}
        style={{
          position: 'absolute',
          top: 6,
          left: 6,
          background: 'rgba(0,0,0,0.6)',
          padding: '2px 6px',
          borderRadius: 4,
          color: '#fff'
        }}
      >
        {name}
      </Text>

      {/* CAMERA NAME */}
      <Text
        size="md"
        fw={700}
        style={{
          position: 'absolute',
          bottom: 6,
          left: 6,
          background: 'rgba(0,0,0,0.6)',
          padding: '2px 6px',
          borderRadius: 4,
          color: '#fff'
        }}
      >
        {current.name}
      </Text>

      {/* COUNTER */}
      {cameras.length > 1 && (
        <Text
          size="xs"
          style={{
            position: 'absolute',
            bottom: 6,
            right: 6,
            background: 'rgba(0,0,0,0.6)',
            padding: '2px 6px',
            borderRadius: 4,
            color: '#ccc'
          }}
        >
          {index + 1}/{cameras.length}
        </Text>
      )}

      {/* STATUS */}
      <Badge
        color={online ? 'green' : 'red'}
        size="xs"
        style={{
          position: 'absolute',
          top: 6,
          right: 6
        }}
      >
        {online ? 'LIVE' : 'OFFLINE'}
      </Badge>
    </Box>
  )
}