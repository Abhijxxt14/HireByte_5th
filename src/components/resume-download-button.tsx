'use client';

import { useState, useCallback, memo } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import dynamic from 'next/dynamic';
import type { Resume } from '@/lib/types';

interface ResumeDownloadButtonProps {
  resumeData: Resume;
  sectionOrder?: string[];
}

// Lazy load the PDF components only when needed
const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),
  { ssr: false }
);

const ResumePDF = dynamic(() => import('@/components/resume-pdf').then((mod) => mod.ResumePDF), {
  ssr: false,
});

export const ResumeDownloadButton = memo(function ResumeDownloadButton({ 
  resumeData, 
  sectionOrder 
}: ResumeDownloadButtonProps) {
  const [isReady, setIsReady] = useState(false);

  const handleClick = useCallback(() => {
    setIsReady(true);
  }, []);

  const fileName = `${resumeData.personalInfo.name?.replace(/\s+/g, '_') || 'resume'}.pdf`;

  // Only render PDFDownloadLink when user clicks the button
  if (!isReady) {
    return (
      <Button onClick={handleClick} className="gap-2">
        <Download className="h-4 w-4" />
        Prepare Download
      </Button>
    );
  }

  return (
    <PDFDownloadLink
      document={<ResumePDF resume={resumeData} sectionOrder={sectionOrder} />}
      fileName={fileName}
      className="inline-block"
    >
      {({ loading }) => (
        <Button disabled={loading} className="gap-2">
          <Download className="h-4 w-4" />
          {loading ? 'Generating PDF...' : 'Download PDF'}
        </Button>
      )}
    </PDFDownloadLink>
  );
});
