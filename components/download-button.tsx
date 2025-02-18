'use client';

import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { CVDocument } from './cv-pdf';
import type { CVPDFProps } from './cv-pdf';

interface DownloadButtonProps {
  data: CVPDFProps['data'];
  className?: string;
}

export function DownloadButton({ data, className = '' }: DownloadButtonProps) {
  return (
    <PDFDownloadLink
      document={<CVDocument data={data} />}
      fileName={`CV-${data.personalInfo.name.replace(/\s+/g, '-')}.pdf`}
      className={`bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold text-center block mx-auto w-fit shadow-lg transition-colors ${className}`}
    >
      {({ loading }) =>
        loading ? 'Préparation du PDF...' : 'Télécharger le CV'
      }
    </PDFDownloadLink>
  );
}
