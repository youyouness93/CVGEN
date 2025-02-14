"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
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
  isLoading?: boolean
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
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="grid gap-6">
              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titre du poste</FormLabel>
                    <FormControl>
                      <Input placeholder="ex: Développeur Full Stack React/Node.js" {...field} />
                    </FormControl>
                    <FormDescription>
                      Ce titre sera utilisé pour identifier votre CV dans l&apos;historique
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="jobDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description du poste</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Copiez/collez ici la description complète du poste..."
                        className="min-h-[200px] resize-y"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Incluez toutes les informations : responsabilités, compétences requises, etc.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {form.formState.errors.root && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{form.formState.errors.root.message}</AlertDescription>
          </Alert>
        )}

        <div className="flex justify-end gap-4">
          <Button type="submit" disabled={isSubmitting || isLoading} className="min-w-[140px]">
            {isSubmitting || isLoading ? "Analyse en cours..." : "Analyser"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
