import Header from './components/Header';
import VideoGrid from './components/VideoGrid';
import { useVideos } from './hooks/useVideos';

const App: React.FC = () => {
  const { 
    videos, 
    loading, 
    error, 
    refetch,
    currentPage,
    totalPages,
    hasNextPage,
    hasPrevPage,
    nextPage,
    prevPage,
  } = useVideos();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-[2000px] mx-auto">
        <VideoGrid 
          videos={videos}
          loading={loading}
          error={error}
          onRetry={refetch}
        />

        {/* Pagination Controls */}
        {videos.length > 0 && !loading && !error && (
          <div className="flex items-center justify-center gap-4 py-8 px-4">
            <button
              onClick={prevPage}
              disabled={!hasPrevPage}
              className="px-6 py-2 bg-red-600 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:enabled:bg-red-700"
            >
              ← Previous
            </button>
            
            <span className="text-gray-700 font-medium">
              Page {currentPage} of {totalPages}
            </span>
            
            <button
              onClick={nextPage}
              disabled={!hasNextPage}
              className="px-6 py-2 bg-red-600 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:enabled:bg-red-700"
            >
              Next →
            </button>
          </div>
        )}
      </main>

      <footer className="border-t border-gray-200 bg-white mt-12">
        <div className="max-w-[2000px] mx-auto px-4 md:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-600">
            Built with React, TypeScript & Tailwind CSS • Data from{' '}
            <a 
              href="https://freeapi.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-red-600 hover:text-red-700 font-medium transition-colors"
            >
              FreeAPI
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
