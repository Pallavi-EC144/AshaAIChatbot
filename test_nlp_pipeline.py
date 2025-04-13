import unittest
from nlp_pipeline import detect_bias

class TestNLPPipeline(unittest.TestCase):
    def test_detect_bias(self):
        result = detect_bias("This is a test message.")
        self.assertIsInstance(result, list)