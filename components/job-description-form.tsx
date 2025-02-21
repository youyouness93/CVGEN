"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle, ArrowRight, Briefcase, FileText } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

const formSchema = z.object({
  jobTitle: z
    .string()
    .min(3, "Le titre doit contenir au moins 3 caractères")
    .max(100, "Le titre ne doit pas dépasser 100 caractères"),
  jobDescription: z
    .string()
    .min(50, "La description doit contenir au moins 50 caractères")
    .max(5000, "La description ne doit pas dépasser 5000 caractères"),
})

interface JobDescriptionFormProps {
  onSubmit: (data: z.infer<typeof formSchema>) => Promise<void>
  isLoading: boolean
}

export function JobDescriptionForm({ onSubmit, isLoading }: JobDescriptionFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobTitle: "",
      jobDescription: "",
    },
  })

  const { isSubmitting, isSubmitSuccessful } = form.formState

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    try {
      await onSubmit(values)
    } catch (error) {
      form.setError("root", {
        type: "submit",
        message: "Une erreur est survenue lors de l'analyse. Veuillez réessayer.",
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        {form.formState.errors.root && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {form.formState.errors.root.message}
            </AlertDescription>
          </Alert>
        )}

        <FormField
          control={form.control}
          name="jobTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                <Briefcase className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Titre du poste
              </FormLabel>
              <FormDescription className="text-gray-600 dark:text-gray-400">
                Entrez le titre exact du poste que vous visez
              </FormDescription>
              <FormControl>
                <Input
                  placeholder="ex: Développeur Full Stack JavaScript"
                  className="bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 transition-colors"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="jobDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Description du poste
              </FormLabel>
              <FormDescription className="text-gray-600 dark:text-gray-400">
                Copiez-collez l'offre d'emploi ou décrivez le poste en détail (responsabilités, compétences requises, etc.)
              </FormDescription>
              <FormControl>
                <Textarea
                  placeholder="Décrivez le poste ici..."
                  className="min-h-[200px] bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 transition-colors resize-y"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="pt-4">
          <Button
            type="submit"
            size="lg"
            disabled={isLoading || isSubmitting}
            className="w-full md:w-auto min-w-[200px] bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white shadow-xl hover:shadow-blue-500/20 transform hover:scale-105 transition-all duration-200 group"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Analyse en cours...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                Continuer
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
