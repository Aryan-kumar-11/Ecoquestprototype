"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StudentNav } from "@/components/student-nav"
import { BookOpen, Play, Clock, CheckCircle } from "lucide-react"
import Link from "next/link"

const learningModules = [
  {
    id: "plastic-planet",
    title: "Plastic Planet Explorer",
    description: "Discover the impact of plastic pollution on our oceans and learn how to make a difference",
    duration: "15 min",
    xpReward: 25,
    status: "available",
    thumbnail: "/ocean-plastic-pollution.png",
  },
  {
    id: "climate-change",
    title: "Climate Change Basics",
    description: "Understanding the science behind climate change and its effects on our planet",
    duration: "20 min",
    xpReward: 30,
    status: "available",
    thumbnail: "/climate-change-earth.jpg",
  },
  {
    id: "renewable-energy",
    title: "Renewable Energy Revolution",
    description: "Explore solar, wind, and other clean energy sources powering our future",
    duration: "18 min",
    xpReward: 28,
    status: "locked",
    thumbnail: "/solar-wind-landscape.png",
  },
  {
    id: "biodiversity",
    title: "Biodiversity & Ecosystems",
    description: "Learn about the interconnected web of life and why every species matters",
    duration: "22 min",
    xpReward: 35,
    status: "locked",
    thumbnail: "/forest-animals-biodiversity.jpg",
  },
]

export default function LearnPage() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "in-progress":
        return <Clock className="w-5 h-5 text-orange-500" />
      default:
        return <Play className="w-5 h-5 text-blue-500" />
    }
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-accent text-primary-foreground p-6">
        <div className="container mx-auto">
          <div className="flex items-center gap-3">
            <BookOpen className="w-8 h-8" />
            <div>
              <h1 className="text-2xl font-bold">Learning Center</h1>
              <p className="text-primary-foreground/80">Interactive modules to expand your eco-knowledge</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-4 space-y-6">
        {/* Featured Module */}
        <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">🌊</span>
              Featured: Plastic Planet Explorer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <img
                src="/ocean-plastic-pollution.png"
                alt="Plastic Planet Explorer"
                className="w-full md:w-48 h-32 object-cover rounded-lg"
              />
              <div className="flex-1">
                <p className="text-muted-foreground mb-4">
                  Dive deep into the world of plastic pollution and discover how your actions can help protect our
                  oceans. This interactive module includes videos, quizzes, and hands-on activities.
                </p>
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="secondary">15 min</Badge>
                  <Badge variant="outline" className="text-primary border-primary">
                    +25 XP
                  </Badge>
                </div>
                <Button asChild>
                  <Link href="/student/learn/plastic-planet">
                    Start Learning
                    <Play className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* All Modules */}
        <div>
          <h2 className="text-xl font-semibold mb-4">All Learning Modules</h2>
          <div className="grid gap-4">
            {learningModules.map((module) => (
              <Card
                key={module.id}
                className={`hover:shadow-md transition-shadow ${module.status === "locked" ? "opacity-60" : ""}`}
              >
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <img
                      src={module.thumbnail || "/placeholder.svg"}
                      alt={module.title}
                      className="w-24 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-lg flex items-center gap-2">
                            {module.title}
                            {getStatusIcon(module.status)}
                          </h3>
                          <p className="text-sm text-muted-foreground">{module.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{module.duration}</Badge>
                          <Badge variant="outline" className="text-primary border-primary">
                            +{module.xpReward} XP
                          </Badge>
                        </div>
                        {module.status === "locked" ? (
                          <Button variant="ghost" disabled>
                            Locked
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/student/learn/${module.id}`}>
                              {module.status === "completed" ? "Review" : "Start"}
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <StudentNav />
    </div>
  )
}
