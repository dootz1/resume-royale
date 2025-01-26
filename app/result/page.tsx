"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Carousel } from "@/components/carousel"

const mockResumes = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  title: `Resume ${String.fromCharCode(65 + i)}`,
  description: `This is a sample resume description for Resume ${String.fromCharCode(65 + i)}. It includes various skills, experiences, and qualifications relevant to the job.`,
  isCorrect: Math.random() > 0.5,
}))

export default function Result() {
  const router = useRouter()
  const accuracy = 70 // Placeholder accuracy
  const time = "2:30" // Placeholder time
  const [selectedResume, setSelectedResume] = useState(mockResumes[0])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary animate-gradient p-8">
      <div className="container mx-auto">

        <button onClick={() => router.push("/")} className="fixed bottom-4 left-4 p-4 rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white">
          ←
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-8"
            >
              <h2 className="text-6xl font-bold text-white mb-4">{accuracy}%</h2>
              <p className="text-white/80">Accuracy</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-8"
            >
              <h3 className="text-4xl font-bold text-white mb-4">{time}</h3>
              <p className="text-white/80">Completion Time</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-4">Selected Resume Details</h3>
              <p className="text-white/80">{selectedResume.description}</p>
            </motion.div>
          </div>

          <div>
            <Carousel
              items={mockResumes}
              showAura
              autoRotate={false}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
