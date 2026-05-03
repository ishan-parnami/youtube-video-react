import { FaYoutube } from 'react-icons/fa';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-[2000px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16">
          <div className="flex items-center gap-2">
            <FaYoutube className="w-8 h-8 md:w-9 md:h-9 text-red-600" aria-hidden="true" />
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">
              Video<span className="text-red-600">Hub</span>
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <p className="text-xs md:text-sm text-gray-600 hidden sm:block">
              Powered by FreeAPI
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
