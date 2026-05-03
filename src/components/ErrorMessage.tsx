import { MdError, MdRefresh } from 'react-icons/md';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full px-4">
      <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-center mb-4">
          <div className="bg-red-100 rounded-full p-3">
            <MdError className="w-12 h-12 text-red-600" />
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
          Oops! Something went wrong
        </h3>
        <p className="text-gray-600 text-center mb-6">
          {message}
        </p>

        {onRetry && (
          <button
            onClick={onRetry}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            aria-label="Retry loading videos"
          >
            <MdRefresh className="w-5 h-5" />
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
