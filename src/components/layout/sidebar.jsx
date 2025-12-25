import { Home, Compass, BookOpen, Layers, CreditCard, Settings, Gift, Menu, X } from 'lucide-react'
import flowva from "../../assets/flowva.png"

import { useAuth } from '../../hooks/useAuth'
import { useState } from 'react'

export default function Sidebar({ activeTab, onTabChange }) {
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { icon: Home, label: 'Home', id: 'home' },
    { icon: Compass, label: 'Discover', id: 'discover' },
    { icon: BookOpen, label: 'Library', id: 'library' },
    { icon: Layers, label: 'Tech Stack', id: 'tech-stack' },
    { icon: CreditCard, label: 'Subscriptions', id: 'subscriptions' },
    { icon: Gift, label: 'Rewards Hub', id: 'rewards', active: true },
    { icon: Settings, label: 'Settings', id: 'settings' },
  ]

  const userName = user?.email?.split('@')[0] || 'User'
  const userInitial = userName.charAt(0).toUpperCase()

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 flex flex-col z-40
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        {/* Logo */}
        <div className="p-4 sm:p-5 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg overflow-hidden">
                <img
                    src={flowva}
                    alt="Flowva logo"
                    className="w-full h-full object-cover"
                />
            </div>

            <span className="text-base sm:text-lg italic font-normal text-purple-600">Flowva</span>

          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-2 sm:p-3 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = item.id === activeTab
            
            return (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id)
                  setIsOpen(false)
                }}
                className={`
                  w-full flex items-center gap-2.5 sm:gap-3 px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-lg mb-0.5
                  transition-colors duration-200 text-xs sm:text-sm
                  ${isActive 
                    ? 'bg-purple-50 text-purple-700' 
                    : 'text-gray-700 hover:bg-gray-50'
                  }
                `}
              >
                <Icon size={16} className="sm:w-[18px] sm:h-[18px]" />
                <span className="font-medium">{item.label}</span>
              </button>
            )
          })}
        </nav>

        {/* User Section */}
        <div className="p-2 sm:p-3 border-t border-gray-200">
          <div className="flex items-center gap-2 sm:gap-2.5 px-2 sm:px-3 py-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-xs sm:text-sm font-semibold text-purple-700">{userInitial}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-900 truncate capitalize">{userName}</p>
              <p className="text-[10px] sm:text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}