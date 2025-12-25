import { Copy, Users } from 'lucide-react'
import { useState } from 'react'

export default function ReferralStats({ userId }) {
  const [copied, setCopied] = useState(false)
  const referralLink = `https://app.flowvahub.com/signup?ref=${userId ? userId : 'uzoma4592'}`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-transparent rounded-xl border border-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl w-full">
      {/* Header Section */}
      <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8 md:mb-10 bg-blue-50 w-full p-3 sm:p-4 rounded-sm">
        <div className="p-1.5 sm:p-2">
          <Users size={20} className="text-purple-600 sm:w-6 sm:h-6" />
        </div>
        <div>
          <h4 className="text-base sm:text-lg md:text-xl font-semibold text-gray-700">Share Your Link</h4>
          <p className="text-xs sm:text-sm text-gray-600">Invite friends and earn 25 points when they join!</p>
        </div>
      </div>

      {/* Centered Stats Section */}
      <div className="flex justify-center items-center mb-8 sm:mb-10 md:mb-12 px-3 sm:px-4">
        <div className='w-full max-w-[52rem] items-center justify-around sm:justify-between flex'>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-semibold text-purple-600 mb-1">0</div>
            <p className="text-[10px] sm:text-[11px] text-black uppercase tracking-wider">Referrals</p>
          </div>
          
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-semibold text-purple-600 mb-1">0</div>
            <p className="text-[10px] sm:text-[11px] text-black uppercase tracking-wider">Points Earned</p>
          </div>
        </div>
      </div>

      {/* Share Input Section */}
      <div className="w-full mx-auto p-2 sm:p-3 bg-purple-50/50 rounded-lg">
        <p className="text-xs sm:text-sm text-gray-700 mb-2 ml-1">Your personal referral link:</p>
        <div className="flex items-center bg-white border border-gray-200 rounded-lg overflow-hidden mb-4 sm:mb-6 focus-within:border-purple-600 focus-within:border-2 transition-all">
          <input 
            readOnly 
            value={referralLink}
            className="flex-1 px-3 sm:px-4 py-1.5 text-xs sm:text-sm text-black/80 outline-none"
          />
          <button
            onClick={copyToClipboard}
            className="p-2 sm:p-3 text-purple-600 hover:bg-gray-50 transition-colors border-l border-gray-100"
          >
            <Copy size={16} className="sm:w-[18px] sm:h-[18px]" />
          </button>
        </div>

        {copied && (
          <p className="text-center text-[10px] sm:text-[11px] text-green-600 font-bold mb-3 sm:mb-4">✓ Link copied to clipboard!</p>
        )}

        {/* Social Share Buttons */}
        <div className="flex gap-3 sm:gap-4 justify-center">
          {/* Facebook */}
          <a
            href="https://www.facebook.com/share/1CzB2UGNaz/?mibextid=wwXlfr"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#1877F2] flex items-center justify-center text-white shadow-sm hover:opacity-90"
          >
            <span className="font-bold text-sm">f</span>
          </a>

          {/* X */}
          <a
            href="https://twitter.com/BIGUZOMA"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black flex items-center justify-center text-white shadow-sm hover:opacity-90"
          >
            <span className="text-base sm:text-lg">𝕏</span>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/Uzoma-Nwaiwu"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#0077B5] flex items-center justify-center text-white shadow-sm hover:opacity-90"
          >
            <span className="text-[10px] sm:text-[11px] font-bold">in</span>
          </a>

          {/* WhatsApp (LinkedIn handle as requested) */}
          <a
            href="https://www.linkedin.com/in/Uzoma-Nwaiwu"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-sm hover:opacity-90"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}
