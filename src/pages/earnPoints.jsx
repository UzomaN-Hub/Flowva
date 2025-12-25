import { useAuth } from '../hooks/useAuth'
import { useUserPoints } from '../hooks/useUserPoints'
import PointsBalance from '../components/earn/pointBalance'
import DailyStreak from '../components/earn/dailyStreak'
import ReferralCard from '../components/earn/referralCard'
import ReferralStats from '../components/earn/referralStats'
import ToolSpotlight from '../components/earn/toolSpotlight'
import ShareStack from '../components/earn/shareStack'

export default function EarnPoints() {
  const { user } = useAuth()
  const { points, loading, refetch: refetchPoints } = useUserPoints(user?.id)

  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="mb-4 sm:mb-6 border-l-4 border-purple-600 pl-3 sm:pl-4">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Your Rewards Journey</h2>
      </div>

      {/* Three Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-6 sm:mb-8">
        {/* Points Balance */}
        <PointsBalance points={points} loading={loading} />

        {/* Daily Streak */}
        <DailyStreak onPointsUpdate={refetchPoints} />

        {/* Tool Spotlight */}
        <ToolSpotlight />
      </div>

      {/* Earn More Points Section */}
      <div className="mb-6 sm:mb-8">
        <div className="border-l-4 border-purple-600 pl-3 sm:pl-4 mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Earn More Points</h2>
        </div>

 
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
          {/* Referral Card */}
          <ReferralCard userId={user?.id} />

          {/* Share Your Stack Card */}
          <ShareStack />
        </div>

        {/* Refer & Earn Section */}
        <div className="mt-8 sm:mt-10 md:mt-12">
          <div className="border-l-4 border-purple-600 pl-3 sm:pl-4 mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Refer & Earn</h2>
          </div>
          <ReferralStats userId={user?.username} />
        </div>
      </div>
    </div>
  )
}