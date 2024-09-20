import React from 'react'
import { motion } from 'framer-motion'

export default function ModuleDetails({ module, onSelectVideo }) {
    if (!module) {
      return <div>No module selected</div>
    }
  
    return (
      <div>
        <h2 className="text-3xl font-bold mb-4">{module.title}</h2>
        <p className="text-gray-400 mb-6">{module.description}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {module.videos && module.videos.map((video) => (
            <motion.div
              key={video.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-800 p-4 rounded-lg cursor-pointer"
              onClick={() => onSelectVideo(video)}
            >
              <h3 className="text-xl font-semibold mb-2">{video.title}</h3>
              <p className="text-gray-400">{video.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    )
  }