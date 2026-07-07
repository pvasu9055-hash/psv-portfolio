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
DATE OF BIRTH: October 20, 2005
NATIVE PLACE: Kakinada, Andhra Pradesh, India
CURRENT CITY: Vadodara, Gujarat, India (for studies)
SUMMARY: Software Engineering student building AI-powered, cloud-native full-stack apps with React.js, Node.js, Spring Boot, PostgreSQL, Docker, and AWS.
EDUCATION: B.Tech CSE, Parul University, Vadodara, Gujarat (2023–2027), CGPA 7.25/10. Prior: Narayana Junior College, Kakinada (Intermediate MPC, 826/1000); Narayana EM School, Kakinada (SSC, 557/600, 92.83%).
ORIGIN: Vadodara, India (originally Kakinada, Andhra Pradesh).
CONTACT: +91-9014735556 | pvasu9055@gmail.com
GITHUB: github.com/pvasu9055-hash
PORTFOLIO: vasutech.online

SKILLS:
- Languages: Java, Python, JavaScript, SQL, HTML/CSS
- Frameworks & DBs: Spring Boot, React.js, Node.js, Express.js, PostgreSQL, MySQL, MongoDB
- Cloud & DevOps: AWS, GCP (Cloud Run), Docker, Vercel, Render, GitHub Actions, CI/CD
- Tools: Git, GitHub, Postman, IntelliJ IDEA, VS Code, REST APIs, WebSocket, Groq API
- Languages Spoken: English, Hindi, Telugu

PROJECTS:
1. DocSign — AI-powered digital document signature platform. Upload/sign/share/manage PDFs securely. Stack: React.js, TypeScript, Node.js, Express.js, PostgreSQL (Supabase), Prisma, JWT auth, AI document summarization, audit logging, Nodemailer. Deployed: Vercel (frontend) + AWS Elastic Beanstalk (backend) + Cloudflare.
2. CivilianShield — Full-stack civilian safety platform, production-ready, 5+ REST endpoints, real users. SOS alerts, incident mapping, emergency contacts, AI threat detection. Stack: Spring Boot, REST API, H2, WebSocket, React. GitHub: github.com/pvasu9055-hash/CivilianShield
3. Skill Gap Analyzer — AI career intelligence tool. Analyzes resumes vs job descriptions, generates skill-gap reports in under 3s using Groq LLM. Stack: React, Node.js, Vercel. Live: skillgap-frontend-eight.vercel.app

EXPERIENCE:
- Full Stack Developer (Freelance), Jan 2026–Present: Built/maintained 4+ full-stack apps (Spring Boot, React, PostgreSQL, Docker) across AWS, Render, Vercel. Cut deployment time 50% via CI/CD. Built AI chat app using Groq API + WebSocket, Dockerized.
- Open Source Developer, 2025–Present: Maintained 5+ repos, 100+ commits. Published AI CS tutor chatbot (Groq/Llama, Vercel serverless, 50+ concurrent sessions).

CERTIFICATIONS: NPTEL Computer Networks (IIT Kharagpur), HackerRank Java Basic, HackerRank SQL Basic, JPMorgan Chase Software Engineering Job Simulation (Forage), Deloitte Data Analytics Simulation (Forage), Infosys Springboard Python Fundamentals.

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
