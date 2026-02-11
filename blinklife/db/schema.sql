-- BlinkLife Database Schema for Supabase
-- Run this in your Supabase SQL editor to set up the database

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ===========================================
-- USERS TABLE (extends Supabase auth.users)
-- ===========================================
CREATE TABLE public.user_profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    consciousness_level INTEGER DEFAULT 1 CHECK (consciousness_level >= 1 AND consciousness_level <= 10),
    transformation_goals JSONB DEFAULT '[]'::jsonb,
    onboarding_completed BOOLEAN DEFAULT FALSE,
    preferences JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===========================================
-- CONSCIOUSNESS ASSESSMENTS
-- ===========================================
CREATE TABLE public.consciousness_assessments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    assessment_type TEXT NOT NULL, -- 'initial', 'weekly', 'milestone'
    responses JSONB NOT NULL, -- Store all assessment responses
    consciousness_score INTEGER CHECK (consciousness_score >= 1 AND consciousness_score <= 100),
    key_insights TEXT[],
    recommendations TEXT[],
    limiting_beliefs_identified TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===========================================
-- AI COACHING SESSIONS
-- ===========================================
CREATE TABLE public.coaching_sessions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    session_type TEXT DEFAULT 'general', -- 'general', 'breakthrough', 'goal-setting'
    user_message TEXT NOT NULL,
    ai_response TEXT NOT NULL,
    sentiment_score DECIMAL(3,2), -- -1 to 1 scale
    topics_discussed TEXT[],
    breakthrough_detected BOOLEAN DEFAULT FALSE,
    action_items JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===========================================
