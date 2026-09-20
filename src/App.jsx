import React, { useState } from 'react';
import Header from './components/Header';
import OverviewView from './components/OverviewView';
import EvidenceGallery from './components/EvidenceGallery';
import ArtifactsPortal from './components/ArtifactsPortal';
import PeopleShowcase from './components/PeopleShowcase';
import FormalReportView from './components/FormalReportView';
import MediaLightbox from './components/MediaLightbox';

import sourceManifest from './data/sourceManifest';
import artifactsData from './data/artifactsData';
import participantsData from './data/participantsData';
import reportPages from './data/reportData';

export default function App() {
  const [currentTab, setCurrentTab] = useState('overview');
  const [selectedMedia, setSelectedMedia] = useState(null);

  // Helper for Lightbox navigation
  const handleNextMedia = () => {
    if (!selectedMedia) return;
    const currentIndex = sourceManifest.findIndex(item => item.id === selectedMedia.id);
    const nextIndex = (currentIndex + 1) % sourceManifest.length;
    setSelectedMedia(sourceManifest[nextIndex]);
  };

  const handlePrevMedia = () => {
    if (!selectedMedia) return;
    const currentIndex = sourceManifest.findIndex(item => item.id === selectedMedia.id);
    const prevIndex = (currentIndex - 1 + sourceManifest.length) % sourceManifest.length;
    setSelectedMedia(sourceManifest[prevIndex]);
  };

  return (
    <div className="min-h-screen bg-[#070f1b] text-slate-100 flex flex-col justify-between selection:bg-sky-500 selection:text-white">
      {/* Executive Header */}
      <Header 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        totalEvidence={sourceManifest.length}
        totalArtifacts={artifactsData.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        {currentTab === 'overview' && (
          <OverviewView 
            setCurrentTab={setCurrentTab} 
            onOpenEvidence={(item) => setSelectedMedia(item)} 
          />
        )}

        {currentTab === 'evidence' && (
          <EvidenceGallery 
            manifest={sourceManifest} 
            onSelectMedia={(item) => setSelectedMedia(item)} 
          />
        )}

        {currentTab === 'artifacts' && (
          <ArtifactsPortal 
            artifacts={artifactsData} 
          />
        )}

        {currentTab === 'people' && (
          <PeopleShowcase 
            participants={participantsData} 
          />
        )}

        {currentTab === 'report' && (
          <FormalReportView 
            pages={reportPages} 
          />
        )}
      </main>

      {/* Media Lightbox Modal */}
      {selectedMedia && (
        <MediaLightbox
          item={selectedMedia}
          onClose={() => setSelectedMedia(null)}
          onPrev={handlePrevMedia}
          onNext={handleNextMedia}
        />
      )}

      {/* Executive Footer (Hidden during print) */}
      <footer className="bg-[#050c16] border-t border-slate-800/80 py-8 px-4 sm:px-6 text-xs text-slate-500 no-print">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-sky-600/30 text-sky-400 font-bold flex items-center justify-center border border-sky-500/30">
              V
            </div>
            <div>
              <div className="font-bold text-slate-300">
                โรงพยาบาลเวชธานี · Vejthani International Hospital
              </div>
              <div className="text-[11px] text-slate-500">
                โครงการอบรมเชิงปฏิบัติการ AI Strategy &amp; Inpatient Nursing Workflow (AI IPD / NSD 2026)
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400">
            <span>🛡️ PDPA Zero-Leakage Protocol</span>
            <span>•</span>
            <span>🏥 JCI Edition 8 Standardized</span>
            <span>•</span>
            <span>⚡ 1-Click ISBAR Handover</span>
            <span>•</span>
            <span className="text-sky-400 font-mono">Build Status: 100% Production Ready</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
