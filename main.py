from flask import Flask, request, jsonify
from config import GEMINI_API_KEY

app = Flask(__name__)

@app.route('/')
def home():
    return "Welcome to Asha AI Chatbot! How Are You!!!!!"

@app.route('/api/chat', methods=['POST'])
def chat():
    user_input = request.json.get('message', '')
    # Handle message and provide a response
    response = f"Your message was: {user_input}. (Processed using Gemini API Key: {GEMINI_API_KEY})"
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True)