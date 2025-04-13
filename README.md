# Asha AI Chatbot

Asha AI Chatbot enhances user engagement on the JobsForHer Foundation platform by providing access to information about women careers, job listings, community events, mentorship programs, and session details.

## Features
- Context-aware conversations
- Real-time job listings and event details
- Ethical AI principles for gender bias mitigation
- Secure and privacy-conscious design

## Setup Instructions

### Prerequisites
- Python 3.8 or higher
- Install dependencies using `pip install -r requirements.txt`

### Environment Variables
Create a `.env` file in the root directory and add your API key:
```
GEMINI_API_KEY=your_gemini_api_key_here
```

### Run the Chatbot
```bash
python main.py
```

### Project Structure
```plaintext
AshaAIChatbot/
├── .env                 # Environment variables (e.g., API keys)
├── .gitignore           # Git ignore settings
├── README.md            # Project documentation
├── main.py              # Entry point for the chatbot
├── config.py            # Configuration file for API keys and settings
├── requirements.txt     # Python dependencies
├── nlp_pipeline.py      # NLP functionalities (e.g., intent recognition, bias detection)
├── data_retrieval.py    # Retrieval-augmented generation and semantic search
├── security.py          # Security and privacy-related logic
├── static/
│   ├── session_details.json # Example dataset for session details
│   └── job_listing_data.csv # Example dataset for job listings
└── tests/
    ├── test_main.py     # Unit tests for the main application
    └── test_nlp_pipeline.py # Unit tests for NLP functionalities
```

## License
This project is licensed under the MIT License.