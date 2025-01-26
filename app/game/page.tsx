"use client"

import { useState, useEffect, useRef } from "react"
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
  const [currentResumes, setCurrentResumes] = useState<[Resume, Resume]>([generateResume(0), generateResume(1)]);
  const [selectedResumes, setSelectedResumes] = useState<Resume[]>([]);
  const [selectedResume, setSelectedResumeState] = useState<Resume | null>(null); // To track selected resume for animation
  const [unselectedResume, setUnselectedResumeState] = useState<Resume | null>(null); // To track unselected resume for animation
  const [animating, setAnimating] = useState(false); // To control animation state

  const timerRef = useRef<NodeJS.Timeout | null>(null); // useRef to hold timer

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTime((t) => t + 1);
    }, 1000);
    return () => clearInterval(timerRef.current as NodeJS.Timeout);
  }, []);

  const handleSelect = (resume: Resume) => {
    if (round > 10 || animating) return; // Corrected condition to allow selection on round 10
    setAnimating(true);

    const unselected = currentResumes.find((r) => r.id !== resume.id);

    setSelectedResumeState(resume);
    setUnselectedResumeState(unselected || null); // In case of error

    setTimeout(() => {
      if (round < 10) {
        setSelectedResumes([...selectedResumes, resume]);
        setRound((r) => r + 1);
        setCurrentResumes([generateResume(round * 2), generateResume(round * 2 + 1)]);
      } else {
        setSelectedResumes([...selectedResumes, resume]);
        setGameComplete(true);
        setTime((t) => {
          clearInterval(timerRef.current as NodeJS.Timeout);
          return t;
        });
      }
      setSelectedResumeState(null);
      setUnselectedResumeState(null);
      setAnimating(false);
    }, 1000); // Delay to match animation duration
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary animate-gradient p-8">
      <div className="container mx-auto">
        <button onClick={() => router.push("/")} className="fixed bottom-4 left-4 p-4 rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white">
          ←
        </button>
          <div className="flex justify-between mb-8 shadow-2xl">
          <h2 className="text-white text-2xl font-bold drop-shadow-md">Resume Royale</h2>
          <div className="text-white text-xl drop-shadow-md">Time: {formatTime(time)}</div>
          <div className="text-white text-xl drop-shadow-md">Round: {round}/10</div>
        </div>

        {round <= 10 && !gameComplete && (
          <div className="flex justify-center items-center gap-8 mb-8">
            <AnimatePresence mode="popLayout">
              {currentResumes.map((resume, index) => (
                <motion.div
                  key={resume.id}
                  initial={{ opacity: 0 }}
                  animate={
                    resume.id === selectedResume?.id
                      ? { y: 200, x: -10, opacity: 0.2, scale: 0.5 }
                      : { opacity: 0.8 }
                  }
                  exit={
                    resume.id === selectedResume?.id ? { y: 200, x: -10, opacity: 0, scale: 0.2 } : { x: 400, opacity: 0 }
                  }
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="w-96 h-128 bg-white/10 backdrop-blur-sm rounded-xl p-6 cursor-pointer hover:scale-105 transition-transform shadow-md"
                  onClick={() => handleSelect(resume)}
                >
                  <h3 className="text-white text-xl font-bold mb-4">{resume.title}</h3>
                  <p className="text-white/80">{resume.content}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

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
              onClick={() => router.push(`/result?time=${time}`)}
            >
              See Results
            </motion.button>
          )}
        </div>
      </div>
    </div>
  )
}
