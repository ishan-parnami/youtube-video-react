import Header from './components/Header';
import VideoGrid from './components/VideoGrid';
import { useVideos } from './hooks/useVideos';

const App: React.FC = () => {
  const { 
    videos, 
    loading, 
    loadingMore,
    hasMore,
    loadMore,
    error, 
    refetch,
  } = useVideos();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="max-w-[2000px] mx-auto flex-1 flex flex-col">
        <VideoGrid 
          videos={videos}
          loading={loading}
          loadingMore={loadingMore}
          hasMore={hasMore}
          loadMore={loadMore}
          error={error}
          onRetry={refetch}
        />
      </main>

      <footer className="border-t border-gray-200 bg-white">
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
