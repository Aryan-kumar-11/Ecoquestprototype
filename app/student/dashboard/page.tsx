"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StudentNav } from "@/components/student-nav"
import { ProgressBar } from "@/components/progress-bar"
import { LevelUpModal } from "@/components/level-up-modal"
import { useApp } from "@/contexts/app-context"
import { getLevelTitle } from "@/lib/mock-data"
import { Flame, Leaf, Trophy, Zap, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function StudentDashboard() {
  const { student, quests } = useApp()

  // Get featured quest (first available quest)
  const featuredQuest = quests.find((q) => q.status === "available") || quests[0]

  return (
    <div className="min-h-screen bg-background pb-20">
      <LevelUpModal />

      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-accent text-primary-foreground p-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">Hello, {student.name}!</h1>
              <p className="text-primary-foreground/80">Ready to save the planet today?</p>
            </div>
            <Button variant="secondary" size="sm" asChild>
              <Link href="/">Switch View</Link>
            </Button>
          </div>

          {/* Level Progress */}
          <div className="bg-primary-foreground/10 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">
                {getLevelTitle(student.level)} - Level {student.level}
              </span>
              <span className="text-sm">
                {student.xp}/{student.xpForNextLevel} XP
              </span>
            </div>
            <ProgressBar current={student.xp} max={student.xpForNextLevel} />
          </div>
        </div>
      </header>

      <div className="container mx-auto p-4 space-y-6">
        {/* Impact Stats */}
        <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <Leaf className="w-5 h-5" />
              Your Environmental Impact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{student.co2Saved}kg</div>
                <div className="text-sm text-muted-foreground">CO2 Saved</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{student.plasticDiverted}</div>
                <div className="text-sm text-muted-foreground">Plastic Items Diverted</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Featured Quest */}
        {featuredQuest && (
          <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Quest of the Day</CardTitle>
                <Badge variant="secondary">+{featuredQuest.xpReward} XP</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="text-3xl">{featuredQuest.icon}</div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{featuredQuest.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{featuredQuest.description}</p>
                  <Button asChild>
                    <Link href="/student/quests">
                      Start Quest
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center mb-2">
                <Flame className="w-6 h-6 text-orange-500" />
              </div>
              <div className="text-2xl font-bold">{student.streak}</div>
              <div className="text-xs text-muted-foreground">Day Streak</div>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center mb-2">
                <Zap className="w-6 h-6 text-yellow-500" />
              </div>
              <div className="text-2xl font-bold">{student.xp}</div>
              <div className="text-xs text-muted-foreground">Total XP</div>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center mb-2">
                <Trophy className="w-6 h-6 text-amber-500" />
              </div>
              <div className="text-2xl font-bold">#{student.classRank}</div>
              <div className="text-xs text-muted-foreground">Class Rank</div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Leaf className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Completed "Plastic Planet Explorer"</p>
                  <p className="text-xs text-muted-foreground">Earned 25 XP • 2 hours ago</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Trophy className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Reached Level 5 - Eco-Warrior!</p>
                  <p className="text-xs text-muted-foreground">Yesterday</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <StudentNav />
    </div>
  )
}
