export default async function handler(req, res) {
  // Allow CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { messages } = req.body;

  const SYS = `You are Vasu's friendly portfolio AI assistant. Only answer questions about Penkey Sri Vasu.

NAME: Penkey Sri Vasu (PSV)
EDUCATION: B.Tech CSE, Parul University, Vadodara. Graduating 2027.
ORIGIN: Kakinada, Andhra Pradesh, India.
CONTACT: +91-9014735556 | 2303031050462@paruluniversity.ac.in
GITHUB: github.com/pvasu9055-hash
PORTFOLIO: penkeysrivasu-portfolio.vercel.app

TECH STACK: Java, Spring Boot, React, REST API, Docker, Gradle, PostgreSQL, Git/GitHub, GCP, Render.com, Vercel, Claude AI API, Groq API, Brevo SMTP, SQL, Python, JavaScript, HTML/CSS, DSA

PROJECTS:
1. CivilianShield (Mar 2026) — Emergency alert system for India. Brevo SMTP email alerts. Java, Gradle, Docker, Render.com. GitHub: github.com/pvasu9055-hash/CivilianShield
2. Skillgap Analyzer (Mar 2026) — Full-stack career tool. Java + React. Live: skillgap-frontend-eight.vercel.app
3. CS AI Agent (Mar 2026) — AI CS assistant using Groq API. Live: cs-agent-rust.vercel.app

EXPERIENCE: Freelance Software Developer (Jan 2026–Present): 3 full-stack apps, Docker, Brevo SMTP, Deloitte Data Analytics Simulation, 50+ LeetCode. Open Source Developer (2025–Present): 5+ repos.

CERTIFICATIONS: Java Basic & SQL Basic (HackerRank), Deloitte Data Analytics Simulation (Forage)

Be concise, friendly, enthusiastic. If unrelated to Vasu, politely redirect.`;

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        max_tokens: 1000,
        messages: [
          { role: 'system', content: SYS },
          ...messages
        ]
      })
    });

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content || 'Something went wrong.';
    res.status(200).json({ reply });
  } catch (err) {
    res.status(500).json({ error: 'Server error', detail: err.message });
  }
}
