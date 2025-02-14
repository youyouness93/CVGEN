import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    if (!data.jobTitle || !data.jobDescription) {
      return NextResponse.json(
        { error: 'Le titre et la description du poste sont requis' },
        { status: 400 }
      );
    }

    // Créer l'objet JSON avec les données du poste
    const jobData = {
      jobTitle: data.jobTitle,
      jobDescription: data.jobDescription
    };

    // Dans un cas réel, vous pourriez vouloir sauvegarder cela dans une base de données
    // Pour l'instant, nous retournons simplement les données
    return NextResponse.json(jobData);
  } catch (error) {
    console.error('Erreur lors du traitement de la description du poste:', error);
    return NextResponse.json(
      { error: 'Erreur lors du traitement de la description du poste' },
      { status: 500 }
    );
  }
}
