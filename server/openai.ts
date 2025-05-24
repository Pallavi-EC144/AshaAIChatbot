import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_KEY || process.env.API_KEY 
});

const courseRecommendations = {
  'java': [
    'Oracle Java Certification Course - Coursera',
    'Java Programming Masterclass - Udemy',
    'Spring Framework Tutorial - Pluralsight',
    'Java for Beginners - Codecademy'
  ],
  'python': [
    'Python for Data Science - Coursera',
    'Complete Python Bootcamp - Udemy',
    'Python Programming - edX',
    'Django Web Development - Pluralsight'
  ],
  'javascript': [
    'JavaScript Algorithms and Data Structures - freeCodeCamp',
    'Modern JavaScript Course - Udemy',
    'React.js Complete Guide - Coursera',
    'Node.js Development - Pluralsight'
  ],
  'data science': [
    'Data Science Specialization - Coursera',
    'Machine Learning A-Z - Udemy',
    'Introduction to Data Science - edX',
    'Python for Data Analysis - DataCamp'
  ],
  'web development': [
    'Full Stack Web Development - Coursera',
    'The Complete Web Developer Course - Udemy',
    'Modern Web Development - Pluralsight',
    'Frontend Masters - Frontend Development'
  ]
};

const jobPortals = [
  { name: 'Naukri Women Jobs', url: 'https://www.naukri.com/women-jobs', description: 'Dedicated job section for women professionals' },
  { name: 'GharSeNaukri', url: 'https://www.gharsenaukri.com/', description: 'Work from home opportunities for women' },
  { name: 'LinkedIn Female Jobs', url: 'https://in.linkedin.com/jobs/female-only-jobs', description: 'Professional network with female-focused opportunities' },
  { name: 'Herkey', url: 'https://www.herkey.com/', description: 'Freelance and remote work platform' },
  { name: 'Internshala Women', url: 'https://internshala.com/jobs-for-women/', description: 'Internships and jobs specifically for women' }
];

export async function generateCareerResponse(message: string, userContext?: any): Promise<string> {
  try {
    const lowerMessage = message.toLowerCase();

    // Course recommendations
    for (const [skill, courses] of Object.entries(courseRecommendations)) {
      if (lowerMessage.includes(skill)) {
        return `Great choice! ${skill.charAt(0).toUpperCase() + skill.slice(1)} is a valuable skill. Here are some recommended courses:\n\n${courses.join('\n')}\n\nWould you like more specific guidance on any of these courses or help with learning path planning?`;
      }
    }

    // Resume building
    if (lowerMessage.includes('resume') || lowerMessage.includes('cv')) {
      return `I'd be happy to help you with your resume! For the best AI-powered resume building experience, I recommend using Resume-Now:\n\n🔗 https://www.resume-now.com/\n\nTips for using it:\n• Choose a professional template\n• Use action verbs in your descriptions\n• Quantify your achievements with numbers\n• Tailor it to the job you're applying for\n• Keep it concise (1-2 pages)\n• Include relevant skills and certifications\n\nWould you like more specific resume tips for your field?`;
    }

    // Mentorship
    if (lowerMessage.includes('mentor')) {
      return `Finding a mentor is a great step for career growth! I recommend checking out:\n\n🔗 https://www.herkey.com/\n\nThey have mentorship programs specifically for women. You can also:\n• Join professional communities and networking groups\n• Attend industry events and conferences\n• Reach out to professionals on LinkedIn\n• Participate in women-in-tech organizations\n• Look for internal mentorship programs at your workplace\n\nWould you like help crafting a message to potential mentors?`;
    }

    // Job search
    if (lowerMessage.includes('job') || lowerMessage.includes('career opportunities')) {
      const jobPortalList = jobPortals.map(portal => 
        `• ${portal.name}: ${portal.url}\n  ${portal.description}`
      ).join('\n\n');
      
      return `Here are some excellent job portals specifically for women:\n\n${jobPortalList}\n\nThese platforms focus on creating safe, inclusive work environments for women. What type of role or industry are you interested in?`;
    }

    // Personal questions - professional boundary
    if (lowerMessage.includes('single') || lowerMessage.includes('married') || lowerMessage.includes('relationship')) {
      return `I'm an AI assistant focused on helping you with your career journey. I'm here to provide professional guidance, course recommendations, and career advice. How can I help you advance your career today?`;
    }

    // Communities
    if (lowerMessage.includes('community') || lowerMessage.includes('network')) {
      return `Building a professional network is crucial for career growth! Here are some ways to connect:\n\n• Join women-in-tech communities like Women Who Code, AnitaB.org\n• Attend virtual networking events and webinars\n• Participate in online forums and professional discussions\n• Connect with professionals on LinkedIn\n• Join industry-specific groups and associations\n• Attend local meetups and conferences\n\nI can help you find communities based on your field of interest. What industry are you in or interested in?`;
    }

    // Use OpenAI for more complex queries
    const systemPrompt = `You are AshaAI, a career companion specifically designed to help Indian women with their career journey. You provide:

1. Non-stereotypical career guidance covering ALL fields
2. Course recommendations for various skills
3. Resume building advice
4. Job search strategies
5. Mentorship connections
6. Professional networking advice

Key principles:
- Never suggest careers based on gender stereotypes
- Encourage exploration of all fields including STEM, leadership, entrepreneurship
- Provide practical, actionable advice
- Be supportive and empowering
- Focus on professional growth and opportunities
- Maintain professional boundaries

When users ask about resume building, direct them to: https://www.resume-now.com/
When users ask about mentorship, mention: https://www.herkey.com/
For job searches, recommend women-focused portals like Naukri Women Jobs, GharSeNaukri, LinkedIn Female Jobs, Herkey, and Internshala Women.

Respond in a helpful, professional tone that empowers women to pursue any career path they choose.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    return response.choices[0].message.content || "I'm here to help with your career journey. Could you please rephrase your question?";

  } catch (error) {
    console.error('OpenAI API error:', error);
    return "I'm here to help with your career journey! I can assist with course recommendations, resume building, job search strategies, mentorship connections, and career guidance. What specific area would you like help with?";
  }
}
