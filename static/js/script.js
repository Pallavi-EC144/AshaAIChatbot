// JavaScript for Chatbot Interaction

// Elements
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const chatMessages = document.getElementById('chat-messages');

// Function to handle sending messages
function sendMessage() {
    const message = userInput.value.trim();
    if (message) {
        addMessageToChat(message, 'user');
        userInput.value = '';

        // Simulate bot response (replace with actual API call)
        setTimeout(() => {
            const botResponse = getBotResponse(message);
            addMessageToChat(botResponse, 'bot');
        }, 500);
    }
}

// Function to add message to chat
function addMessageToChat(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', `${sender}-message`);
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll
}

// Simulated bot response function (replace with actual logic)
function getBotResponse(userMessage) {
    // Example responses (replace with dynamic backend responses)
    const responses = [
        "Hi! How can I assist you today?",
        "I'm here to guide you with jobs, mentorships, and events.",
        "Could you provide more details about your query?",
        "Thank you for reaching out! Let me assist you."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

// Event listeners
sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
<<<<<<< HEAD
});
=======
});
>>>>>>> b17aab2760960791b7f5377bb1de9d82843b74d9
