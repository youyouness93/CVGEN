"use client"

import { useRouter } from "next/navigation"
import { Button } from "./ui/button"

export function GenerateCVButton() {
  const router = useRouter()

  const handleClick = () => {
    localStorage.removeItem('cvData')
    localStorage.removeItem('jobData')
    localStorage.removeItem('optimizedData')
    router.push('/create')
  }

  return (
    <Button
      variant="default"
      onClick={handleClick}
    >
      Générer mon CV
    </Button>
  )
}
