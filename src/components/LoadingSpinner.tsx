export const LoadingSpinner: React.FC = () => {

  return (
    <div className="flex items-center justify-center h-full w-full py-8">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-red-600 rounded-full animate-spin" />
        
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-6 h-6 bg-red-600 rounded-full animate-pulse opacity-75" />
        </div>
      </div>
      
      <p className="sr-only">Loading videos...</p>
    </div>
  );
};

export default LoadingSpinner;
