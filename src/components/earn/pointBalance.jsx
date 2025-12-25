import { Award, CirclePoundSterling } from 'lucide-react'; 

export default function PointsBalance({ points, loading }) {
  const progress = (points.available_points / 5000) * 100;

  return (
  
    <div className="group cursor-pointer bg-white w-full 2xl:h-[320px] lg:h-[355px] md:h-auto sm:h-auto rounded-xl border border-gray-200/80 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-xl overflow-hidden">
      
      {/* Light Blue Header */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-3 sm:px-4 md:px-5 py-3 sm:py-4 flex items-center gap-2 border-b border-gray-100">
        <Award className="text-purple-600 w-5 h-5 sm:w-6 sm:h-6" />
        <h3 className="text-sm sm:text-base font-semibold text-gray-900">Points Balance</h3>
      </div>

      {/* White Content Section */}
      <div className="p-3 sm:p-4 md:p-5">
        {loading ? (
          <div className="animate-pulse">
            <div className="h-10 sm:h-12 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-2/3"></div>
          </div>
        ) : (
          <>
            
            <div className="flex items-center justify-between mb-3">
              <div className="text-3xl sm:text-4xl md:text-4xl font-bold text-gray-900">
                {points.available_points}
              </div>
              
              {/* Gold Coin Icon */}
              <div className="bg-yellow-100 p-2 rounded-full">
                <CirclePoundSterling
                  className="w-7 h-7 sm:w-8 sm:h-8 text-yellow-500 transition-transform duration-500 group-hover:animate-[spin_2s_linear_infinite]" 
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between text-xs text-gray-600 mt-8 sm:mt-12 md:mt-14 mb-2">
              <span>Progress to $5 Gift Card</span>
              <span className="font-medium text-gray-900">
                {points.available_points}/5000
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
              <div 
                className="bg-gradient-to-r from-purple-500 to-purple-600 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(progress, 100)}%` }}
              ></div>
            </div>

            <p className="text-xs text-gray-600 flex items-center gap-1">
              <span>🚀</span>
              Just getting started — keep earning points!
            </p>
          </>
        )}
      </div>
    </div>
  );
}