-- TRANSFORMATION GOALS
-- ===========================================
CREATE TABLE public.transformation_goals (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT, -- 'career', 'relationships', 'health', 'spiritual', 'financial'
    target_date DATE,
    current_progress INTEGER DEFAULT 0 CHECK (current_progress >= 0 AND current_progress <= 100),
    milestones JSONB DEFAULT '[]'::jsonb,
    ai_strategy TEXT, -- AI-generated achievement strategy
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'paused', 'cancelled')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===========================================
-- PROGRESS TRACKING
-- ===========================================
CREATE TABLE public.progress_entries (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    goal_id UUID REFERENCES public.transformation_goals(id) ON DELETE CASCADE,
    entry_type TEXT DEFAULT 'daily', -- 'daily', 'weekly', 'milestone', 'breakthrough'
    progress_value DECIMAL(5,2), -- Quantified progress metric
    reflection TEXT,
    mood_score INTEGER CHECK (mood_score >= 1 AND mood_score <= 10),
    energy_level INTEGER CHECK (energy_level >= 1 AND energy_level <= 10),
    breakthrough_moment BOOLEAN DEFAULT FALSE,
    insights JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===========================================
-- BREAKTHROUGH MOMENTS
-- ===========================================
CREATE TABLE public.breakthrough_moments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    trigger_event TEXT, -- What triggered this breakthrough
    old_belief TEXT, -- Limiting belief that was transformed
    new_belief TEXT, -- New empowering belief
    impact_areas TEXT[], -- Areas of life this affects
    breakthrough_type TEXT, -- 'mental', 'emotional', 'spiritual', 'behavioral'
    significance_score INTEGER DEFAULT 5 CHECK (significance_score >= 1 AND significance_score <= 10),
    integration_plan TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===========================================
-- AI INSIGHTS & RECOMMENDATIONS
-- ===========================================
CREATE TABLE public.ai_insights (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    insight_type TEXT NOT NULL, -- 'pattern', 'recommendation', 'warning', 'opportunity'
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    confidence_score DECIMAL(3,2) CHECK (confidence_score >= 0 AND confidence_score <= 1),
    data_sources JSONB, -- What data this insight is based on
    action_required BOOLEAN DEFAULT FALSE,
    implemented BOOLEAN DEFAULT FALSE,
    effectiveness_rating INTEGER CHECK (effectiveness_rating >= 1 AND effectiveness_rating <= 5),
    expires_at TIMESTAMPTZ, -- Some insights may have expiration
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===========================================
-- COMMUNITY FEATURES
-- ===========================================
CREATE TABLE public.community_posts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    post_type TEXT DEFAULT 'share', -- 'share', 'question', 'celebration', 'support'
    tags TEXT[],
    likes_count INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    is_anonymous BOOLEAN DEFAULT FALSE,
    consciousness_level_required INTEGER DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===========================================
-- INDEXES FOR PERFORMANCE
-- ===========================================
CREATE INDEX idx_coaching_sessions_user_created ON public.coaching_sessions(user_id, created_at DESC);
CREATE INDEX idx_progress_entries_user_goal ON public.progress_entries(user_id, goal_id, created_at DESC);
CREATE INDEX idx_transformation_goals_user_status ON public.transformation_goals(user_id, status);
CREATE INDEX idx_breakthrough_moments_user_created ON public.breakthrough_moments(user_id, created_at DESC);
CREATE INDEX idx_ai_insights_user_type ON public.ai_insights(user_id, insight_type, created_at DESC);
CREATE INDEX idx_community_posts_type_created ON public.community_posts(post_type, created_at DESC);

-- ===========================================
-- ROW LEVEL SECURITY (RLS)
-- ===========================================
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consciousness_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coaching_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transformation_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progress_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.breakthrough_moments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_posts ENABLE ROW LEVEL SECURITY;

-- Users can only access their own data
CREATE POLICY "Users can view their own profile" ON public.user_profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.user_profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view their own assessments" ON public.consciousness_assessments FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view their own coaching sessions" ON public.coaching_sessions FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view their own goals" ON public.transformation_goals FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view their own progress" ON public.progress_entries FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view their own breakthroughs" ON public.breakthrough_moments FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view their own insights" ON public.ai_insights FOR ALL USING (auth.uid() = user_id);

-- Community posts have different visibility rules
CREATE POLICY "Users can view public community posts" ON public.community_posts FOR SELECT USING (TRUE);
CREATE POLICY "Users can manage their own posts" ON public.community_posts FOR ALL USING (auth.uid() = user_id);

-- ===========================================
-- TRIGGERS FOR AUTOMATIC TIMESTAMPS
-- ===========================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_transformation_goals_updated_at
    BEFORE UPDATE ON public.transformation_goals
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_community_posts_updated_at
    BEFORE UPDATE ON public.community_posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ===========================================
-- SAMPLE DATA FUNCTIONS
-- ===========================================
CREATE OR REPLACE FUNCTION seed_sample_data(sample_user_id UUID)
RETURNS VOID AS $$
BEGIN
    -- Insert sample user profile
    INSERT INTO public.user_profiles (id, email, full_name, consciousness_level, transformation_goals)
    VALUES (
        sample_user_id,
        'demo@blinklife.com',
        'Demo User',
        3,
        '[
            {"title": "Launch My Dream Business", "category": "career", "priority": "high"},
            {"title": "Master Meditation Practice", "category": "spiritual", "priority": "medium"}
        ]'::jsonb
    ) ON CONFLICT (id) DO NOTHING;
    
    -- Insert sample transformation goal
    INSERT INTO public.transformation_goals (user_id, title, description, category, target_date, current_progress)
    VALUES (
        sample_user_id,
        'Launch My Dream Business',
        'Build and launch a consciousness-based business that helps others transform their lives.',
        'career',
        CURRENT_DATE + INTERVAL '90 days',
        25
    );
    
    -- Insert sample breakthrough moment
    INSERT INTO public.breakthrough_moments (user_id, title, description, old_belief, new_belief, breakthrough_type, significance_score)
    VALUES (
        sample_user_id,
        'I Can Create My Own Reality',
        'Realized that I have been limiting myself with the belief that success is only for other people.',
        'Success is only for lucky or privileged people',
        'I have the power to create success through conscious action and belief transformation',
        'mental',
        8
    );
END;
$$ LANGUAGE plpgsql;

-- ===========================================
-- INSTRUCTIONS FOR SETUP
-- ===========================================
/*
TO SET UP BLINKLIFE DATABASE:

1. Create a new Supabase project at https://supabase.com
2. Go to the SQL Editor in your Supabase dashboard
3. Copy and paste this entire schema file
4. Execute the SQL
5. Go to Authentication > Settings and configure your auth settings
6. Update your .env file with the Supabase URL and keys
7. Optional: Run seed_sample_data(auth.uid()) to create sample data

SUPABASE CONFIGURATION CHECKLIST:
☐ Enable email authentication
☐ Configure RLS policies
☐ Set up API keys (anon + service_role)
☐ Configure CORS settings for your domain
☐ Set up database backups
☐ Configure email templates (optional)

For questions, refer to Supabase docs: https://supabase.com/docs
*/