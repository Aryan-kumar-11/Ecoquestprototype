"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { StudentNav } from "@/components/student-nav"
import { useApp } from "@/contexts/app-context"
import type { Quest } from "@/lib/mock-data"
import { CheckCircle, Clock, Play, Upload, Trophy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function QuestBoard() {
  const { student, quests, startQuest, completeQuest } = useApp()
  const { toast } = useToast()
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null)

  const questsByCategory = {
    All: quests,
    Learn: quests.filter((q) => q.category === "Learn"),
    Act: quests.filter((q) => q.category === "Act"),
    Audit: quests.filter((q) => q.category === "Audit"),
    Innovate: quests.filter((q) => q.category === "Innovate"),
  }

  const getQuestStatus = (quest: Quest) => {
    if (student.completedQuests.includes(quest.id)) return "completed"
    if (student.activeQuests.includes(quest.id)) return "in-progress"
    return "available"
  }

  const handleQuestAction = (quest: Quest) => {
    const status = getQuestStatus(quest)

    if (status === "available") {
      startQuest(quest.id)
      toast({
        title: "Quest Started!",
        description: `You've started "${quest.title}". Good luck!`,
      })
    } else if (status === "in-progress") {
      // Simulate proof submission
      completeQuest(quest.id)
      toast({
        title: "Quest Completed!",
        description: `Congratulations! You earned ${quest.xpReward} XP.`,
      })
    }
  }

  const getStatusIcon = (quest: Quest) => {
    const status = getQuestStatus(quest)
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "in-progress":
        return <Clock className="w-5 h-5 text-orange-500" />
      default:
        return <Play className="w-5 h-5 text-blue-500" />
    }
  }

  const getActionButton = (quest: Quest) => {
    const status = getQuestStatus(quest)
    switch (status) {
      case "completed":
        return (
          <Button variant="outline" disabled className="w-full bg-transparent">
            <CheckCircle className="w-4 h-4 mr-2" />
            Completed
          </Button>
        )
      case "in-progress":
        return (
          <Button onClick={() => handleQuestAction(quest)} className="w-full">
            <Upload className="w-4 h-4 mr-2" />
            Submit Proof
          </Button>
        )
      default:
        return (
          <Button onClick={() => handleQuestAction(quest)} variant="outline" className="w-full">
            <Play className="w-4 h-4 mr-2" />
            Start Quest
          </Button>
        )
    }
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-accent text-primary-foreground p-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Quest Board</h1>
              <p className="text-primary-foreground/80">Choose your next environmental challenge</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-primary-foreground/80">Active Quests</div>
              <div className="text-xl font-bold">{student.activeQuests.length}</div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-4">
        <Tabs defaultValue="All" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="All">All</TabsTrigger>
            <TabsTrigger value="Learn">Learn</TabsTrigger>
            <TabsTrigger value="Act">Act</TabsTrigger>
            <TabsTrigger value="Audit">Audit</TabsTrigger>
            <TabsTrigger value="Innovate">Innovate</TabsTrigger>
          </TabsList>

          {Object.entries(questsByCategory).map(([category, categoryQuests]) => (
            <TabsContent key={category} value={category} className="space-y-4">
              {categoryQuests.map((quest) => (
                <Card key={quest.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="text-3xl">{quest.icon}</div>
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-lg">{quest.title}</h3>
                              {getStatusIcon(quest)}
                            </div>
                            <p className="text-muted-foreground text-sm mb-2">{quest.description}</p>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary">{quest.category}</Badge>
                              <Badge variant="outline" className="text-primary border-primary">
                                <Trophy className="w-3 h-3 mr-1" />
                                {quest.xpReward} XP
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {getActionButton(quest)}
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" onClick={() => setSelectedQuest(quest)}>
                                Details
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle className="flex items-center gap-2">
                                  <span className="text-2xl">{quest.icon}</span>
                                  {quest.title}
                                </DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <p className="text-muted-foreground">{quest.description}</p>
                                <div className="flex items-center gap-2">
                                  <Badge variant="secondary">{quest.category}</Badge>
                                  <Badge variant="outline" className="text-primary border-primary">
                                    <Trophy className="w-3 h-3 mr-1" />
                                    {quest.xpReward} XP Reward
                                  </Badge>
                                </div>
                                <div className="bg-muted p-4 rounded-lg">
                                  <h4 className="font-medium mb-2">How to Complete:</h4>
                                  <ul className="text-sm text-muted-foreground space-y-1">
                                    <li>• Follow the quest instructions carefully</li>
                                    <li>• Take photos or document your progress</li>
                                    <li>• Submit proof when you're done</li>
                                    <li>• Earn XP and contribute to your environmental impact!</li>
                                  </ul>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <StudentNav />
    </div>
  )
}
