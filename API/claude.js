// File: api/claude.js
// This goes in your project's /api folder for Vercel deployment

export default async function handler(req, res) {
  // Enable CORS for your domain
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { prompt, category, title } = req.body;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1024,
        messages: [
          {
            role: 'user',
            content: `You are an expert prompt engineer. I need you to improve and optimize this prompt for better AI results:

ORIGINAL PROMPT:
"${prompt}"

CATEGORY: ${category}
TITLE: ${title}

Please provide an improved version that:
1. Is more specific and clear
2. Includes better structure and formatting
3. Adds helpful context and examples where needed
4. Maintains the same variables in [BRACKETS] format
5. Optimizes for better AI responses

Return ONLY the improved prompt, nothing else.`
          }
        ]
      })
    });

    const data = await response.json();
    
    if (data.content && data.content[0] && data.content[0].text) {
      const improvedPrompt = data.content[0].text.trim();
      res.status(200).json({ 
        success: true, 
        improvedPrompt,
        usage: data.usage 
      });
    } else {
      throw new Error('Invalid response from Anthropic API');
    }
  } catch (error) {
    console.error('Claude API Error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to improve prompt',
      details: error.message 
    });
  }
}
