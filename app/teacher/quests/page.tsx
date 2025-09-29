"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TeacherNav } from "@/components/teacher-nav"
import { useApp } from "@/contexts/app-context"
import { Plus, Edit, Eye, Trash2, Users } from "lucide-react"

export default function TeacherQuests() {
  const { quests } = useApp()

  const questStats = {
    total: quests.length,
    active: quests.filter((q) => q.status === "available").length,
    completed: quests.filter((q) => q.status === "completed").length,
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-accent text-primary-foreground p-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">Quest Management</h1>
              <p className="text-primary-foreground/80">Create and manage environmental challenges</p>
            </div>
            <Button variant="secondary" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              New Quest
            </Button>
          </div>

          {/* Quest Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-primary-foreground/10 rounded-lg p-3 text-center">
              <div className="text-xl font-bold">{questStats.total}</div>
              <div className="text-sm text-primary-foreground/80">Total Quests</div>
            </div>
            <div className="bg-primary-foreground/10 rounded-lg p-3 text-center">
              <div className="text-xl font-bold">{questStats.active}</div>
              <div className="text-sm text-primary-foreground/80">Active</div>
            </div>
            <div className="bg-primary-foreground/10 rounded-lg p-3 text-center">
              <div className="text-xl font-bold">{questStats.completed}</div>
              <div className="text-sm text-primary-foreground/80">Completed</div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-4 space-y-6">
        {/* Quest Templates */}
        <Card>
          <CardHeader>
            <CardTitle>Quest Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">🌱</div>
                  <div>
                    <h4 className="font-medium">Eco-Audit Template</h4>
                    <p className="text-sm text-muted-foreground">Students conduct environmental audits</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Use Template
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">♻️</div>
                  <div>
                    <h4 className="font-medium">Recycling Challenge</h4>
                    <p className="text-sm text-muted-foreground">Promote proper waste sorting and recycling</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Use Template
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">💡</div>
                  <div>
                    <h4 className="font-medium">Innovation Project</h4>
                    <p className="text-sm text-muted-foreground">Students create environmental solutions</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Use Template
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Quests */}
        <Card>
          <CardHeader>
            <CardTitle>Current Quests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {quests.map((quest) => (
                <div key={quest.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">{quest.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{quest.title}</h4>
                        <Badge variant="secondary">{quest.category}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{quest.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          12 students participating
                        </span>
                        <span>+{quest.xpReward} XP</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <TeacherNav />
    </div>
  )
}
