import React from 'react';
import { Star } from 'lucide-react';

export default function ReferralCard() {
  return (
    <div className="bg-white rounded-xl w-full flex flex-col border border-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-purple-400 overflow-hidden">
      <div className="flex items-center gap-3 sm:gap-4 md:gap-6 p-3 sm:p-4 md:p-5">
        <Star size={36} className='bg-purple-200/50 text-purple-600 p-2 sm:w-10 sm:h-10 md:w-11 md:h-11' />
        <h3 className="text-sm sm:text-[15px] md:text-[16px] text-gray-900 font-medium tracking-tight">Refer and win 10,000 points!</h3>
      </div>

      <div className="bg-[#F9FAFB] p-3 sm:p-4 md:p-5">
        <p className="text-xs sm:text-sm text-black leading-relaxed font-medium">
          Invite 3 friends by <span className="text-gray-900 font-bold">Nov 20</span> and earn a chance to be one of 5 winners of{' '}
          <span className="text-purple-600 font-bold">10,000 points</span>. Friends must complete onboarding to qualify.
        </p>
      </div>
    </div>
  )
}