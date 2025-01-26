"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

interface Resume {
  id: number
  title: string
  content: string
  isCorrect: boolean
}

const generateResume = (id: number): Resume => ({
  id,
  title: `Resume ${String.fromCharCode(65 + id)}`,
  content: `This is the content of Resume ${String.fromCharCode(65 + id)}. It includes various skills, experiences, and qualifications relevant to the job.`,
  isCorrect: Math.random() > 0.5,
})

export default function Game() {
  const router = useRouter()
  const [round, setRound] = useState(1)
  const [time, setTime] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)
  const [currentResumes, setCurrentResumes] = useState<[Resume, Resume]>([generateResume(0), generateResume(1)])
  const [selectedResumes, setSelectedResumes] = useState<Resume[]>([])

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((t) => t + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleSelect = (resume: Resume) => {
    if (round < 10) {
      setSelectedResumes([...selectedResumes, resume])
      setRound((r) => r + 1)
      setCurrentResumes([generateResume(round * 2), generateResume(round * 2 + 1)])
    } else {
      setGameComplete(true)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary animate-gradient p-8">
      <div className="container mx-auto">
        <button onClick={() => router.push("/")} className="fixed bottom-4 left-4 p-4 rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white">
          ←
        </button>
        <div className="flex justify-between mb-8">
          <div className="text-white text-xl">Time: {formatTime(time)}</div>
          <div className="text-white text-xl">Round: {round}/10</div>
        </div>

                <div className="flex justify-center items-center gap-8 mb-8">
          <AnimatePresence mode="popLayout">
            {currentResumes.map((resume, index) => (
              <motion.div
                key={resume.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={index === 1 ? { x: 100, opacity: 0 } : { x: -100, opacity: 0 }}
                className="w-96 h-128 bg-white/10 backdrop-blur-sm rounded-xl p-6 cursor-pointer hover:scale-105 transition-transform"
                onClick={() => handleSelect(resume)}
              >
                <h3 className="text-white text-xl font-bold mb-4">{resume.title}</h3>
                <p className="text-white/80">{resume.content}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Remove onSelect prop from the Carousel component */}
        {/* <Carousel
          items={currentResumes}
          onSelect={handleSelect}
        /> */}

        <div className="flex justify-between items-end">

          <motion.div
            className="w-32 h-48 bg-white/5 rounded-xl overflow-hidden relative"
            animate={{ height: `${Math.min(selectedResumes.length * 48, 192)}px` }}
          >
            {selectedResumes.map((resume, index) => (
              <motion.div
                key={resume.id}
                initial={{ y: -48 }}
                animate={{ y: index * 8 }}
                className="absolute w-full h-48 bg-white/10 rounded-xl"
              />
            ))}
          </motion.div>

          {gameComplete && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="px-8 py-3 rounded-xl bg-white/20 hover:bg-white/30 transition-colors text-white text-lg font-semibold"
              onClick={() => router.push("/result")}
            >
              See Results
            </motion.button>
          )}
        </div>
      </div>
    </div>
  )
}
