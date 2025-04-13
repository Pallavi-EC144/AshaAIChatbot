from transformers import pipeline

def detect_bias(message):
    sentiment_analyzer = pipeline("sentiment-analysis")
    results = sentiment_analyzer(message)
    return results