const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// ===========================================
// MIDDLEWARE SETUP
// ===========================================

// Security
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'],
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000, // 15 minutes
  max: process.env.RATE_LIMIT_MAX_REQUESTS || 100,
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging
app.use(morgan('combined'));

// Static files
app.use(express.static('.'));

// ===========================================
// SUPABASE INITIALIZATION
// ===========================================

let supabase;
try {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
    console.warn('⚠️  Supabase configuration missing. Please check your .env file.');
    console.log('📝 Copy .env.example to .env and add your Supabase credentials');
  } else {
    supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY
    );
    console.log('✅ Supabase connection initialized');
  }
} catch (error) {
  console.error('❌ Supabase initialization failed:', error.message);
}

// ===========================================
// AI SERVICES INITIALIZATION
// ===========================================

let openai, anthropic;

// OpenAI Setup
try {
  if (process.env.OPENAI_API_KEY) {
    const { OpenAI } = require('openai');
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      organization: process.env.OPENAI_ORG_ID
    });
    console.log('✅ OpenAI client initialized');
  } else {
    console.warn('⚠️  OpenAI API key not found. AI coaching features will be disabled.');
  }
} catch (error) {
  console.error('❌ OpenAI initialization failed:', error.message);
}

// Anthropic Setup
try {
  if (process.env.ANTHROPIC_API_KEY) {
    const Anthropic = require('@anthropic-ai/sdk');
    anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
    console.log('✅ Anthropic client initialized');
  } else {
    console.warn('⚠️  Anthropic API key not found. Consciousness analysis features will be disabled.');
  }
} catch (error) {
  console.error('❌ Anthropic initialization failed:', error.message);
}

// ===========================================
// API ROUTES
// ===========================================

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    services: {
      supabase: !!supabase,
      openai: !!openai,
      anthropic: !!anthropic
    }
  });
});

// Consciousness Analysis Endpoint
app.post('/api/consciousness/analyze', async (req, res) => {
  try {
    if (!anthropic) {
      return res.status(503).json({
        error: 'Consciousness analysis service unavailable',
        message: 'Anthropic API not configured'
      });
    }

    const { text, context } = req.body;

    if (!text) {
      return res.status(400).json({
        error: 'Text input required for consciousness analysis'
      });
    }

    const response = await anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 1000,
      messages: [
        {
          role: 'user',
          content: `As a consciousness engineering expert, analyze the following text for consciousness patterns, limiting beliefs, and transformation opportunities:

Text: "${text}"
Context: ${context || 'General life coaching'}

Provide insights on:
1. Current consciousness level indicators
2. Limiting beliefs detected
3. Growth opportunities
4. Recommended next steps

Format as JSON with these fields: level, beliefs, opportunities, recommendations`
        }
      ]
    });

    res.json({
      analysis: response.content[0].text,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Consciousness analysis error:', error);
    res.status(500).json({
      error: 'Analysis failed',
      message: error.message
    });
  }
});

// AI Coaching Endpoint
app.post('/api/coaching/session', async (req, res) => {
  try {
    if (!openai) {
      return res.status(503).json({
        error: 'AI coaching service unavailable',
        message: 'OpenAI API not configured'
      });
    }

    const { message, userId, sessionHistory } = req.body;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: `You are an advanced AI consciousness coach for BlinkLife. Your role is to:
          
1. Help users engineer their consciousness for extraordinary results
2. Identify and transform limiting beliefs
3. Provide practical, actionable guidance
4. Encourage breakthrough thinking
5. Maintain a supportive yet challenging tone

Always respond with empathy, wisdom, and practical next steps. Focus on consciousness engineering principles and rapid transformation techniques.`
        },
        ...(sessionHistory || []),
        {
          role: 'user',
          content: message
        }
      ],
      max_tokens: 500,
      temperature: 0.7
    });

    // Store session in Supabase if available
    if (supabase && userId) {
      await supabase
        .from('coaching_sessions')
        .insert({
          user_id: userId,
          user_message: message,
          ai_response: completion.choices[0].message.content,
          created_at: new Date().toISOString()
        });
    }

    res.json({
      response: completion.choices[0].message.content,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('AI coaching error:', error);
    res.status(500).json({
      error: 'Coaching session failed',
      message: error.message
    });
  }
});

// User Progress Endpoint
app.get('/api/user/:userId/progress', async (req, res) => {
  try {
    if (!supabase) {
      return res.status(503).json({
        error: 'Database service unavailable',
        message: 'Supabase not configured'
      });
    }

    const { userId } = req.params;

    const { data: sessions, error } = await supabase
      .from('coaching_sessions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) throw error;

    res.json({
      userId,
      recentSessions: sessions,
      totalSessions: sessions?.length || 0,
      lastActivity: sessions?.[0]?.created_at || null
    });

  } catch (error) {
    console.error('Progress fetch error:', error);
    res.status(500).json({
      error: 'Failed to fetch progress',
      message: error.message
    });
  }
});

// ===========================================
// ERROR HANDLING
// ===========================================

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not found',
    message: `Route ${req.originalUrl} not found`
  });
});

// ===========================================
// SERVER STARTUP
// ===========================================

app.listen(PORT, () => {
  console.log(`
⚡ BlinkLife Server Started
🚀 Running on http://localhost:${PORT}
🌍 Environment: ${process.env.NODE_ENV || 'development'}
📊 Health check: http://localhost:${PORT}/api/health

${!supabase || !openai || !anthropic ? `
⚠️  SETUP REQUIRED:
${!supabase ? '• Configure Supabase connection in .env' : ''}
${!openai ? '• Add OpenAI API key to .env' : ''}
${!anthropic ? '• Add Anthropic API key to .env' : ''}

📝 See .env.example for configuration template
` : '✅ All services configured and ready!'}
  `);
});

module.exports = app;