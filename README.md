# Flowva Rewards Hub 

A full-stack rewards platform built with React and Supabase, allowing users to earn points through daily check-ins, referrals, and redeem them for gift cards and rewards.



##  Live Demo

**Live URL:** [https://flowva-rewards-hub.vercel.app/](https://flowva-rewards-hub.vercel.app/)

##  Features

### Core Functionality
-  **User Authentication** - Secure email/password authentication via Supabase Auth
-  **Points System** - Track and manage user reward points
-  **Daily Streak** - Earn 5 points daily with streak tracking
-  **Rewards Catalog** - Browse and redeem gift cards ($5-$10 Amazon, Google Play, Apple, etc.)
-  **Referral System** - Earn points by inviting friends
-  **Responsive Design** - Fully optimized for mobile, tablet, and desktop (including 2XL monitors)

### User Experience
-  Modern UI with Tailwind CSS
-  Real-time point balance updates
-  Mobile-first responsive design
-  Smooth hover animations and transitions
-  Intuitive navigation with sidebar

##  Tech Stack

**Frontend:**
- React 19 (JavaScript)
- Vite (Build tool)
- Tailwind CSS (Styling)
- Lucide React (Icons)

**Backend:**
- Supabase (Backend-as-a-Service)
  - PostgreSQL Database
  - Authentication
  - Row Level Security (RLS)
  - Real-time subscriptions

**Deployment:**
- Vercel (Frontend)
- Supabase Cloud (Backend)

##  Installation

### Prerequisites
- Node.js 18+ and npm
- Supabase account
- Git

### Setup Instructions

1. **Clone the repository**
```bash
git clone https://github.com/UzomaN-Hub/flowva.git
cd flow
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Copy your project URL and anon key from Settings → API
   - Run the SQL schema (see Database Setup section below)

4. **Configure environment variables**

Create a `.env.local` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

5. **Run the development server**
```bash
npm run dev
```



##  Database Setup

Run this SQL in your Supabase SQL Editor:
```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Rewards table
CREATE TABLE rewards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  points_required INTEGER NOT NULL,
  icon_emoji TEXT DEFAULT '🎁',
  category TEXT DEFAULT 'gift_card',
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User points table
CREATE TABLE user_points (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  total_points INTEGER DEFAULT 0,
  available_points INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User rewards (redemption history)
CREATE TABLE user_rewards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  reward_id UUID REFERENCES rewards(id) ON DELETE CASCADE,
  redeemed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'pending'
);

-- Daily streaks table
CREATE TABLE daily_streaks (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  current_streak INTEGER DEFAULT 0,
  last_check_in DATE,
  total_check_ins INTEGER DEFAULT 0
);

-- Insert sample rewards
INSERT INTO rewards (title, description, points_required, icon_emoji, category, status) VALUES
('$5 Bank Transfer', 'The $5 credit will be transferred to your bank account.', 5000, '💳', 'transfer', 'active'),
('$5 PayPal International', 'Receive a $5 PayPal balance transfer directly to your PayPal account email.', 5000, '💳', 'transfer', 'active'),
('$5 Virtual Visa Card', 'Use this $5 prepaid card to shop anywhere Visa is accepted online.', 5000, '🎁', 'gift_card', 'locked'),
('$5 Apple Gift Card', 'Redeem to buy apps, subscriptions, games, music, movies, and more on the App Store and iTunes.', 5000, '🎁', 'gift_card', 'active'),
('$5 Google Play Card', 'Use the $5 Google Play Gift Card to purchase apps, games, movies, books, and more on the Play Store.', 5000, '🎁', 'gift_card', 'active'),
('$5 Amazon Gift Card', 'Get a $5 digital gift card to spend on your favorite tools or platforms.', 5000, '🎁', 'gift_card', 'active'),
('$10 Amazon Gift Card', 'Get a $10 digital gift card to spend on your favorite tools or platforms.', 10000, '🎁', 'gift_card', 'active'),
('Free Udemy Course', 'Coming Soon!', 0, '📚', 'course', 'coming_soon');

-- Enable Row Level Security
ALTER TABLE rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_streaks ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Anyone can view rewards" ON rewards FOR SELECT USING (true);
CREATE POLICY "Users can view own points" ON user_points FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own points" ON user_points FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own points" ON user_points FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view own redemptions" ON user_rewards FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own redemptions" ON user_rewards FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view own streaks" ON daily_streaks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own streaks" ON daily_streaks FOR ALL USING (auth.uid() = user_id);
```

##  Project Structure
```
flow/
├── public/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   └── loadingSpinner.jsx
│   │   ├── earn/
│   │   │   ├── dailyStreak.jsx
│   │   │   ├── pointBalance.jsx
│   │   │   ├── referralCard.jsx
│   │   │   ├── referralStats.jsx
│   │   │   ├── shareStack.jsx
│   │   │   └── toolSpotlight.jsx
│   │   ├── layout/
│   │   │   └── sidebar.jsx
│   │   └── rewards/
│   │       ├── rewardCard.jsx
│   │       ├── rewardGrid.jsx
│   │       └── rewardTabs.jsx
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useDailyStreak.js
│   │   ├── useRewards.js
│   │   └── useUserPoints.js
│   ├── lib/
│   │   └── supabaseClient.js
│   ├── pages/
│   │   ├── earnPoints.jsx
│   │   ├── login.jsx
│   │   └── redeemRewards.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.local
├── package.json
├── tailwind.config.js
└── README.md
```

##  Key Features Explained

### Daily Streak System
- Users earn 5 points per day by claiming daily rewards
- Visual indicator shows which days have been claimed
- Streak counter tracks consecutive days
- Purple ring appears around claimed days

### Points Balance
- Real-time point tracking
- Progress bar showing path to next reward
- Animated coin icon on hover
- Dynamic updates when points are earned

### Rewards Redemption
- Filter rewards by: All, Unlocked, Locked, Coming Soon
- Hover animations on reward cards
- Instant point deduction upon redemption
- Confirmation dialog before redemption

### Referral System
- Unique referral link for each user
- Track referrals and points earned
- Copy-to-clipboard functionality
- Social media sharing buttons

##  Deployment

### Deploy to Vercel

1. **Push code to GitHub**

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

3. **Add environment variables**
   - Add `VITE_SUPABASE_URL`
   - Add `VITE_SUPABASE_ANON_KEY`

4. **Deploy**
   - Click "Deploy"
   - Your app will be live in minutes!

##  Security

- Row Level Security (RLS) enabled on all tables
- Users can only access their own data
- Secure authentication via Supabase Auth
- Environment variables for sensitive data
- No API keys exposed in frontend code

##  Responsive Design

Fully optimized for:
-  Mobile (320px - 639px)
-  Tablet (640px - 1023px)
-  Laptop (1024px - 1535px)
-  Large Desktop/Monitor (1536px+)

##  Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

##  Assumptions & Trade-offs

### Assumptions Made:
- Users start with 0 points
- Reward redemption is instant
- Email confirmations disabled for testing
- Daily streak resets if a day is missed

### Trade-offs:
- Used client-side state management instead of complex state libraries (simpler, faster development)
- Implemented basic referral tracking (can be expanded with advanced analytics)
- Simplified points calculation (no complex gamification logic)

##  Known Issues

- Daily streak allows multiple claims per day (intentional for demo purposes)
- No email notifications for reward redemptions (future enhancement)

##  Contact

For questions or support, contact: uzomanwaiwu@gmail.com
