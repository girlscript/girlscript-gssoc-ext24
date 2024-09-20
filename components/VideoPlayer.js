import React from 'react'
import YouTube from 'react-youtube'
import {Button} from "@chakra-ui/react"
import { ArrowLeft } from 'lucide-react'

export default function VideoPlayer({ video, onBack }) {
    if (!video) {
      return <div>No video selected</div>
    }
  
    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        autoplay: 1,
      },
    }
  
    return (
      <div>
        <Button onClick={onBack} variant="ghost" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Module
        </Button>
        <h2 className="text-3xl font-bold mb-4">{video.title}</h2>
        <p className="text-gray-400 mb-6">{video.description}</p>
        <div className="aspect-w-16 aspect-h-9">
          <YouTube videoId={video.youtubeId} opts={opts} />
        </div>
      </div>
    )
  }