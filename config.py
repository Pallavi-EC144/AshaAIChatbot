import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Access Gemini API Key
GEMINI_API_KEY = os.getenv("AIzaSyC8TKDIEu9rJR7x8XiqhoqH6d70wwmO9j4")

if not GEMINI_API_KEY:
    raise ValueError("Gemini API key is missing. Please set it in the .env file.")