"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TeacherNav } from "@/components/teacher-nav"
import { useApp } from "@/contexts/app-context"
import { mockClassData } from "@/lib/mock-data"
import { BarChart3, Users, Award, Leaf, Target } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"

const questCategoryData = [
  { name: "Learn", value: 35, color: "#10B981" },
  { name: "Act", value: 28, color: "#3B82F6" },
  { name: "Audit", value: 22, color: "#F59E0B" },
  { name: "Innovate", value: 15, color: "#8B5CF6" },
]

const impactTrendData = [
  { week: "Week 1", co2: 15, plastic: 25 },
  { week: "Week 2", co2: 28, plastic: 42 },
  { week: "Week 3", co2: 45, plastic: 68 },
  { week: "Week 4", co2: 67, plastic: 89 },
  { week: "Week 5", co2: 89, plastic: 115 },
  { week: "Week 6", co2: 120, plastic: 145 },
]

export default function TeacherAnalytics() {
  const { teacher } = useApp()

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-accent text-primary-foreground p-6">
        <div className="container mx-auto">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-8 h-8" />
            <div>
              <h1 className="text-2xl font-bold">Class Analytics</h1>
              <p className="text-primary-foreground/80">{teacher.className} - Detailed Insights</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-4">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="impact">Impact</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Leaf className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-green-600">{mockClassData.totalCO2Saved}kg</div>
                  <div className="text-sm text-muted-foreground">CO2 Saved</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-blue-600">{mockClassData.participationRate}%</div>
                  <div className="text-sm text-muted-foreground">Participation</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Target className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="text-2xl font-bold text-purple-600">156</div>
                  <div className="text-sm text-muted-foreground">Quests Done</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Award className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="text-2xl font-bold text-orange-600">4.8</div>
                  <div className="text-sm text-muted-foreground">Avg Level</div>
                </CardContent>
              </Card>
            </div>

            {/* Weekly Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Activity Trend</CardTitle>
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
          </TabsContent>

          <TabsContent value="engagement" className="space-y-6">
            {/* Quest Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Quest Completion by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={questCategoryData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {questCategoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Top Performers */}
            <Card>
              <CardHeader>
                <CardTitle>Leaderboard</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockClassData.topPerformers.map((student, index) => (
                    <div key={student.name} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-primary">#{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-muted-foreground">{student.xp} XP total</p>
                      </div>
                      <Badge variant={index < 3 ? "default" : "secondary"}>
                        {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : "⭐"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="impact" className="space-y-6">
            {/* Environmental Impact Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Environmental Impact Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={impactTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Line type="monotone" dataKey="co2" stroke="#10B981" strokeWidth={2} name="CO2 Saved (kg)" />
                      <Line
                        type="monotone"
                        dataKey="plastic"
                        stroke="#3B82F6"
                        strokeWidth={2}
                        name="Plastic Diverted"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Impact Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Leaf className="w-5 h-5 text-green-600" />
                    CO2 Impact
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">{mockClassData.totalCO2Saved}kg</div>
                      <div className="text-sm text-muted-foreground">Total CO2 Prevented</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm text-green-700">
                        <strong>Equivalent to:</strong>
                      </p>
                      <ul className="text-sm text-green-600 mt-2 space-y-1">
                        <li>• Planting {Math.floor(mockClassData.totalCO2Saved / 2)} trees</li>
                        <li>• Driving {Math.floor(mockClassData.totalCO2Saved * 2.3)} fewer miles</li>
                        <li>• Saving {Math.floor(mockClassData.totalCO2Saved * 0.5)} gallons of gas</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-blue-600" />
                    Waste Reduction
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">245</div>
                      <div className="text-sm text-muted-foreground">Plastic Items Diverted</div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-blue-700">
                        <strong>Impact:</strong>
                      </p>
                      <ul className="text-sm text-blue-600 mt-2 space-y-1">
                        <li>• Protected marine life</li>
                        <li>• Reduced landfill waste</li>
                        <li>• Promoted recycling habits</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="students" className="space-y-6">
            {/* All Students List */}
            <Card>
              <CardHeader>
                <CardTitle>
                  All Students ({mockClassData.topPerformers.length + mockClassData.lowParticipation.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockClassData.topPerformers.map((student, index) => (
                    <div key={student.name} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-green-600">#{index + 1}</span>
                        </div>
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-muted-foreground">{student.xp} XP • Level 5</p>
                        </div>
                      </div>
                      <Badge variant="default">Active</Badge>
                    </div>
                  ))}
                  {mockClassData.lowParticipation.map((studentName) => (
                    <div key={studentName} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                          <Users className="w-4 h-4 text-orange-600" />
                        </div>
                        <div>
                          <p className="font-medium">{studentName}</p>
                          <p className="text-sm text-muted-foreground">Low activity • Level 2</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-orange-600 border-orange-600">
                        Needs Attention
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <TeacherNav />
    </div>
  )
}
