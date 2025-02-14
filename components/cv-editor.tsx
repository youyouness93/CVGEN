"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Pencil, Plus, X, ArrowLeft, Download } from "lucide-react"

interface Experience {
  id: string
  role: string
  company: string
  period: string
  description: string
}

interface Education {
  id: string
  degree: string
  school: string
  year: string
}

interface CvData {
  title: string
  summary: string
  experiences: Experience[]
  skills: string[]
  education: Education[]
}

interface CvEditorProps {
  initialData: CvData
  onSave: (data: CvData) => Promise<void>
  onBack: () => void
}

export function CvEditor({ initialData, onSave, onBack }: CvEditorProps) {
  const [data, setData] = useState<CvData>(initialData)
  const [editingSection, setEditingSection] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSave = async () => {
    try {
      setIsSubmitting(true)
      await onSave(data)
    } catch (error) {
      console.error("Error saving CV:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const updateExperience = (id: string, updates: Partial<Experience>) => {
    setData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((exp) => (exp.id === id ? { ...exp, ...updates } : exp)),
    }))
  }

  const addExperience = () => {
    const newExp: Experience = {
      id: `exp-${Date.now()}`,
      role: "Nouveau poste",
      company: "Nouvelle entreprise",
      period: "2023 - Présent",
      description: "Description du poste...",
    }
    setData((prev) => ({
      ...prev,
      experiences: [...prev.experiences, newExp],
    }))
  }

  const removeExperience = (id: string) => {
    setData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((exp) => exp.id !== id),
    }))
  }

  const addSkill = (skill: string) => {
    if (!data.skills.includes(skill)) {
      setData((prev) => ({
        ...prev,
        skills: [...prev.skills, skill],
      }))
    }
  }

  const removeSkill = (skill: string) => {
    setData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" className="gap-2" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
          Retour
        </Button>
        <div className="space-x-4">
          <Button variant="outline" className="gap-2" onClick={handleSave} disabled={isSubmitting}>
            <Download className="h-4 w-4" />
            Générer le PDF
          </Button>
        </div>
      </div>

      <div className="space-y-8">
        {/* En-tête du CV */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold">{data.title}</CardTitle>
            <Button variant="ghost" size="icon" onClick={() => setEditingSection("title")}>
              <Pencil className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{data.summary}</p>
          </CardContent>
        </Card>

        {/* Expériences */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Expériences</CardTitle>
            <Button variant="outline" size="sm" className="gap-2" onClick={addExperience}>
              <Plus className="h-4 w-4" />
              Ajouter
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {data.experiences.map((exp) => (
              <div key={exp.id} className="relative rounded-lg border p-4 hover:bg-muted/50">
                <div className="absolute right-2 top-2 flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => setEditingSection(`experience-${exp.id}`)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => removeExperience(exp.id)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <div>
                    <h4 className="font-medium">{exp.role}</h4>
                    <p className="text-sm text-muted-foreground">
                      {exp.company} • {exp.period}
                    </p>
                  </div>
                  <p className="text-sm">{exp.description}</p>
                </div>

                <Dialog
                  open={editingSection === `experience-${exp.id}`}
                  onOpenChange={(open) => setEditingSection(open ? `experience-${exp.id}` : null)}
                >
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Modifier l&apos;expérience</DialogTitle>
                      <DialogDescription>Modifiez les détails de cette expérience professionnelle</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Poste</label>
                        <Input value={exp.role} onChange={(e) => updateExperience(exp.id, { role: e.target.value })} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Entreprise</label>
                        <Input
                          value={exp.company}
                          onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Période</label>
                        <Input
                          value={exp.period}
                          onChange={(e) => updateExperience(exp.id, { period: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Description</label>
                        <Textarea
                          value={exp.description}
                          onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                          rows={4}
                        />
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Compétences */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Compétences</CardTitle>
            <Dialog
              open={editingSection === "skills"}
              onOpenChange={(open) => setEditingSection(open ? "skills" : null)}
            >
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Ajouter
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Ajouter une compétence</DialogTitle>
                  <DialogDescription>Entrez une nouvelle compétence à ajouter à votre CV</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Compétence</label>
                    <Input
                      placeholder="Ex: React.js"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          const input = e.currentTarget
                          if (input.value.trim()) {
                            addSkill(input.value.trim())
                            input.value = ""
                          }
                        }
                      }}
                    />
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="gap-2 pr-1.5">
                  {skill}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => removeSkill(skill)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Formation */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Formation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{edu.degree}</h4>
                  <p className="text-sm text-muted-foreground">
                    {edu.school} • {edu.year}
                  </p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setEditingSection(`education-${edu.id}`)}>
                  <Pencil className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

