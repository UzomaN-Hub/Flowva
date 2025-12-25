import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useDailyStreak(userId) {
  const [streak, setStreak] = useState({
    current_streak: 0,
    last_check_in: null,
    total_check_ins: 0
  })
  const [loading, setLoading] = useState(true)
  const [canClaim, setCanClaim] = useState(false)

  useEffect(() => {
    if (!userId) {
      setLoading(false)
      return
    }
    fetchStreak()
  }, [userId])

  const fetchStreak = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('daily_streaks')
        .select('*')
        .eq('user_id', userId)
        .single()

      if (error && error.code !== 'PGRST116') throw error

      if (data) {
        setStreak(data)
        // Check if user can claim today
        const today = new Date().toISOString().split('T')[0]
        setCanClaim(data.last_check_in !== today)
      } else {
        // Create new streak record
        const { data: newStreak, error: createError } = await supabase
          .from('daily_streaks')
          .insert({
            user_id: userId,
            current_streak: 0,
            last_check_in: null,
            total_check_ins: 0
          })
          .select()
          .single()

        if (createError) throw createError
        setStreak(newStreak)
        setCanClaim(true)
      }
    } catch (err) {
      console.error('Error fetching streak:', err)
    } finally {
      setLoading(false)
    }
  }

  const claimStreak = async () => {
    if (!canClaim) return { success: false, message: 'Already claimed today!' }

    try {
      const today = new Date().toISOString().split('T')[0]
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
      
      // Calculate new streak
      let newStreak = 1
      if (streak.last_check_in === yesterday) {
        newStreak = streak.current_streak + 1
      }

      // Update streak
      const { error: streakError } = await supabase
        .from('daily_streaks')
        .update({
          current_streak: newStreak,
          last_check_in: today,
          total_check_ins: streak.total_check_ins + 1
        })
        .eq('user_id', userId)

      if (streakError) throw streakError

      // Add 5 points
      const { data: pointsData, error: pointsError } = await supabase
        .from('user_points')
        .select('*')
        .eq('user_id', userId)
        .single()

      if (pointsError) throw pointsError

      const { error: updatePointsError } = await supabase
        .from('user_points')
        .update({
          available_points: pointsData.available_points + 5,
          total_points: pointsData.total_points + 5,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId)

      if (updatePointsError) throw updatePointsError

      // Refresh data
      await fetchStreak()
      
      return { success: true, message: '🎉 +5 points claimed!' }
    } catch (err) {
      console.error('Error claiming streak:', err)
      return { success: false, message: 'Failed to claim. Try again.' }
    }
  }

  return { streak, loading, canClaim, claimStreak, refetch: fetchStreak }
}