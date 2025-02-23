'use client';

import { useState } from 'react';
import { CVPDF } from '@/components/cv-pdf';
import { CVPDFEuropeen } from '@/components/cv-pdf-europeen';
import CVPDFArtistique from '@/components/cv-pdf-artistique';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type CVTemplate = 'standard' | 'europeen' | 'artistique';

export default function DevPage() {
  const [cvData, setCvData] = useState(null);
  const [template, setTemplate] = useState<CVTemplate>('standard');
  const [cvId, setCvId] = useState('');
  const [error, setError] = useState<string | null>(null);

  const fetchCV = async () => {
    if (!cvId.trim()) {
      setError('Veuillez saisir un ID de CV');
      return;
    }

    try {
      setError(null);
      const response = await fetch(`/api/analyze?id=${cvId}`);
      const result = await response.json();

      if (!response.ok || result.error) {
        throw new Error(result.error || 'Erreur lors de la récupération du CV');
      }

      if (result.data) {
        setCvData(result.data);
      } else {
        throw new Error('CV non disponible');
      }
    } catch (error: any) {
      setError(error?.message || 'Erreur lors de la récupération du CV');
      setCvData(null);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      fetchCV();
    }
  };

  return (
    <div className="container mx-auto p-8">
      <div className="mb-8 space-y-4">
        <h1 className="text-2xl font-bold">Page de Développement CV</h1>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <Input
              type="text"
              placeholder="ID du CV"
              value={cvId}
              onChange={(e) => setCvId(e.target.value)}
              onKeyDown={handleKeyPress}
              className="w-full"
            />
            <Select value={template} onValueChange={(value: CVTemplate) => setTemplate(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Choisir un template" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="europeen">Européen</SelectItem>
                <SelectItem value="artistique">L'artistique</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              onClick={fetchCV}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2"
            >
              Charger
            </Button>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}
        </div>

        {cvData && (
          <div className="rounded-lg border p-4">
            {template === 'standard' && <CVPDF data={cvData} />}
            {template === 'europeen' && <CVPDFEuropeen data={cvData} />}
            {template === 'artistique' && <CVPDFArtistique data={cvData} />}
          </div>
        )}
      </div>
    </div>
  );
}