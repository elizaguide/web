# ⚡ BlinkLife - Consciousness Engineering Platform

Welcome to BlinkLife! This is the revolutionary AI-powered platform that combines consciousness engineering with personalized insights to help users achieve extraordinary life transformations.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Supabase account (free tier available)
- OpenAI API access
- Anthropic Claude API access

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
1. Copy the environment template:
```bash
cp .env.example .env
```

2. Fill in your API keys (see [API Keys Setup](#api-keys-setup) below)

### 3. Database Setup
1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to SQL Editor in your Supabase dashboard
3. Copy and paste the contents of `db/schema.sql`
4. Execute the SQL to create all tables and policies
5. Update your `.env` file with Supabase URL and keys

### 4. Start the Server
```bash
npm run dev
```

Visit `http://localhost:3000` to see BlinkLife in action! ⚡

## 🔑 API Keys Setup

### Steven - Get These Keys From Norman:

#### OpenAI API (For AI Coaching)
1. Get API key from OpenAI dashboard
2. Get Organization ID if applicable
3. Add to `.env` file:
```
OPENAI_API_KEY=sk-your-key-here
OPENAI_ORG_ID=org-your-org-id-here
```

#### Anthropic Claude API (For Consciousness Analysis)
1. Get API key from Anthropic Console
2. Add to `.env` file:
```
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

#### Supabase Configuration
1. Create project at supabase.com
2. Go to Settings > API
3. Copy URL and anon key:
```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=eyJ... (long key)
SUPABASE_SERVICE_ROLE_KEY=eyJ... (service role key - keep secret!)
```

## 🏗️ Architecture Overview

```
BlinkLife/
├── 🎨 Frontend (Soft Mindvalley Design)
│   ├── index.html - Main landing page
│   ├── Tailwind CSS + Custom styling
│   └── Lightning bolt theme ⚡
│
├── 🧠 Backend API (Node.js + Express)
│   ├── server.js - Main server
│   ├── /api/consciousness/analyze - AI consciousness analysis
│   ├── /api/coaching/session - AI coaching sessions
│   └── /api/user/:id/progress - Progress tracking
│
├── 🗄️ Database (Supabase PostgreSQL)
│   ├── user_profiles - User data & preferences
│   ├── coaching_sessions - AI conversation history
│   ├── transformation_goals - User goals & progress
│   ├── breakthrough_moments - Consciousness breakthroughs
│   └── consciousness_assessments - Level tracking
│
└── 🤖 AI Services
    ├── OpenAI GPT-4 - Conversational AI coaching
    └── Anthropic Claude - Deep consciousness analysis
```

## 🌟 Key Features

### ✅ Implemented
- **Beautiful Mindvalley-styled UI** with soft white aesthetic
- **Supabase database integration** with complete schema
- **OpenAI coaching API** for personalized guidance
- **Anthropic consciousness analysis** for deep insights
- **Progress tracking system** with breakthrough detection
- **Secure authentication** with Row Level Security
- **Rate limiting & security** middleware
- **Responsive design** optimized for mobile

### 🔮 Coming Soon
- User authentication flow
- Goal setting wizard
- Real-time chat interface
- Community features
- Advanced analytics dashboard
- Mobile app (React Native)

## 🚀 Deployment

### GitHub Pages (Frontend Only)
```bash
# Add to git
git add .
git commit -m "Initial BlinkLife setup"
git push origin main
```

Frontend will be available at: `https://elizaguide.github.io/web/blinklife/`

### Full Stack Deployment (Vercel/Railway)
1. Connect your repo to Vercel or Railway
2. Add environment variables in deployment dashboard
3. Deploy with automatic builds

## 🛠️ Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run start        # Production server
npm run setup        # Initialize database
npm test             # Run test suite
npm run lint         # Check code quality
```

### API Testing
Test the health endpoint:
```bash
curl http://localhost:3000/api/health
```

Test consciousness analysis:
```bash
curl -X POST http://localhost:3000/api/consciousness/analyze \
  -H "Content-Type: application/json" \
  -d '{"text": "I feel stuck in my career and don't know how to move forward"}'
```

## 📊 Database Schema

### Core Tables
- `user_profiles` - Extended user data beyond Supabase auth
- `coaching_sessions` - AI conversation history with sentiment
- `transformation_goals` - User goals with AI-generated strategies
- `progress_entries` - Daily/weekly progress tracking
- `breakthrough_moments` - Significant consciousness shifts
- `consciousness_assessments` - Periodic level evaluations

### Security
- **Row Level Security (RLS)** enabled on all tables
- **Users can only access their own data**
- **Anonymous access blocked** for sensitive operations
- **API rate limiting** to prevent abuse

## 🤝 Contributing

### Code Style
- Use Prettier for formatting
- Follow ESLint rules
- Write meaningful commit messages
- Add JSDoc comments for functions

### Testing
- Write tests for new API endpoints
- Test authentication flows
- Validate database operations

## 📞 Support

### For Steven & Development Team

**Setup Issues:**
1. Check `.env` file has all required keys
2. Verify Supabase project is created and schema is loaded
3. Ensure Node.js 18+ is installed
4. Check API keys are valid and have proper permissions

**Common Problems:**
- "Supabase not configured" → Check SUPABASE_URL and keys
- "OpenAI/Anthropic unavailable" → Verify API keys in .env
- "Database connection failed" → Check Supabase project status

**Need Help:**
- Check server logs for detailed error messages
- Visit `/api/health` endpoint to see service status
- Supabase docs: https://supabase.com/docs
- OpenAI docs: https://platform.openai.com/docs

## 🎯 Roadmap

### Phase 1 (Current) - MVP Foundation ✅
- [x] Beautiful landing page with Mindvalley design
- [x] Backend API structure
- [x] Database schema
- [x] AI service integrations
- [x] Environment configuration

### Phase 2 - Core Features
- [ ] User onboarding flow
- [ ] Goal setting interface
- [ ] AI coaching chat interface
- [ ] Progress dashboard
- [ ] Breakthrough tracking

### Phase 3 - Advanced Features
- [ ] Community platform
- [ ] Advanced analytics
- [ ] Mobile app
- [ ] Integration APIs
- [ ] Enterprise features

---

**Built with consciousness engineering principles and AI-powered insights**

⚡ **Transform your life in a blink** ⚡