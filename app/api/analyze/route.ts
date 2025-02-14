import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { prisma } from '@/lib/prisma';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { cvData, jobData } = body;

    // Vérifier si une génération est déjà en cours pour ce CV
    const existingCV = await prisma.cV.findFirst({
      where: {
        AND: [
          { originalCV: { equals: JSON.stringify(cvData) } },
          { jobData: { equals: JSON.stringify(jobData) } },
          { status: 'processing' }
        ]
      }
    });

    if (existingCV) {
      return NextResponse.json({ id: existingCV.id });
    }

    // Créer une nouvelle entrée dans la base de données
    const cv = await prisma.cV.create({
      data: {
        originalCV: JSON.stringify(cvData),
        jobData: JSON.stringify(jobData),
        status: 'processing'
      }
    });

    // Lancer la génération de manière asynchrone
    generateCV(cv.id, cvData, jobData).catch(console.error);

    return NextResponse.json({ id: cv.id });
  } catch (error) {
    console.error('Error in POST:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Missing id parameter' },
        { status: 400 }
      );
    }

    const cv = await prisma.cV.findUnique({
      where: { id }
    });

    if (!cv) {
      return NextResponse.json(
        { error: 'CV not found' },
        { status: 404 }
      );
    }

    // Si le CV est complété, renvoyer les données
    if (cv.status === 'completed' && typeof cv.optimizedCV === 'string') {
      return NextResponse.json({
        status: cv.status,
        error: cv.error,
        data: JSON.parse(cv.optimizedCV)
      });
    }

    // Si le CV est en erreur, renvoyer l'erreur
    if (cv.status === 'error') {
      return NextResponse.json({
        status: cv.status,
        error: cv.error,
        data: null
      });
    }

    // Si le CV est en cours de traitement
    return NextResponse.json({
      status: cv.status,
      error: null,
      data: null
    });
  } catch (error) {
    console.error('Error in GET:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

async function generateCV(id: string, cvData: any, jobData: any) {
  try {
    console.log('Début de la génération pour:', id);
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
3. Analyse la longueur du contenu et optimise la mise en page :
   - Si le contenu est court, augmente légèrement les marges et espacements
   - Si le contenu est long, réduis les marges et espacements
   - Ajoute une propriété "layout" dans le JSON avec les paramètres optimaux
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
6. Section des langues avec niveau de maîtrise

Retourne UNIQUEMENT un objet JSON valide avec la structure suivante, sans aucun texte avant ou après :
{
  "language": "fr ou en selon la langue de la description du poste",
  "layout": {
    "margins": {
      "top": "nombre en pixels",
      "bottom": "nombre en pixels",
      "left": "nombre en pixels",
      "right": "nombre en pixels"
    },
    "spacing": {
      "sectionSpacing": "nombre en pixels",
      "itemSpacing": "nombre en pixels",
      "lineHeight": "nombre (1.2-1.5)",
      "fontSize": {
        "name": "nombre en pixels",
        "title": "nombre en pixels",
        "sectionTitle": "nombre en pixels",
        "normal": "nombre en pixels"
      }
    }
  },
  "personalInfo": {
    "name": "nom complet",
    "title": "titre du poste",
    "email": "email",
    "phone": "téléphone",
    "location": "ville, province",
    "linkedin": "lien linkedin (optionnel)"
  },
  "professionalSummary": "résumé professionnel ciblé pour le poste",
  "skills": {
    "technical": ["compétences techniques"],
    "soft": ["compétences générales"]
  },
  "languages": [
    {
      "language": "nom de la langue",
      "level": "niveau de maîtrise"
    }
  ],
  "experience": [
    {
      "title": "titre du poste",
      "company": "entreprise",
      "location": "ville, province",
      "period": "période",
      "achievements": ["réalisations quantifiables"]
    }
  ],
  "education": [
    {
      "degree": "diplôme",
      "field": "domaine d'études",
      "institution": "établissement",
      "location": "ville, province",
      "year": "année"
    }
  ],
  "certifications": [
    {
      "name": "nom de la certification",
      "issuer": "organisme",
      "year": "année"
    }
  ],
  "volunteerWork": [
    {
      "organization": "nom de l'organisation",
      "role": "rôle",
      "period": "période",
      "description": "description des réalisations et compétences démontrées"
    }
  ],
  "hobbies": [
    {
      "category": "catégorie du loisir",
      "description": "description détaillée montrant le lien avec les compétences professionnelles"
    }
  ]
}`;

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: prompt
        }
      ],
      model: "gpt-4o-mini-realtime-preview",
      response_format: { type: "json_object" },
      temperature: 0.8,
    });

    const content = completion.choices[0].message.content;
    if (!content) {
      console.error('Réponse vide de l\'API pour:', id);
      await prisma.cV.update({
        where: { id },
        data: {
          status: 'error',
          error: 'Réponse invalide de l\'API'
        }
      });
      return;
    }

    try {
      console.log('Parsing de la réponse pour:', id);
      const optimizedCV = JSON.parse(content);
      console.log('Mise à jour du CV:', id);
      await prisma.cV.update({
        where: { id },
        data: {
          status: 'completed',
          optimizedCV: JSON.stringify(optimizedCV)
        }
      });
      console.log('CV mis à jour avec succès:', id);
    } catch (parseError) {
      console.error('Erreur de parsing JSON pour:', id, content);
      await prisma.cV.update({
        where: { id },
        data: {
          status: 'error',
          error: 'Format de réponse invalide'
        }
      });
    }

  } catch (error: any) {
    console.error('Erreur lors de la génération pour:', id, error);
    await prisma.cV.update({
      where: { id },
      data: {
        status: 'error',
        error: error?.message || 'Erreur lors de la génération du CV'
      }
    });
  }
}
