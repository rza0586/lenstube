import 'plyr-react/dist/plyr.css'

import clsx from 'clsx'
import Plyr from 'plyr-react'
import React, { FC } from 'react'

interface Props {
  source: string
  wrapperClassName?: string
  poster?: string
  controls?: string[]
  autoPlay?: boolean
  ratio?: string | undefined
}

const defaultControls = [
  'play-large',
  'play',
  'progress',
  'current-time',
  'mute',
  'volume',
  'captions',
  'settings',
  'pip',
  'airplay',
  'fullscreen'
]

const VideoPlayer: FC<Props> = ({
  source,
  controls = defaultControls,
  poster,
  autoPlay = true,
  ratio = undefined,
  wrapperClassName
}) => {
  return (
    <div className={clsx('overflow-hidden rounded-xl', wrapperClassName)}>
      <Plyr
        autoPlay={autoPlay}
        source={{
          type: 'video',
          sources: [
            {
              src: source,
              provider: 'html5'
            }
          ],
          poster: poster ?? source
        }}
        options={{
          controls: controls,
          autoplay: autoPlay,
          autopause: true,
          tooltips: { controls: true, seek: true },
          ratio
        }}
      />
    </div>
  )
}

export default VideoPlayer