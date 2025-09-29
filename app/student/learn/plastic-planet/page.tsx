"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { StudentNav } from "@/components/student-nav"
import { useApp } from "@/contexts/app-context"
import { ArrowLeft, ArrowRight, CheckCircle, Play } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

const moduleContent = [
  {
    type: "intro",
    title: "Welcome to Plastic Planet Explorer",
    content:
      "In this module, you'll discover the hidden world of plastic pollution and learn how you can be part of the solution.",
  },
  {
    type: "video",
    title: "The Journey of a Plastic Bottle",
    content: "Watch this engaging animation to see what happens to plastic after we throw it away.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
  },
  {
    type: "interactive",
    title: "Sort the Waste",
    content: "Drag each item to the correct bin to learn about proper waste sorting.",
  },
  {
    type: "quiz",
    title: "Test Your Knowledge",
    content: "How long does it take for a plastic bottle to decompose in the ocean?",
    options: ["10 years", "50 years", "450 years", "1000 years"],
    correct: 2,
  },
  {
    type: "completion",
    title: "Congratulations!",
    content: "You've completed the Plastic Planet Explorer module. You're now ready to make a real difference!",
  },
]

export default function PlasticPlanetModule() {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const { updateStudentXP } = useApp()
  const { toast } = useToast()
  const router = useRouter()

  const progress = ((currentStep + 1) / moduleContent.length) * 100

  const handleNext = () => {
    if (currentStep < moduleContent.length - 1) {
      setCurrentStep(currentStep + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      setSelectedAnswer(null)
      setShowResult(false)
    }
  }

  const handleQuizSubmit = () => {
    if (selectedAnswer !== null) {
      setShowResult(true)
      if (selectedAnswer === moduleContent[currentStep].correct) {
        updateStudentXP(5) // Bonus XP for correct answer
      }
    }
  }

  const handleComplete = () => {
    updateStudentXP(25) // Module completion XP
    toast({
      title: "Module Completed!",
      description: "You earned 25 XP for completing Plastic Planet Explorer!",
    })
    router.push("/student/learn")
  }

  const currentContent = moduleContent[currentStep]

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-500 to-teal-500 text-white p-6">
        <div className="container mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" size="sm" asChild className="text-white hover:bg-white/20">
              <Link href="/student/learn">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Learning
              </Link>
            </Button>
            <div className="flex-1">
              <h1 className="text-xl font-bold">Plastic Planet Explorer</h1>
              <p className="text-white/80">Interactive Learning Module</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>
                {currentStep + 1} of {moduleContent.length}
              </span>
            </div>
            <Progress value={progress} className="bg-white/20" />
          </div>
        </div>
      </header>

      <div className="container mx-auto p-4">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">🌊</span>
              {currentContent.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {currentContent.type === "intro" && (
              <div className="text-center space-y-4">
                <img
                  src="/ocean-plastic-pollution-introduction.jpg"
                  alt="Plastic pollution"
                  className="w-full max-w-md mx-auto rounded-lg"
                />
                <p className="text-lg text-muted-foreground">{currentContent.content}</p>
              </div>
            )}

            {currentContent.type === "video" && (
              <div className="space-y-4">
                <p className="text-muted-foreground">{currentContent.content}</p>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Play className="w-8 h-8 text-primary-foreground ml-1" />
                    </div>
                    <p className="text-muted-foreground">Educational Video</p>
                    <p className="text-sm text-muted-foreground">The Journey of a Plastic Bottle</p>
                  </div>
                </div>
              </div>
            )}

            {currentContent.type === "interactive" && (
              <div className="space-y-4">
                <p className="text-muted-foreground">{currentContent.content}</p>
                <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-lg">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <span className="text-2xl">♻️</span>
                      </div>
                      <p className="text-sm font-medium">Recycling</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-amber-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <span className="text-2xl">🗑️</span>
                      </div>
                      <p className="text-sm font-medium">Trash</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-200 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <span className="text-2xl">🌱</span>
                      </div>
                      <p className="text-sm font-medium">Compost</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {["🥤 Plastic Bottle", "🍌 Banana Peel", "📰 Newspaper", "🍎 Apple Core"].map((item, index) => (
                      <div
                        key={index}
                        className="bg-white p-3 rounded-lg text-center cursor-pointer hover:bg-gray-50 transition-colors"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                  <p className="text-center text-sm text-muted-foreground mt-4">
                    Drag items to the correct bins above (simulation)
                  </p>
                </div>
              </div>
            )}

            {currentContent.type === "quiz" && (
              <div className="space-y-4">
                <p className="text-lg font-medium">{currentContent.content}</p>
                <div className="space-y-2">
                  {currentContent.options?.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedAnswer(index)}
                      className={`w-full p-4 text-left rounded-lg border transition-colors ${
                        selectedAnswer === index ? "border-primary bg-primary/10" : "border-border hover:bg-muted"
                      } ${
                        showResult && index === currentContent.correct
                          ? "border-green-500 bg-green-50"
                          : showResult && selectedAnswer === index && index !== currentContent.correct
                            ? "border-red-500 bg-red-50"
                            : ""
                      }`}
                    >
                      {option}
                      {showResult && index === currentContent.correct && (
                        <CheckCircle className="w-5 h-5 text-green-500 float-right" />
                      )}
                    </button>
                  ))}
                </div>
                {!showResult && selectedAnswer !== null && (
                  <Button onClick={handleQuizSubmit} className="w-full">
                    Submit Answer
                  </Button>
                )}
                {showResult && (
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="font-medium">
                      {selectedAnswer === currentContent.correct ? "Correct!" : "Not quite right."}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Plastic bottles can take up to 450 years to decompose in marine environments, which is why
                      recycling and reducing plastic use is so important!
                    </p>
                  </div>
                )}
              </div>
            )}

            {currentContent.type === "completion" && (
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <p className="text-lg text-muted-foreground">{currentContent.content}</p>
                <Badge variant="outline" className="text-primary border-primary text-lg px-4 py-2">
                  +25 XP Earned!
                </Badge>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between pt-6">
              <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 0}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              {currentStep === moduleContent.length - 1 ? (
                <Button onClick={handleComplete}>
                  Complete Module
                  <CheckCircle className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleNext} disabled={currentContent.type === "quiz" && !showResult}>
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <StudentNav />
    </div>
  )
}
