import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialiser le client OpenAI avec la clé API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  timeout: 60000, // 60 secondes
  maxRetries: 3
});

export const maxDuration = 300; // 5 minutes en secondes

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log('Données reçues:', body)

    // Vérifier si les données sont présentes
    if (!body.cvData || !body.jobData) {
      console.error('Données manquantes:', { cvData: !!body.cvData, jobData: !!body.jobData })
      return NextResponse.json(
        { error: "Les données du CV et de l'offre d'emploi sont requises" },
        { status: 400 }
      )
    }

    // Les données sont déjà des objets, pas besoin de les parser
    const cvData = body.cvData
    const jobData = body.jobData

    console.log('Données parsées:', { 
      cv: typeof cvData === 'object',
      job: typeof jobData === 'object',
      jobTitle: jobData?.jobTitle,
      hasJobDescription: !!jobData?.jobDescription
    })

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

    // Appeler l'API GPT-4
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "Tu es un expert RH canadien créatif qui optimise les CV selon les normes canadiennes. Tu es particulièrement doué pour identifier et créer des liens pertinents entre les activités personnelles et les compétences professionnelles. Tu réponds uniquement en JSON."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      model: "gpt-4-turbo-preview",
      response_format: { type: "json_object" },
      temperature: 0.8,
    });

    // Récupérer et parser la réponse
    // @ts-ignore - Les données sont validées avant l'appel
    const optimizedCV = JSON.parse(completion.choices[0].message.content);

    // Stocker le CV optimisé dans le localStorage côté client
    return NextResponse.json(optimizedCV);

  } catch (error) {
    console.error('Erreur lors de l\'analyse:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'analyse du CV' },
      { status: 500 }
    );
  }
}
