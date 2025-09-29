import { cn } from "@/lib/utils"
interface ProgressBarProps {
  current: number
  max: number
  className?: string
}

export function ProgressBar({ current, max, className }: ProgressBarProps) {
  const percentage = Math.min((current / max) * 100, 100)

  return (
    <div className={cn("w-full bg-muted rounded-full h-2", className)}>
      <div
        className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  )
}
