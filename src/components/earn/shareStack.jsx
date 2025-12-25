import { Share2 } from 'lucide-react';

export default function ShareStack() {
  return (
    <div className="bg-white w-full rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-purple-400 overflow-hidden">
      <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 p-3 sm:p-4">
        <div className="flex items-center">
          <Share2 size={36} className="text-purple-600 bg-purple-200/50 p-2 rounded-lg sm:w-10 sm:h-10 md:w-11 md:h-11" />
        </div>
        <div className='flex flex-col gap-0.5 sm:gap-1'>
          <h3 className="text-xs sm:text-sm font-semibold text-gray-900">Share Your Stack</h3>
          <span className="text-[10px] sm:text-xs font-normal text-gray-500">Earn +25 pts</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 bg-[#F9FAFB] p-3 sm:p-4 md:p-5">
        <p className="text-xs sm:text-sm text-black font-semibold">Share your tool stack</p>
        <button className="py-2 px-3 sm:px-4 bg-blue-50 text-purple-600 rounded-full text-xs sm:text-sm font-semibold hover:from-purple-700 hover:to-purple-800 transition-all duration-200 flex items-center justify-center gap-1.5 sm:gap-2 whitespace-nowrap">
          <Share2 className="text-purple-600 w-3.5 h-3.5 sm:w-4 sm:h-4" />
          Share
        </button>
      </div>
    </div>
  )
}