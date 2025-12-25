import { useState, useEffect } from 'react'
import { Zap } from 'lucide-react'
import { supabase } from '../../lib/supabaseClient'
import { useAuth } from '../../hooks/useAuth'

export default function DailyStreak({ onPointsUpdate }) {
  const { user } = useAuth()
  const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  const [checkedDays, setCheckedDays] = useState([])
  const [currentStreak, setCurrentStreak] = useState(0)
  const [hasClaimed, setHasClaimed] = useState(false)
  const [showModal, setShowModal] = useState(false)
  
  // Get current day of week 
  const today = new Date().getDay()

  useEffect(() => {
    const fetchStreak = async () => {
      if (!user?.id) return
      
      try {
        const { data } = await supabase
          .from('daily_streaks')
          .select('*')
          .eq('user_id', user.id)
          .single()

        if (data) {
          setCurrentStreak(data.current_streak)
          if (data.last_check_in) {
            const lastDay = new Date(data.last_check_in).getDay()
            setCheckedDays([lastDay])
            
            // Check if already claimed today
            const todayDate = new Date().toISOString().split('T')[0]
            if (data.last_check_in === todayDate) {
              setHasClaimed(true)
            }
          }
        }
      } catch (err) {
        console.error('Error fetching streak:', err)
      }
    }

    fetchStreak()
  }, [user?.id])

  const handleClaim = async () => {
    if (hasClaimed) return

    try {
      // Check if streak record exists
      const { data: existingStreak } = await supabase
        .from('daily_streaks')
        .select('*')
        .eq('user_id', user.id)
        .single()

      const todayDate = new Date().toISOString().split('T')[0]

      if (existingStreak) {
        // Update existing streak
        await supabase
          .from('daily_streaks')
          .update({
            current_streak: existingStreak.current_streak + 1,
            last_check_in: todayDate,
            total_check_ins: existingStreak.total_check_ins + 1
          })
          .eq('user_id', user.id)
      } else {
        // Create new streak
        await supabase
          .from('daily_streaks')
          .insert({
            user_id: user.id,
            current_streak: 1,
            last_check_in: todayDate,
            total_check_ins: 1
          })
      }

      // Add 5 points
      const { data: pointsData } = await supabase
        .from('user_points')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (pointsData) {
        await supabase
          .from('user_points')
          .update({
            available_points: pointsData.available_points + 5,
            total_points: pointsData.total_points + 5,
            updated_at: new Date().toISOString()
          })
          .eq('user_id', user.id)
      }

      // Update UI
      setCheckedDays([today])
      setCurrentStreak(prev => prev + 1)
      setHasClaimed(true)
      setShowModal(true)
      
      // Trigger parent to refresh points
      if (onPointsUpdate) {
        onPointsUpdate()
      }
    } catch (err) {
      console.error('Error claiming:', err)
      alert('Failed to claim. Try again.')
    }
  }
  
  return (
    <>
      <div className="cursor-pointer bg-white rounded-xl 2xl:h-[320px] lg:h-[355px] md:h-auto sm:h-auto border border-gray-200/80 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-xl overflow-hidden w-full">
        {/* Light Blue Header */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-3 sm:px-4 md:px-5 py-3 sm:py-4 flex items-center gap-2 border-b border-gray-100">
          <span className="text-lg sm:text-xl">📅</span>
          <h3 className="text-sm sm:text-base font-semibold text-gray-900">Daily Streak</h3>
        </div>

        {/* White Content Section */}
        <div className="p-3 sm:p-4 md:p-5">
          {/* Streak Counter */}
          <div className="mb-3 sm:mb-4 md:mb-5">
            <div className="text-3xl sm:text-4xl md:text-4xl font-bold text-purple-600 mb-1">
              {currentStreak} day{currentStreak !== 1 ? 's' : ''}
            </div>
          </div>

          {/* Days of Week */}
          <div className="flex justify-center gap-1 sm:gap-1.5 md:gap-2 mb-2">
            {daysOfWeek.map((day, index) => {
              const isChecked = checkedDays.includes(index)
              
              return (
                <div
                  key={index}
                  className={`
                    w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full 
                    flex items-center justify-center text-xs sm:text-sm font-bold
                    transition-all duration-300
                    ${isChecked 
                      ? 'border-2 border-purple-600 bg-purple-50 text-purple-600' 
                      : 'border-2 border-gray-200 text-gray-400'
                    }
                  `}
                >
                  {day}
                </div>
              )
            })}
          </div>
          <p className="text-xs text-center text-gray-600 mb-3 sm:mb-4">Check in daily to earn +5 points</p>

          {/* Claim Button */}
          <button 
            onClick={handleClaim}
            disabled={hasClaimed}
            className={`
              w-full py-2.5 sm:py-3 rounded-3xl text-xs sm:text-sm font-semibold 
              transition-all duration-200 flex items-center justify-center gap-2
              ${hasClaimed
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800'
              }
            `}
          >
            {hasClaimed ? (
              <>
                <span>✅</span>
                Claimed Today
              </>
            ) : (
              <>
                <Zap size={16} color="white" />
                Claim Today's Points
              </>
            )}
          </button>
        </div>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl animate-[scale-in_0.3s_ease-out]">
            {/* Success Icon */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center">
              <span className="text-4xl sm:text-5xl">🎉</span>
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-2">
              Congratulations!
            </h2>

            {/* Message */}
            <p className="text-center text-gray-600 mb-6">
              <span className="text-lg sm:text-xl font-semibold text-purple-600">+5 points</span> claimed successfully! 🎊
              <br />
              <span className="text-sm">Come back tomorrow to continue your streak!</span>
            </p>

            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-purple-800 transition-all duration-200"
            >
              Awesome!
            </button>
          </div>
        </div>
      )}
    </>
  )
}