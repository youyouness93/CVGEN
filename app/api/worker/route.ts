import { Redis } from '@upstash/redis'
import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { prisma } from '@/lib/prisma'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

async function processJob(job: any) {
  const { id, cvData, jobData } = job
  try {
    console.log('Traitement du job:', id)
    
    // Construire le prompt pour GPT-4
    const prompt = `Tu es un expert en ressources humaines spécialisé dans la création de CV selon les normes canadiennes.
Tu as une excellente capacité à identifier les liens entre les activités personnelles et les compétences professionnelles.

Voici le CV actuel (texte brut extrait) :
${JSON.stringify(cvData, null, 2)}

Voici la description du poste à pourvoir :
Titre: ${jobData.jobTitle}
Description: ${jobData.jobDescription}

Ta tâche est d'analyser ces informations et de générer un nouveau CV au format JSON qui respecte les normes canadiennes et qui est PARFAITEMENT adapté à ce poste.

Instructions spécifiques :
1. Génère le CV dans la langue de la description du poste
2. Adapte FORTEMENT chaque section pour correspondre aux exigences du poste
3. Estime la longueur du contenu et optimise la mise en page :
   - Si le contenu est court, ajuste les marges et espacements
   - Si le contenu est long, ajuste les marges et espacements
   - Ajoute une propriété "layout" dans le JSON avec les paramètres optimaux pour que le cv ne depasse pas 2 pages
4. Pour la section "volunteerWork" :
   - Même si ces informations ne sont pas dans le CV original, CRÉE des activités de bénévolat qui :
   - Démontrent des compétences pertinentes pour le poste
   - Sont réalistes et crédibles dans le contexte local
   - Sont datées des 2-3 dernières années
   - Montrent l'engagement communautaire du candidat
5. Pour la section "hobbies" :
   - CRÉE des loisirs et intérêts qui :
   - Renforcent indirectement les compétences requises pour le poste
   - Montrent des qualités personnelles valorisées (leadership, créativité, etc.)
   - Sont spécifiques et détaillés

Points importants pour un CV canadien :
1. Pas de photo
2. Pas d'informations personnelles comme l'âge, le statut matrimonial ou la nationalité
3. Format chronologique inverse (expériences les plus récentes en premier)
4. Inclusion des soft skills pertinents
5. Adaptation spécifique aux mots-clés du poste

Réponds UNIQUEMENT avec le JSON du CV optimisé.`

    const completion = await openai.chat.completions.create({
      model: "gpt-4-0125-preview",
      messages: [
        {
          role: "system",
          content: "Tu es un expert en ressources humaines spécialisé dans l'optimisation de CV."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 4000,
    })

    const generatedCV = completion.choices[0].message.content

    if (!generatedCV) {
      throw new Error('Aucun CV généré par OpenAI')
    }

    // Mettre à jour le CV dans la base de données
    await prisma.cV.update({
      where: { id },
      data: {
        optimizedCV: generatedCV as string,
        status: 'completed'
      }
    })

    console.log('CV généré avec succès:', id)
  } catch (error: any) {
    console.error('Erreur lors du traitement:', error)
    await prisma.cV.update({
      where: { id },
      data: {
        status: 'error',
        error: error.message
      }
    })
  }
}

export async function GET() {
  try {
    // Récupérer un job de la queue
    const job = await redis.lpop('cv-queue')
    if (job && typeof job === 'string') {
      await processJob(JSON.parse(job))
      return NextResponse.json({ status: 'processed' })
    }
    return NextResponse.json({ status: 'no jobs' })
  } catch (error) {
    console.error('Erreur worker:', error)
    return NextResponse.json({ error: 'Worker error' }, { status: 500 })
  }
}
