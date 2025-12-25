import React from 'react';
import { Calendar, UserPlus, Gift } from 'lucide-react';

export default function ToolSpotlight() {
  return (
    <div className="cursor-pointer bg-white rounded-xl w-full 2xl:h-[320px] lg:h-[355px] md:h-auto sm:h-auto text-gray-600 relative overflow-hidden shadow-xs border border-gray-200/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="bg-gradient-to-br from-purple-600 to-blue-500 p-3 sm:p-4 md:p-5">
        {/* Featured Badge */}
        <div className="inline-flex items-center gap-1 sm:gap-1.5 bg-white/20 backdrop-blur-sm px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full mb-2 sm:mb-3">
          <span className="text-[10px] sm:text-xs text-white font-semibold">Featured</span>
        </div>

        <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-white">Top Tool Spotlight</h2>
        <h4 className="font-bold text-white text-sm sm:text-base">Reclaim</h4>
      </div>

      {/* Automate Card */}
      <div className="bg-white/15 backdrop-blur-sm rounded-xl p-2 sm:p-3 mb-2">
        <div className="flex items-center gap-3 sm:gap-4 md:gap-5 mb-1">
          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
            <Calendar className="text-purple-600 w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
          <div>
            <h4 className="text-black text-xs sm:text-sm font-semibold">Automate and optimize your schedule</h4>
          </div>
        </div>

        <p className="text-[10px] sm:text-xs text-gray-600 leading-relaxed ml-8 sm:ml-10 md:ml-12">
          Automate and Optimize Your Schedule. Reclaim is an AI-powered calendar assistant that automatically schedules your tasks, meetings, and breaks to boost productivity. Free to try — earn Flowva Points when you sign up!
        </p>
      </div>

      {/* Sign Up Button */}
      <div className='p-1 sm:p-1.5 flex border-t border-gray-300'>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0 w-full px-2 sm:px-3">
          <button className="text-white w-full sm:w-auto text-xs sm:text-sm bg-purple-600 flex items-center justify-center gap-1.5 sm:gap-2 rounded-3xl p-2 cursor-pointer">
            <UserPlus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Sign up
          </button>

          <button className="text-xs sm:text-sm w-full sm:w-auto flex items-center justify-center gap-1.5 sm:gap-2 text-white bg-[linear-gradient(to_bottom_right,_theme(colors.purple.600)_30%,_theme(colors.red.400)_100%)] rounded-3xl p-2 cursor-pointer">
            <Gift className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Claim 50 pts
          </button>
        </div>
      </div>
    </div>
  )
}