export default function RewardTabs({ activeFilter, onFilterChange, counts }) {
  const tabs = [
    { id: 'all', label: 'All Rewards', count: counts.all },
    { id: 'unlocked', label: 'Unlocked', count: counts.unlocked },
    { id: 'locked', label: 'Locked', count: counts.locked },
    { id: 'coming_soon', label: 'Coming Soon', count: counts.coming_soon },
  ]

  return (
    <div className="flex gap-3 sm:gap-4 md:gap-6 border-b border-gray-200 mb-6 sm:mb-8 overflow-x-auto scrollbar-hide">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onFilterChange(tab.id)}
          className={`
            pb-3 sm:pb-4 px-2 font-medium text-xs sm:text-sm relative
            transition-colors duration-200 whitespace-nowrap flex-shrink-0
            ${activeFilter === tab.id
              ? 'text-purple-600'
              : 'text-gray-600 hover:text-gray-900'
            }
          `}
        >
          {tab.label}
          {tab.count > 0 && (
            <span className={`
              ml-1.5 sm:ml-2 px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold
              ${activeFilter === tab.id
                ? 'bg-purple-100 text-purple-600'
                : 'bg-gray-100 text-gray-600'
              }
            `}>
              {tab.count}
            </span>
          )}
          
          {/* Active indicator */}
          {activeFilter === tab.id && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"></div>
          )}
        </button>
      ))}
    </div>
  )
}