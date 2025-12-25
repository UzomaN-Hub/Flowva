import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import { Bell } from 'lucide-react'
import Login from './pages/login'
import EarnPoints from './pages/earnPoints'
import RedeemRewards from './pages/redeemRewards'
import Sidebar from './components/layout/sidebar'
import LoadingSpinner from './components/common/loadingSpinner'

function App() {
  const { user, loading, signOut } = useAuth()
  const [activeTab, setActiveTab] = useState('rewards')
  const [rewardsView, setRewardsView] = useState('earn')

  if (loading) {
    return <LoadingSpinner />
  }

  const userInitial =
    user?.name?.charAt(0).toUpperCase() ||
    user?.email?.charAt(0).toUpperCase() ||
    'U'

  return (
    <Routes>
      {/* Login Route */}
      <Route
        path="/login"
        element={!user ? <Login /> : <Navigate to="/" />}
      />

      {/* Protected App Route */}
      <Route
        path="/"
        element={
          user ? (
            <div className="min-h-screen bg-gray-50 flex">
              {/* Sidebar */}
              <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

              {/* Main Content */}
              <main className="flex-1 lg:ml-64 min-h-screen flex flex-col">
                {activeTab === 'rewards' && (
                  <>
                    <header className="sticky top-0 z-20 bg-gray-50/95 backdrop-blur-sm border-b border-gray-200">
                      <div className="pt-16 lg:pt-8 px-4 sm:px-6 md:px-8">
                        {/* Rewards Hub Header Row */}
                        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-0">
                          <div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
                              Rewards Hub
                            </h2>
                            <p className="text-sm sm:text-base text-gray-600">
                              Earn points, unlock rewards, and celebrate your progress!
                            </p>
                          </div>

                          {/* Desktop Icons */}
                          <div className="hidden sm:flex items-center gap-4 md:gap-6">
                            <button className="cursor-pointer relative p-1.5 bg-white border border-gray-200 rounded-full hover:bg-gray-100 transition-colors shadow-sm">
                              <Bell size={18} className="text-gray-700" />
                              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 border-2 border-white rounded-full flex items-center justify-center text-[9px] font-bold text-white">
                                1
                              </span>
                            </button>

                            <div className="flex items-center gap-3">
                              <div className="cursor-pointer w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-[13px] font-bold text-purple-700 border border-purple-200">
                                {userInitial}
                              </div>

                              <button
                                onClick={() => signOut()}
                                className="cursor-pointer text-[13px] font-medium text-gray-600 hover:text-red-600 transition-colors"
                              >
                                Sign Out
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Tab Switcher */}
                        <div className="flex gap-2 sm:gap-4 overflow-x-auto no-scrollbar">
                          <button
                            onClick={() => setRewardsView('earn')}
                            className={`
                              pb-3 px-4 font-semibold cursor-pointer relative text-sm sm:text-base whitespace-nowrap transition-all
                              ${rewardsView === 'earn'
                                ? 'text-purple-600'
                                : 'text-gray-500 hover:text-gray-900'
                              }
                            `}
                          >
                            Earn Points
                            {rewardsView === 'earn' && (
                              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600 rounded-t-full"></div>
                            )}
                          </button>

                          <button
                            onClick={() => setRewardsView('redeem')}
                            className={`
                              pb-3 px-4 font-semibold cursor-pointer relative text-sm sm:text-base whitespace-nowrap transition-all
                              ${rewardsView === 'redeem'
                                ? 'text-purple-600'
                                : 'text-gray-500 hover:text-gray-900'
                              }
                            `}
                          >
                            Redeem Rewards
                            {rewardsView === 'redeem' && (
                              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600 rounded-t-full"></div>
                            )}
                          </button>
                        </div>
                      </div>
                    </header>

                    {/* Scrollable Content */}
                    <div className="p-4 sm:p-6 md:p-8 flex-1">
                      {rewardsView === 'earn' ? <EarnPoints /> : <RedeemRewards />}
                    </div>
                  </>
                )}

                {activeTab !== 'rewards' && (
                  <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                      Coming Soon
                    </h2>
                    <p className="text-sm sm:text-base text-gray-600">
                      This section is under development.
                    </p>
                  </div>
                )}
              </main>
            </div>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  )
}

export default App
