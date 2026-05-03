export const LoadingSpinner: React.FC = () => {

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-red-600 rounded-full animate-spin" />
        
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-8 h-8 bg-red-600 rounded-full animate-pulse opacity-75" />
        </div>
      </div>
      
      <p className="mt-6 text-gray-600 font-medium animate-pulse">
        Loading videos...
      </p>
    </div>
  );
};

export default LoadingSpinner;
