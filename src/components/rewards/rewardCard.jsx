import { useState } from 'react'

export default function RewardCard({ reward, onRedeem, userPoints }) {
  const [isHovered, setIsHovered] = useState(false)
  
  const canRedeem = reward.status === 'active' && userPoints >= reward.points_required
  const isLocked = reward.status === 'locked' || userPoints < reward.points_required
  const isComingSoon = reward.status === 'coming_soon'

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        bg-white rounded-xl p-4 sm:p-5 border border-gray-200
        transition-all duration-300 ease-in-out cursor-pointer
        ${isHovered ? 'transform -translate-y-2 shadow-xl' : 'shadow-sm'}
      `}
    >
      {/* Icon Circle */}
      <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
        <span className="text-xl sm:text-2xl">{reward.icon_emoji}</span>
      </div>

      {/* Title */}
      <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 text-center">
        {reward.title}
      </h3>

      {/* Description */}
      <p className="text-xs sm:text-xs text-gray-600 mb-3 text-center min-h-[44px] sm:min-h-[48px] leading-relaxed">
        {reward.description}
      </p>

      {/* Points Badge */}
      <div className="flex justify-center mb-3">
        <div className="inline-flex items-center gap-1 bg-yellow-50 px-2 sm:px-2.5 py-1 rounded-full">
          <span className="text-sm sm:text-base">🪙</span>
          <span className="text-xs font-medium text-yellow-600">
            {reward.points_required} pts
          </span>
        </div>
      </div>

      {/* Redeem Button */}
      <button
        onClick={() => canRedeem && onRedeem(reward)}
        disabled={!canRedeem}
        className={`
          w-full py-2 sm:py-2.5 rounded-lg font-semibold text-xs sm:text-sm
          transition-all duration-200
          ${canRedeem
            ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 cursor-pointer'
            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }
        `}
      >
        {isComingSoon ? 'Coming Soon' : isLocked ? 'Locked' : 'Redeem'}
      </button>
    </div>
  )
}