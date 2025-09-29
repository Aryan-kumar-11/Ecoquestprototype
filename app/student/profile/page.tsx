"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StudentNav } from "@/components/student-nav"
import { ProgressBar } from "@/components/progress-bar"
import { useApp } from "@/contexts/app-context"
import { getLevelTitle } from "@/lib/mock-data"
import { User, Award, Leaf, Trophy, Calendar } from "lucide-react"

export default function StudentProfile() {
  const { student, quests } = useApp()

  const completedQuests = quests.filter((q) => student.completedQuests.includes(q.id))
  const achievements = [
    { title: "First Quest", description: "Completed your first environmental quest", icon: "🎯" },
    { title: "Eco-Warrior", description: "Reached Level 5", icon: "🌟" },
    { title: "Streak Master", description: "Maintained a 5-day streak", icon: "🔥" },
    { title: "Planet Protector", description: "Saved 10kg of CO2", icon: "🌍" },
  ]

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-accent text-primary-foreground p-6">
        <div className="container mx-auto">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary-foreground/20 rounded-full flex items-center justify-center">
              <User className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{student.name}</h1>
              <p className="text-primary-foreground/80">
                {getLevelTitle(student.level)} - Level {student.level}
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-4 space-y-6">
        {/* Level Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              Progress to Next Level
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Level {student.level}</span>
                <span>
                  {student.xp}/{student.xpForNextLevel} XP
                </span>
              </div>
              <ProgressBar current={student.xp} max={student.xpForNextLevel} />
              <p className="text-xs text-muted-foreground">
                {student.xpForNextLevel - student.xp} XP needed to reach Level {student.level + 1}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Impact Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="w-5 h-5" />
              Environmental Impact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">{student.co2Saved}kg</div>
                <div className="text-sm text-muted-foreground">CO2 Prevented</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Equivalent to planting {Math.floor(student.co2Saved / 2)} trees
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">{student.plasticDiverted}</div>
                <div className="text-sm text-muted-foreground">Plastic Items Diverted</div>
                <div className="text-xs text-muted-foreground mt-1">From landfills and oceans</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-medium">{achievement.title}</h4>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  </div>
                  <Badge variant="secondary">Earned</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Completed Quests */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Completed Quests ({completedQuests.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {completedQuests.map((quest) => (
                <div key={quest.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="text-2xl">{quest.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-medium">{quest.title}</h4>
                    <p className="text-sm text-muted-foreground">{quest.description}</p>
                  </div>
                  <Badge variant="outline">+{quest.xpReward} XP</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">{student.streak}</div>
                <div className="text-sm text-muted-foreground">Current Streak</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">#{student.classRank}</div>
                <div className="text-sm text-muted-foreground">Class Ranking</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <StudentNav />
    </div>
  )
}
