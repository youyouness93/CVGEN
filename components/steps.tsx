import { Check, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/context/language-context"

interface Step {
  id: string
  title: string
  status: "complete" | "current" | "upcoming"
}

interface StepsProps {
  steps: Step[]
}

export function Steps({ steps }: StepsProps) {
  const { language } = useLanguage()

  return (
    <nav aria-label="Progress" className="w-full">
      <ol role="list" className="flex items-center justify-between gap-4">
        {steps.map((step, stepIdx) => (
          <li key={step.id} className="flex-1 relative">
            {stepIdx !== 0 && (
              <div
                className={cn(
                  "absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 transform -translate-x-1/2",
                  step.status === "complete"
                    ? "bg-gradient-to-r from-blue-600 to-blue-600"
                    : step.status === "current"
                      ? "bg-gradient-to-r from-blue-600 to-gray-200 dark:from-blue-600 dark:to-gray-700"
                      : "bg-gray-200 dark:bg-gray-700"
                )}
              />
            )}
            <div className="relative flex flex-col items-center gap-2">
              <div
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-200",
                  step.status === "complete"
                    ? "border-blue-600 bg-blue-600 text-white"
                    : step.status === "current"
                      ? "border-blue-600 bg-white dark:bg-gray-900 text-blue-600"
                      : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-400 dark:text-gray-500"
                )}
              >
                {step.status === "complete" ? (
                  <Check className="h-6 w-6" />
                ) : (
                  <span className="text-sm font-semibold">{stepIdx + 1}</span>
                )}
              </div>
              <div className="flex flex-col items-center text-center">
                <span
                  className={cn(
                    "text-sm font-semibold",
                    step.status === "complete"
                      ? "text-blue-600 dark:text-blue-400"
                      : step.status === "current"
                        ? "text-gray-900 dark:text-white"
                        : "text-gray-500 dark:text-gray-400"
                  )}
                >
                  {step.title}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {language === 'fr' ? `Étape ${stepIdx + 1}/${steps.length}` : `Step ${stepIdx + 1}/${steps.length}`}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}
