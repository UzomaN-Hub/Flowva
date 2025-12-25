import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useUserPoints(userId) {
  const [points, setPoints] = useState({ total_points: 0, available_points: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) {
      setLoading(false)
      return
    }
    fetchPoints()
  }, [userId])

  const fetchPoints = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('user_points')
        .select('*')
        .eq('user_id', userId)
        .single()

      if (error) throw error
      setPoints(data || { total_points: 0, available_points: 0 })
    } catch (err) {
      console.error('Error fetching points:', err)
    } finally {
      setLoading(false)
    }
  }

  return { points, loading, refetch: fetchPoints }
}