"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"

const jobDescriptions: Record<string, { tasks: string[]; skills: string[]; education: string }> = {
  "Business Analyst": {
    tasks: ["Analyze business processes", "Create detailed reports", "Implement solutions"],
    skills: ["SQL", "Excel", "Communication"],
    education: "Bachelor's in Business or related field",
  },
  "Data Analyst": {
    tasks: ["Collect and analyze data", "Create visualizations", "Provide insights"],
    skills: ["Python", "R", "Data Visualization"],
    education: "Bachelor's in Statistics, Mathematics, or related field",
  },
  "Software Engineer": {
    tasks: ["Design and develop software", "Debug and troubleshoot issues", "Collaborate with cross-functional teams"],
    skills: ["Java", "Python", "JavaScript"],
    education: "Bachelor's in Computer Science or related field",
  },
  "Medical Practitioner": {
    tasks: ["Diagnose and treat patients", "Prescribe medications", "Maintain patient records"],
    skills: ["Patient Care", "Medical Knowledge", "Communication"],
    education: "Doctor of Medicine (MD) or Doctor of Osteopathic Medicine (DO)",
  },
  "Mechanical Engineer": {
    tasks: ["Design mechanical systems", "Analyze and test prototypes", "Oversee manufacturing processes"],
    skills: ["CAD Software", "Thermodynamics", "Material Science"],
    education: "Bachelor's in Mechanical Engineering",
  },
}

export default function Pregame() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const job = searchParams.get("job") || "Business Analyst"
  const description = jobDescriptions[job]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary animate-gradient p-8">
      <button onClick={() => router.push("/")} className="absolute top-4 left-4 text-white hover:underline">
        ← Back
      </button>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">{job}</h1>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Job Description</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Tasks</h3>
              <ul className="list-disc list-inside text-white/80">
                {description.tasks.map((task, i) => (
                  <li key={i}>{task}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Required Skills</h3>
              <ul className="list-disc list-inside text-white/80">
                {description.skills.map((skill, i) => (
                  <li key={i}>{skill}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Education</h3>
              <p className="text-white/80">{description.education}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => router.push("/game")}
            className="px-8 py-3 rounded-xl bg-white/20 hover:bg-white/30 transition-colors text-white text-lg font-semibold"
          >
            Start Game
          </button>
        </div>
      </motion.div>
    </div>
  )
}

