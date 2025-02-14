import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface Step {
  id: string
  title: string
  status: "complete" | "current" | "upcoming"
}

interface StepsProps {
  steps: Step[]
}

export function Steps({ steps }: StepsProps) {
  return (
    <nav aria-label="Progress">
      <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
        {steps.map((step, stepIdx) => (
          <li key={step.id} className="md:flex-1">
            <div
              className={cn(
                "group flex flex-col border-l-4 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4",
                step.status === "complete"
                  ? "border-primary"
                  : step.status === "current"
                    ? "border-primary"
                    : "border-muted",
              )}
            >
              <span className="text-sm font-medium">
                {step.status === "complete" ? (
                  <span className="flex items-center gap-2 text-primary">
                    <Check className="h-4 w-4" />
                    {step.title}
                  </span>
                ) : step.status === "current" ? (
                  <span className="text-primary">{step.title}</span>
                ) : (
                  <span className="text-muted-foreground">{step.title}</span>
                )}
              </span>
              <span className="text-sm text-muted-foreground">
                Étape {stepIdx + 1} sur {steps.length}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}

