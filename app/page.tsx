"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useApp } from "@/contexts/app-context"
import { useRouter } from "next/navigation"
import { Leaf, Users, Target, TrendingUp, ArrowRight, Play } from "lucide-react"

export default function LandingPage() {
  const { setUserRole } = useApp()
  const router = useRouter()

  const handleRoleSelection = (role: "student" | "teacher") => {
    setUserRole(role)
    router.push(role === "student" ? "/student/dashboard" : "/teacher/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">EcoQuest</span>
          </div>
          <div className="flex gap-4">
            <Button variant="ghost" onClick={() => handleRoleSelection("student")}>
              Student Demo
            </Button>
            <Button variant="ghost" onClick={() => handleRoleSelection("teacher")}>
              Teacher Demo
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-balance mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Turn Your School into a Sustainable Ecosystem
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-balance">
            Gamified environmental education that engages students in real-world sustainability challenges while
            tracking meaningful impact.
          </p>

          {/* Demo Video Placeholder */}
          <div className="relative bg-card rounded-xl shadow-lg mb-12 overflow-hidden max-w-2xl mx-auto">
            <div className="aspect-video bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Play className="w-8 h-8 text-primary-foreground ml-1" />
                </div>
                <p className="text-muted-foreground">Watch EcoQuest in Action</p>
                <p className="text-sm text-muted-foreground mt-1">
                  See how students complete quests and grow their impact
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6" onClick={() => handleRoleSelection("student")}>
              I'm a Student
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 bg-transparent"
              onClick={() => handleRoleSelection("teacher")}
            >
              I'm an Educator
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How EcoQuest Works</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Engaging students through gamified learning experiences that create real environmental impact
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Complete Quests</h3>
              <p className="text-sm text-muted-foreground">
                Students tackle real-world environmental challenges through engaging quests
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Learn & Grow</h3>
              <p className="text-sm text-muted-foreground">
                Interactive learning modules teach sustainability concepts through hands-on activities
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold mb-2">Track Impact</h3>
              <p className="text-sm text-muted-foreground">
                Measure real environmental impact with CO2 savings and waste reduction metrics
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Build Community</h3>
              <p className="text-sm text-muted-foreground">
                Foster collaboration and healthy competition through class leaderboards
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="bg-card py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Real Impact, Real Results</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">200+</div>
              <div className="text-muted-foreground">Schools Participating</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">50,000kg</div>
              <div className="text-muted-foreground">CO2 Saved</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">95%</div>
              <div className="text-muted-foreground">Student Engagement</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Environmental Education?</h2>
          <p className="text-muted-foreground mb-8">
            Join the growing community of educators and students making a real difference for our planet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6" onClick={() => handleRoleSelection("teacher")}>
              Start Teaching with EcoQuest
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 bg-transparent"
              onClick={() => handleRoleSelection("student")}
            >
              Explore Student Experience
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
              <Leaf className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold">EcoQuest</span>
          </div>
          <p className="text-sm">Empowering the next generation of environmental stewards through gamified learning.</p>
        </div>
      </footer>
    </div>
  )
}
