import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useRewards() {
  const [rewards, setRewards] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchRewards()
  }, [])

  const fetchRewards = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('rewards')
        .select('*')
        .order('points_required', { ascending: true })

      if (error) throw error
      setRewards(data || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { rewards, loading, error, refetch: fetchRewards }
}