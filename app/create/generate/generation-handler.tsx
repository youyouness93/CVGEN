'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { CVPDF } from '@/components/cv-pdf';
import { pdf } from '@react-pdf/renderer';
import type { CVPDFProps } from '@/components/cv-pdf';

type OptimizedCV = CVPDFProps['data'];

const GENERATION_TIME = 35; // 35 secondes
const BACKEND_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000').replace(/\/$/, '');

export function GenerationHandler() {
  const [cvData] = useLocalStorage('cvData', null);
  const [jobData] = useLocalStorage('jobData', null);
  const [optimizedCV, setOptimizedCV] = useState<OptimizedCV | null>(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [cvId, setCvId] = useState<string | null>(null);
  const [generationStarted, setGenerationStarted] = useState(false);
  const [generationComplete, setGenerationComplete] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!cvData || !jobData) {
      router.push('/create');
      return;
    }
  }, [cvData, jobData, router]);

  const startGeneration = async () => {
    setGenerationStarted(true);
    setError(null);
    setProgress(0);
    setGenerationComplete(false);

    let animationFrame: number;
    let startTime: number;

    try {
      console.log('Envoi des données au backend:', {
        cvDataPresent: !!cvData,
        jobDataPresent: !!jobData,
        backendUrl: BACKEND_URL
      });

      const response = await fetch(`${BACKEND_URL}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cvData, jobData }),
      });

      const data = await response.json();

      if (!response.ok || !data.id) {
        throw new Error(data.error || 'Erreur lors de la génération du CV');
      }

      setCvId(data.id);

      // Démarrer l'animation de progression
      startTime = Date.now();
      const animate = () => {
        const elapsedTime = Date.now() - startTime;
        const newProgress = Math.min((elapsedTime / (GENERATION_TIME * 1000)) * 100, 99);
        setProgress(newProgress);

        if (newProgress < 99) {
          animationFrame = requestAnimationFrame(animate);
        }
      };
      animationFrame = requestAnimationFrame(animate);

      // Polling pour vérifier le statut
      while (!generationComplete) {
        await new Promise(resolve => setTimeout(resolve, 2000)); // Attendre 2 secondes

        const statusResponse = await fetch(`${BACKEND_URL}/analyze?id=${data.id}`);
        const statusData = await statusResponse.json();

        if (!statusResponse.ok) {
          throw new Error(statusData.error || 'Erreur lors de la vérification du statut');
        }

        if (statusData.status === 'completed') {
          setOptimizedCV(statusData.data);
          setProgress(100);
          setGenerationComplete(true);
          break;
        } else if (statusData.status === 'error') {
          throw new Error(statusData.error || 'Erreur lors de la génération');
        }
      }
    } catch (err) {
      console.error('Erreur:', err);
      setError(err instanceof Error ? err.message : 'Erreur inattendue');
      setGenerationStarted(false);
    } finally {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    }
  };

  const handleRetry = () => {
    setError(null);
    setGenerationStarted(false);
    setProgress(0);
    setGenerationComplete(false);
    setCvId(null);
  };

  if (error) {
    return (
      <div className="rounded-lg border bg-card p-8 text-center">
        <h3 className="mb-4 text-xl font-semibold text-red-500">Erreur</h3>
        <p className="mb-6 text-muted-foreground">{error}</p>
        <button
          onClick={handleRetry}
          className="rounded bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
        >
          Réessayer
        </button>
      </div>
    );
  }

  if (generationComplete && optimizedCV) {
    return (
      <div>
        <CVPDF data={optimizedCV} />
        <div className="fixed bottom-8 right-8 flex gap-4">
          <button
            onClick={async () => {
              try {
                // Générer le PDF
                const blob = await pdf(<CVPDF data={optimizedCV} />).toBlob();
                // Créer une URL pour le blob
                const url = URL.createObjectURL(blob);
                // Créer un lien temporaire
                const link = document.createElement('a');
                link.href = url;
                link.download = 'cv.pdf';
                // Déclencher le téléchargement
                document.body.appendChild(link);
                link.click();
                // Nettoyer
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
              } catch (error) {
                console.error('Erreur lors de la génération du PDF:', error);
                alert('Une erreur est survenue lors de la génération du PDF.');
              }
            }}
            className="rounded-full bg-primary px-6 py-3 text-primary-foreground hover:bg-primary/90 shadow-lg flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Télécharger le CV
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-card p-8">
      {!generationStarted ? (
        <div className="text-center">
          <h3 className="mb-4 text-xl font-semibold">Prêt à générer votre CV ?</h3>
          <p className="mb-6 text-muted-foreground">
            Nous allons optimiser votre CV en fonction de la description du poste.
            Cette opération prendra environ {GENERATION_TIME} secondes.
          </p>
          <button
            onClick={startGeneration}
            className="rounded bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
          >
            Générer mon CV
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-center text-sm text-muted-foreground">
            {progress < 100
              ? `Génération en cours... ${Math.round(progress)}%`
              : 'Finalisation...'}
          </p>
        </div>
      )}
    </div>
  );
}
