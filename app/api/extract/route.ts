import { NextResponse } from 'next/server';
import PdfParser from 'pdf2json';
import mammoth from 'mammoth';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'Aucun fichier fourni' },
        { status: 400 }
      );
    }

    console.log('Type de fichier reçu:', file.type);
    console.log('Taille du fichier:', file.size);

    const buffer = await file.arrayBuffer();
    let text = '';

    try {
      if (file.type === 'application/pdf') {
        text = await extractPDFText(Buffer.from(buffer));
      } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        const result = await mammoth.extractRawText({
          buffer: Buffer.from(buffer)
        });
        text = result.value;
      } else {
        return NextResponse.json(
          { error: 'Format de fichier non supporté. Utilisez PDF ou DOCX.' },
          { status: 400 }
        );
      }

      // Retourner le texte brut
      return NextResponse.json({
        rawText: text
      });

    } catch (error) {
      console.error('Erreur lors de l\'extraction:', error);
      return NextResponse.json(
        { error: `Erreur lors de l'extraction: ` },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Erreur générale:', error);
    return NextResponse.json(
      { error: `Erreur générale: ${error.message}` },
      { status: 500 }
    );
  }
}

async function extractPDFText(buffer: Buffer): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const pdfParser = new PdfParser(null);
      
      pdfParser.on('pdfParser_dataReady', (pdfData) => {
        try {
          const text = pdfData.Pages
            .map(page => page.Texts
              .map(text => {
                try {
                  return decodeURIComponent(text.R[0].T).trim();
                } catch (e) {
                  return '';
                }
              })
              .join(' ')
            )
            .join('\n')
            .trim();

          resolve(text);
        } catch (error) {
          reject(new Error(`Erreur lors de l'extraction du texte: ${error.message}`));
        }
      });

      pdfParser.on('pdfParser_dataError', (error) => {
        reject(new Error(`Erreur lors du parsing PDF: ${error.message}`));
      });

      pdfParser.parseBuffer(buffer);
    } catch (error) {
      reject(new Error(`Erreur lors de l'initialisation du parser: ${error.message}`));
    }
  });
}
