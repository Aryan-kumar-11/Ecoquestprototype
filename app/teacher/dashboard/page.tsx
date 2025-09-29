"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TeacherNav } from "@/components/teacher-nav"
import { useApp } from "@/contexts/app-context"
import { mockClassData } from "@/lib/mock-data"
import { Users, TrendingUp, Award, AlertCircle, Plus, MessageSquare, BarChart3 } from "lucide-react"
import Link from "next/link"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

export default function TeacherDashboard() {
  const { teacher } = useApp()

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-accent text-primary-foreground p-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">Welcome back, {teacher.name}</h1>
              <p className="text-primary-foreground/80">{teacher.className}</p>
            </div>
            <Button variant="secondary" size="sm" asChild>
              <Link href="/">Switch View</Link>
            </Button>
          </div>

          {/* Class Impact Summary */}
          <div className="bg-primary-foreground/10 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">{mockClassData.totalCO2Saved}kg</div>
                <div className="text-sm text-primary-foreground/80">Class CO2 Saved</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{mockClassData.participationRate}%</div>
                <div className="text-sm text-primary-foreground/80">Participation Rate</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-4 space-y-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Plus className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-medium text-sm">Create New Quest</h3>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer" asChild>
            <Link href="/teacher/analytics">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-medium text-sm">View Full Analytics</h3>
              </CardContent>
            </Link>
          </Card>
        </div>

        {/* Weekly Activity Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Weekly Class Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockClassData.weeklyActivity}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Bar dataKey="activity" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Top Performers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              Top Performers This Week
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockClassData.topPerformers.slice(0, 5).map((student, index) => (
                <div key={student.name} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">#{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-muted-foreground">{student.xp} XP this week</p>
                  </div>
                  <Badge variant="secondary">
                    {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : "⭐"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Students Needing Attention */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-orange-500" />
              Students Needing Encouragement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockClassData.lowParticipation.map((studentName) => (
                <div key={studentName} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <Users className="w-4 h-4 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-medium">{studentName}</p>
                      <p className="text-sm text-muted-foreground">Low activity this week</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Send Nudge
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Class Overview Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">28</div>
              <div className="text-sm text-muted-foreground">Total Students</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">156</div>
              <div className="text-sm text-muted-foreground">Quests Completed</div>
            </CardContent>
          </Card>
        </div>
      </div>

      <TeacherNav />
    </div>
  )
}
