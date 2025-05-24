'use client';

import React, { useState, useEffect } from 'react';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  age: number;
  education: string;
  field: string;
  signupTime: string;
}

interface ChatMessage {
  type: 'user' | 'bot';
  content: string;
  timestamp: string;
}

export default function JobsForHerFoundation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Initialize app
  useEffect(() => {
    const savedSession = localStorage.getItem('jobsforher_session');
    if (savedSession) {
      try {
        const session = JSON.parse(savedSession);
        setIsLoggedIn(true);
        setUserProfile(session.userProfile);
        setChatHistory(session.chatHistory || []);
      } catch (error) {
        console.error('Error loading session:', error);
      }
    }
  }, []);

  // Authentication functions
  const handleLogin = async (email: string, password: string) => {
    const storedUser = localStorage.getItem('user_' + email);
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      if (userData.password === password) {
        setIsLoggedIn(true);
        setUserProfile(userData);
        const session = {
          userProfile: userData,
          loginTime: new Date().toISOString(),
          chatHistory: chatHistory
        };
        localStorage.setItem('jobsforher_session', JSON.stringify(session));
        setIsLoginModalOpen(false);
        
        // Add welcome back message
        addBotMessage(`Welcome back, ${userData.firstName}! I remember our previous conversations. How can I help you continue your career journey today?`);
        return true;
      }
    }
    return false;
  };

  const handleSignup = async (formData: any) => {
    // Check if user already exists
    if (localStorage.getItem('user_' + formData.email)) {
      alert('An account with this email already exists. Please login instead.');
      return false;
    }
    
    const userData: UserProfile = {
      ...formData,
      signupTime: new Date().toISOString()
    };
    
    // Store user data
    localStorage.setItem('user_' + formData.email, JSON.stringify(userData));
    
    setIsLoggedIn(true);
    setUserProfile(userData);
    
    const session = {
      userProfile: userData,
      signupTime: new Date().toISOString(),
      chatHistory: []
    };
    localStorage.setItem('jobsforher_session', JSON.stringify(session));
    setIsSignupModalOpen(false);
    
    // Welcome new user
    setTimeout(() => {
      setIsChatOpen(true);
      addBotMessage(`Welcome to JobsForHer, ${userData.firstName}! I'm thrilled to be your career companion. Based on your interest in ${userData.field} and ${userData.education} background, I can provide personalized guidance. What would you like to explore first?`);
    }, 500);
    
    return true;
  };

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      setIsLoggedIn(false);
      setUserProfile(null);
      setChatHistory([]);
      localStorage.removeItem('jobsforher_session');
      setIsChatOpen(false);
    }
  };

  // Chat functions
  const addBotMessage = (message: string) => {
    const newMessage: ChatMessage = {
      type: 'bot',
      content: message,
      timestamp: new Date().toISOString()
    };
    setChatHistory(prev => [...prev, newMessage]);
  };

  const addUserMessage = (message: string) => {
    const newMessage: ChatMessage = {
      type: 'user',
      content: message,
      timestamp: new Date().toISOString()
    };
    setChatHistory(prev => [...prev, newMessage]);
  };

  const generateAIResponse = async (message: string): Promise<string> => {
    // Enhanced response system with comprehensive career guidance
    const lowerMessage = message.toLowerCase();
    
    // Course recommendations
    if (lowerMessage.includes('java')) {
      return `Excellent choice! Java is perfect for enterprise applications, Android development, and web services. Here are some top courses:

🎓 **Recommended Courses:**
• **Oracle Java SE Certification** - Coursera (12 weeks, ₹3,999/month)
  Complete Java fundamentals with official certification
• **Java Programming Masterclass** - Udemy (₹1,299 one-time)
  80+ hours of hands-on coding practice
• **Spring Boot & Microservices** - Pluralsight (₹1,500/month)
  Industry-standard framework for enterprise development
• **Java for Beginners** - Codecademy (Free tier available)
  Interactive coding environment with instant feedback

💼 **Career Opportunities:**
• Software Developer at TCS, Infosys, Wipro (₹4-8 LPA)
• Backend Developer at startups (₹6-12 LPA)
• Android Developer (₹5-10 LPA)
• Full Stack Java Developer (₹8-15 LPA)

Would you like help creating a learning roadmap or advice on which course matches your current skill level?`;
    }

    if (lowerMessage.includes('python')) {
      return `Fantastic choice! Python is incredibly versatile - perfect for web development, data science, AI, and automation. Here's your pathway:

🎓 **Top Python Courses:**
• **Python for Data Science Specialization** - Coursera (₹3,999/month)
  IBM certification with real-world projects
• **Complete Python Bootcamp** - Udemy (₹1,299)
  From zero to hero in 22 hours of content
• **Python Programming MicroMasters** - edX MIT (₹15,000)
  University-level program with verified certificate
• **Automate the Boring Stuff** - Free online book + Udemy course
  Practical automation projects

💼 **Hot Job Opportunities:**
• Data Analyst at Flipkart, Amazon (₹6-10 LPA)
• Python Developer at Zomato, Swiggy (₹5-12 LPA)
• Data Scientist at BYJU'S, Unacademy (₹8-18 LPA)
• AI/ML Engineer at tech startups (₹10-25 LPA)

Which path interests you most - web development, data science, or automation?`;
    }

    if (lowerMessage.includes('resume')) {
      return `I'd love to help you build a professional resume! Here's a comprehensive guide:

📝 **Resume Building Strategy:**
• **Choose the Right Format**: Chronological for traditional careers, functional for career changes
• **Professional Summary**: 2-3 lines highlighting your key strengths and career goals
• **Quantify Achievements**: "Increased sales by 25%" instead of "Responsible for sales"
• **Relevant Keywords**: Match job descriptions to pass ATS systems
• **Clean Design**: Use professional fonts, consistent formatting, plenty of white space

🛠️ **Recommended Tools:**
• **Canva**: Beautiful templates with easy customization
• **Resume.io**: ATS-friendly formats with expert tips
• **LinkedIn Resume Builder**: Imports your profile data
• **Zety**: Interactive resume builder with real-time tips

💡 **Pro Tips for Indian Job Market:**
• Include a professional photo (common in India)
• Mention relevant certifications and courses
• Highlight technical skills prominently
• Include languages spoken (advantage in diverse workplaces)
• Tailor for each application - generic resumes get rejected

Would you like specific advice for your ${userProfile?.field || 'field'} or help with any particular section?`;
    }

    if (lowerMessage.includes('mentor')) {
      return `Finding a mentor is absolutely game-changing for your career! Here are specific opportunities and amazing mentors to connect with:

🌟 **Active Mentorship Programs:**
• **Herkey Women Mentorship** - 500+ verified women mentors across tech, business & leadership
• **Women Who Code Connect** - Global community with 1:1 mentoring
• **Lean In Circles** - Local meetups with senior professionals
• **AnitaB.org Mentorship** - Tech-focused with industry leaders

💼 **Find Mentors by Industry:**
• **Tech**: Follow leaders like Falguni Nayar (Nykaa), Kiran Mazumdar-Shaw (Biocon)
• **Startups**: Connect with founders on LinkedIn - many are open to mentoring
• **Corporate**: Look for women VPs and Directors in your target companies
• **Freelancing**: Join communities like SheThePeople, Women Entrepreneurs India

📧 **Perfect Mentor Outreach Template:**
"Hi [Name], I'm [Your name], passionate about [field]. I admire your work at [company/achievement]. Would you be open to a 15-minute virtual coffee chat? I'd love to learn about your career journey. Thank you for your time!"

🎯 **Pro Tips:**
• Be specific about what you want to learn
• Offer value in return (research, skills, connections)
• Follow up with gratitude and progress updates
• Start with informational interviews, not direct mentorship asks

What specific area would you like mentorship in? I can suggest more targeted connections!`;
    }

    if (lowerMessage.includes('job') || lowerMessage.includes('opportunity')) {
      return `Here are amazing job opportunities specifically for women, along with the best platforms to find them:

🔥 **Hot Job Openings Right Now:**
• **Software Developer** at Accenture (₹4-7 LPA)
  Remote-friendly, women-inclusive team
• **Data Analyst** at Flipkart (₹6-10 LPA)
  Flexible working hours, great mentorship programs
• **Frontend Developer** at Razorpay (₹8-15 LPA)
  Strong diversity initiatives, learning stipend
• **Product Manager** at BYJU'S (₹12-20 LPA)
  Women leadership development program

🌟 **Best Women-Focused Job Portals:**
• **Naukri Women Jobs** - 15,000+ active listings
• **GharSeNaukri** - Work-from-home specialists
• **LinkedIn Female Jobs** - Premium networking opportunities
• **Herkey** - Freelance & mentorship combined
• **Internshala Women** - Perfect for fresh graduates

💡 **Pro Tips for Job Success:**
• Apply on weekday mornings (9-11 AM) for better response rates
• Customize your resume for each application
• Include quantifiable achievements (increased sales by 20%, etc.)
• Leverage your network - 70% of jobs come through referrals!

What type of role or industry interests you most? I can suggest more targeted opportunities!`;
    }

    // Default personalized response
    return `Hello ${userProfile?.firstName || 'there'}! I'm here to help with your career journey. As your JobsForHer AI companion, I can assist with:

💼 **Career Guidance**: Exploring new fields and career transitions
🎓 **Course Recommendations**: Personalized learning paths for any skill
📝 **Resume Building**: Professional resume tips and templates
👥 **Mentorship**: Connecting with experienced professionals
🔍 **Job Search**: Finding opportunities in women-friendly companies
📈 **Skill Development**: Planning your professional growth

${userProfile ? `Based on your interest in ${userProfile.field} and ${userProfile.education} background, ` : ''}What would you like to explore today?`;
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentMessage.trim() || !isLoggedIn) return;

    const message = currentMessage.trim();
    setCurrentMessage('');
    addUserMessage(message);
    
    setIsTyping(true);
    try {
      const response = await generateAIResponse(message);
      setTimeout(() => {
        setIsTyping(false);
        addBotMessage(response);
      }, 1500);
    } catch (error) {
      setIsTyping(false);
      addBotMessage("I'm having trouble connecting right now. Let me give you some general guidance based on your question.");
    }
  };

  const saveChatHistory = () => {
    if (isLoggedIn && userProfile) {
      const session = {
        userProfile,
        chatHistory,
        lastUpdate: new Date().toISOString()
      };
      localStorage.setItem('jobsforher_session', JSON.stringify(session));
    }
  };

  useEffect(() => {
    saveChatHistory();
  }, [chatHistory]);

  const handleFeatureClick = (message: string) => {
    if (!isLoggedIn) {
      setIsLoginModalOpen(true);
      return;
    }
    setIsChatOpen(true);
    setTimeout(() => {
      setCurrentMessage(message);
      addUserMessage(message);
      generateAIResponse(message).then(response => {
        addBotMessage(response);
      });
    }, 300);
  };

  const styles = `
    .container {
      min-height: 100vh;
      background: #0E0E10;
      color: #F5F5F7;
      font-family: 'Inter', sans-serif;
    }
    
    .header {
      background: #1C1C1E;
      border-bottom: 1px solid rgba(245, 245, 247, 0.1);
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: fixed;
      width: 100%;
      top: 0;
      z-index: 1000;
    }
    
    .logo {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    
    .logo-icon {
      width: 50px;
      height: 50px;
      background: linear-gradient(135deg, #4FD1FF, #4FE3C2);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #0E0E10;
      font-weight: 700;
      font-size: 1.2rem;
    }
    
    .logo-text h1 {
      font-size: 1.4rem;
      font-weight: 700;
      color: #F5F5F7;
      margin: 0;
      line-height: 1;
    }
    
    .logo-text p {
      font-size: 0.75rem;
      color: #4FE3C2;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin: 0;
    }
    
    .nav-buttons {
      display: flex;
      gap: 1rem;
      align-items: center;
    }
    
    .btn {
      padding: 0.6rem 1.2rem;
      border-radius: 30px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
      text-decoration: none;
      border: none;
      font-size: 0.9rem;
    }
    
    .btn-outline {
      border: 2px solid #4FD1FF;
      color: #4FD1FF;
      background: transparent;
    }
    
    .btn-outline:hover {
      background: rgba(79, 209, 255, 0.2);
      box-shadow: 0 0 15px rgba(79, 209, 255, 0.2);
    }
    
    .btn-primary {
      background: linear-gradient(135deg, #4FD1FF, #4FE3C2);
      color: #0E0E10;
    }
    
    .btn-primary:hover {
      box-shadow: 0 0 20px rgba(79, 209, 255, 0.2);
      transform: translateY(-2px);
    }
    
    .user-dashboard {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    
    .user-profile {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      background: #1C1C1E;
      padding: 0.5rem 1rem;
      border-radius: 25px;
      border: 1px solid rgba(245, 245, 247, 0.1);
    }
    
    .user-avatar {
      width: 35px;
      height: 35px;
      background: linear-gradient(135deg, #4FD1FF, #4FE3C2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #0E0E10;
      font-weight: 600;
      font-size: 0.9rem;
    }
    
    .user-info .user-name {
      font-size: 0.9rem;
      font-weight: 600;
      color: #F5F5F7;
      line-height: 1;
      margin: 0;
    }
    
    .user-info .user-role {
      font-size: 0.75rem;
      color: #9A9A9A;
      line-height: 1;
      margin: 0;
    }
    
    .hero {
      margin-top: 80px;
      padding: 6rem 2rem;
      text-align: center;
      background: linear-gradient(135deg, rgba(79, 209, 255, 0.1), rgba(168, 139, 255, 0.1));
      position: relative;
      min-height: 80vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    
    .safe-indicator {
      position: absolute;
      top: 1.5rem;
      right: 2rem;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(143, 255, 171, 0.2);
      color: #8FFFAB;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
      border: 1px solid #8FFFAB;
    }
    
    .hero h1 {
      font-size: 3.5rem;
      color: #F5F5F7;
      margin-bottom: 1.5rem;
      font-weight: 700;
      line-height: 1.2;
      max-width: 900px;
    }
    
    .hero .gradient-text {
      background: linear-gradient(90deg, #4FD1FF, #4FE3C2);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }
    
    .hero p {
      font-size: 1.4rem;
      max-width: 800px;
      margin: 0 auto 2rem;
      color: #9A9A9A;
    }
    
    .hero-buttons {
      display: flex;
      justify-content: center;
      gap: 1.5rem;
      margin-top: 2rem;
      flex-wrap: wrap;
    }
    
    .features {
      padding: 4rem 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .section-title {
      text-align: center;
      font-size: 2.5rem;
      margin-bottom: 3rem;
      color: #F5F5F7;
    }
    
    .section-title .accent {
      color: #4FD1FF;
    }
    
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }
    
    .feature-card {
      background: #1C1C1E;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
      border: 1px solid rgba(245, 245, 247, 0.1);
      transition: transform 0.3s;
      text-align: center;
    }
    
    .feature-card:hover {
      transform: translateY(-10px);
      box-shadow: 0 15px 30px rgba(0,0,0,0.2);
    }
    
    .feature-icon {
      font-size: 3rem;
      margin-bottom: 1.5rem;
    }
    
    .feature-card h3 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      color: #F5F5F7;
    }
    
    .feature-card p {
      color: #9A9A9A;
      margin-bottom: 1.5rem;
    }
    
    .job-portals {
      background: #1C1C1E;
      border-radius: 15px;
      padding: 3rem 2rem;
      margin: 3rem auto;
      max-width: 1200px;
      box-shadow: 0 8px 25px rgba(0,0,0,0.1);
      border: 1px solid rgba(245, 245, 247, 0.1);
    }
    
    .portal-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
    }
    
    .portal-card {
      background: #0E0E10;
      padding: 1.5rem;
      border-radius: 10px;
      border: 1px solid rgba(245, 245, 247, 0.1);
      text-decoration: none;
      color: inherit;
      transition: all 0.3s ease;
      display: block;
    }
    
    .portal-card:hover {
      background: linear-gradient(135deg, rgba(168, 139, 255, 0.2), rgba(79, 227, 194, 0.2));
      transform: translateY(-3px);
      box-shadow: 0 8px 20px rgba(0,0,0,0.15);
    }
    
    .portal-name {
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: #4FD1FF;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .portal-description {
      font-size: 0.9rem;
      color: #9A9A9A;
    }
    
    .chat-toggle {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      width: 70px;
      height: 70px;
      background: linear-gradient(135deg, #4FD1FF, #4FE3C2);
      color: #0E0E10;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.8rem;
      cursor: pointer;
      box-shadow: 0 8px 25px rgba(79, 209, 255, 0.4);
      z-index: 999;
      transition: all 0.3s ease;
      border: none;
    }
    
    .chat-toggle:hover {
      transform: scale(1.1);
      box-shadow: 0 10px 30px rgba(79, 209, 255, 0.5);
    }
    
    .chat-modal {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: #0E0E10;
      z-index: 2000;
      display: flex;
      flex-direction: column;
    }
    
    .chat-header {
      background: linear-gradient(135deg, #4FD1FF, #4FE3C2);
      color: #0E0E10;
      padding: 1.5rem 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    
    .chat-header-info {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    
    .chat-avatar {
      width: 50px;
      height: 50px;
      background: rgba(255,255,255,0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
    }
    
    .chat-info h3 {
      font-size: 1.3rem;
      font-weight: 600;
      margin: 0 0 0.25rem 0;
    }
    
    .chat-info p {
      font-size: 0.9rem;
      opacity: 0.9;
      margin: 0;
    }
    
    .chat-close {
      background: none;
      border: none;
      color: #0E0E10;
      font-size: 1.5rem;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 50%;
      transition: all 0.3s ease;
    }
    
    .chat-close:hover {
      background: rgba(255,255,255,0.2);
    }
    
    .chat-messages {
      flex: 1;
      padding: 2rem;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      background: linear-gradient(135deg, rgba(79, 209, 255, 0.02), rgba(168, 139, 255, 0.02));
    }
    
    .message {
      display: flex;
      gap: 0.75rem;
      max-width: 70%;
    }
    
    .message.user {
      flex-direction: row-reverse;
      margin-left: auto;
    }
    
    .message-avatar {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.9rem;
      flex-shrink: 0;
    }
    
    .message.bot .message-avatar {
      background: linear-gradient(135deg, #4FD1FF, #4FE3C2);
      color: #0E0E10;
    }
    
    .message.user .message-avatar {
      background: #A88BFF;
      color: #0E0E10;
    }
    
    .message-content {
      padding: 1rem 1.25rem;
      border-radius: 18px;
      font-size: 0.95rem;
      line-height: 1.5;
      word-wrap: break-word;
    }
    
    .message.bot .message-content {
      background: #1C1C1E;
      color: #F5F5F7;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      border: 1px solid rgba(245, 245, 247, 0.1);
    }
    
    .message.user .message-content {
      background: linear-gradient(135deg, #A88BFF, #FF7EB9);
      color: #0E0E10;
    }
    
    .chat-input-container {
      padding: 2rem;
      background: #1C1C1E;
      border-top: 1px solid rgba(245, 245, 247, 0.1);
    }
    
    .chat-input-form {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
    }
    
    .chat-input {
      flex: 1;
      padding: 1rem 1.5rem;
      border: 2px solid rgba(245, 245, 247, 0.1);
      border-radius: 25px;
      outline: none;
      font-size: 1rem;
      background: #0E0E10;
      color: #F5F5F7;
      transition: all 0.3s ease;
    }
    
    .chat-input:focus {
      border-color: #4FD1FF;
      box-shadow: 0 0 0 3px rgba(79, 209, 255, 0.2);
    }
    
    .send-btn {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: linear-gradient(135deg, #4FD1FF, #4FE3C2);
      color: #0E0E10;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      font-size: 1.1rem;
    }
    
    .send-btn:hover {
      transform: scale(1.05);
      box-shadow: 0 5px 15px rgba(79, 209, 255, 0.3);
    }
    
    .send-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
    }
    
    .suggestions {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    
    .suggestion-btn {
      padding: 0.5rem 1rem;
      border: 1px solid rgba(245, 245, 247, 0.1);
      background: #0E0E10;
      color: #9A9A9A;
      border-radius: 20px;
      font-size: 0.85rem;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .suggestion-btn:hover {
      background: #4FD1FF;
      color: #0E0E10;
      border-color: #4FD1FF;
      transform: translateY(-2px);
    }
    
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.8);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 2500;
    }
    
    .modal-content {
      background: #1C1C1E;
      border-radius: 16px;
      padding: 2.5rem;
      max-width: 450px;
      width: 90%;
      position: relative;
      border: 1px solid rgba(245, 245, 247, 0.1);
      box-shadow: 0 20px 50px rgba(0,0,0,0.3);
      max-height: 90vh;
      overflow-y: auto;
    }
    
    .modal-close {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: transparent;
      border: none;
      color: #9A9A9A;
      font-size: 1.5rem;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .modal-close:hover {
      color: #4FD1FF;
    }
    
    .modal-title {
      margin-bottom: 2rem;
      color: #4FD1FF;
      text-align: center;
      font-size: 1.8rem;
    }
    
    .form-group {
      margin-bottom: 1.5rem;
    }
    
    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      color: #F5F5F7;
      font-weight: 500;
    }
    
    .form-group input, .form-group select {
      width: 100%;
      padding: 0.8rem 1rem;
      border: 1px solid rgba(245, 245, 247, 0.1);
      border-radius: 8px;
      background: #0E0E10;
      color: #F5F5F7;
      font-size: 1rem;
      transition: all 0.3s ease;
      box-sizing: border-box;
    }
    
    .form-group input:focus, .form-group select:focus {
      border-color: #4FD1FF;
      outline: none;
      box-shadow: 0 0 0 2px rgba(79, 209, 255, 0.2);
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
    
    .typing-indicator {
      display: flex;
      gap: 0.25rem;
      padding: 1rem 1.25rem;
    }
    
    .typing-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #4FD1FF;
      animation: typing 1.4s infinite;
    }
    
    .typing-dot:nth-child(2) { animation-delay: 0.2s; }
    .typing-dot:nth-child(3) { animation-delay: 0.4s; }
    
    @keyframes typing {
      0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
      30% { transform: translateY(-10px); opacity: 1; }
    }
    
    @media (max-width: 768px) {
      .hero h1 {
        font-size: 2.5rem;
      }
      
      .hero p {
        font-size: 1.2rem;
      }
      
      .hero-buttons {
        flex-direction: column;
        align-items: center;
      }
      
      .chat-messages {
        padding: 1rem;
      }
      
      .chat-input-container {
        padding: 1rem;
      }
      
      .message {
        max-width: 85%;
      }
      
      .features-grid {
        grid-template-columns: 1fr;
      }
      
      .portal-grid {
        grid-template-columns: 1fr;
      }

      .form-row {
        grid-template-columns: 1fr;
      }

      .safe-indicator {
        position: static;
        margin-bottom: 2rem;
      }

      .user-dashboard {
        flex-direction: column;
        gap: 0.5rem;
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="container">
        {/* Header */}
        <header className="header">
          <div className="logo">
            <div className="logo-icon">JF</div>
            <div className="logo-text">
              <h1>JobsForHer Foundation</h1>
              <p>Delicational Journey</p>
            </div>
          </div>
          
          <div className="nav-buttons">
            {!isLoggedIn ? (
              <>
                <button 
                  onClick={() => setIsLoginModalOpen(true)}
                  className="btn btn-outline"
                >
                  Login
                </button>
                <button 
                  onClick={() => setIsSignupModalOpen(true)}
                  className="btn btn-primary"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <div className="user-dashboard">
                <div className="user-profile">
                  <div className="user-avatar">
                    {userProfile?.firstName.charAt(0).toUpperCase()}
                  </div>
                  <div className="user-info">
                    <div className="user-name">
                      {userProfile?.firstName} {userProfile?.lastName}
                    </div>
                    <div className="user-role">Career Explorer</div>
                  </div>
                </div>
                <button 
                  onClick={handleLogout}
                  className="btn btn-outline"
                >
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Hero Section */}
        <section className="hero">
          <div className="safe-indicator">
            🛡️ Safe Space - No Stereotypes, All Opportunities
          </div>
          
          <div>
            <h1>
              Empowering <span className="gradient-text">Indian Women</span><br />
              in Their Career Journey
            </h1>
            
            <p>
              Get personalized career guidance, course recommendations, and mentorship opportunities. 
              Break barriers, not stereotypes. Every career path is yours to explore.
            </p>
            
            <div className="hero-buttons">
              <button 
                onClick={() => setIsChatOpen(true)}
                className="btn btn-primary"
              >
                💬 Start Career Chat
              </button>
              <button 
                onClick={() => setIsLoginModalOpen(true)}
                className="btn btn-outline"
              >
                👥 Join Community
              </button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features">
          <h2 className="section-title">
            Your Career <span className="accent">Companion</span>
          </h2>
          
          <div className="features-grid">
            {[
              {
                icon: '🎓',
                title: 'Course Recommendations',
                description: 'Get personalized learning paths for any skill - from Java to leadership, data science to entrepreneurship.',
                action: () => handleFeatureClick('I want to learn Java')
              },
              {
                icon: '📄',
                title: 'AI Resume Builder',
                description: 'Create professional resumes with AI assistance and expert guidance tailored for your industry.',
                action: () => handleFeatureClick('Help me build a resume')
              },
              {
                icon: '👥',
                title: 'Mentorship Network',
                description: 'Connect with experienced professionals and join communities of like-minded women.',
                action: () => handleFeatureClick('Find me a mentor')
              },
              {
                icon: '💼',
                title: 'Job Opportunities',
                description: 'Access women-focused job portals and career opportunities in all fields.',
                action: () => handleFeatureClick('Show me job opportunities')
              }
            ].map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <button 
                  onClick={feature.action}
                  className="btn btn-outline"
                  style={{width: '100%'}}
                >
                  Explore
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Job Portals Section */}
        <section className="job-portals">
          <h2 className="section-title">Women-Focused Job Portals</h2>
          <div className="portal-grid">
            {[
              { name: 'Naukri Women Jobs', icon: '💼', desc: 'Dedicated job section for women professionals', url: 'https://www.naukri.com/women-jobs' },
              { name: 'GharSeNaukri', icon: '🏠', desc: 'Work from home opportunities', url: 'https://www.gharsenaukri.com/' },
              { name: 'LinkedIn Female Jobs', icon: '💼', desc: 'Professional networking opportunities', url: 'https://in.linkedin.com/jobs/female-only-jobs' },
              { name: 'Herkey', icon: '💻', desc: 'Freelance and mentorship platform', url: 'https://www.herkey.com/' },
              { name: 'Internshala Women', icon: '🎓', desc: 'Internships designed for women', url: 'https://internshala.com/jobs-for-women/' }
            ].map((portal, index) => (
              <a key={index} href={portal.url} target="_blank" rel="noopener noreferrer" className="portal-card">
                <div className="portal-name">
                  <span>{portal.icon}</span> {portal.name}
                </div>
                <div className="portal-description">{portal.desc}</div>
              </a>
            ))}
          </div>
        </section>

        {/* Chat Toggle Button */}
        <button 
          onClick={() => setIsChatOpen(true)}
          className="chat-toggle"
        >
          💬
        </button>

        {/* Full Screen Chat Modal */}
        {isChatOpen && (
          <div className="chat-modal">
            {/* Chat Header */}
            <div className="chat-header">
              <div className="chat-header-info">
                <div className="chat-avatar">❤️</div>
                <div className="chat-info">
                  <h3>JobsForHer AI Assistant</h3>
                  <p>Your personal career companion</p>
                </div>
              </div>
              <button 
                onClick={() => setIsChatOpen(false)}
                className="chat-close"
              >
                ✕
              </button>
            </div>

            {/* Chat Messages */}
            <div className="chat-messages">
              <div className="message bot">
                <div className="message-avatar">❤️</div>
                <div className="message-content">
                  Hello! I'm your JobsForHer AI companion. I'm here to help you with course recommendations, resume building, job search tips, and career guidance. How can I assist you today?
                </div>
              </div>
              
              {chatHistory.map((msg, index) => (
                <div key={index} className={`message ${msg.type}`}>
                  <div className="message-avatar">
                    {msg.type === 'user' ? '👤' : '❤️'}
                  </div>
                  <div className="message-content">
                    {msg.content.split('\n').map((line, i) => (
                      <div key={i}>{line}</div>
                    ))}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="message bot">
                  <div className="message-avatar">❤️</div>
                  <div className="message-content">
                    <div className="typing-indicator">
                      <div className="typing-dot"></div>
                      <div className="typing-dot"></div>
                      <div className="typing-dot"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div className="chat-input-container">
              <form onSubmit={handleSendMessage} className="chat-input-form">
                <input
                  type="text"
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  placeholder="Ask me anything about your career..."
                  className="chat-input"
                  disabled={!isLoggedIn}
                />
                <button 
                  type="submit"
                  disabled={!currentMessage.trim() || !isLoggedIn}
                  className="send-btn"
                >
                  ✈️
                </button>
              </form>
              
              <div className="suggestions">
                {['I want to learn Java', 'Help me build a resume', 'Find me a mentor', 'Show me job opportunities'].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => {
                      if (isLoggedIn) {
                        setCurrentMessage(suggestion);
                        addUserMessage(suggestion);
                        generateAIResponse(suggestion).then(addBotMessage);
                      }
                    }}
                    className="suggestion-btn"
                    disabled={!isLoggedIn}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Login Modal */}
        {isLoginModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button onClick={() => setIsLoginModalOpen(false)} className="modal-close">✕</button>
              <h2 className="modal-title">Welcome Back</h2>
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const email = formData.get('email') as string;
                const password = formData.get('password') as string;
                if (!handleLogin(email, password)) {
                  alert('Invalid credentials. Please try again.');
                }
              }}>
                <div className="form-group">
                  <label>Email</label>
                  <input name="email" type="email" required />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input name="password" type="password" required />
                </div>
                <button type="submit" className="btn btn-primary" style={{width: '100%'}}>
                  Login
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Signup Modal */}
        {isSignupModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button onClick={() => setIsSignupModalOpen(false)} className="modal-close">✕</button>
              <h2 className="modal-title">Join JobsForHer</h2>
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const data = {
                  firstName: formData.get('firstName') as string,
                  lastName: formData.get('lastName') as string,
                  email: formData.get('email') as string,
                  password: formData.get('password') as string,
                  age: parseInt(formData.get('age') as string),
                  education: formData.get('education') as string,
                  field: formData.get('field') as string,
                };
                handleSignup(data);
              }}>
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name</label>
                    <input name="firstName" type="text" required />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input name="lastName" type="text" required />
                  </div>
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input name="email" type="email" required />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input name="password" type="password" required />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Age</label>
                    <input name="age" type="number" min="16" max="100" required />
                  </div>
                  <div className="form-group">
                    <label>Education</label>
                    <select name="education" required>
                      <option value="">Select</option>
                      <option value="high-school">High School</option>
                      <option value="bachelors">Bachelor's</option>
                      <option value="masters">Master's</option>
                      <option value="phd">PhD</option>
                      <option value="diploma">Diploma</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>Field of Interest</label>
                  <select name="field" required>
                    <option value="">Select Field</option>
                    <option value="technology">Technology</option>
                    <option value="business">Business</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="education">Education</option>
                    <option value="creative">Creative Arts</option>
                    <option value="finance">Finance</option>
                    <option value="engineering">Engineering</option>
                    <option value="marketing">Marketing</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary" style={{width: '100%'}}>
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}