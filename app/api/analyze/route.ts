import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { prisma } from '@/lib/prisma';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(request: NextRequest) {
  try {
    const { cvData, jobData } = await request.json();

    if (!cvData || !jobData) {
      return NextResponse.json(
        { error: 'CV et description du poste requis' },
        { status: 400 }
      );
    }

    const cvJson = JSON.stringify(cvData);
    const jobJson = JSON.stringify(jobData);

    // Créer une nouvelle entrée à chaque fois
    console.log('Création d\'une nouvelle entrée...');
    const cv = await prisma.cV.create({
      data: {
        originalCV: cvJson,
        jobData: jobJson,
        status: 'processing'
      }
    });

    console.log('Nouvelle entrée créée:', cv.id);

    // Lancer la génération en arrière-plan
    generateCV(cv.id, cvData, jobData).catch(error => {
      console.error('Erreur de génération en arrière-plan:', error);
    });

    return NextResponse.json({ id: cv.id });

  } catch (error: any) {
    console.error('Erreur lors de la création:', error);
    return NextResponse.json(
      { error: error?.message || 'Erreur lors de la création' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID requis' },
        { status: 400 }
      );
    }

    console.log('Recherche du CV:', id);
    const cv = await prisma.cV.findUnique({
      where: { id }
    });

    if (!cv) {
      console.log('CV non trouvé:', id);
      return NextResponse.json(
        { error: 'CV non trouvé' },
        { status: 404 }
      );
    }

    console.log('CV trouvé:', id, 'Status:', cv.status);
    return NextResponse.json({
      status: cv.status,
      error: cv.error,
      data: cv.optimizedCV ? JSON.parse(cv.optimizedCV as string) : null
    });

  } catch (error: any) {
    console.error('Erreur lors de la vérification:', error);
    return NextResponse.json(
      { error: error?.message || 'Erreur lors de la vérification' },
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
3. estimela longueur du contenu et optimise la mise en page :
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
6. Section des langues avec niveau de maîtrise

Retourne UNIQUEMENT un objet JSON valide avec la structure suivante, sans aucun texte avant ou après :
{
  "language": "fr / en  selon la langue de la description du poste",
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
        "name": "nombre en pixels (18-20)",
        "title": "nombre en pixels (16-18)",
        "sectionTitle": "nombre en pixels (14-16)",
        "normal": "nombre en pixels (10-12)"
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
        },
        {
          role: "user",
          content: JSON.stringify({
            cv: cvData,
            jobDescription: jobData
          })
        }  
      ],
      model: "gpt-4o-mini-2024-07-18",
      response_format: { type: "json_object" },
      temperature: 0.8,
    });

    const content = completion.choices[0].message.content;
    if (!content) {
      console.error('Réponse vide de l\'API pour:', id);
      const existingCV = await prisma.cV.findUnique({
        where: { id }
      });

      if (!existingCV) {
        console.error('CV non trouvé pour la mise à jour du statut d\'erreur:', id);
        return;
      }

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
      
      // Vérifier si le CV existe toujours
      const existingCV = await prisma.cV.findUnique({
        where: { id }
      });

      if (!existingCV) {
        console.error('CV non trouvé pour la mise à jour:', id);
        return;
      }

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
      
      const existingCV = await prisma.cV.findUnique({
        where: { id }
      });

      if (!existingCV) {
        console.error('CV non trouvé pour la mise à jour du statut d\'erreur:', id);
        return;
      }

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
    
    const existingCV = await prisma.cV.findUnique({
      where: { id }
    });

    if (!existingCV) {
      console.error('CV non trouvé pour la mise à jour du statut d\'erreur:', id);
      return;
    }

    await prisma.cV.update({
      where: { id },
      data: {
        status: 'error',
        error: error?.message || 'Erreur lors de la génération du CV'
      }
    });
  }
}
