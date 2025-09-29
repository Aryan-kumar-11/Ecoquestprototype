"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useApp } from "@/contexts/app-context"
import { getLevelTitle } from "@/lib/mock-data"
import { Trophy, Star, Sparkles } from "lucide-react"

export function LevelUpModal() {
  const { student } = useApp()
  const [showModal, setShowModal] = useState(false)
  const [previousLevel, setPreviousLevel] = useState(student.level)

  useEffect(() => {
    if (student.level > previousLevel) {
      setShowModal(true)
      setPreviousLevel(student.level)
    }
  }, [student.level, previousLevel])

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogContent className="sm:max-w-md text-center">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center gap-2 text-2xl">
            <Trophy className="w-8 h-8 text-yellow-500" />
            Level Up!
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 animate-bounce">
              <Star className="w-6 h-6 text-yellow-400 fill-current" />
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-2">Congratulations!</h3>
            <p className="text-muted-foreground mb-4">You've reached Level {student.level}</p>
            <Badge
              variant="outline"
              className="text-lg px-4 py-2 bg-gradient-to-r from-primary to-accent text-white border-none"
            >
              {getLevelTitle(student.level)}
            </Badge>
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-sm text-muted-foreground">
              Keep up the amazing work! Your environmental impact is making a real difference for our planet.
            </p>
          </div>

          <Button onClick={() => setShowModal(false)} className="w-full">
            Continue Your Journey
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
