"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { type Student, type Teacher, type Quest, mockStudent, mockTeacher, mockQuests } from "@/lib/mock-data"

type UserRole = "student" | "teacher" | null

interface AppContextType {
  userRole: UserRole
  student: Student
  teacher: Teacher
  quests: Quest[]
  setUserRole: (role: UserRole) => void
  updateStudentXP: (xp: number) => void
  startQuest: (questId: string) => void
  completeQuest: (questId: string) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [userRole, setUserRole] = useState<UserRole>(null)
  const [student, setStudent] = useState<Student>(mockStudent)
  const [teacher] = useState<Teacher>(mockTeacher)
  const [quests, setQuests] = useState<Quest[]>(mockQuests)

  const updateStudentXP = (additionalXP: number) => {
    setStudent((prev) => {
      const newXP = prev.xp + additionalXP
      const newLevel = newXP >= prev.xpForNextLevel ? prev.level + 1 : prev.level
      return {
        ...prev,
        xp: newXP,
        level: newLevel,
        xpForNextLevel: newLevel > prev.level ? prev.xpForNextLevel + 500 : prev.xpForNextLevel,
      }
    })
  }

  const startQuest = (questId: string) => {
    setQuests((prev) =>
      prev.map((quest) => (quest.id === questId ? { ...quest, status: "in-progress" as const } : quest)),
    )
    setStudent((prev) => ({
      ...prev,
      activeQuests: [...prev.activeQuests, questId],
    }))
  }

  const completeQuest = (questId: string) => {
    const quest = quests.find((q) => q.id === questId)
    if (quest) {
      updateStudentXP(quest.xpReward)
      setQuests((prev) => prev.map((q) => (q.id === questId ? { ...q, status: "completed" as const } : q)))
      setStudent((prev) => ({
        ...prev,
        activeQuests: prev.activeQuests.filter((id) => id !== questId),
        completedQuests: [...prev.completedQuests, questId],
        co2Saved: prev.co2Saved + Math.floor(Math.random() * 5) + 1,
        plasticDiverted: prev.plasticDiverted + Math.floor(Math.random() * 3) + 1,
      }))
    }
  }

  return (
    <AppContext.Provider
      value={{
        userRole,
        student,
        teacher,
        quests,
        setUserRole,
        updateStudentXP,
        startQuest,
        completeQuest,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}
