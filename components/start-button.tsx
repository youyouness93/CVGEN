"use client"

import { useRouter } from "next/navigation"
import { Button } from "./ui/button"
import { ArrowRight } from "lucide-react"

export function StartButton() {
  const router = useRouter()

  const handleClick = () => {
    localStorage.removeItem('cvData')
    localStorage.removeItem('jobData')
    localStorage.removeItem('optimizedData')
    router.push('/create')
  }

  return (
    <Button
      size="lg"
      onClick={handleClick}
    >
      Commencer
      <ArrowRight className="h-4 w-4 ml-2" />
    </Button>
  )
}
