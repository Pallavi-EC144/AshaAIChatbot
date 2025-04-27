// asha-ai-chatbot.js

// Create the main chatbot container and elements
function createChatbotUI() {
  // Create the main container div
  const chatbotContainer = document.createElement('div');
  chatbotContainer.id = 'chatbotContainer';
  chatbotContainer.className = 'chatbot-container';
  
  // Create the chatbot header
  const chatbotHeader = document.createElement('div');
  chatbotHeader.className = 'chatbot-header';
  chatbotHeader.innerHTML = `
    <h3>ASHA AI ASSISTANT</h3>
    <button class="chatbot-close" id="chatbotClose">
      <i class="fas fa-times"></i>
    </button>
  `;
  
  // Create the messages area
  const chatbotMessages = document.createElement('div');
  chatbotMessages.id = 'chatbotMessages';
  chatbotMessages.className = 'chatbot-messages';
  
  // Create the menu bar
  const chatbotMenu = document.createElement('div');
  chatbotMenu.className = 'chatbot-menu';
  chatbotMenu.innerHTML = `
    <button class="menu-button" data-action="jobs">
      <i class="fas fa-briefcase"></i>
      <span>Jobs</span>
    </button>
    <button class="menu-button" data-action="events">
      <i class="fas fa-calendar-alt"></i>
      <span>Events</span>
    </button>
    <button class="menu-button" data-action="mentors">
      <i class="fas fa-hands-helping"></i>
      <span>Mentors</span>
    </button>
    <button class="menu-button" data-action="communities">
      <i class="fas fa-users"></i>
      <span>Communities</span>
    </button>
    <button class="menu-button" data-action="feedback">
      <i class="fas fa-comment-alt"></i>
      <span>Feedback</span>
    </button>
  `;
  
  // Create the input area
  const chatbotInput = document.createElement('div');
  chatbotInput.className = 'chatbot-input';
  chatbotInput.innerHTML = `
    <button class="voice-input" id="voiceInputBtn">
      <i class="fas fa-microphone"></i>
    </button>
    <button class="emoji-btn" id="emojiBtn">
      <i class="far fa-smile"></i>
    </button>
    <input type="text" id="userInput" placeholder="Ask me something...">
    <button class="language-btn" id="languageBtn">
      <i class="fas fa-globe"></i>
    </button>
    <button id="sendButton"><i class="fas fa-paper-plane"></i></button>
  `;
  
  // Create the emoji picker
  const emojiPicker = document.createElement('div');
  emojiPicker.id = 'emojiPicker';
  emojiPicker.className = 'emoji-picker';
  
  // Create the language selector
  const languageSelector = document.createElement('div');
  languageSelector.id = 'languageSelector';
  languageSelector.className = 'language-selector';
  languageSelector.innerHTML = `
    <div class="language-option" data-lang="en">English</div>
    <div class="language-option" data-lang="hi">हिंदी (Hindi)</div>
    <div class="language-option" data-lang="kn">ಕನ್ನಡ (Kannada)</div>
    <div class="language-option" data-lang="ta">தமிழ் (Tamil)</div>
    <div class="language-option" data-lang="te">తెలుగు (Telugu)</div>
  `;
  
  // Create the feedback form
  const feedbackForm = document.createElement('div');
  feedbackForm.id = 'feedbackForm';
  feedbackForm.className = 'feedback-form';
  feedbackForm.innerHTML = `
    <textarea placeholder="Share your feedback or report an issue..."></textarea>
    <button id="submitFeedback">Submit</button>
  `;
  
  // Create the toggle button
  const chatbotToggle = document.createElement('div');
  chatbotToggle.id = 'chatbotToggle';
  chatbotToggle.className = 'chatbot-toggle';
  chatbotToggle.innerHTML = `<i class="fas fa-comment-dots"></i>`;
  
  // Create the notification element
  const notification = document.createElement('div');
  notification.id = 'notification';
  notification.className = 'notification';
  notification.innerHTML = `<div id="notificationMessage"></div>`;
  
  // Create the resume modal
  const resumeModal = createModal(
    'resumeModal',
    'AI Resume Review',
    `
    <div class="file-upload" id="fileUpload">
      <i class="fas fa-file-upload"></i>
      <p>Upload your resume (PDF, DOCX)</p>
      <p><small>Max file size: 5MB</small></p>
      <input type="file" id="resumeFile" accept=".pdf,.doc,.docx">
    </div>
    <div class="resume-tips">
      <h4>Resume Tips:</h4>
      <ul>
        <li>Keep it concise (1-2 pages)</li>
        <li>Highlight measurable achievements</li>
        <li>Use action verbs (led, developed, increased)</li>
        <li>Tailor it to the job description</li>
        <li>Include relevant keywords</li>
      </ul>
    </div>
    <button class="btn btn-primary" id="analyzeResume" disabled>Analyze Resume</button>
    `,
    'resumeModalClose'
  );
  
  // Create the summary modal
  const summaryModal = createModal(
    'summaryModal',
    'Conversation Summary',
    `
    <div class="summary-content" id="summaryContent"></div>
    <div class="modal-actions">
      <button class="btn btn-outline" id="emailSummary">Email Summary</button>
      <button class="btn btn-primary" id="downloadSummary">Download</button>
    </div>
    `,
    'summaryModalClose'
  );
  
  // Create the onboarding modal
  const onboardingModal = createModal(
    'onboardingModal',
    'Welcome to Asha AI',
    `
    <div class="onboarding-flow" id="onboardingFlow">
      <div class="onboarding-step active" id="step1">
        <p>Hi there! I'm Asha, your AI career companion. Let's get to know each other better.</p>
        <p>What best describes your current career stage?</p>
        <div class="quick-actions" style="margin-top: 1rem;">
          <button class="quick-action" data-stage="student">Student</button>
          <button class="quick-action" data-stage="early-career">Early Career (0-5 years)</button>
          <button class="quick-action" data-stage="mid-career">Mid Career (5-15 years)</button>
          <button class="quick-action" data-stage="returning">Returning to Workforce</button>
        </div>
      </div>
      <div class="onboarding-step" id="step2">
        <p>Great! What are your primary career interests?</p>
        <div class="quick-actions" style="margin-top: 1rem;">
          <button class="quick-action" data-interest="tech">Technology</button>
          <button class="quick-action" data-interest="business">Business</button>
          <button class="quick-action" data-interest="creative">Creative Fields</button>
          <button class="quick-action" data-interest="science">Science/Research</button>
          <button class="quick-action" data-interest="healthcare">Healthcare</button>
          <button class="quick-action" data-interest="education">Education</button>
        </div>
      </div>
      <div class="onboarding-step" id="step3">
        <p>Almost done! What kind of support are you looking for?</p>
        <div class="quick-actions" style="margin-top: 1rem;">
          <button class="quick-action" data-support="jobs">Job Search</button>
          <button class="quick-action" data-support="mentorship">Mentorship</button>
          <button class="quick-action" data-support="skills">Skill Development</button>
          <button class="quick-action" data-support="career-change">Career Change</button>
          <button class="quick-action" data-support="networking">Networking</button>
        </div>
      </div>
      <div class="onboarding-step" id="step4">
        <p>Thank you! Based on your responses, I'll personalize your experience.</p>
        <p>Here's what I recommend to get started:</p>
        <ul style="margin: 1rem 0;">
          <li>Explore curated job opportunities</li>
          <li>Connect with relevant mentors</li>
          <li>Join communities of like-minded women</li>
        </ul>
        <button class="btn btn-primary" id="completeOnboarding">Let's Get Started!</button>
      </div>
    </div>
    `,
    'onboardingModalClose'
  );
  
  // Assemble the chatbot container
  chatbotContainer.appendChild(chatbotHeader);
  chatbotContainer.appendChild(chatbotMessages);
  chatbotContainer.appendChild(chatbotMenu);
  chatbotContainer.appendChild(chatbotInput);
  chatbotContainer.appendChild(emojiPicker);
  chatbotContainer.appendChild(languageSelector);
  chatbotContainer.appendChild(feedbackForm);
  
  // Add all elements to the body
  document.body.appendChild(chatbotContainer);
  document.body.appendChild(chatbotToggle);
  document.body.appendChild(notification);
  document.body.appendChild(resumeModal);
  document.body.appendChild(summaryModal);
  document.body.appendChild(onboardingModal);
  
  // Add the CSS styles
  addChatbotStyles();
  
  // Initialize the chatbot functionality
  initializeChatbot();
}

