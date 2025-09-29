// Mock data for EcoQuest prototype

export interface Student {
  id: string
  name: string
  level: number
  xp: number
  xpForNextLevel: number
  co2Saved: number
  plasticDiverted: number
  streak: number
  classRank: number
  activeQuests: string[]
  completedQuests: string[]
}

export interface Quest {
  id: string
  title: string
  description: string
  category: "Learn" | "Act" | "Audit" | "Innovate"
  xpReward: number
  icon: string
  status: "available" | "in-progress" | "completed"
}

export interface Teacher {
  id: string
  name: string
  className: string
}

export interface ClassData {
  totalCO2Saved: number
  participationRate: number
  weeklyActivity: { day: string; activity: number }[]
  topPerformers: { name: string; xp: number }[]
  lowParticipation: string[]
}

export const mockStudent: Student = {
  id: "1",
  name: "Alex Chen",
  level: 5,
  xp: 1250,
  xpForNextLevel: 1500,
  co2Saved: 15,
  plasticDiverted: 40,
  streak: 5,
  classRank: 3,
  activeQuests: ["quest-1", "quest-3"],
  completedQuests: ["quest-2", "quest-4"],
}

export const mockTeacher: Teacher = {
  id: "1",
  name: "Ms. Rodriguez",
  className: "7th Grade Environmental Science",
}

export const mockQuests: Quest[] = [
  {
    id: "quest-1",
    title: "Meat-Free Monday",
    description: "Choose plant-based meals for an entire day",
    category: "Act",
    xpReward: 30,
    icon: "🌱",
    status: "in-progress",
  },
  {
    id: "quest-2",
    title: "Plastic Planet Explorer",
    description: "Complete the interactive learning module about plastic pollution",
    category: "Learn",
    xpReward: 25,
    icon: "🌍",
    status: "completed",
  },
  {
    id: "quest-3",
    title: "Fix a Leaky Faucet",
    description: "Find and report a water leak in your school or home",
    category: "Audit",
    xpReward: 40,
    icon: "💧",
    status: "available",
  },
  {
    id: "quest-4",
    title: "Recycling Bin Innovation",
    description: "Design a creative solution to improve recycling in your classroom",
    category: "Innovate",
    xpReward: 50,
    icon: "♻️",
    status: "available",
  },
  {
    id: "quest-5",
    title: "Energy Detective",
    description: "Conduct an energy audit of your home and identify 3 ways to save energy",
    category: "Audit",
    xpReward: 35,
    icon: "⚡",
    status: "available",
  },
]

export const mockClassData: ClassData = {
  totalCO2Saved: 120,
  participationRate: 95,
  weeklyActivity: [
    { day: "Mon", activity: 85 },
    { day: "Tue", activity: 92 },
    { day: "Wed", activity: 78 },
    { day: "Thu", activity: 95 },
    { day: "Fri", activity: 88 },
    { day: "Sat", activity: 65 },
    { day: "Sun", activity: 70 },
  ],
  topPerformers: [
    { name: "Sarah Kim", xp: 1850 },
    { name: "Marcus Johnson", xp: 1720 },
    { name: "Alex Chen", xp: 1250 },
    { name: "Emma Davis", xp: 1180 },
    { name: "Ryan Patel", xp: 1050 },
  ],
  lowParticipation: ["Jake Wilson", "Mia Thompson", "David Lee"],
}

export const getLevelTitle = (level: number): string => {
  const titles = [
    "Eco-Newbie",
    "Green Sprout",
    "Nature Friend",
    "Earth Helper",
    "Eco-Warrior",
    "Guardian of the Earth",
    "Planet Protector",
    "Sustainability Champion",
  ]
  return titles[Math.min(level - 1, titles.length - 1)] || "Eco-Legend"
}
