import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import OverviewView from './components/OverviewView';
import DashboardView from './components/DashboardView';
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
  const [currentTab, setCurrentTabState] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '');
      if (['overview', 'dashboard', 'portfolio', 'atmosphere', 'artifacts', 'people', 'documents', 'report'].includes(hash)) {
        return hash;
      }
    }
    return 'overview';
  });

  const setCurrentTab = (tab) => {
    setCurrentTabState(tab);
    if (typeof window !== 'undefined') {
      window.location.hash = tab;
    }
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['overview', 'dashboard', 'portfolio', 'atmosphere', 'artifacts', 'people', 'documents', 'report'].includes(hash)) {
        setCurrentTabState(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

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
    <div className="min-h-screen bg-gradient-to-b from-[#f8fafc] via-[#f0f6ff] to-[#f8fafc] text-slate-800 flex flex-col justify-between selection:bg-blue-600 selection:text-white">
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

        {currentTab === 'dashboard' && (
          <DashboardView 
            setCurrentTab={setCurrentTab} 
            onOpenEvidence={(item) => setSelectedMedia(item)} 
          />
        )}

        {currentTab === 'portfolio' && (
          <EvidenceGallery 
            manifest={sourceManifest} 
            onSelectMedia={(item) => setSelectedMedia(item)} 
            initialCategory="portfolio"
          />
        )}

        {currentTab === 'atmosphere' && (
          <EvidenceGallery 
            manifest={sourceManifest} 
            onSelectMedia={(item) => setSelectedMedia(item)} 
            initialCategory="atmosphere"
          />
        )}

        {currentTab === 'documents' && (
          <EvidenceGallery 
            manifest={sourceManifest} 
            onSelectMedia={(item) => setSelectedMedia(item)} 
            initialCategory="documents"
          />
        )}

        {currentTab === 'evidence' && (
          <EvidenceGallery 
            manifest={sourceManifest} 
            onSelectMedia={(item) => setSelectedMedia(item)} 
            initialCategory="all"
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
      <footer className="bg-white/90 backdrop-blur-md border-t border-blue-100 py-8 px-4 sm:px-6 text-xs text-slate-500 no-print mt-12 shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-3.5">
            <img 
              src="./assets/vejthani-logo.png" 
              alt="Vejthani Hospital" 
              className="h-9 object-contain"
            />
            <div className="border-l border-blue-100 pl-3.5">
              <div className="font-bold text-slate-900 text-xs">
                โรงพยาบาลเวชธานี · Vejthani International Hospital
              </div>
              <div className="text-[11px] text-slate-500">
                โครงการอบรมเชิงปฏิบัติการ AI Strategy &amp; Inpatient Nursing Workflow (AI IPD / NSD 2026)
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-600 font-medium">
            <span className="flex items-center gap-1 text-blue-800 font-bold bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
              🛡️ PDPA Zero-Leakage
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-slate-700 font-bold bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
              🏥 JCI Edition 8 Standard
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
              ⚡ 1-Click ISBAR Handover
            </span>
            <span>•</span>
            <span className="text-blue-700 font-mono font-bold">Build: 100% Production Ready</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
