import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useRewards } from '../hooks/useRewards'
import { useUserPoints } from '../hooks/useUserPoints'
import { supabase } from '../lib/supabaseClient'
import RewardTabs from '../components/rewards/rewardTabs'
import RewardsGrid from '../components/rewards/rewardGrid'
import RewardCard from '../components/rewards/rewardCard'
import LoadingSpinner from '../components/common/loadingSpinner'

export default function RedeemRewards() {
  const { user } = useAuth()
  const { rewards, loading } = useRewards()
  const { points, refetch: refetchPoints } = useUserPoints(user?.id)
  const [activeFilter, setActiveFilter] = useState('all')
  const [redeeming, setRedeeming] = useState(false)

  // Filter rewards based on active tab
  const filteredRewards = rewards.filter((reward) => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'unlocked') return reward.status === 'active' && points.available_points >= reward.points_required
    if (activeFilter === 'locked') return reward.status === 'locked' || points.available_points < reward.points_required
    if (activeFilter === 'coming_soon') return reward.status === 'coming_soon'
    return true
  })

  // Calculate counts for tabs
  const counts = {
    all: rewards.length,
    unlocked: rewards.filter(r => r.status === 'active' && points.available_points >= r.points_required).length,
    locked: rewards.filter(r => r.status === 'locked' || points.available_points < r.points_required).length,
    coming_soon: rewards.filter(r => r.status === 'coming_soon').length,
  }

  const handleRedeem = async (reward) => {
    if (redeeming) return
    
    // Check if user has enough points
    if (points.available_points < reward.points_required) {
      alert('You do not have enough points to redeem this reward.')
      return
    }

    const confirmed = window.confirm(
      `Are you sure you want to redeem ${reward.title} for ${reward.points_required} points?`
    )
    
    if (!confirmed) return

    setRedeeming(true)

    try {
      // Deduct points
      const newPoints = points.available_points - reward.points_required
      const { error: updateError } = await supabase
        .from('user_points')
        .update({ 
          available_points: newPoints,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id)

      if (updateError) throw updateError

      // Create redemption record
      const { error: redeemError } = await supabase
        .from('user_rewards')
        .insert({
          user_id: user.id,
          reward_id: reward.id,
          status: 'pending'
        })

      if (redeemError) throw redeemError

      alert('🎉 Reward redeemed successfully! Check your email for details.')
      refetchPoints()
    } catch (err) {
      console.error('Redemption error:', err)
      alert('Failed to redeem reward. Please try again.')
    } finally {
      setRedeeming(false)
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="w-full">
      {/* Page Header - RESPONSIVE */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">Redeem Your Points</h1>
        <p className="text-sm sm:text-base text-gray-600">Choose from our amazing rewards</p>
      </div>

      {/* Tabs - RESPONSIVE */}
      <RewardTabs
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        counts={counts}
      />

      {/* Rewards Grid - RESPONSIVE */}
      {filteredRewards.length === 0 ? (
        <div className="text-center py-12 sm:py-16">
          <p className="text-gray-500 text-base sm:text-lg">No rewards found in this category.</p>
        </div>
      ) : (
        <RewardsGrid>
          {filteredRewards.map((reward) => (
            <RewardCard
              key={reward.id}
              reward={reward}
              onRedeem={handleRedeem}
              userPoints={points.available_points}
            />
          ))}
        </RewardsGrid>
      )}
    </div>
  )
}