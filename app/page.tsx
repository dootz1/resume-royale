"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Carousel } from "@/components/carousel"

const jobTitles = [
  { id: 1, title: "Business Analyst" },
  { id: 2, title: "Data Analyst" },
  { id: 3, title: "Software Engineer" },
  { id: 4, title: "Medical Practitioner" },
  { id: 5, title: "Mechanical Engineer" },
]

export default function Landing() {
  const router = useRouter()

  const handleSelect = (item: { id: number; title: string }) => {
    router.push(`/pregame?job=${encodeURIComponent(item.title)}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-red-900 to-purple-950 animate-gradient flex flex-col items-center justify-center">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-8xl font-bold text-center mb-12 bg-gradient-to-r from-red-500 to-blue-500 text-transparent bg-clip-text leading-tight drop-shadow-xl"
      >
        Resume Royale
      </motion.h1>
      <Carousel items={jobTitles} onSelect={handleSelect} className="shadow-2xl"/>
    </div>
  )
}