// Helper function to create modal elements
function createModal(id, title, content, closeButtonId) {
  const modal = document.createElement('div');
  modal.id = id;
  modal.className = 'modal-overlay';
  
  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';
  modalContent.innerHTML = `
    <button class="modal-close" id="${closeButtonId}">
      <i class="fas fa-times"></i>
    </button>
    <h3 class="modal-title">${title}</h3>
    ${content}
  `;
  
  modal.appendChild(modalContent);
  return modal;
}

// Add all the CSS styles
function addChatbotStyles() {
  const style = document.createElement('style');
  style.textContent = `
    /* All the CSS styles from the original file */
    :root {
      /* Professional Dark Theme */
      --bg-dark: #0E0E10;
      --card-dark: #1C1C1E;
      --text-light: #F5F5F7;
      --text-secondary: #9A9A9A;
      --accent-blue: #4FD1FF;
      --accent-green: #8FFFAB;
      --accent-purple: #A88BFF;
      --accent-teal: #4FE3C2;
      --accent-pink: #FF7EB9;
      --accent-orange: #FFA85C;
      --accent-blue-transparent: rgba(79, 209, 255, 0.2);
      --accent-purple-transparent: rgba(168, 139, 255, 0.2);
      --accent-green-transparent: rgba(143, 255, 171, 0.2);
      --accent-teal-transparent: rgba(79, 227, 194, 0.2);
      
      /* Light Mode Palette */
      --bg-light: #F8F9FB;
      --card-light: #FFFFFF;
      --border-light: #E4E6EB;
      --text-dark: #2D2D2D;
      --text-secondary-light: #6A6A6A;
      --accent-blue-light: #3C91E6;
      --accent-green-light: #61D199;
      --accent-purple-light: #B28DFF;
      --accent-pink-light: #FF6B9E;
      --accent-orange-light: #FF9147;
      --accent-blue-light-transparent: rgba(60, 145, 230, 0.15);
      
      /* Current theme variables */
      --current-bg: var(--bg-dark);
      --current-card: var(--card-dark);
      --current-text: var(--text-light);
      --current-text-secondary: var(--text-secondary);
      --current-accent: var(--accent-blue);
      --current-border: rgba(245, 245, 247, 0.1);
    }
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Montserrat', 'Segoe UI', sans-serif;
      transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
    }
    
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');
    
    body {
      background-color: var(--current-bg);
      color: var(--current-text);
      line-height: 1.6;
      min-height: 100vh;
    }
    
    /* Chatbot Container */
    .chatbot-container {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      width: 380px;
      max-width: 90%;
      background: var(--current-card);
      border-radius: 16px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      overflow: hidden;
      transform: translateY(20px);
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      z-index: 1000;
      border: 1px solid var(--current-border);
    }
    
    .chatbot-container.active {
      transform: translateY(0);
      opacity: 1;
      visibility: visible;
    }
    
    .chatbot-header {
      background: linear-gradient(135deg, var(--accent-blue), var(--accent-teal));
      color: var(--current-bg);
      padding: 1rem 1.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    
    .chatbot-header h3 {
      font-weight: 600;
      font-size: 1.1rem;
    }
    
    .chatbot-close {
      background: none;
      border: none;
      color: var(--current-bg);
      font-size: 1.2rem;
      cursor: pointer;
      transition: transform 0.2s ease;
    }
    
    .chatbot-close:hover {
      transform: rotate(90deg);
    }
    
    .chatbot-messages {
      height: 400px;
      overflow-y: auto;
      padding: 1.5rem;
      background: var(--current-card);
      scrollbar-width: thin;
      scrollbar-color: var(--current-accent) var(--current-bg);
    }
    
    .chatbot-messages::-webkit-scrollbar {
      width: 6px;
    }
    
    .chatbot-messages::-webkit-scrollbar-track {
      background: var(--current-bg);
    }
    
    .chatbot-messages::-webkit-scrollbar-thumb {
      background-color: var(--current-accent);
      border-radius: 3px;
    }
    
    .message {
      margin-bottom: 1.2rem;
      max-width: 85%;
      padding: 1rem;
      border-radius: 12px;
      font-size: 0.95rem;
      line-height: 1.5;
      position: relative;
      animation: fadeIn 0.3s ease;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .bot-message {
      background: var(--accent-blue-transparent);
      color: var(--current-text);
      border-bottom-left-radius: 5px;
      align-self: flex-start;
      border: 1px solid rgba(79, 209, 255, 0.3);
    }
    
    .user-message {
      background: var(--accent-purple-transparent);
      color: var(--current-text);
      border-bottom-right-radius: 5px;
      align-self: flex-end;
      margin-left: auto;
      border: 1px solid rgba(168, 139, 255, 0.3);
    }
    
    .quick-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 0.6rem;
      margin-top: 1.2rem;
    }
    
    .quick-action {
      background: var(--accent-blue-transparent);
      color: var(--current-accent);
      border: 1px solid rgba(79, 209, 255, 0.3);
      border-radius: 20px;
      padding: 0.6rem 1.2rem;
      font-size: 0.85rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .quick-action:hover {
      background: var(--accent-blue-light-transparent);
      transform: translateY(-2px);
    }
    
    .chatbot-input {
      display: flex;
      padding: 1rem;
      border-top: 1px solid var(--current-border);
      background: var(--current-card);
      position: relative;
    }
    
    .chatbot-input::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--current-accent), transparent);
    }
    
    .chatbot-input input {
      flex: 1;
      padding: 0.9rem 1.2rem;
      border: 1px solid var(--current-border);
      border-radius: 30px;
      outline: none;
      font-size: 0.95rem;
      color: var(--current-text);
      background: var(--current-bg);
      transition: all 0.3s ease;
    }
    
    .chatbot-input input:focus {
      border-color: var(--current-accent);
      box-shadow: 0 0 0 2px var(--accent-blue-transparent);
    }
    
    .chatbot-input input::placeholder {
      color: var(--current-text-secondary);
      opacity: 0.7;
    }
    
    .chatbot-input button {
      background: linear-gradient(135deg, var(--accent-blue), var(--accent-teal));
      color: var(--current-bg);
      border: none;
      border-radius: 50%;
      width: 45px;
      height: 45px;
      margin-left: 0.8rem;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 3px 10px rgba(79, 209, 255, 0.3);
    }
    
    .chatbot-input button:hover {
      transform: rotate(15deg) scale(1.1);
      box-shadow: 0 5px 15px rgba(79, 209, 255, 0.4);
    }
    
    .typing-indicator {
      display: flex;
      padding: 1rem;
      align-items: center;
    }
    
    .typing-text {
      margin-right: 0.8rem;
      color: var(--current-accent);
      font-size: 0.8rem;
    }
    
    .typing-dot {
      width: 8px;
      height: 8px;
      background: var(--current-accent);
      border-radius: 50%;
      margin: 0 3px;
      animation: typingAnimation 1.4s infinite ease-in-out;
      opacity: 0.7;
    }
    
    .typing-dot:nth-child(1) {
      animation-delay: 0s;
    }
    
    .typing-dot:nth-child(2) {
      animation-delay: 0.2s;
    }
    
    .typing-dot:nth-child(3) {
      animation-delay: 0.4s;
    }
    
    @keyframes typingAnimation {
      0%, 60%, 100% {
        transform: translateY(0);
        background: var(--current-accent);
      }
      30% {
        transform: translateY(-5px);
        background: var(--accent-purple);
      }
    }
    
    /* Chatbot Toggle Button */
    .chatbot-toggle {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, var(--accent-blue), var(--accent-teal));
      color: var(--current-bg);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      cursor: pointer;
      box-shadow: 0 5px 20px rgba(79, 209, 255, 0.4);
      z-index: 999;
      transition: all 0.3s ease;
    }
    
    .chatbot-toggle:hover {
      transform: scale(1.1);
      box-shadow: 0 8px 25px rgba(79, 209, 255, 0.5);
      animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
      0% { box-shadow: 0 0 0 0 rgba(79, 209, 255, 0.7); }
      70% { box-shadow: 0 0 0 15px rgba(79, 209, 255, 0); }
      100% { box-shadow: 0 0 0 0 rgba(79, 209, 255, 0); }
    }
    
    /* Message Controls */
    .message-controls {
      display: flex;
      justify-content: flex-end;
      gap: 0.5rem;
      margin-top: 0.5rem;
    }
    
    .message-control {
      background: transparent;
      border: none;
      color: var(--current-text-secondary);
      font-size: 0.7rem;
      cursor: pointer;
      transition: color 0.2s;
    }
    
    .message-control:hover {
      color: var(--current-accent);
    }
    
    /* Chatbot Menu */
    .chatbot-menu {
      display: flex;
      justify-content: space-between;
      padding: 0.5rem 1rem;
      background: var(--current-card);
      border-top: 1px solid var(--current-border);
    }
    
    .menu-button {
      background: transparent;
      border: none;
      color: var(--current-text-secondary);
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.3s;
      padding: 0.5rem;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.3rem;
    }
    
    .menu-button:hover, .menu-button.active {
      color: var(--current-accent);
      background: var(--accent-blue-transparent);
    }
    
    .menu-button i {
      font-size: 1.1rem;
    }
    
    /* Feedback Form */
    .feedback-form {
      padding: 1rem;
      background: var(--current-card);
      border-top: 1px solid var(--current-border);
      display: none;
    }
    
    .feedback-form.active {
      display: block;
    }
    
    .feedback-form textarea {
      width: 100%;
      padding: 1rem;
      border-radius: 8px;
      border: 1px solid var(--current-border);
      background: var(--current-bg);
      color: var(--current-text);
      margin-bottom: 0.5rem;
      resize: none;
    }
    
    .feedback-form button {
      background: linear-gradient(135deg, var(--accent-blue), var(--accent-teal));
      color: var(--current-bg);
      border: none;
      padding: 0.6rem 1.2rem;
      border-radius: 30px;
      cursor: pointer;
      transition: all 0.3s;
    }
    
    .feedback-form button:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(79, 209, 255, 0.3);
    }
    
    /* Light Mode Styles */
    .light-mode {
      --current-bg: var(--bg-light);
      --current-card: var(--card-light);
      --current-text: var(--text-dark);
      --current-text-secondary: var(--text-secondary-light);
      --current-accent: var(--accent-blue-light);
      --current-border: var(--border-light);
      
      /* Adjust accent colors for light mode */
      --accent-blue: var(--accent-blue-light);
      --accent-green: var(--accent-green-light);
      --accent-purple: var(--accent-purple-light);
      --accent-pink: var(--accent-pink-light);
      --accent-orange: var(--accent-orange-light);
      --accent-blue-transparent: var(--accent-blue-light-transparent);
    }
    
    .light-mode .bot-message {
      background: var(--accent-blue-light-transparent);
      color: var(--current-text);
      border: 1px solid rgba(60, 145, 230, 0.3);
    }
    
    .light-mode .user-message {
      background: var(--accent-purple-transparent);
      color: var(--current-text);
      border: 1px solid rgba(178, 141, 255, 0.3);
    }
    
    .light-mode .quick-action {
      background: var(--accent-blue-light-transparent);
      color: var(--accent-blue-light);
      border: 1px solid rgba(60, 145, 230, 0.3);
    }
    
    .light-mode .quick-action:hover {
      background: rgba(60, 145, 230, 0.2);
    }
    
    /* Responsive Design */
    @media (max-width: 768px) {
      .chatbot-container {
        width: 95%;
        right: 2.5%;
        bottom: 1rem;
      }
      
      .chatbot-toggle {
        bottom: 1rem;
        right: 1rem;
      }
    }
    
    /* Voice Input Button */
    .voice-input {
      background: transparent;
      border: none;
      color: var(--current-text-secondary);
      font-size: 1.2rem;
      cursor: pointer;
      margin-right: 0.5rem;
      transition: all 0.3s;
    }
    
    .voice-input:hover {
      color: var(--current-accent);
    }
    
    .voice-input.listening {
      color: var(--accent-pink);
      animation: pulse 1.5s infinite;
    }
    
    /* Emoji Picker */
    .emoji-picker {
      position: absolute;
      bottom: 70px;
      right: 20px;
      background: var(--current-card);
      border-radius: 12px;
      box-shadow: 0 5px 20px rgba(0,0,0,0.2);
      padding: 1rem;
      width: 300px;
      max-height: 300px;
      overflow-y: auto;
      display: none;
      z-index: 1001;
      border: 1px solid var(--current-border);
    }
    
    .emoji-picker.active {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 0.5rem;
    }
    
    .emoji-option {
      font-size: 1.5rem;
      cursor: pointer;
      transition: transform 0.2s;
      text-align: center;
    }
    
    .emoji-option:hover {
      transform: scale(1.2);
    }
    
    /* Language Selector */
    .language-selector {
      position: absolute;
      bottom: 70px;
      right: 20px;
      background: var(--current-card);
      border-radius: 12px;
      box-shadow: 0 5px 20px rgba(0,0,0,0.2);
      padding: 1rem;
      width: 200px;
      display: none;
      z-index: 1001;
      border: 1px solid var(--current-border);
    }
    
    .language-selector.active {
      display: block;
    }
    
    .language-option {
      padding: 0.5rem;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s;
    }
    
    .language-option:hover {
      background: var(--accent-blue-transparent);
      color: var(--current-accent);
    }
    
    /* Notification */
    .notification {
      position: fixed;
      bottom: 6rem;
      right: 2rem;
      background: var(--current-card);
      color: var(--current-text);
      padding: 1rem;
      border-radius: 8px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.2);
      z-index: 999;
      transform: translateY(20px);
      opacity: 0;
      transition: all 0.3s;
      border: 1px solid var(--current-border);
      max-width: 300px;
    }
    
    .notification.show {
      transform: translateY(0);
      opacity: 1;
    }
    
    /* Resume Review Modal */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.7);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 2000;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s;
    }
    
    .modal-overlay.active {
      opacity: 1;
      visibility: visible;
    }
    
    .modal-content {
      background: var(--current-card);
      border-radius: 12px;
      padding: 2rem;
      max-width: 600px;
      width: 90%;
      max-height: 90vh;
      overflow-y: auto;
      position: relative;
      border: 1px solid var(--current-border);
    }
    
    .modal-close {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: transparent;
      border: none;
      color: var(--current-text-secondary);
      font-size: 1.5rem;
      cursor: pointer;
    }
    
    .modal-title {
      margin-bottom: 1.5rem;
      color: var(--current-accent);
    }
    
    .file-upload {
      border: 2px dashed var(--current-border);
      border-radius: 8px;
      padding: 2rem;
      text-align: center;
      margin-bottom: 1.5rem;
      cursor: pointer;
      transition: all 0.3s;
    }
    
    .file-upload:hover {
      border-color: var(--current-accent);
      background: var(--accent-blue-transparent);
    }
    
    .file-upload i {
      font-size: 2rem;
      color: var(--current-accent);
      margin-bottom: 1rem;
    }
    
    .file-upload input {
      display: none;
    }
    
    .resume-tips {
      background: var(--current-bg);
      border-radius: 8px;
      padding: 1rem;
      margin-top: 1.5rem;
    }
    
    .resume-tips h4 {
      color: var(--current-accent);
      margin-bottom: 0.5rem;
    }
    
    .resume-tips ul {
      padding-left: 1.5rem;
    }
    
    .resume-tips li {
      margin-bottom: 0.5rem;
    }
    
    /* Summary Modal */
    .summary-content {
      max-height: 60vh;
      overflow-y: auto;
      padding-right: 1rem;
    }
    
    .summary-content h4 {
      color: var(--current-accent);
      margin: 1rem 0 0.5rem;
    }
    
    /* Event Card */
    .event-card {
      background: var(--current-bg);
      border-radius: 8px;
      padding: 1rem;
      margin-bottom: 1rem;
      border: 1px solid var(--current-border);
    }
    
    .event-card h4 {
      color: var(--current-accent);
      margin-bottom: 0.5rem;
    }
    
    .event-card .event-details {
      display: flex;
      gap: 1rem;
      font-size: 0.9rem;
      color: var(--current-text-secondary);
      margin-bottom: 0.5rem;
    }
    
    .event-card .event-actions {
      display: flex;
      gap: 0.5rem;
      margin-top: 0.5rem;
    }
    
    .event-card .event-action {
      background: var(--accent-blue-transparent);
      color: var(--current-accent);
      border: none;
      padding: 0.3rem 0.8rem;
      border-radius: 20px;
      font-size: 0.8rem;
      cursor: pointer;
    }
    
    /* Mentor Card */
    .mentor-card {
      background: var(--current-bg);
      border-radius: 8px;
      padding: 1rem;
      margin-bottom: 1rem;
      border: 1px solid var(--current-border);
      display: flex;
      gap: 1rem;
    }
    
    .mentor-avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: var(--accent-purple-transparent);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--accent-purple);
      font-size: 1.2rem;
      flex-shrink: 0;
    }
    
    .mentor-info {
      flex-grow: 1;
    }
    
    .mentor-info h4 {
      color: var(--current-accent);
      margin-bottom: 0.3rem;
    }
    
    .mentor-info p {
      font-size: 0.9rem;
      color: var(--current-text-secondary);
      margin-bottom: 0.5rem;
    }
    
    .mentor-skills {
      display: flex;
      flex-wrap: wrap;
      gap: 0.3rem;
    }
    
    .mentor-skill {
      background: var(--accent-green-transparent);
      color: var(--accent-green);
      padding: 0.2rem 0.6rem;
      border-radius: 20px;
      font-size: 0.7rem;
    }
    
    /* Job Details */
    .job-details {
      background: var(--current-bg);
      border-radius: 8px;
      padding: 1rem;
      margin-bottom: 1rem;
      border: 1px solid var(--current-border);
    }
    
    .job-details h4 {
      color: var(--current-accent);
      margin-bottom: 0.5rem;
    }
    
    .job-meta {
      display: flex;
      gap: 1rem;
      font-size: 0.9rem;
      color: var(--current-text-secondary);
      margin-bottom: 0.5rem;
    }
    
    .job-description {
      margin: 1rem 0;
      font-size: 0.9rem;
    }
    
    .job-actions {
      display: flex;
      gap: 0.5rem;
    }
    
    .job-action {
      background: var(--accent-blue-transparent);
      color: var(--current-accent);
      border: none;
      padding: 0.3rem 0.8rem;
      border-radius: 20px;
      font-size: 0.8rem;
      cursor: pointer;
    }
    
    /* Why Response Button